import * as core from 'core-js';
import {TemplateRegistryEntry} from './template-registry-entry';

var hasTemplateElement = ('content' in document.createElement('template'));

function importElements(frag, link, callback) {
  if(frag){
    document.head.appendChild(frag);
  }

  if(window.Polymer && Polymer.whenReady){
    Polymer.whenReady(callback);
  }else{
    link.addEventListener('load', callback);
  }
}

export class Loader {
  constructor(){
    this.templateRegistry = {};
    this.needsBundleCheck = true;
  }

  loadModule(id: string): Promise<any> {
    throw new Error('Loaders must implement loadModule(id).');
  }

  loadAllModules(ids: string[]): Promise<any[]> {
    throw new Error('Loader must implement loadAllModules(ids).');
  }

  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    throw new Error('Loader must implement loadTemplate(url).');
  }

  loadText(url: string): Promise<string> {
    throw new Error('Loader must implement loadText(url).');
  }

  getOrCreateTemplateRegistryEntry(id: string): TemplateRegistryEntry {
    var entry = this.templateRegistry[id];

    if(entry === undefined){
      this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
    }

    return entry;
  }

  importDocument(url: string): Promise<Document> {
    return new Promise((resolve, reject) => {
      var frag = document.createDocumentFragment();
      var link = document.createElement('link');

      link.rel = 'import';
      link.href = url;
      frag.appendChild(link);

      importElements(frag, link, () => resolve(link.import));
    });
  }

  importBundle(link: HTMLLinkElement): Promise<Document>{
    return new Promise((resolve, reject) => {
      if(link.import){
        if(!hasTemplateElement){
          HTMLTemplateElement.bootstrap(link.import);
        }

        resolve(link.import);
      }else{
        importElements(null, link, () => {
          if(!hasTemplateElement){
            HTMLTemplateElement.bootstrap(link.import);
          }

          resolve(link.import);
        });
      }
    });
  }

  importTemplate(url: string): Promise<Element> {
    return this.importDocument(url).then(doc => {
      return this.findTemplate(doc, url);
    });
  }

  findTemplate(doc: Document, url: string): Element {
    if(!hasTemplateElement){
      HTMLTemplateElement.bootstrap(doc);
    }

    var template = doc.getElementsByTagName('template')[0];

    if(!template){
      throw new Error(`There was no template element found in '${url}'.`);
    }

    return template;
  }

  _tryGetTemplateFromBundle(name, entry){
    var found = this.bundle.getElementById(name);

    if(found){
      entry.setTemplate(found);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  findBundledTemplate(name: string, entry: TemplateRegistryEntry): Promise<boolean> {
    if(this.bundle){
      return this._tryGetTemplateFromBundle(name, entry);
    } else if(this.onBundleReady){
      return this.onBundleReady.then(() => this._tryGetTemplateFromBundle(name, entry));
    } else if(this.needsBundleCheck){
      var bundleLink = document.querySelector('link[aurelia-view-bundle]');
      this.needsBundleCheck = false;

      if(bundleLink){
        this.onBundleReady = this.importBundle(bundleLink).then(doc => {
          this.bundle = doc;
          this.onBundleReady = null;
        });

        return this.onBundleReady.then(() => this._tryGetTemplateFromBundle(name, entry));
      }
    }

    return Promise.resolve(false);
  }
}

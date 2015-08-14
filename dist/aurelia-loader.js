import * as core from 'core-js';
import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';

export class TemplateDependency {
  constructor(src: string, name?: string){
    this.src = src;
    this.name = name;
  }
}

export class TemplateRegistryEntry {
  constructor(id: string){
    this.id = id;
    this.template = null;
    this.dependencies = null;
    this.resources = null;
    this.factory = null;
  }

  get templateIsLoaded(): boolean{
    return this.template !== null;
  }

  get isReady(): boolean{
    return this.factory !== null;
  }

  setTemplate(template: HTMLTemplateElement): void {
    var id = this.id,
        useResources, i, ii, current, src;

    this.template = template;
    useResources = template.content.querySelectorAll('require');
    this.dependencies = new Array(useResources.length);

    if(useResources.length === 0){
      return;
    }

    for(i = 0, ii = useResources.length; i < ii; ++i){
      current = useResources[i];
      src = current.getAttribute('from');

      if(!src){
        throw new Error(`<require> element in ${this.id} has no "from" attribute.`);
      }

      this.dependencies[i] = new TemplateDependency(
        relativeToFile(src, id),
        current.getAttribute('as')
      );

      if(current.parentNode){
        current.parentNode.removeChild(current);
      }
    }
  }

  addDependency(src: string|Function, name?: string): void {
    if(typeof src === 'string'){
      this.dependencies.push(new TemplateDependency(
        relativeToFile(src, this.id),
        name
      ));
    }else if(typeof src === 'function'){
      var origin = Origin.get(src);
      this.dependencies.push(new TemplateDependency(
        origin.moduleId,
        name
      ));
    }
  }

  setResources(resources): void {
    this.resources = resources;
  }

  setFactory(factory): void {
    this.factory = factory;
  }
}

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

  importTemplate(url: string): Promise<HTMLTemplateElement> {
    return this.importDocument(url).then(doc => {
      return this.findTemplate(doc, url);
    });
  }

  findTemplate(doc: Document, url: string): HTMLTemplateElement {
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

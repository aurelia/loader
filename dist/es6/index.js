import {normalize} from 'aurelia-path';

var hasTemplateElement = ('content' in document.createElement('template'));

export class Loader {
  static createDefaultLoader(){
    throw new Error('No default loader module imported.');
  }

  loadModule(id){
    throw new Error('Loaders must implement loadModule(id).');
  }

  loadAllModules(ids){
    throw new Error('Loader must implement loadAllModules(ids).');
  }

  loadTemplate(url){
    return new Promise((resolve, reject) => {
      url = normalize('./' + url, this.getBaseUrl());

      _import(url, doc => {
        if(!hasTemplateElement){
          HTMLTemplateElement.bootstrap(doc);
        }

        var template = doc.querySelector('template');

        if(!template){
          throw new Error(`There was no template element found in '${url}'.`);
        }

        resolve(template);
      });
    });
  }
}

function importElements(frag, link, callback) {
  document.head.appendChild(frag);

  if(window.Polymer && Polymer.whenReady){
    Polymer.whenReady(() => callback(link.import));
  }else{
    link.addEventListener('load', () => callback(link.import));
  }
}

function _import(url, callback) {
  var frag = document.createDocumentFragment();
  var link = document.createElement('link');

  link.rel = 'import';
  link.href = url;
  frag.appendChild(link);

  importElements(frag, link, callback);
}
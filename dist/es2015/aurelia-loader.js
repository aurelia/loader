import { relativeToFile } from 'aurelia-path';
import { Origin } from 'aurelia-metadata';

export let TemplateDependency = class TemplateDependency {
  constructor(src, name) {
    this.src = src;
    this.name = name;
  }
};

export let TemplateRegistryEntry = class TemplateRegistryEntry {
  constructor(address) {
    this.templateIsLoaded = false;
    this.factoryIsReady = false;
    this.resources = null;
    this.dependencies = null;

    this.address = address;
    this.onReady = null;
    this._template = null;
    this._factory = null;
  }

  get template() {
    return this._template;
  }

  set template(value) {
    let address = this.address;
    let requires;
    let current;
    let src;
    let dependencies;

    this._template = value;
    this.templateIsLoaded = true;

    requires = value.content.querySelectorAll('require');
    dependencies = this.dependencies = new Array(requires.length);

    for (let i = 0, ii = requires.length; i < ii; ++i) {
      current = requires[i];
      src = current.getAttribute('from');

      if (!src) {
        throw new Error(`<require> element in ${ address } has no "from" attribute.`);
      }

      dependencies[i] = new TemplateDependency(relativeToFile(src, address), current.getAttribute('as'));

      if (current.parentNode) {
        current.parentNode.removeChild(current);
      }
    }
  }

  get factory() {
    return this._factory;
  }

  set factory(value) {
    this._factory = value;
    this.factoryIsReady = true;
  }

  addDependency(src, name) {
    let finalSrc = typeof src === 'string' ? relativeToFile(src, this.address) : Origin.get(src).moduleId;

    this.dependencies.push(new TemplateDependency(finalSrc, name));
  }
};

export let Loader = class Loader {
  constructor() {
    this.templateRegistry = {};
  }

  map(id, source) {
    throw new Error('Loaders must implement map(id, source).');
  }

  normalizeSync(moduleId, relativeTo) {
    throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
  }

  normalize(moduleId, relativeTo) {
    throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
  }

  loadModule(id) {
    throw new Error('Loaders must implement loadModule(id).');
  }

  loadAllModules(ids) {
    throw new Error('Loader must implement loadAllModules(ids).');
  }

  loadTemplate(url) {
    throw new Error('Loader must implement loadTemplate(url).');
  }

  loadText(url) {
    throw new Error('Loader must implement loadText(url).');
  }

  applyPluginToUrl(url, pluginName) {
    throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
  }

  addPlugin(pluginName, implementation) {
    throw new Error('Loader must implement addPlugin(pluginName, implementation).');
  }

  getOrCreateTemplateRegistryEntry(address) {
    return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
  }
};
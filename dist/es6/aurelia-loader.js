import 'core-js';
import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';

export class TemplateDependency {
  constructor(src: string, name?: string) {
    this.src = src;
    this.name = name;
  }
}

export class TemplateRegistryEntry {
  constructor(address: string) {
    this.address = address;
    this.template = null;
    this.dependencies = null;
    this.resources = null;
    this.factory = null;
  }

  get templateIsLoaded(): boolean {
    return this.template !== null;
  }

  get isReady(): boolean {
    return this.factory !== null;
  }

  setTemplate(template: Element): void {
    let address = this.address;
    let useResources;
    let current;
    let src;

    this.template = template;
    useResources = template.content.querySelectorAll('require');
    this.dependencies = new Array(useResources.length);

    if (useResources.length === 0) {
      return;
    }

    for (let i = 0, ii = useResources.length; i < ii; ++i) {
      current = useResources[i];
      src = current.getAttribute('from');

      if (!src) {
        throw new Error(`<require> element in ${address} has no "from" attribute.`);
      }

      this.dependencies[i] = new TemplateDependency(
        relativeToFile(src, address),
        current.getAttribute('as')
      );

      if (current.parentNode) {
        current.parentNode.removeChild(current);
      }
    }
  }

  addDependency(src: string|Function, name?: string): void {
    if (typeof src === 'string') {
      this.dependencies.push(new TemplateDependency(
        relativeToFile(src, this.address),
        name
      ));
    } else if (typeof src === 'function') {
      let origin = Origin.get(src);
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

/*eslint no-unused-vars:0*/
interface LoaderPlugin {
  fetch(address: string): Promise<any>;
}

export class Loader {
  constructor() {
    this.templateRegistry = {};
  }

  map(id: string, source: string): void {
    throw new Error('Loaders must implement map(id, source).');
  }

  normalizeSync(moduleId: string, relativeTo: string): string {
    throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
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

  applyPluginToUrl(url: string, pluginName: string): string {
    throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
  }

  addPlugin(pluginName: string, implementation: LoaderPlugin): void {
    throw new Error('Loader must implement addPlugin(pluginName, implementation).');
  }

  getOrCreateTemplateRegistryEntry(id: string): TemplateRegistryEntry {
    let entry = this.templateRegistry[id];

    if (entry === undefined) {
      this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
    }

    return entry;
  }
}

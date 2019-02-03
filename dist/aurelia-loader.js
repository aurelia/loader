import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';

/**
* Represents a dependency of a template.
*/
export class TemplateDependency {
  /**
  * The source of the dependency.
  */
  src: string;
  /**
  * The local name of the src when used in the template.
  */
  name: string;

  /**
  * Creates a template dependency.
  * @param src The source of the dependency.
  * @param name The local name of the src when used in the template.
  */
  constructor(src: string, name?: string) {
    this.src = src;
    this.name = name;
  }
}

/**
* Represents an entry in the template registry.
*/
export class TemplateRegistryEntry {
  /**
  * The address of the template that this entry represents.
  */
  address: string;

  /**
  * Indicates whether or not the associated template is loaded .
  */
  templateIsLoaded: boolean = false;

  /**
  * Indicates whether the factory is ready to be used to create instances of the associated template.
  */
  factoryIsReady: boolean = false;

  /**
  * Sets the resources associated with this entry.
  */
  resources: Object = null;

  /**
  * The dependencies of the associated template. Dependencies are not available until after the template is loaded.
  */
  dependencies: TemplateDependency[] = null;

  /**
  * Creates an instance of TemplateRegistryEntry.
  * @param address The address of the template that this entry represents.
  */
  constructor(address: string) {
    this.address = address;
    this.onReady = null;
    this._template = null;
    this._factory = null;
  }

  /**
  * Gets the template for this registry entry.
  */
  get template(): Element {
    return this._template;
  }

  /**
  * Sets the template for this registry entry.
  */
  set template(value: Element) {
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
        throw new Error(`<require> element in ${address} has no "from" attribute.`);
      }

      dependencies[i] = new TemplateDependency(
        relativeToFile(src, address),
        current.getAttribute('as')
      );

      if (current.parentNode) {
        current.parentNode.removeChild(current);
      }
    }
  }

  /**
  * Gets the factory capable of creating instances of this template.
  */
  get factory() {
    return this._factory;
  }

  /**
  * Sets the factory capable of creating instances of this template.
  */
  set factory(value) {
    this._factory = value;
    this.factoryIsReady = true;
  }

  /**
  * Adds a dependency to this template registry entry. Cannot be called until after the template is set.
  * @param src The dependency instance or a relative path to its module.
  * @param name An optional local name by which this dependency is used in the template.
  */
  addDependency(src: string|Function, name?: string): void {
    let finalSrc = typeof src === 'string'
      ? relativeToFile(src, this.address)
      : Origin.get(src).moduleId;

    this.dependencies.push(new TemplateDependency(finalSrc, name));
  }
}

/*eslint no-unused-vars:0*/
/**
* Represents a plugin to the module loader.
*/
interface LoaderPlugin {
  /**
  * Fetches the resource.
  * @param address The address of the resource.
  * @return A Promise for the requested resouce.
  */
  fetch(address: string): Promise<any>;
}

/**
* A generic resource loader, for loading modules, html, css and more.
*/
export class Loader {
  /**
  * Creates an instance of Loader.
  */
  constructor() {
    this.templateRegistry = {};
  }

  /**
  * Maps a module id to a source.
  * @param id The module id.
  * @param source The source to map the module to.
  */
  map(id: string, source: string): void {
    throw new Error('Loaders must implement map(id, source).');
  }

  /**
  * Normalizes a module id.
  * @param moduleId The module id to normalize.
  * @param relativeTo What the module id should be normalized relative to.
  * @return The normalized module id.
  */
  normalizeSync(moduleId: string, relativeTo: string): string {
    throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
  }

  /**
  * Normalizes a module id.
  * @param moduleId The module id to normalize.
  * @param relativeTo What the module id should be normalized relative to.
  * @return A promise for the normalized module id.
  */
  normalize(moduleId: string, relativeTo: string): Promise<string> {
    throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
  }

  /**
  * Loads a module.
  * @param id The module id to normalize.
  * @return A Promise for the loaded module.
  */
  loadModule(id: string): Promise<any> {
    throw new Error('Loaders must implement loadModule(id).');
  }

  /**
  * Loads a collection of modules.
  * @param ids The set of module ids to load.
  * @return A Promise for an array of loaded modules.
  */
  loadAllModules(ids: string[]): Promise<any[]> {
    throw new Error('Loader must implement loadAllModules(ids).');
  }

  /**
  * Loads a template.
  * @param url The url of the template to load.
  * @return A Promise for a TemplateRegistryEntry containing the template.
  */
  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    throw new Error('Loader must implement loadTemplate(url).');
  }

  /**
  * Loads a text-based resource.
  * @param url The url of the text file to load.
  * @return A Promise for text content.
  */
  loadText(url: string): Promise<string> {
    throw new Error('Loader must implement loadText(url).');
  }

  /**
  * Alters a module id so that it includes a plugin loader.
  * @param url The url of the module to load.
  * @param pluginName The plugin to apply to the module id.
  * @return The plugin-based module id.
  */
  applyPluginToUrl(url: string, pluginName: string): string {
    throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
  }

  /**
  * Registers a plugin with the loader.
  * @param pluginName The name of the plugin.
  * @param implementation The plugin implementation.
  */
  addPlugin(pluginName: string, implementation: LoaderPlugin): void {
    throw new Error('Loader must implement addPlugin(pluginName, implementation).');
  }

  /**
  * Gets or creates a TemplateRegistryEntry for the provided address.
  * @param address The address of the template.
  * @return The located or created TemplateRegistryEntry.
  */
  getOrCreateTemplateRegistryEntry(address: string): TemplateRegistryEntry {
    return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
  }
}

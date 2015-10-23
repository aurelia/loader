import 'core-js';
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
  * Creates an instance of TemplateRegistryEntry.
  * @param address The address of the template that this entry represents.
  */
  constructor(address: string) {
    this.address = address;
    this.template = null;
    this.dependencies = null;
    this.resources = null;
    this.factory = null;
  }

  /**
  * Indicates whether or not the associated template is loaded .
  */
  get templateIsLoaded(): boolean {
    return this.template !== null;
  }

  /**
  * Indicates whether the factory is ready to be used to create instances of the associated template.
  */
  get isReady(): boolean {
    return this.factory !== null;
  }

  /**
  * Sets the template for this registry entry.
  * @param template The template instance.
  */
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

  /**
  * Adds a dependency to this template registry entry.
  * @param src The dependency instance or a relative path to its module.
  * @param name An optional local name by which this dependency is used in the template.
  */
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

  /**
  * Sets the resources associated with this entry..
  * @param resources The view resources to associate with this entry.
  */
  setResources(resources): void {
    this.resources = resources;
  }

  /**
  * Sets the factory capable of creating instances of this template.
  * @param factory The factory to set for this entry.
  */
  setFactory(factory): void {
    this.factory = factory;
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
  * Gets or creates a TemplateRegistryEntry for the provided id.
  * @param id The id of the template registry entry.
  * @return The located or created TemplateRegistryEntry.
  */
  getOrCreateTemplateRegistryEntry(id: string): TemplateRegistryEntry {
    return this.templateRegistry[id] || (this.templateRegistry[id] = new TemplateRegistryEntry(id));
  }
}

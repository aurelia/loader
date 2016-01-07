/*eslint no-unused-vars:0*/
import {TemplateRegistryEntry} from './template-registry-entry';

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

/*eslint no-unused-vars:0*/
import * as core from 'core-js';
import { TemplateRegistryEntry } from './template-registry-entry';

interface LoaderPlugin {
  fetch(address: string): Promise<any>;
}

export class Loader {
  constructor() {
    this.templateRegistry = {};
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

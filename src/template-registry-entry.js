import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';
import {TemplateDependency} from './template-dependency';

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

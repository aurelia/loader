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

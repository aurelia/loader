import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';

export class TemplateDependency {
  constructor(src: string, name?: string){
    this.src = src;
    this.name = name;
  }
}

export class TemplateRegistryEntry {
  constructor(address: string){
    this.address = address;
    this.template = null;
    this.dependencies = null;
    this.resources = null;
    this.factory = null;
  }

  get templateIsLoaded(): boolean {
    return this.template !== null;
  }

  get isReady(): boolean{
    return this.factory !== null;
  }

  setTemplate(template: Element): void {
    var address = this.address,
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
        throw new Error(`<require> element in ${address} has no "from" attribute.`);
      }

      this.dependencies[i] = new TemplateDependency(
        relativeToFile(src, address),
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
        relativeToFile(src, this.address),
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

import {relativeToFile} from 'aurelia-path';

export class TemplateDependency {
  constructor(src, name){
    this.src = src;
    this.name = name;
  }
}

export class TemplateRegistryEntry {
  constructor(id){
    this.id = id;
    this.template = null;
    this.dependencies = null;
    this.resources = null;
    this.factory = null;
  }

  get templateIsLoaded(){
    return this.template !== null;
  }

  get isReady(){
    return this.factory !== null;
  }

  setTemplate(template){
    var id = this.id,
        useResources, i, ii, current, src;

    this.template = template;
    useResources = template.content.getElementsByTagName('require');
    this.dependencies = new Array(useResources.length);

    if(useResources.length === 0){
      return;
    }

    for(i = 0, ii = useResources.length; i < ii; ++i){
      current = useResources[i];
      src = current.getAttribute('from');

      if(!src){
        throw new Error(`<require> element in ${this.id} has no "from" attribute.`);
      }

      this.dependencies[i] = new TemplateDependency(
        relativeToFile(src, id),
        current.getAttribute('as')
      );

      if(current.parentNode){
        current.parentNode.removeChild(current);
      }
    }
  }

  setResources(resources){
    this.resources = resources;
  }

  setFactory(factory){
    this.factory = factory;
  }
}

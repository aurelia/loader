'use strict';

System.register(['aurelia-path', 'aurelia-metadata'], function (_export, _context) {
  "use strict";

  var relativeToFile, Origin, _createClass, TemplateDependency, TemplateRegistryEntry, Loader;

  

  return {
    setters: [function (_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }, function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('TemplateDependency', TemplateDependency = function TemplateDependency(src, name) {
        

        this.src = src;
        this.name = name;
      });

      _export('TemplateDependency', TemplateDependency);

      _export('TemplateRegistryEntry', TemplateRegistryEntry = function () {
        function TemplateRegistryEntry(address) {
          

          this.templateIsLoaded = false;
          this.factoryIsReady = false;
          this.resources = null;
          this.dependencies = null;

          this.address = address;
          this.onReady = null;
          this._template = null;
          this._factory = null;
        }

        TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
          var finalSrc = typeof src === 'string' ? relativeToFile(src, this.address) : Origin.get(src).moduleId;

          this.dependencies.push(new TemplateDependency(finalSrc, name));
        };

        _createClass(TemplateRegistryEntry, [{
          key: 'template',
          get: function get() {
            return this._template;
          },
          set: function set(value) {
            var address = this.address;
            var requires = void 0;
            var current = void 0;
            var src = void 0;
            var dependencies = void 0;

            this._template = value;
            this.templateIsLoaded = true;

            requires = value.content.querySelectorAll('require');
            dependencies = this.dependencies = new Array(requires.length);

            for (var i = 0, ii = requires.length; i < ii; ++i) {
              current = requires[i];
              src = current.getAttribute('from');

              if (!src) {
                throw new Error('<require> element in ' + address + ' has no "from" attribute.');
              }

              dependencies[i] = new TemplateDependency(relativeToFile(src, address), current.getAttribute('as'));

              if (current.parentNode) {
                current.parentNode.removeChild(current);
              }
            }
          }
        }, {
          key: 'factory',
          get: function get() {
            return this._factory;
          },
          set: function set(value) {
            this._factory = value;
            this.factoryIsReady = true;
          }
        }]);

        return TemplateRegistryEntry;
      }());

      _export('TemplateRegistryEntry', TemplateRegistryEntry);

      _export('Loader', Loader = function () {
        function Loader() {
          

          this.templateRegistry = {};
        }

        Loader.prototype.map = function map(id, source) {
          throw new Error('Loaders must implement map(id, source).');
        };

        Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
          throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
        };

        Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
          throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
        };

        Loader.prototype.loadModule = function loadModule(id) {
          throw new Error('Loaders must implement loadModule(id).');
        };

        Loader.prototype.loadAllModules = function loadAllModules(ids) {
          throw new Error('Loader must implement loadAllModules(ids).');
        };

        Loader.prototype.loadTemplate = function loadTemplate(url) {
          throw new Error('Loader must implement loadTemplate(url).');
        };

        Loader.prototype.loadText = function loadText(url) {
          throw new Error('Loader must implement loadText(url).');
        };

        Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
          throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
        };

        Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
          throw new Error('Loader must implement addPlugin(pluginName, implementation).');
        };

        Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
          return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
        };

        return Loader;
      }());

      _export('Loader', Loader);
    }
  };
});
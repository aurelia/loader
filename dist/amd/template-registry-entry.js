define(["exports", "aurelia-path"], function (exports, _aureliaPath) {
  "use strict";

  var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var relativeToFile = _aureliaPath.relativeToFile;

  var TemplateDependency = exports.TemplateDependency = function TemplateDependency(src, name) {
    _classCallCheck(this, TemplateDependency);

    this.src = src;
    this.name = name;
  };

  var TemplateRegistryEntry = exports.TemplateRegistryEntry = (function () {
    function TemplateRegistryEntry(id) {
      _classCallCheck(this, TemplateRegistryEntry);

      this.id = id;
      this.template = null;
      this.dependencies = null;
      this.resources = null;
      this.factory = null;
    }

    _prototypeProperties(TemplateRegistryEntry, null, {
      templateIsLoaded: {
        get: function () {
          return this.template !== null;
        },
        configurable: true
      },
      isReady: {
        get: function () {
          return this.factory !== null;
        },
        configurable: true
      },
      setTemplate: {
        value: function setTemplate(template) {
          var id = this.id,
              useResources,
              i,
              ii,
              current,
              src;

          this.template = template;
          useResources = template.content.querySelectorAll("require");
          this.dependencies = new Array(useResources.length);

          if (useResources.length === 0) {
            return;
          }

          for (i = 0, ii = useResources.length; i < ii; ++i) {
            current = useResources[i];
            src = current.getAttribute("from");

            if (!src) {
              throw new Error("<require> element in " + this.id + " has no \"from\" attribute.");
            }

            this.dependencies[i] = new TemplateDependency(relativeToFile(src, id), current.getAttribute("as"));

            if (current.parentNode) {
              current.parentNode.removeChild(current);
            }
          }
        },
        writable: true,
        configurable: true
      },
      setResources: {
        value: function setResources(resources) {
          this.resources = resources;
        },
        writable: true,
        configurable: true
      },
      setFactory: {
        value: function setFactory(factory) {
          this.factory = factory;
        },
        writable: true,
        configurable: true
      }
    });

    return TemplateRegistryEntry;
  })();

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
define(["exports", "./template-registry-entry"], function (exports, _templateRegistryEntry) {
  "use strict";

  var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var TemplateRegistryEntry = _templateRegistryEntry.TemplateRegistryEntry;

  var hasTemplateElement = ("content" in document.createElement("template"));

  function importElements(frag, link, callback) {
    document.head.appendChild(frag);

    if (window.Polymer && Polymer.whenReady) {
      Polymer.whenReady(callback);
    } else {
      link.addEventListener("load", callback);
    }
  }

  var Loader = exports.Loader = (function () {
    function Loader() {
      _classCallCheck(this, Loader);

      this.templateRegistry = {};
    }

    _prototypeProperties(Loader, null, {
      loadModule: {
        value: function loadModule(id) {
          throw new Error("Loaders must implement loadModule(id).");
        },
        writable: true,
        configurable: true
      },
      loadAllModules: {
        value: function loadAllModules(ids) {
          throw new Error("Loader must implement loadAllModules(ids).");
        },
        writable: true,
        configurable: true
      },
      loadTemplate: {
        value: function loadTemplate(url) {
          throw new Error("Loader must implement loadTemplate(url).");
        },
        writable: true,
        configurable: true
      },
      getOrCreateTemplateRegistryEntry: {
        value: function getOrCreateTemplateRegistryEntry(id) {
          var entry = this.templateRegistry[id];

          if (entry === undefined) {
            this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
          }

          return entry;
        },
        writable: true,
        configurable: true
      },
      importDocument: {
        value: function importDocument(url) {
          return new Promise(function (resolve, reject) {
            var frag = document.createDocumentFragment();
            var link = document.createElement("link");

            link.rel = "import";
            link.href = url;
            frag.appendChild(link);

            importElements(frag, link, function () {
              return resolve(link["import"]);
            });
          });
        },
        writable: true,
        configurable: true
      },
      importTemplate: {
        value: function importTemplate(url) {
          var _this = this;

          return this.importDocument(url).then(function (doc) {
            return _this.findTemplate(doc, url);
          });
        },
        writable: true,
        configurable: true
      },
      findTemplate: {
        value: function findTemplate(doc, url) {
          if (!hasTemplateElement) {
            HTMLTemplateElement.bootstrap(doc);
          }

          var template = doc.querySelector("template");

          if (!template) {
            throw new Error("There was no template element found in '" + url + "'.");
          }

          return template;
        },
        writable: true,
        configurable: true
      }
    });

    return Loader;
  })();

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
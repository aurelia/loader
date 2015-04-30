define(['exports', 'core-js', './template-registry-entry'], function (exports, _coreJs, _templateRegistryEntry) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  exports.__esModule = true;

  var _core = _interopRequire(_coreJs);

  var hasTemplateElement = ('content' in document.createElement('template'));

  function importElements(frag, link, callback) {
    document.head.appendChild(frag);

    if (window.Polymer && Polymer.whenReady) {
      Polymer.whenReady(callback);
    } else {
      link.addEventListener('load', callback);
    }
  }

  var Loader = (function () {
    function Loader() {
      _classCallCheck(this, Loader);

      this.templateRegistry = {};
    }

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

    Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(id) {
      var entry = this.templateRegistry[id];

      if (entry === undefined) {
        this.templateRegistry[id] = entry = new _templateRegistryEntry.TemplateRegistryEntry(id);
      }

      return entry;
    };

    Loader.prototype.importDocument = function importDocument(url) {
      return new Promise(function (resolve, reject) {
        var frag = document.createDocumentFragment();
        var link = document.createElement('link');

        link.rel = 'import';
        link.href = url;
        frag.appendChild(link);

        importElements(frag, link, function () {
          return resolve(link['import']);
        });
      });
    };

    Loader.prototype.importTemplate = function importTemplate(url) {
      var _this = this;

      return this.importDocument(url).then(function (doc) {
        return _this.findTemplate(doc, url);
      });
    };

    Loader.prototype.findTemplate = function findTemplate(doc, url) {
      if (!hasTemplateElement) {
        HTMLTemplateElement.bootstrap(doc);
      }

      var template = doc.getElementsByTagName('template')[0];

      if (!template) {
        throw new Error('There was no template element found in \'' + url + '\'.');
      }

      return template;
    };

    return Loader;
  })();

  exports.Loader = Loader;
});
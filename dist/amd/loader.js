define(['exports', 'core-js', './template-registry-entry'], function (exports, _coreJs, _templateRegistryEntry) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

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

    _createClass(Loader, [{
      key: 'loadModule',
      value: function loadModule(id) {
        throw new Error('Loaders must implement loadModule(id).');
      }
    }, {
      key: 'loadAllModules',
      value: function loadAllModules(ids) {
        throw new Error('Loader must implement loadAllModules(ids).');
      }
    }, {
      key: 'loadTemplate',
      value: function loadTemplate(url) {
        throw new Error('Loader must implement loadTemplate(url).');
      }
    }, {
      key: 'getOrCreateTemplateRegistryEntry',
      value: function getOrCreateTemplateRegistryEntry(id) {
        var entry = this.templateRegistry[id];

        if (entry === undefined) {
          this.templateRegistry[id] = entry = new _templateRegistryEntry.TemplateRegistryEntry(id);
        }

        return entry;
      }
    }, {
      key: 'importDocument',
      value: function importDocument(url) {
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
      }
    }, {
      key: 'importTemplate',
      value: function importTemplate(url) {
        var _this = this;

        return this.importDocument(url).then(function (doc) {
          return _this.findTemplate(doc, url);
        });
      }
    }, {
      key: 'findTemplate',
      value: function findTemplate(doc, url) {
        if (!hasTemplateElement) {
          HTMLTemplateElement.bootstrap(doc);
        }

        var template = doc.getElementsByTagName('template')[0];

        if (!template) {
          throw new Error('There was no template element found in \'' + url + '\'.');
        }

        return template;
      }
    }]);

    return Loader;
  })();

  exports.Loader = Loader;
});
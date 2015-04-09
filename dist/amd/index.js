define(['exports', './template-registry-entry', './loader'], function (exports, _templateRegistryEntry, _loader) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  Object.defineProperty(exports, 'TemplateRegistryEntry', {
    enumerable: true,
    get: function get() {
      return _templateRegistryEntry.TemplateRegistryEntry;
    }
  });
  Object.defineProperty(exports, 'TemplateDependency', {
    enumerable: true,
    get: function get() {
      return _templateRegistryEntry.TemplateDependency;
    }
  });
  Object.defineProperty(exports, 'Loader', {
    enumerable: true,
    get: function get() {
      return _loader.Loader;
    }
  });
});
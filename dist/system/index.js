System.register(['./template-registry-entry', './loader'], function (_export) {
  'use strict';

  return {
    setters: [function (_templateRegistryEntry) {
      _export('TemplateRegistryEntry', _templateRegistryEntry.TemplateRegistryEntry);

      _export('TemplateDependency', _templateRegistryEntry.TemplateDependency);
    }, function (_loader) {
      _export('Loader', _loader.Loader);
    }],
    execute: function () {}
  };
});
import {resetStubbedDependencies, stubDependency, TemplateRegistryEntry} from '../src/template-registry-entry';

describe('the template registry entry', () => {

  describe('stubDependency()', () => {

    it('prevents the matching dependency from being added to any registry entry', () => {
      stubDependency('my-module/my-sub-component');
      const template = document.createElement('template');
      template.innerHTML = `
        <require from='my-module/another-component'></require>
        <require from='my-module/my-sub-component'></require>
      `;
      const entry = new TemplateRegistryEntry('my-module/my-main-component.html');
      entry.template = template;
      expect(entry.dependencies.length).toBe(1);
      expect(entry.dependencies[0].src).toBe('my-module/another-component');

      entry.addDependency('my-module/my-sub-component');
      expect(entry.dependencies.length).toBe(1);
      entry.addDependency('my-module/yet-another-component');
      expect(entry.dependencies.length).toBe(2);
    });
  });

  describe('resetStubbedDependencies()', () => {

    it('resets the list of dependencies that should not be added to a registry entry', () => {
      stubDependency('my-module/my-sub-component');
      resetStubbedDependencies();
      const template = document.createElement('template');
      template.innerHTML = `
        <require from='my-module/another-component'></require>
        <require from='my-module/my-sub-component'></require>
      `;
      const entry = new TemplateRegistryEntry('my-module/my-main-component.html');
      entry.template = template;
      expect(entry.dependencies.length).toBe(2);
      expect(entry.dependencies[1].src).toBe('my-module/my-sub-component');
    });
  });
});

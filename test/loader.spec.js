import {Loader} from '../src/loader';


describe("the abstract loader", () => {

  describe("instance", () => {
    var loader;

    beforeEach(() => loader = new Loader());

    describe("abstract method", () => {
      it('loadModule() should throw when called', () => {
        expect(loader.loadModule).toThrow();
      });

      it('loadAllModules() should throw when called', () => {
        expect(loader.loadAllModules).toThrow();
      });

      it('loadTemplate() should throw when called', () => {
        expect(loader.loadTemplate).toThrow();
      });

      it('loadText() should throw when called', () => {
        expect(loader.loadText).toThrow();
      });

      it('applyPluginToUrl() should throw when called', () => {
        expect(loader.applyPluginToUrl).toThrow();
      });

      it('addPlugin() should throw when called', () => {
        expect(loader.addPlugin).toThrow();
      });
    });
  });
});

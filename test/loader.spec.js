import {Loader} from '../src/index';


describe("the abstract loader", () => {

  it("should throw when calling the create default", () => {
    expect(Loader.createDefaultLoader).toThrow();
  });

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
    });

    describe("implemented method", () => {

      afterEach(() => {
        var link = document.head.querySelector('link[rel="import"]');
        document.head.removeChild(link);
      });

      it("importDocument() should load a document fragment for a url", (done) => {
        loader.importDocument('base/test/fixtures/plainHtml.html')
          .then((imported) => expect(imported).toBeDefined())
          .catch((reason) => expect(false).toBeTruthy(reason))
          .then(done);
      });

      it("importTemplate() should extract a template", (done) => {
        loader.importTemplate('base/test/fixtures/template.html')
        .then((template) => expect(template.innerHTML).toBe("<h1>This is the template</h1>"))
        .catch((error) => expect(false).toBeTruthy(error))
        .then(done);
      });

      it("importTemplate() should fail if there is no template tag", (done) => {
        loader.importTemplate('base/test/fixtures/plainHtml.html')
          .then((template) => expect(false).toBeTruthy("This should have failed"))
          .catch((error) => expect(error).toBeDefined(error))
          .then(done);
      });
    });
  });
});

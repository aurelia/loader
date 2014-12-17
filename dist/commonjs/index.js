"use strict";

var hasTemplateElement = ("content" in document.createElement("template"));

function importElements(frag, link, callback) {
  document.head.appendChild(frag);

  if (window.Polymer && Polymer.whenReady) {
    Polymer.whenReady(callback);
  } else {
    link.addEventListener("load", callback);
  }
}

var Loader = (function () {
  var Loader = function Loader() {};

  Loader.createDefaultLoader = function () {
    throw new Error("No default loader module imported.");
  };

  Loader.prototype.loadModule = function (id) {
    throw new Error("Loaders must implement loadModule(id).");
  };

  Loader.prototype.loadAllModules = function (ids) {
    throw new Error("Loader must implement loadAllModules(ids).");
  };

  Loader.prototype.loadTemplate = function (url) {
    throw new Error("Loader must implement loadTemplate(url).");
  };

  Loader.prototype.importDocument = function (url) {
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
  };

  Loader.prototype.importTemplate = function (url) {
    var _this = this;
    return this.importDocument(url).then(function (doc) {
      return _this.findTemplate(doc, url);
    });
  };

  Loader.prototype.findTemplate = function (doc, url) {
    if (!hasTemplateElement) {
      HTMLTemplateElement.bootstrap(doc);
    }

    var template = doc.querySelector("template");

    if (!template) {
      throw new Error("There was no template element found in '" + url + "'.");
    }

    return template;
  };

  return Loader;
})();

exports.Loader = Loader;
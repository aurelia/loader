define(["exports", "aurelia-path"], function (exports, _aureliaPath) {
  "use strict";

  var normalize = _aureliaPath.normalize;


  var hasTemplateElement = ("content" in document.createElement("template"));

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
      var _this = this;
      return new Promise(function (resolve, reject) {
        url = normalize("./" + url, _this.getBaseUrl());

        _import(url, function (doc) {
          if (!hasTemplateElement) {
            HTMLTemplateElement.bootstrap(doc);
          }

          var template = doc.querySelector("template");
          resolve(template);
        });
      });
    };

    return Loader;
  })();

  exports.Loader = Loader;


  function importElements(frag, link, callback) {
    document.head.appendChild(frag);

    if (window.Polymer && Polymer.whenReady) {
      Polymer.whenReady(function () {
        return callback(link["import"]);
      });
    } else {
      link.addEventListener("load", function () {
        return callback(link["import"]);
      });
    }
  }

  function _import(url, callback) {
    var frag = document.createDocumentFragment();
    var link = document.createElement("link");

    link.rel = "import";
    link.href = url;
    frag.appendChild(link);

    importElements(frag, link, callback);
  }
});
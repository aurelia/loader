System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.decorators"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "aurelia-loader/*": "dist/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
    "aurelia-path": "github:aurelia/path@0.6.0",
    "babel": "npm:babel-core@5.1.13",
    "babel-runtime": "npm:babel-runtime@5.1.13",
    "core-js": "npm:core-js@0.9.5",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.1",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.5": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});


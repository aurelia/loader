System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "aurelia-loader/*": "dist/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
    "aurelia-path": "github:aurelia/path@0.4.6",
    "core-js": "npm:core-js@0.4.6",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.3",
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:core-js@0.4.6": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});


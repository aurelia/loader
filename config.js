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
    "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
    "aurelia-path": "github:aurelia/path@0.5.0",
    "core-js": "github:zloirock/core-js@0.8.1",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.3"
  }
});


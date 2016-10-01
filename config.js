System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*",
    "aurelia-loader/*": "dist/*.js",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "aurelia-metadata": "npm:aurelia-metadata@1.0.0",
    "aurelia-path": "npm:aurelia-path@1.1.1",
    "npm:aurelia-metadata@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    }
  }
});

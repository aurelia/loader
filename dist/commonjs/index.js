'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaLoader = require('./aurelia-loader');

Object.keys(_aureliaLoader).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaLoader[key];
    }
  });
});
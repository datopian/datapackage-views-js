"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataView", {
  enumerable: true,
  get: function get() {
    return _App.DataView;
  }
});

var _App = require("./App");

var _i18n = _interopRequireDefault(require("./i18n/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.DatapackageView = _App.DataView;

if (_i18n.default.options.resources) {
  console.log('Translations loaded');
}
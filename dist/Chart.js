"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _plotly = _interopRequireDefault(require("plotly.js-basic-dist"));

var _factory = _interopRequireDefault(require("react-plotly.js/factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(props) {
  var Plot = (0, _factory.default)(_plotly.default);
  return _react.default.createElement(Plot, {
    data: props.spec.data,
    layout: props.spec.layout,
    config: props.spec.config
  });
}
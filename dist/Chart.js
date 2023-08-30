"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _plotly = _interopRequireDefault(require("plotly.js-basic-dist"));

var _factory = _interopRequireDefault(require("react-plotly.js/factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _default(props) {
  var Plot = (0, _factory.default)(_plotly.default); // removes produced with plotly logo by default

  if (!props.spec.config || !props.spec.config.displaylogo) {
    props.spec.config = Object.assign(props.spec.config || {}, {
      displaylogo: false
    });
  }

  return _react.default.createElement(Plot, _extends({}, props.spec, {
    layout: {
      autosize: true,
      xaxis: {
        automargin: true
      },
      yaxis: {
        automargin: true,
        tickangle: -20
      }
    },
    style: {
      width: "100%",
      height: "100%"
    },
    useResizeHandler: "true"
  }));
}
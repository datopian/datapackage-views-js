"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataView = DataView;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

require("./App.css");

var _Table = _interopRequireDefault(require("./Table.js"));

var _Map = _interopRequireDefault(require("./Map.js"));

var _Document = _interopRequireDefault(require("./Document.js"));

var _Chart = _interopRequireDefault(require("./Chart.js"));

var _datapackageRender = require("datapackage-render");

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function DataView(props) {
  if (props.loading) {
    return _react.default.createElement("div", {
      className: "App"
    }, _react.default.createElement("div", {
      className: "container m-24"
    }, _react.default.createElement(_reactLoaderSpinner.default, {
      type: "Grid",
      color: "#D3D3D3",
      height: "50",
      width: "50"
    })));
  }

  var countViews = props.datapackage.views ? props.datapackage.views.length : 0;

  if (countViews === 0) {
    return _react.default.createElement("div", {
      className: "App"
    }, "No views available");
  }

  var _loop = function _loop(i) {
    var view = props.datapackage.views[i];

    if (!view.resources[0]._values && view.resources[0].data) {
      view.resources[0]._values = view.resources[0].data;
    }

    if (view.specType === 'table' && view.resources[0]._values) {
      var _handsOnTableToHandsO = (0, _datapackageRender.handsOnTableToHandsOnTable)(view),
          data = _handsOnTableToHandsO.data,
          options = _objectWithoutProperties(_handsOnTableToHandsO, ["data"]);

      return {
        v: _react.default.createElement("div", {
          className: "App"
        }, _react.default.createElement("div", {
          className: "container m-24"
        }, _react.default.createElement(_Table.default, {
          data: data,
          options: options,
          ref: function ref(table) {
            window["table".concat(view.id)] = table;
          }
        })))
      };
    } else if (view.specType === 'map' && view.resources[0]._values) {
      return {
        v: _react.default.createElement("div", {
          className: "App"
        }, _react.default.createElement("div", {
          className: "container m-24"
        }, _react.default.createElement(_Map.default, {
          data: view.resources[0]._values
        })))
      };
    } else if (view.specType === 'tabularmap' && view.resources[0]._values) {
      var geoData;

      try {
        geoData = (0, _utils.default)(view);
        return {
          v: _react.default.createElement("div", {
            className: "App"
          }, _react.default.createElement("div", {
            className: "container m-24"
          }, _react.default.createElement(_Map.default, {
            data: geoData
          })))
        };
      } catch (e) {
        return {
          v: _react.default.createElement("div", {
            className: e
          })
        };
      }
    } else if (view.specType === 'document') {
      return {
        v: _react.default.createElement("div", {
          className: "App"
        }, _react.default.createElement("div", {
          className: "container m-24"
        }, _react.default.createElement(_Document.default, {
          file: view.resources[0].path
        })))
      };
    } else if (view.specType === 'simple') {
      var plotlySpec;

      try {
        plotlySpec = (0, _datapackageRender.simpleToPlotly)(view);

        if (plotlySpec) {
          return {
            v: _react.default.createElement("div", {
              className: "App"
            }, _react.default.createElement("div", {
              className: "container m-24"
            }, _react.default.createElement(_Chart.default, {
              spec: plotlySpec
            })))
          };
        }
      } catch (e) {
        return {
          v: _react.default.createElement("div", {
            className: e
          })
        };
      }
    } else if (view.resources[0].unavailable) {
      return {
        v: _react.default.createElement("div", {
          className: "App"
        }, _react.default.createElement("div", {
          className: "container m-24"
        }, _react.default.createElement("p", null, "Data view unavailable."), _react.default.createElement("a", {
          href: view.resources[0].path,
          className: "text-primary font-bold"
        }, "Download the data.")))
      };
    }
  };

  for (var i = 0; i < countViews; i++) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }
}
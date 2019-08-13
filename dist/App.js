"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./App.css");

var _Table = _interopRequireDefault(require("./Table.js"));

var _Map = _interopRequireDefault(require("./Map.js"));

var _Document = _interopRequireDefault(require("./Document.js"));

var _datapackageRender = require("datapackage-render");

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function App(props) {
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

  for (var i = 0; i < countViews; i++) {
    var view = props.datapackage.views[i];

    var _data = view ? view.resources[0].data : null;

    if (view.specType === 'table' && _data) {
      var _ret = function () {
        var thisView = view || {}; // default to single table view

        if (thisView.resources) thisView.resources[0]._values = _data;

        var _handsOnTableToHandsO = (0, _datapackageRender.handsOnTableToHandsOnTable)(thisView),
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
              window["table".concat(thisView.id)] = table;
            }
          })))
        };
      }();

      if (_typeof(_ret) === "object") return _ret.v;
    } else if (view.specType === 'map' && _data && _data.type) {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("div", {
        className: "container m-24"
      }, _react.default.createElement(_Map.default, {
        featureCollection: _data
      })));
    } else if (view.specType === 'document') {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("div", {
        className: "container m-24"
      }, _react.default.createElement(_Document.default, {
        file: view.resources[0].path
      })));
    } else if (view.resources[0].unavailable) {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("div", {
        className: "container m-24"
      }, _react.default.createElement("p", null, "Data view unavailable."), _react.default.createElement("a", {
        href: view.resources[0].path,
        className: "text-primary font-bold"
      }, "Download the data.")));
    }
  }
}

var _default = App;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataView = DataView;

require("./i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactVega = _interopRequireDefault(require("react-vega"));

require("./index.css");

require("./App.css");

var _Table = _interopRequireDefault(require("./Table.js"));

var _Map = _interopRequireDefault(require("./Map.js"));

var _Document = _interopRequireDefault(require("./Document.js"));

var _Chart = _interopRequireDefault(require("./Chart.js"));

var _datapackageRender = require("datapackage-render");

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _utils = _interopRequireDefault(require("./utils"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DataView(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  if (props.loading) {
    return _react.default.createElement("div", {
      className: "App"
    }, _react.default.createElement(_reactLoaderSpinner.default, {
      type: "Grid",
      color: "#D3D3D3",
      height: "50",
      width: "50"
    }));
  }

  var countViews = props.datapackage.views ? props.datapackage.views.length : 0;

  if (countViews === 0) {
    return _react.default.createElement("div", {
      className: "App"
    }, t('No views available'));
  }

  for (var i = 0; i < countViews; i++) {
    var view = props.datapackage.views[i];

    if (!view.resources[0]._values && view.resources[0].data) {
      view.resources[0]._values = view.resources[0].data;
    }

    if (view.specType === 'table' && view.resources[0]._values) {
      var data = (0, _datapackageRender.getResourceCachedValues)(view.resources[0], true);
      var schema = view.resources[0].schema || {};
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_Table.default, {
        data: data,
        schema: schema
      }));
    } else if (view.specType === 'map' && view.resources[0]._values) {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_Map.default, {
        data: view.resources[0]._values
      }));
    } else if (view.specType === 'tabularmap' && view.resources[0]._values) {
      var geoData = void 0;

      try {
        geoData = (0, _utils.default)(view);
        return _react.default.createElement("div", {
          className: "App"
        }, _react.default.createElement(_Map.default, {
          data: geoData
        }));
      } catch (e) {
        return _react.default.createElement("div", {
          className: e
        });
      }
    } else if (view.specType === 'document') {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_Document.default, {
        file: view.resources[0].path
      }));
    } else if (view.specType === 'simple') {
      var plotlySpec = void 0;

      try {
        plotlySpec = (0, _datapackageRender.simpleToPlotly)(view);

        if (plotlySpec) {
          return _react.default.createElement("div", {
            className: "App"
          }, _react.default.createElement(_Chart.default, {
            spec: plotlySpec
          }));
        }
      } catch (e) {
        return _react.default.createElement("div", {
          className: e
        });
      }
    } else if (view.specType === 'plotly') {
      var _plotlySpec = void 0;

      try {
        _plotlySpec = (0, _datapackageRender.plotlyToPlotly)(view);

        if (_plotlySpec) {
          return _react.default.createElement("div", {
            className: "App"
          }, _react.default.createElement(_Chart.default, {
            spec: _plotlySpec
          }));
        }
      } catch (e) {
        return _react.default.createElement("div", {
          className: e
        });
      }
    } else if (view.specType === 'vega') {
      var vegaSpec = void 0;

      try {
        vegaSpec = (0, _datapackageRender.vegaToVega)(view);
        return _react.default.createElement(_reactVega.default, {
          spec: vegaSpec
        });
      } catch (e) {
        return _react.default.createElement("div", {
          className: e
        });
      }
    } else if (view.specType === 'web') {
      var src = view.page_url || view.resources[0].path;
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("iframe", {
        src: src,
        title: "Embedded content",
        width: "100%",
        height: "475px"
      }, t('Your browser doesn\'t support "iframe".')));
    } else if (view.resources[0].unavailable || view.specType === 'unsupported') {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("p", null, t('Data view unavailable.')), _react.default.createElement("a", {
        href: view.resources[0].path,
        className: "text-primary font-bold"
      }, t('Download the data.')));
    } else {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_reactLoaderSpinner.default, {
        type: "Grid",
        color: "#D3D3D3",
        height: "50",
        width: "50"
      }));
    }
  }
}
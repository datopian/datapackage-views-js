"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _reactLeaflet = require("react-leaflet");

require("./Map.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Following is the fix for invalid leaflet assets. Please, check this issue
// for details - https://github.com/Leaflet/Leaflet/issues/4968
delete _leaflet.default.Icon.Default.prototype._getIconUrl;

_leaflet.default.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function _default(props) {
  var geojson = _leaflet.default.geoJSON(props.featureCollection); // If running in JSDOM, we need to avoid using 'bounds' property of leaflet
  // which causes the tests to crash.


  if (process.env.JEST_WORKER_ID) {
    return _react.default.createElement(_reactLeaflet.Map, {
      zoom: 10,
      style: {
        width: '100%',
        height: 450
      }
    }, _react.default.createElement(_reactLeaflet.TileLayer, {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), _react.default.createElement(_reactLeaflet.GeoJSON, {
      data: props.featureCollection,
      onEachFeature: onEachFeature
    }));
  } // Find the bound of the geojson returnup LatLngBounds


  var bounds = geojson.getBounds();
  return _react.default.createElement(_reactLeaflet.Map, {
    bounds: bounds,
    style: {
      width: '100%',
      height: 450
    }
  }, _react.default.createElement(_reactLeaflet.TileLayer, {
    attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), _react.default.createElement(_reactLeaflet.GeoJSON, {
    data: props.featureCollection,
    onEachFeature: onEachFeature
  }));
}

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
}
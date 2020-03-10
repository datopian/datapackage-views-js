"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getLonLat(row, fields) {
  return fields.map(function (field, i) {
    // strip trailing non-numeric characters such as deg, n, ...
    var numeric = row[field].toString().match(/[-+]?[0-9]*\.?[0-9]*/);

    if (numeric) {
      // now match valid lon or lat
      var val = numeric[0].toString().match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$|^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+))$/);

      if (val) {
        if (isNaN(val[0])) throw 'Invalid lon/lat values';
        return val[0];
      } else {
        throw "Invalid lon/lat values";
      }
    } else {
      throw "Invalid lon/lat values";
    }
  });
}

function tableToGeoData(view) {
  view.spec = view.spec || {};
  view.resources[0].schema = view.resources[0].schema || {
    fields: [] // Return object template:

  };
  var geoData = {
    type: 'FeatureCollection',
    features: []
  };

  if (view.resources[0]._values) {
    view.resources[0]._values.forEach(function (data) {
      var feature; // If geometry field exists, parse and use it:

      var geometryFieldNames = ['geojson', 'geom', 'the_geom', 'geometry', 'spatial', 'geo', 'lonlat'];
      var geometryField = view.resources[0].schema.fields.find(function (field) {
        return geometryFieldNames.includes(field.name.toLowerCase());
      });

      if (geometryField) {
        feature = getGeometryFromRecord(data[geometryField.name]);
      } else {
        // Add features based on spec:
        feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: []
          },
          properties: {
            name: ''
          } // If lon and lat fields provided, just use it:

        };

        if (view.spec.lonField && view.spec.latField) {
          try {
            feature.geometry.coordinates = getLonLat(data, [view.spec.lonField, view.spec.latField]);
          } catch (e) {
            // warn and skip this row if invalid
            console.warn(e);
            return;
          }
        } else {
          // Identify geopoint field based on tableschema
          var geopointField = view.resources[0].schema.fields.find(function (field) {
            return field.type === 'geopoint';
          });

          if (geopointField) {
            // geopoint field is given in tableschema
            if (geopointField.format === 'default') {
              // Value is a comma separated string, eg, "lon, lat"
              feature.geometry.coordinates = data[geopointField.name].split(',').map(function (item) {
                return item.trim();
              });
            } else if (geopointField.format === 'array') {
              feature.geometry.coordinates = data[geopointField.name];
            } else if (geopointField.format === 'object') {
              feature.geometry.coordinates = [data[geopointField.name]['lon'], data[geopointField.name]['lat']];
            } else {
              console.log('no format is provided for geometry field.');
            }
          } else {
            // now check for default fields
            var latitudeFieldNames = ['lat', 'latitude'];
            var longitudeFieldNames = ['lon', 'longitude'];
            var latField = view.resources[0].schema.fields.find(function (field) {
              return latitudeFieldNames.includes(field.name.toLowerCase());
            });
            var lonField = view.resources[0].schema.fields.find(function (field) {
              return longitudeFieldNames.includes(field.name.toLowerCase());
            });

            if (latField && lonField) {
              feature.geometry.coordinates = [data[lonField.name], data[latField.name]];
            } else {
              // No geodata found:
              throw 'No geo data found';
            }
          }
        }

        if (view.spec.infobox) {
          feature.properties.name = eval('`' + view.spec.infobox + '`');
        }
      }

      geoData.features.push(feature);
    });
  }

  if (geoData.features.length === 0) throw "No geodata on resource";
  return geoData;
}

function getGeometryFromRecord(value) {
  if (typeof value === 'string') {
    // We *may* have a GeoJSON string representation
    try {
      value = JSON.parse(value);
    } catch (e) {}
  }

  if (typeof value === 'string') {
    value = value.replace('(', '').replace(')', '');
    var parts = value.split(',');
    var lat = parseCoordinateString(parts[0]);
    var lon = parseCoordinateString(parts[1]);

    if (!isNaN(lon) && !isNaN(parseFloat(lat))) {
      return {
        "type": "Point",
        "coordinates": [lon, lat]
      };
    } else {
      return null;
    }
  } else if (value && value.constructor.name === 'Array') {
    // [ lon, lat ]
    return {
      "type": "Point",
      "coordinates": [value[0], value[1]]
    };
  } else if (value && value.lat) {
    // of form { lat: ..., lon: ...}
    return {
      "type": "Point",
      "coordinates": [value.lon || value.lng, value.lat]
    };
  } // We o/w assume that contents of the field are a valid GeoJSON object


  return value;
}

function parseCoordinateString(coord) {
  if (typeof coord != 'string') {
    return parseFloat(coord);
  }

  var dms = coord.split(/[^-?\.\d\w]+/);
  var deg = 0;
  var m = 0;
  var toDeg = [1, 60, 3600]; // conversion factors for Deg, min, sec

  var i;

  for (i = 0; i < dms.length; ++i) {
    if (isNaN(parseFloat(dms[i]))) {
      continue;
    }

    deg += parseFloat(dms[i]) / toDeg[m];
    m += 1;
  }

  if (coord.match(/[SW]/)) {
    deg = -1 * deg;
  }

  return deg;
}

var _default = tableToGeoData;
exports.default = _default;
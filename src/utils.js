function tableToGeoData(view) {
  view.spec = view.spec || {}
  // Return object template:
  const geoData = {
    type: 'FeatureCollection',
    features: []
  }

  if (view.resources[0]._values) {
    view.resources[0]._values.forEach(data => {
      let feature
      // If geometry field exists, parse and use it:
      const geometryFieldNames = ['geojson', 'geom','the_geom','geometry','spatial','location', 'geo', 'lonlat']
      const geometryField = view.resources[0].schema.fields.find(field => {
        return geometryFieldNames.includes(field.name)
      })
      if (geometryField) {
        feature = getGeometryFromRecord(data[geometryField.name])
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
          }
        }
        // If lon and lat fields provided, just use it:
        if (view.spec.lonField && view.spec.latField) {
          feature.geometry.coordinates = [data[view.spec.lonField], data[view.spec.latField]]
        } else {
          // Identify geopoint field based on tableschema
          const geopointField = view.resources[0].schema.fields.find(field => {
            return field.type === 'geopoint'
          })
          if (geopointField) { // geopoint field is given in tableschema
            if (geopointField.format === 'default') {
              // Value is a comma separated string, eg, "lon, lat"
              feature.geometry.coordinates = data[geopointField.name]
                .split(',')
                .map(item => item.trim())
            } else if (geopointField.format === 'array') {
              feature.geometry.coordinates = data[geopointField.name]
            } else if (geopointField.format === 'object') {
              feature.geometry.coordinates = [
                data[geopointField.name]['lon'],
                data[geopointField.name]['lat']
              ]
            }
          } else { // now check for default fields
            const latitudeFieldNames = ['lat','latitude']
            const longitudeFieldNames = ['lon','longitude']
            const latField = view.resources[0].schema.fields.find(field => {
              return latitudeFieldNames.includes(field.name)
            })
            const lonField = view.resources[0].schema.fields.find(field => {
              return longitudeFieldNames.includes(field.name)
            })
            if (latField && lonField) {
              feature.geometry.coordinates = [data[lonField.name], data[latField.name]]
            } else {
              // No geodata found:
              throw 'No geo data found'
            }
          }
        }
        if (view.spec.infobox) {
          feature.properties.name = eval('`' + view.spec.infobox + '`')
        }
      }

      geoData.features.push(feature)
    })
  }

  return geoData
}

function getGeometryFromRecord(value) {
  if (typeof(value) === 'string'){
    // We *may* have a GeoJSON string representation
    try {
      value = JSON.parse(value);
    } catch(e) {}
  }
  if (typeof(value) === 'string') {
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
  }
  // We o/w assume that contents of the field are a valid GeoJSON object
  return value;
}

function parseCoordinateString(coord){
  if (typeof(coord) != 'string') {
    return(parseFloat(coord));
  }
  var dms = coord.split(/[^-?\.\d\w]+/);
  var deg = 0; var m = 0;
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
        deg = -1*deg;
  }
  return(deg);
}


export default tableToGeoData;

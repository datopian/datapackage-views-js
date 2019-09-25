import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import "./Map.css"


// Following is the fix for invalid leaflet assets. Please, check this issue
// for details - https://github.com/Leaflet/Leaflet/issues/4968
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default function(props) {
  const geojson = L.geoJSON(props.data)
  // Find the bound of the geojson return LatLngBounds
  const bounds = geojson.getBounds()
  // If single feature is given we just set center and zoom properties.
  // Or if running in JSDOM, we need to avoid using 'bounds' property of leaflet
  // which causes the tests to crash.
  if (!props.data.features || props.data.features.length < 2 || process.env.JEST_WORKER_ID) {
    // Find the center of the LatLngBounds returns LatLng
    let center = bounds.getCenter()
    center = [center.lat, center.lng]
    return (
      <Map center={center} zoom={10} style={{width: '100%', height: 450}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <GeoJSON
        data={props.data}
        onEachFeature={onEachFeature} />
      </Map>
    )
  }

  return (
    <Map bounds={bounds} style={{width: '100%', height: 450}}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <GeoJSON
      data={props.data}
      onEachFeature={onEachFeature} />
    </Map>
  )
}


function onEachFeature(feature, layer) {
  if (feature.properties) {
    let popup = '<table class="border-solid border border-gray-500">'
    Object.keys(feature.properties).forEach(key => {
      popup += `<tr><td>${key}</td><td>${feature.properties[key]}</td></tr>`
    })
    layer.bindPopup(popup + '</table>')
  }
}

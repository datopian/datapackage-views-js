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
  const geojson = L.geoJSON(props.featureCollection)
  // Find the bound of the geojson returnup LatLngBounds
  const bounds = geojson.getBounds()
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
      data={props.featureCollection}
      onEachFeature={onEachFeature} />
    </Map>
  )
}

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
}

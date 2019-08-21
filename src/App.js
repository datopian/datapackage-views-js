import React from "react"
import "./App.css"
import Table from "./Table.js"
import Map from './Map.js'
import PdfViewer from './Document.js'
import Chart from './Chart.js'
import {handsOnTableToHandsOnTable, simpleToPlotly} from 'datapackage-render'
import Loader from 'react-loader-spinner'

function App(props) {
  if (props.loading) {
    return (
      <div className="App">
        <div className="container m-24">
          <Loader
             type="Grid"
             color="#D3D3D3"
             height="50"
             width="50"
          />
        </div>
      </div>
    )
  }
  const countViews = props.datapackage.views ? props.datapackage.views.length : 0
  if (countViews === 0) {
    return (<div className="App">No views available</div>)
  }
  for (let i = 0; i < countViews; i++) {
    const view = props.datapackage.views[i]
    if (!view.resources[0]._values && view.resources[0].data) {
      view.resources[0]._values = view.resources[0].data
    }
    if (view.specType === 'table' && view.resources[0]._values) {
      let {data, ...options} = handsOnTableToHandsOnTable(view)
      return (
        <div className="App">
          <div className="container m-24">
            <Table data={data} options={options} ref={(table) => {window[`table${view.id}`] = table}} />
          </div>
        </div>
      )
    } else if (view.specType === 'map' && view.resources[0]._values) {
      return (
        <div className="App">
          <div className="container m-24">
            <Map featureCollection={view.resources[0]._values} />
          </div>
        </div>
      )
    } else if (view.specType === 'tabularmap' && view.resources[0]._values) {
      const geoData = tableToGeoData(view)
      return (
        <div className="App">
          <div className="container m-24">
            <Map featureCollection={geoData} />
          </div>
        </div>
      )
    } else if (view.specType === 'document') {
      return (
        <div className="App">
          <div className="container m-24">
            <PdfViewer file={view.resources[0].path} />
          </div>
        </div>
      )
    } else if (view.specType === 'simple') {
      let plotlySpec = simpleToPlotly(view)
      if (plotlySpec) {
        return (
          <div className="App">
            <div className="container m-24">
              <Chart spec={plotlySpec} />
            </div>
          </div>
        )
      }
    } else if (view.resources[0].unavailable) {
      return (
        <div className="App">
          <div className="container m-24">
            <p>Data view unavailable.</p>
            <a href={view.resources[0].path} className="text-primary font-bold">Download the data.</a>
          </div>
        </div>
      )
    }
  }
}

function tableToGeoData(view) {
  // Return object template:
  const geoData = {
    type: 'FeatureCollection',
    features: []
  }
  // Add features based on spec:
  if (view.resources[0]._values) {
    view.resources[0]._values.forEach(data => {
      const feature = {
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
      }
      if (view.spec.infobox) {
        feature.properties.name = eval('`' + view.spec.infobox + '`')
      }
      geoData.features.push(feature)
    })
  }
  return geoData
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import * as dpRender from 'datapackage-render'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const { Dataset } = require("data.js")
const toArray = require("stream-to-array")

const instances = document.getElementsByClassName('react-me-datapackage-views')
function parseDatapackageIdentifier(stringOrJSON) {
  try {
    return JSON.parse(stringOrJSON)
  } catch (e) {
    return stringOrJSON
  }
}

for (const instance of instances) {
  const DP_ID = parseDatapackageIdentifier(instance.getAttribute('data-datapackage-json'))

  // Load Dataset object
  Dataset.load(DP_ID).then(async (dataset) => {
    const tabularFormats = ['csv', 'tsv', 'dsv', 'xls', 'xlsx']
    // TODO: support local files
    // Data fetcher
    dataset.resources.forEach(async (file) => {
      // Datastore, e.g., when a path is a 'datastore_search' API
      if (file.descriptor.path && file.descriptor.path.includes('datastore_search')) {
        const response = await fetch(file.descriptor.path)
        if (!response.ok) {
          file.descriptor.unavailable = true
          return
        }
        const result = await response.json()
        file.descriptor.data = result.result.records
      } else if (file.displayName === "FileRemote" && tabularFormats.includes(file.descriptor.format)) {
        // Tabular data
        try {
          const rowStream = await file.rows({size: 100, keyed: true})
          const data = await toArray(rowStream)
          if (data.length > 0) {
            file.descriptor.data = data // This makes it FileInline
          } else {
            file.descriptor.unavailable = true
          }
        } catch (e) {
          console.log(e)
          file.descriptor.unavailable = true
        }
      } else if (file.descriptor.format.toLowerCase().includes('json')) {
        // Geographical data
        const response = await fetch(file.descriptor.path)
        if (!response.ok) {
          file.descriptor.unavailable = true
          return
        }
        const result = await response.json()
        // The '.json' files can contain geo data - check by its 'type' property
        const geoJsonTypes = [
          'Feature', 'FeatureCollection', 'Point', 'MultiPoint', 'LineString',
          'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'
        ]
        if (geoJsonTypes.includes(result.type)) {
          file.descriptor.data = result
        } else {
          // It isn't a valid GeoJSON
          file.descriptor.unavailable = true
          return
        }
      } else if (file.descriptor.format.toLowerCase() === 'pdf') {
        return
      } else {
        // We can't load any other data types for now.
        file.descriptor.unavailable = true
      }

      // Compile views and render App. Calling this here so components are
      // re-rendered after each loop so users can see a preview as soon as
      // it's available. Useful when you have lots of views to render.
      render(dataset.descriptor)
    })

    // Compile views and render App
    render(dataset.descriptor)
  })
}

function render(descriptor) {
  // Compile views and render App
  descriptor.views.forEach(view => {
    const compiledView = dpRender.compileView(view, descriptor)
    ReactDOM.render(
      <App view={compiledView} />,
      document.getElementById(`datapackage-view-${view.id}`)
    )
  })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

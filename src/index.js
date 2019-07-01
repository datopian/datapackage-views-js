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
    // Convert remote file into inline file
    dataset.resources.forEach(async (file) => {
      // Handle datastore resource, e.g., when a path is a 'datastore_search' API
      if (file.descriptor.path && file.descriptor.path.includes('datastore_search')) {
        const response = await fetch(file.descriptor.path)
        if (!response.ok) {
          file.descriptor.unavailable = true
          return
        }
        const result = await response.json()
        file.descriptor.data = result.result.records
      } else if (file.displayName === "FileRemote" && tabularFormats.includes(file.descriptor.format)) {
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
      } else {
        // TODO: we can't load any other data types for now. We want to include
        // support for GeoJSON and PDF.
        file.descriptor.unavailable = true
      }

      // Compile views and render App
      dataset.descriptor.views.forEach(view => {
        const compiledView = dpRender.compileView(view, dataset.descriptor)
        ReactDOM.render(
          <App view={compiledView} />,
          document.getElementById(`datapackage-view-${view.id}`)
        )
      })
    })
  })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

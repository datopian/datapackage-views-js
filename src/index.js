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
    // TODO: support local files
    // Convert remote file into inline file
    await Promise.all(dataset.resources.map(async (file) => {
      if (file.displayName === "FileRemote") {
        const rowStream = await file.rows({size: 100, keyed: true})
        const data = await toArray(rowStream)
        file.descriptor.data = data // This makes it FileInline
      }
    }))

    // Compile views and render App
    dataset.descriptor.views.forEach(view => {
      const compiledView = dpRender.compileView(view, dataset.descriptor)
      ReactDOM.render(
        <App view={compiledView} />,
        document.getElementById(`datapackage-view-${view.id}`)
      )
    })
  })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

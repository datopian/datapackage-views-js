import React from 'react';
import ReactDOM from 'react-dom';
import * as dpRender from 'datapackage-render'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const { Dataset } = require("data.js")
const toArray = require("stream-to-array")

// Read DP_ID from global scope
const DP_ID = {
  "description": "Country, regional and world GDP.",
  "name": "gdp",
  "title": "Country, Regional and World GDP (Gross Domestic Product)",
  "resources": [
    {
      "name": "gdp",
      "path": "https://pkgstore.datahub.io/core/gdp/gdp_csv/data/0048bc8f6228d0393d41cac4b663b90f/gdp_csv.csv",
      "schema": {
        "fields": [
          {
            "name": "Country Name",
            "type": "string"
          },
          {
            "name": "Country Code",
            "type": "string"
          },
          {
            "name": "Year",
            "type": "year"
          },
          {
            "description": "GDP in current USD",
            "name": "Value",
            "type": "number"
          }
        ]
      }
    }
  ],
  "views": [
    {
      "elementId": "root",
      "title": "GDP",
      "resources": ["gdp"],
      "specType": "table"
    }
  ]
}
// Load Dataset object
Dataset.load(DP_ID).then(async (dataset) => {
  // TODO: support local files
  // Convert remote file into inline file
  await Promise.all(dataset.resources.map(async (file) => {
    if (file.displayName === "FileRemote") {
      const rowStream = await file.rows({size: 20})
      const data = await toArray(rowStream)
      file.descriptor.data = data // This makes it FileInline
    }
  }))

  // Compile views and render App
  dataset.descriptor.views.forEach(view => {
    const compiledView = dpRender.compileView(view, dataset.descriptor)
    ReactDOM.render(
      <App view={compiledView} />,
      document.getElementById(compiledView.elementId)
    );
  })

})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

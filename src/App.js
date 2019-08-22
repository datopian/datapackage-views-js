import React from "react"
import "./App.css"
import Table from "./Table.js"
import Map from './Map.js'
import PdfViewer from './Document.js'
import Chart from './Chart.js'
import {handsOnTableToHandsOnTable, simpleToPlotly} from 'datapackage-render'
import Loader from 'react-loader-spinner'
import tableToGeoData from './utils'

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
      let geoData
      try {
        geoData = tableToGeoData(view)
      } catch(e) {
        if (e.toString() === 'No geo data found') {
          return (<div className="no-geo-data"></div>)
        } else {
          throw e
        }
      }
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

export default App

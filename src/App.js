import React from "react"
import "./App.css"
import Table from "./Table.js"
import Map from './Map.js'
import PdfViewer from './Document.js'
import {handsOnTableToHandsOnTable} from 'datapackage-render'
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
    let _data = view ? view.resources[0].data : null
    if (view.specType === 'table' && _data) {
      let thisView = view || {} // default to single table view
      if (thisView.resources) thisView.resources[0]._values =  _data
      let {data, ...options} = handsOnTableToHandsOnTable(thisView)
      return (
        <div className="App">
          <div className="container m-24">
            <Table data={data} options={options} ref={(table) => {window[`table${thisView.id}`] = table}} />
          </div>
        </div>
      )
    } else if (view.specType === 'map' && _data && _data.type) {
      return (
        <div className="App">
          <div className="container m-24">
            <Map featureCollection={_data} />
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

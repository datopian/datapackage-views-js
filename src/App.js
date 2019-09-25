import React from "react"
import "./App.css"
import Table from "./Table.js"
import Map from './Map.js'
import PdfViewer from './Document.js'
import {handsOnTableToHandsOnTable} from 'datapackage-render'
import Loader from 'react-loader-spinner'

function App(props) {
  let _data = props.view ? props.view.resources[0].data : null

  if (props.view.specType === 'table' && _data) {
    let view = props.view || {} // default to single table view
    if (view.resources) view.resources[0]._values =  _data
    let {data, ...options} = handsOnTableToHandsOnTable(view)
    return (
      <div className="App">
        <div className="container m-24">
          <Table data={data} options={options} ref={(table) => {window[`table${view.id}`] = table}} />
        </div>
      </div>
    )
  } else if (props.view.specType === 'map' && _data && _data.type) {
    return (
      <div className="App">
        <div className="container m-24">
          <Map data={_data} />
        </div>
      </div>
    )
  } else if (props.view.specType === 'document') {
    return (
      <div className="App">
        <div className="container m-24">
          <PdfViewer file={props.view.resources[0].path} />
        </div>
      </div>
    )
  } else if (props.view.resources[0].unavailable) {
    return (
      <div className="App">
        <div className="container m-24">
          <p>{props.view.resources[0].errorMessage || 'Data view unavailable.'}</p>
          <a href={props.view.resources[0].downloadPath || props.view.resources[0].path} className="text-primary font-bold">Download the data.</a>
        </div>
      </div>
    )
  } else {
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
}

export default App

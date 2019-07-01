import React from "react"
import "./App.css"
import Table from "./Table.js"
import {handsOnTableToHandsOnTable} from 'datapackage-render'

function App(props) {
  let _data = props.view ? props.view.resources[0].data : []
  if (_data && _data.length > 0) {
    let view = props.view || {} // default to single table view
    if (view.resources) view.resources[0]._values =  _data
    let {data, ...options} = handsOnTableToHandsOnTable(view)
    let renderedView = <p>Data view unavailable</p>

    if (view.specType === "table") {
      renderedView = <Table data={data} options={options} />
    }

    return (
      <div className="App">
        <div className="container m-24">{renderedView}</div>
      </div>
    )
  } else if (props.view.resources[0].unavailable) {
    return (
      <div className="App">
        <div className="container m-24">
          <p>Data view unavailable.</p>
          <a href={props.view.resources[0].path}>Download the data.</a>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div className="container m-24"><p>Data view is loading</p></div>
      </div>
    )
  }
}

export default App

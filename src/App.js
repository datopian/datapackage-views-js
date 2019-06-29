import React from "react"
import "./App.css"
import Table from "./Table.js"
import {handsOnTableToHandsOnTable} from 'datapackage-render'

function App(props) {
  let _data = props.view ? props.view.resources[0].data : []
  let view = props.view || {} // default to single table view
  if (view.resources) view.resources[0]._values =  _data
  let {data, ...options} = handsOnTableToHandsOnTable(view)
  let renderedView = <p>Data view unavailable</p>

  if (view.specType === "table" || !view.specType) {
    renderedView = <Table data={data} options={options} />
  }

  return (
    <div className="App">
      <div className="container m-24">{renderedView}</div>
    </div>
  )
}

export default App

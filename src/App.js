import React from "react"
import "./App.css"
import Table from "./Table.js"

async function App(props) {
  let data = props.view ? props.view.resources[0].data : []
  let view = props.view || {} // default to single table view

  let renderedView = <p>Data view unavailable</p>
  if (view.specType === "table" || !view.specType) {
    renderedView = <Table data={data} />
  }

  return (
    <div className="App">
      <header className="h-6 bg-gray-300">
        <h1>Datapackage Views</h1>
      </header>
      <div className="container m-24">{renderedView}</div>
    </div>
  )
}

export default App

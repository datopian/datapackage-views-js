import React from "react"
import "./App.css"
import Table from "./Table.js"

function App(props) {
  let data
  let views = [{}] // default to single table view

  // @@TODO encapsulate / clean up datapackage validation
  try {
    data = props.datapackage._descriptor.data
  } catch (e) {
    data = {}
    console.warn("datapackage.json does not include data or is not valid", e)
  }

  try {
    const confViews = props.datapackage._descriptor.views
    views = confViews ? confViews : [{}]
  } catch (e) {
    console.log("No views found in datapackage descriptor")
  }

  console.log(views)

  const renderedViews = views.map((view, i) => {
    console.log("VUEW", view)
    if (view.type === "table" || !view.type) {
      return <Table data={data} key={i} />
    }
    return <p>Data view unavailable</p>
  })

  return (
    <div className="App">
      <header className="h-6 bg-gray-300">
        <h1>Datapackage Views</h1>
      </header>
      <div className="container m-24">{renderedViews}</div>
    </div>
  )
}

export default App

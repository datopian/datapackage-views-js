import React from "react"
import { HotTable } from "@handsontable/react"
import "./Table.css"

export default function(props) {
  const settings = Object.assign({}, props.options, {
    licenseKey: "non-commercial-and-evaluation"
  })
  return <HotTable data={props.data} height="300" settings={settings} />
}

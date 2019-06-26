import React from "react"
import { HotTable } from "@handsontable/react"

export default function(props) {
  const settings = {
    licenseKey: "non-commercial-and-evaluation"
  }
  return <HotTable data={props.data} width="600" height="300" settings={settings} />
}

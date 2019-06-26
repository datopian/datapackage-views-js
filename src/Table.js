import React from "react"
import { HotTable } from "@handsontable/react"

export default function(props) {
  let data

  try {
    data = props.datapackage._descriptor.data
  } catch (e) {
    data = {}
    console.warn("datapackage.json does not include data or is not valid", e)
  }

  const settings = {
    licenseKey: "non-commercial-and-evaluation"
  }
  return <HotTable data={data} width="600" height="300" settings={settings} />
}

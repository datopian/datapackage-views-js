import React from "react"
import { HotTable } from "@handsontable/react"
import { CSVLink } from "react-csv"
import "./Table.css"


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      settings: Object.assign({}, this.props.options, {
        licenseKey: "non-commercial-and-evaluation"
      })
    };
  }

  updateData = (newData) => {
    this.setState({
      data: newData
    })
  }

  addSettings = (settings) => {
    this.setState({
      settings: Object.assign({}, this.state.settings, settings)
    })
  }

  downloadJson = () => {
    let data = this.state.data
    // If rows are arrays, we want to convert to objects:
    if (data && Array.isArray(data[0])) {
      const headers = this.state.settings.colHeaders
      data = data.map(function(x) {
        const row = {}
        headers.forEach((header, i) => {
          row[header] = x[i]
        })
        return row
      })
    }
    data = JSON.stringify(data, null, 2)
    const blob = new Blob([data], {type:'application/json'})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${this.state.settings.viewTitle}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  render() {
    return (
      <div>
        <div className="downloadables">
          <CSVLink
            data={this.state.data}
            headers={this.state.settings.colHeaders}
            filename={`${this.state.settings.viewTitle}.csv`}
            className="btn btn-primary"
            target="_blank"
          >
            CSV (Excel)
          </CSVLink>
          <button onClick={this.downloadJson} className="btn btn-primary">JSON</button>
        </div>

        <HotTable data={this.state.data} width="100%" height="300" settings={this.state.settings} />
      </div>
    )
  }
}

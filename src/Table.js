import React from "react"
import { HotTable } from "@handsontable/react"
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

  render() {
    return <HotTable data={this.state.data} width="100%" height="300" settings={this.state.settings} />
  }
}

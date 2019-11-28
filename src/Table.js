import React from "react"
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import { CSVLink } from "react-csv"


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      schema: Object.assign({}, this.props.schema)
    };
  }

  updateData = (newData) => {
    this.setState({
      data: newData
    })
  }

  getFieldObject = (name) => {
    return this.state.schema.fields
      ? this.state.schema.fields.find(field => field.name === name)
      : null
  }

  render() {
    return (
      <ReactTable
        data={this.state.data}
        columns={Object.keys(this.state.data[0]).map(key => {
          return {
            Header: this.getFieldObject(key)
              ? (this.getFieldObject(key).title || key)
              : key,
            accessor: key,
            Cell: props => <div className={
              this.getFieldObject(key)
                ? this.getFieldObject(key).type
                : ''}>
              <span>{props.value}</span>
            </div>
          }
        })}
        getTheadThProps={() => {
          return {style: {"wordWrap": "break-word", "whiteSpace": "initial"}}
        }}
        showPagination={false}
      />
    )
  }
}

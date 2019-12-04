import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from "react-plotly.js/factory";


export default function (props) {
  const Plot = createPlotlyComponent(Plotly)
  return (
    <Plot data={props.spec.data} layout={props.spec.layout} config={props.spec.config}/>
  )
}

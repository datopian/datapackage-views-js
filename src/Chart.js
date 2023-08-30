import React from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from "react-plotly.js/factory";


export default function (props) {
  const Plot = createPlotlyComponent(Plotly);

  // removes produced with plotly logo by default
  if (!props.spec.config || !props.spec.config.displaylogo) {
    props.spec.config = Object.assign(props.spec.config || {}, {displaylogo: false});
  }


  return (
    <Plot {...props.spec}
      layout = { {
          autosize: true,
          xaxis: {automargin: true},
          yaxis: {automargin: true,  tickangle: -20
          }
        } }
      style = { {width: "100%", height: "100%"} }
      useResizeHandler = "true"
    />
  )
}

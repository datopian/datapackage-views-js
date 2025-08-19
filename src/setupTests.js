// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
// Mock Chart component as Plotly lib errors when trying to run Jest tests:
// TypeError: Cannot read property 'document' of undefined
import React from 'react'
jest.mock('./Chart.js', () => (props) => {
  if (props.spec && props.spec.data && props.spec.layout) {
    return (<div>Stubbed Chart</div>)
  }
  return (<div>Wrong Chart</div>)
})

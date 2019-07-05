import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';


const view = {
  'id': 1,
  'title': 'GDP',
  'resources': [
    'gdp'
  ],
  'specType': 'table'
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App view={view} />, div)
  ReactDOM.unmountComponentAtNode(div)
});

it('renders loading message', () => {
  const { getByText } = render(<App view={view} />)
  expect(getByText('Data view is loading')).toBeInTheDocument()
});

it('renders error message when data is unavailable', () => {
  const errorView = JSON.parse(JSON.stringify(view))
  errorView.resources[0] = {
    name: 'gdp',
    unavailable: true
  }
  const { getByText } = render(<App view={errorView} />)
  expect(getByText('Data view unavailable.')).toBeInTheDocument()
})

it('renders a preview table when data is loaded', () => {
  const compiledView = JSON.parse(JSON.stringify(view))
  compiledView.resources[0] = {
    name: 'gdp',
    data: [
      {a:1, b:2},
      {a:3, b:4}
    ]
  }
  const { container } = render(<App view={compiledView} />)
  expect(container.querySelector('table.htCore')).toMatchSnapshot()
})

it('renders a preview table with custom headers', () => {
  const compiledView = JSON.parse(JSON.stringify(view))
  compiledView.resources[0] = {
    name: 'gdp',
    data: [
      {a:1, b:2},
      {a:3, b:4}
    ],
    schema: {
      fields: [
        {name: 'a', title: 'custom-a'},
        {name: 'b', title: 'custom-b'}
      ]
    }
  }
  const { container } = render(<App view={compiledView} />)
  expect(container.querySelector('table.htCore')).toMatchSnapshot()
})

it('renders a Map for geojson resources', () => {
  const compiledView = JSON.parse(JSON.stringify(view))
  compiledView.specType = 'map'
  compiledView.resources[0] = {
    name: 'map',
    data: {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          125.6,
          10.1
        ]
      },
      "properties": {
        "name": "Dinagat Islands"
      }
    }
  }
  const { container } = render(<App view={compiledView} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Document for PDF resources', () => {
  const compiledView = JSON.parse(JSON.stringify(view))
  compiledView.specType = 'document'
  compiledView.resources[0] = {
    name: 'document',
    format: 'pdf',
    path: 'some-path-to-pdf'
  }
  const { container } = render(<App view={compiledView} />)
  expect(container.firstChild).toMatchSnapshot()
})

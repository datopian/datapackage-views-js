import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';


const datapackage = {
  views: [
    {
      'id': 1,
      'title': 'GDP',
      'resources': [
        'gdp'
      ],
      'specType': 'table'
    }
  ]
}

it('renders spinner', () => {
  const { container } = render(<App datapackage={datapackage} loading={true} />)
  expect(container.querySelector('svg')).toMatchSnapshot()
});

it('renders error message when data is unavailable', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    unavailable: true
  }
  const { getByText } = render(<App datapackage={copyOfDp} />)
  expect(getByText('Data view unavailable.')).toBeInTheDocument()
})

it('renders a preview table when data is loaded', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    data: [
      {a:1, b:2},
      {a:3, b:4}
    ]
  }
  const { container } = render(<App datapackage={copyOfDp} />)
  expect(container.querySelector('table.htCore')).toMatchSnapshot()
})

it('renders a preview table with custom headers', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].resources[0] = {
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
  const { container } = render(<App datapackage={copyOfDp} />)
  expect(container.querySelector('table.htCore')).toMatchSnapshot()
})

it('renders a Map for geojson resources', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'map'
  copyOfDp.views[0].resources[0] = {
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
  const { container } = render(<App datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Map from a table', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'tabularmap'
  copyOfDp.views[0].spec = {
    "latField": "lat",
    "lonField": "lng",
    "infobox": "${data.label}"
  }
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    _values: [
      {
        "lat": 125.6,
        "lng": 10.1,
        "label": "My marker on the map 1"
      },
      {
        "lat": 125.6,
        "lng": 10.2,
        "label": "My marker on the map 2"
      }
    ]
  }
  const { container } = render(<App datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Document for PDF resources', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'document'
  copyOfDp.views[0].resources[0] = {
    name: 'document',
    format: 'pdf',
    path: 'some-path-to-pdf'
  }
  const { container } = render(<App datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

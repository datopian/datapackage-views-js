import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { DataView } from './index'


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
  const { container } = render(<DataView datapackage={datapackage} loading={true} />)
  expect(container.querySelector('svg')).toMatchSnapshot()
});

it('renders error message when data is unavailable', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    unavailable: true
  }
  const { getByText } = render(<DataView datapackage={copyOfDp} />)
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
  const { container } = render(<DataView datapackage={copyOfDp} />)
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
  const { container } = render(<DataView datapackage={copyOfDp} />)
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
  const { container } = render(<DataView datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Map from a table based on spec', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'tabularmap'
  copyOfDp.views[0].spec = {
    "latField": "lat",
    "lonField": "lng",
    "infobox": "${data.label}"
  }
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    "schema": {
      "fields": [
        {
          "name": "lng",
          "type": "number"
        },
        {
          "name": "lat",
          "type": "number"
        },
        {
          "name": "label",
          "type": "string"
        }
      ]
    },
    "_values": [
      {
        "lng": 125.6,
        "lat": 10.1,
        "label": "My marker on the map 1"
      },
      {
        "lng": 125.6,
        "lat": 10.2,
        "label": "My marker on the map 2"
      }
    ]
  }
  const { container } = render(<DataView datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Map from a table by auto detecting lon/lat fields', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'tabularmap'
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    "schema": {
      "fields": [
        {
          "name": "lon",
          "type": "number"
        },
        {
          "name": "lat",
          "type": "number"
        },
        {
          "name": "label",
          "type": "string"
        }
      ]
    },
    "_values": [
      {
        "lon": 125.6,
        "lat": 10.1,
        "label": "My marker on the map 1"
      },
      {
        "lon": 125.6,
        "lat": 10.2,
        "label": "My marker on the map 2"
      }
    ]
  }
  const { container } = render(<DataView datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Map from a table by auto detecting geometry field', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'tabularmap'
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    "schema": {
      "fields": [
        {
          "name": "geojson",
          "type": "string"
        },
        {
          "name": "label",
          "type": "string"
        }
      ]
    },
    "_values": [
      {
        "geojson": "(10.1, 125.6)",
        "label": "My marker on the map 1"
      },
      {
        "geojson": "(10.2, 125.6)",
        "label": "My marker on the map 2"
      }
    ]
  }
  const { container } = render(<DataView datapackage={copyOfDp} />)
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
  const { container } = render(<DataView datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

it('renders a Chart based on view spec', () => {
  const copyOfDp = JSON.parse(JSON.stringify(datapackage))
  copyOfDp.views[0].specType = 'simple'
  copyOfDp.views[0].spec = {
    type: 'line',
    group: 'a',
    series: ['b']
  }
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    data: [
      {a:1, b:2},
      {a:3, b:4}
    ],
    schema: {
      fields: [
        {
          name: 'a',
          type: 'integer'
        },
        {
          name: 'b',
          type: 'integer'
        }
      ]
    }
  }
  const { container } = render(<DataView datapackage={copyOfDp} />)
  expect(container.firstChild).toMatchSnapshot()
})

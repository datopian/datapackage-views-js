"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@testing-library/react");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datapackage = {
  views: [{
    'id': 1,
    'title': 'GDP',
    'resources': ['gdp'],
    'specType': 'table'
  }]
};
it('renders spinner', function () {
  var _render = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: datapackage,
    loading: true
  })),
      container = _render.container;

  expect(container.querySelector('svg')).toMatchSnapshot();
});
it('renders error message when data is unavailable', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    unavailable: true
  };

  var _render2 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      getByText = _render2.getByText;

  expect(getByText('Data view unavailable.')).toBeInTheDocument();
});
it('renders a message when no views given', function () {
  var noViews = {};

  var _render3 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: noViews
  })),
      getByText = _render3.getByText;

  expect(getByText('No views available')).toBeInTheDocument();
});
it('renders a preview table when data is loaded', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    data: [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }]
  };

  var _render4 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render4.container;

  expect(container.querySelector('table.htCore')).toMatchSnapshot();
});
it('renders a preview table with custom headers', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    data: [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }],
    schema: {
      fields: [{
        name: 'a',
        title: 'custom-a'
      }, {
        name: 'b',
        title: 'custom-b'
      }]
    }
  };

  var _render5 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render5.container;

  expect(container.querySelector('table.htCore')).toMatchSnapshot();
});
it('renders a Map for geojson resources', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'map';
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    data: {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [125.6, 10.1]
      },
      "properties": {
        "name": "Dinagat Islands"
      }
    }
  };

  var _render6 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render6.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('renders a Map from a table based on spec', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'tabularmap';
  copyOfDp.views[0].spec = {
    "latField": "lat",
    "lonField": "lng",
    "infobox": "${data.label}"
  };
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    "schema": {
      "fields": [{
        "name": "lng",
        "type": "number"
      }, {
        "name": "lat",
        "type": "number"
      }, {
        "name": "label",
        "type": "string"
      }]
    },
    "_values": [{
      "lng": 125.6,
      "lat": 10.1,
      "label": "My marker on the map 1"
    }, {
      "lng": 125.6,
      "lat": 10.2,
      "label": "My marker on the map 2"
    }]
  };

  var _render7 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render7.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('renders a Map from a table by auto detecting lon/lat fields', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'tabularmap';
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    "schema": {
      "fields": [{
        "name": "lon",
        "type": "number"
      }, {
        "name": "lat",
        "type": "number"
      }, {
        "name": "label",
        "type": "string"
      }]
    },
    "_values": [{
      "lon": 125.6,
      "lat": 10.1,
      "label": "My marker on the map 1"
    }, {
      "lon": 125.6,
      "lat": 10.2,
      "label": "My marker on the map 2"
    }]
  };

  var _render8 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render8.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('renders a Map from a table by auto detecting geometry field', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'tabularmap';
  copyOfDp.views[0].resources[0] = {
    name: 'map',
    "schema": {
      "fields": [{
        "name": "geojson",
        "type": "string"
      }, {
        "name": "label",
        "type": "string"
      }]
    },
    "_values": [{
      "geojson": "(10.1, 125.6)",
      "label": "My marker on the map 1"
    }, {
      "geojson": "(10.2, 125.6)",
      "label": "My marker on the map 2"
    }]
  };

  var _render9 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render9.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('doesnt crash if no geo data is found', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'tabularmap';
  copyOfDp.views[0].resources[0] = {
    "name": "map",
    "schema": {
      "fields": [{
        "name": "a",
        "type": "integer"
      }, {
        "name": "b",
        "type": "integer"
      }]
    },
    "_values": [{
      "a": 1,
      "b": 2
    }, {
      "a": 3,
      "b": 4
    }]
  };

  var _render10 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render10.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('renders a Document for PDF resources', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'document';
  copyOfDp.views[0].resources[0] = {
    name: 'document',
    format: 'pdf',
    path: 'some-path-to-pdf'
  };

  var _render11 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render11.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('renders a Chart based on view spec', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'simple';
  copyOfDp.views[0].spec = {
    type: 'line',
    group: 'a',
    series: ['b']
  };
  copyOfDp.views[0].resources[0] = {
    name: 'gdp',
    data: [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }],
    schema: {
      fields: [{
        name: 'a',
        type: 'integer'
      }, {
        name: 'b',
        type: 'integer'
      }]
    }
  };

  var _render12 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render12.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('does not crash if spec is missing for a Chart', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'simple';

  var _render13 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render13.container;

  expect(container.firstChild).toMatchSnapshot();
});
it('vega does not crash', function () {
  var copyOfDp = JSON.parse(JSON.stringify(datapackage));
  copyOfDp.views[0].specType = 'vega';

  var _render14 = (0, _react2.render)(_react.default.createElement(_index.DataView, {
    datapackage: copyOfDp
  })),
      container = _render14.container;

  expect(container.firstChild).toMatchSnapshot();
});
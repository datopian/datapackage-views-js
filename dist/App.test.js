"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@testing-library/react");

var _App = _interopRequireDefault(require("./App"));

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
  var _render = (0, _react2.render)(_react.default.createElement(_App.default, {
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

  var _render2 = (0, _react2.render)(_react.default.createElement(_App.default, {
    datapackage: copyOfDp
  })),
      getByText = _render2.getByText;

  expect(getByText('Data view unavailable.')).toBeInTheDocument();
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

  var _render3 = (0, _react2.render)(_react.default.createElement(_App.default, {
    datapackage: copyOfDp
  })),
      container = _render3.container;

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

  var _render4 = (0, _react2.render)(_react.default.createElement(_App.default, {
    datapackage: copyOfDp
  })),
      container = _render4.container;

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

  var _render5 = (0, _react2.render)(_react.default.createElement(_App.default, {
    datapackage: copyOfDp
  })),
      container = _render5.container;

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

  var _render6 = (0, _react2.render)(_react.default.createElement(_App.default, {
    datapackage: copyOfDp
  })),
      container = _render6.container;

  expect(container.firstChild).toMatchSnapshot();
});
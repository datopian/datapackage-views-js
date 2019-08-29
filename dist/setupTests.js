"use strict";

require("@testing-library/react/cleanup-after-each");

require("jest-dom/extend-expect");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
// this adds jest-dom's custom assertions
// Mock Chart component as Plotly lib errors when trying to run Jest tests:
// TypeError: Cannot read property 'document' of undefined
jest.mock('./Chart.js', function () {
  return function (props) {
    if (props.spec && props.spec.data && props.spec.layout) {
      return _react.default.createElement("div", null, "Stubbed Chart");
    }

    return _react.default.createElement("div", null, "Wrong Chart");
  };
});
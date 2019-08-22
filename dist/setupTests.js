"use strict";

require("@testing-library/react/cleanup-after-each");

require("jest-dom/extend-expect");

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
// this adds jest-dom's custom assertions
// Mock Chart component as Plotly lib errors when trying to run Jest tests:
// TypeError: Cannot read property 'document' of undefined
jest.mock('./Chart.js', function () {
  return function () {
    return {};
  };
});
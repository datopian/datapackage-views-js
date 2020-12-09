"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactPdfJs = require("react-pdf-js");

var _reactI18next = require("react-i18next");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PdfViewer = function PdfViewer(props) {
  var _useState = (0, _react.useState)(1),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      pages = _useState4[0],
      setPages = _useState4[1];

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var renderPagination = function renderPagination(page, pages) {
    if (!pages) {
      return null;
    }

    var previousButton = _react.default.createElement("li", {
      className: "previous",
      onClick: function onClick() {
        return setPage(page - 1);
      }
    }, _react.default.createElement("a", {
      href: "#previous"
    }, _react.default.createElement("span", {
      className: "arrow-left"
    }), " Previous"));

    if (page === 1) {
      previousButton = _react.default.createElement("li", {
        className: "previous disabled"
      }, _react.default.createElement("a", {
        href: "#previous"
      }, _react.default.createElement("span", {
        className: "arrow-left"
      }), " Previous"));
    }

    var nextButton = _react.default.createElement("li", {
      className: "next",
      onClick: function onClick() {
        return setPage(page + 1);
      }
    }, _react.default.createElement("a", {
      href: "#next"
    }, "Next ", _react.default.createElement("span", {
      className: "arrow-right"
    })));

    if (page === pages) {
      nextButton = _react.default.createElement("li", {
        className: "next disabled"
      }, _react.default.createElement("a", {
        href: "#next"
      }, "Next ", _react.default.createElement("span", {
        className: "arrow-right"
      })));
    }

    return _react.default.createElement("nav", {
      "aria-label": "Navigate pages: Previous/Next"
    }, _react.default.createElement("ul", {
      className: "pager"
    }, previousButton, nextButton));
  };

  var canvasEl = (0, _react.useRef)(null);

  var _usePdf = (0, _reactPdfJs.usePdf)({
    file: props.file,
    page: page,
    canvasEl: canvasEl
  }),
      _usePdf2 = _slicedToArray(_usePdf, 2),
      loading = _usePdf2[0],
      numPages = _usePdf2[1];

  (0, _react.useEffect)(function () {
    setPages(numPages);
  }, [numPages]);
  return _react.default.createElement("div", null, loading && _react.default.createElement("span", null, t('Loading...')), _react.default.createElement("canvas", {
    ref: canvasEl
  }), renderPagination(page, pages));
};

var _default = PdfViewer;
exports.default = _default;
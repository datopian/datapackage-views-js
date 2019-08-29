"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@handsontable/react");

var _reactCsv = require("react-csv");

require("./Table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updateData", function (newData) {
      _this.setState({
        data: newData
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addSettings", function (settings) {
      _this.setState({
        settings: Object.assign({}, _this.state.settings, settings)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "downloadJson", function () {
      var data = _this.state.data; // If rows are arrays, we want to convert to objects:

      if (data && Array.isArray(data[0])) {
        var headers = _this.state.settings.colHeaders;
        data = data.map(function (x) {
          var row = {};
          headers.forEach(function (header, i) {
            row[header] = x[i];
          });
          return row;
        });
      }

      data = JSON.stringify(data, null, 2);
      var blob = new Blob([data], {
        type: 'application/json'
      });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "".concat(_this.state.settings.viewTitle, ".json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    _this.state = {
      data: _this.props.data,
      settings: Object.assign({}, _this.props.options, {
        licenseKey: "non-commercial-and-evaluation"
      })
    };
    return _this;
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "downloadables hidden"
      }, _react.default.createElement("span", null, "Download preview data:"), _react.default.createElement(_reactCsv.CSVLink, {
        data: this.state.data,
        headers: this.state.settings.colHeaders,
        filename: "".concat(this.state.settings.viewTitle, ".csv"),
        className: "btn btn-primary",
        target: "_blank"
      }, "CSV (Excel)"), _react.default.createElement("button", {
        onClick: this.downloadJson,
        className: "btn btn-primary"
      }, "JSON")), _react.default.createElement(_react2.HotTable, {
        data: this.state.data,
        width: "100%",
        height: "300",
        settings: this.state.settings
      }));
    }
  }]);

  return Table;
}(_react.default.Component);

exports.default = Table;
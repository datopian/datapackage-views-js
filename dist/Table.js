"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTableV = _interopRequireDefault(require("react-table-v6"));

require("react-table-v6/react-table.css");

var _reactCsv = require("react-csv");

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

    _defineProperty(_assertThisInitialized(_this), "getFields", function () {
      if (_this.state.schema && _this.state.schema.fields) {
        return _this.state.schema.fields;
      }

      var fields = [];

      for (var key in _this.state.data[0]) {
        fields.push({
          name: key
        });
      }

      return fields;
    });

    _this.state = {
      data: _this.props.data || [],
      schema: Object.assign({}, _this.props.schema)
    };
    return _this;
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactTableV.default, {
        data: this.state.data,
        columns: this.getFields().map(function (field) {
          return {
            Header: field.name,
            id: field.name,
            accessor: function accessor(val) {
              return val[field.name];
            },
            Cell: function Cell(props) {
              return _react.default.createElement("div", {
                className: field.type || ''
              }, _react.default.createElement("span", null, props.value));
            }
          };
        }),
        getTheadThProps: function getTheadThProps() {
          return {
            style: {
              "wordWrap": "break-word",
              "whiteSpace": "initial"
            }
          };
        },
        showPagination: false,
        defaultPageSize: this.state.data.length,
        showPageSizeOptions: false,
        minRows: this.state.data.length
      });
    }
  }]);

  return Table;
}(_react.default.Component);

exports.default = Table;
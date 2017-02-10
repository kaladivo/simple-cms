'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _TextField2 = require('./TextField');

var _TextField3 = _interopRequireDefault(_TextField2);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateField = function (_TextField) {
  _inherits(DateField, _TextField);

  function DateField(name, data) {
    _classCallCheck(this, DateField);

    var _this = _possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, name, data));

    _this.type = "date";
    _this.class = _this.class + " datetime-picker";
    return _this;
  }

  _createClass(DateField, [{
    key: 'getValueToStore',
    value: regeneratorRuntime.mark(function getValueToStore(valueFromPost) {
      return regeneratorRuntime.wrap(function getValueToStore$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new Date(valueFromPost));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, getValueToStore, this);
    })
  }, {
    key: 'renderHtml',
    value: regeneratorRuntime.mark(function renderHtml(request, value) {
      return regeneratorRuntime.wrap(function renderHtml$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (value) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return _get(DateField.prototype.__proto__ || Object.getPrototypeOf(DateField.prototype), 'renderHtml', this).call(this, request, value);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
              _context2.next = 6;
              return _get(DateField.prototype.__proto__ || Object.getPrototypeOf(DateField.prototype), 'renderHtml', this).call(this, request, (0, _moment2.default)(value).format("YYYY-MM-DD"));

            case 6:
              return _context2.abrupt('return', _context2.sent);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, renderHtml, this);
    })
  }]);

  return DateField;
}(_TextField3.default);

exports.default = DateField;
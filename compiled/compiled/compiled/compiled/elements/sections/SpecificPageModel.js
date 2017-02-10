'use strict';

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

var _Model2 = require('./Model');

var _Model3 = _interopRequireDefault(_Model2);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var SpecificPageModel = function (_Model) {
  _inherits(SpecificPageModel, _Model);

  function SpecificPageModel(data) {
    _classCallCheck(this, SpecificPageModel);

    var _this = _possibleConstructorReturn(this, (SpecificPageModel.__proto__ || Object.getPrototypeOf(SpecificPageModel)).call(this, data));

    _this.pageIdentification = data.pageIdentification;
    _this.dbDocument = data.dbDocument;
    return _this;
  }

  _createClass(SpecificPageModel, [{
    key: 'renderHtml',
    value: regeneratorRuntime.mark(function renderHtml(request) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return regeneratorRuntime.wrap(function renderHtml$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = data.values;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return this.fetchFromDb();

            case 4:
              _context.t0 = _context.sent;

            case 5:
              data.values = _context.t0;
              _context.next = 8;
              return _get(SpecificPageModel.prototype.__proto__ || Object.getPrototypeOf(SpecificPageModel.prototype), 'renderHtml', this).call(this, request, data);

            case 8:
              return _context.abrupt('return', _context.sent);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, renderHtml, this);
    })
  }, {
    key: 'saveToDb',
    value: regeneratorRuntime.mark(function saveToDb(data) {
      var result;
      return regeneratorRuntime.wrap(function saveToDb$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.dbDocument.findOneAndUpdate(this.pageIdentification, _extends({}, data, this.pageIdentification));

            case 2:
              result = _context2.sent;

              if (!(result.value === null)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 6;
              return this.dbDocument.insert(_extends({}, data, this.pageIdentification));

            case 6:
              return _context2.abrupt('return', _context2.sent);

            case 7:
              return _context2.abrupt('return', result);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, saveToDb, this);
    })
  }, {
    key: 'fetchFromDb',
    value: regeneratorRuntime.mark(function fetchFromDb() {
      var res;
      return regeneratorRuntime.wrap(function fetchFromDb$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.dbDocument.findOne(this.pageIdentification);

            case 2:
              _context3.t0 = _context3.sent;

              if (_context3.t0) {
                _context3.next = 5;
                break;
              }

              _context3.t0 = {};

            case 5:
              res = _context3.t0;
              return _context3.abrupt('return', res);

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, fetchFromDb, this);
    })
  }]);

  return SpecificPageModel;
}(_Model3.default);

exports.default = SpecificPageModel;
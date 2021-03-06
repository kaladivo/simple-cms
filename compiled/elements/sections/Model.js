'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParentSection2 = require('./ParentSection');

var _ParentSection3 = _interopRequireDefault(_ParentSection2);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = function (_ParentSection) {
  _inherits(Model, _ParentSection);

  function Model(data) {
    _classCallCheck(this, Model);

    var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this, data));

    _this.fields = data.fields;
    _this.pugFile = '/elements/sections/model.pug';
    return _this;
  }

  _createClass(Model, [{
    key: 'validate',
    value: regeneratorRuntime.mark(function validate(request) {
      var errors, i, field, error;
      return regeneratorRuntime.wrap(function validate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              errors = [];
              i = 0;

            case 2:
              if (!(i < this.fields.length)) {
                _context.next = 11;
                break;
              }

              field = this.fields[i];
              _context.next = 6;
              return field.validate(request.body[field.name]);

            case 6:
              error = _context.sent;

              if (error) errors.push(error);

            case 8:
              i++;
              _context.next = 2;
              break;

            case 11:
              if (!(errors.length > 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', errors);

            case 13:
              return _context.abrupt('return', false);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, validate, this);
    })
  }, {
    key: 'savePost',
    value: regeneratorRuntime.mark(function savePost(request) {
      var errors, res;
      return regeneratorRuntime.wrap(function savePost$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.validate(request);

            case 2:
              errors = _context2.sent;

              if (!errors) {
                _context2.next = 7;
                break;
              }

              _context2.next = 6;
              return this.renderHtml(request, { errors: errors, values: request.body });

            case 6:
              return _context2.abrupt('return', _context2.sent);

            case 7:
              _context2.t0 = this;
              _context2.next = 10;
              return this._getDataToSave(request.body);

            case 10:
              _context2.t1 = _context2.sent;
              _context2.t2 = request;
              _context2.next = 14;
              return _context2.t0.saveToDb.call(_context2.t0, _context2.t1, _context2.t2);

            case 14:
              res = _context2.sent;
              return _context2.abrupt('return', res);

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, savePost, this);
    })
  }, {
    key: 'renderHtml',
    value: regeneratorRuntime.mark(function renderHtml(request) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var values, fieldsHtml, i, field;
      return regeneratorRuntime.wrap(function renderHtml$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              values = data.values;
              fieldsHtml = [];
              i = 0;

            case 3:
              if (!(i < this.fields.length)) {
                _context3.next = 13;
                break;
              }

              field = this.fields[i];
              _context3.t0 = fieldsHtml;
              _context3.next = 8;
              return field.renderHtml(request, values[field.name]);

            case 8:
              _context3.t1 = _context3.sent;

              _context3.t0.push.call(_context3.t0, _context3.t1);

            case 10:
              i++;
              _context3.next = 3;
              break;

            case 13:
              return _context3.abrupt('return', _pug2.default.renderFile((0, _settings2.default)().viewsDir + this.pugFile, _extends({
                section: this,
                fieldsHtml: fieldsHtml,
                settings: (0, _settings2.default)(),
                request: request
              }, data)));

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, renderHtml, this);
    })
  }, {
    key: '_getDataToSave',
    value: regeneratorRuntime.mark(function _getDataToSave(postData) {
      var _this2 = this;

      var valuesToStore, _loop, key, _ret;

      return regeneratorRuntime.wrap(function _getDataToSave$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              valuesToStore = {};
              _loop = regeneratorRuntime.mark(function _loop(key) {
                var field;
                return regeneratorRuntime.wrap(function _loop$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        field = _this2.fields.find(function (field) {
                          return field.name == key;
                        });

                        if (field) {
                          _context4.next = 3;
                          break;
                        }

                        return _context4.abrupt('return', 'continue');

                      case 3:
                        _context4.next = 5;
                        return field.getValueToStore(postData[key]);

                      case 5:
                        valuesToStore[key] = _context4.sent;

                      case 6:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _loop, _this2);
              });
              _context5.t0 = regeneratorRuntime.keys(postData);

            case 3:
              if ((_context5.t1 = _context5.t0()).done) {
                _context5.next = 11;
                break;
              }

              key = _context5.t1.value;
              return _context5.delegateYield(_loop(key), 't2', 6);

            case 6:
              _ret = _context5.t2;

              if (!(_ret === 'continue')) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt('continue', 3);

            case 9:
              _context5.next = 3;
              break;

            case 11:
              return _context5.abrupt('return', valuesToStore);

            case 12:
            case 'end':
              return _context5.stop();
          }
        }
      }, _getDataToSave, this);
    })
  }]);

  return Model;
}(_ParentSection3.default);

exports.default = Model;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _users = require('../db/users');

var _users2 = _interopRequireDefault(_users);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = new _passportLocal2.default({
  usernameField: 'email'
}, function (username, password, done) {
  (0, _co2.default)(regeneratorRuntime.mark(function _callee() {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _users2.default.findOne({ email: username });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', done(null, false, { message: _i18n2.default.__('User with that email does not exist.') }));

          case 5:
            _context.next = 7;
            return (0, _users.verifyPassword)(user, password);

          case 7:
            if (_context.sent) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', done(null, false, { message: _i18n2.default.__('Invalid password.') }));

          case 9:
            return _context.abrupt('return', done(null, user));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })).then(function (val) {}, function (err) {
    done(err);
  });
});
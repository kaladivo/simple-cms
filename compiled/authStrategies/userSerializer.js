'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeUser = serializeUser;
exports.deserializeUser = deserializeUser;

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _users = require('../db/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeUser(user, done) {
  (0, _co2.default)(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', user._id);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })).then(function (val) {
    done(null, val);
  }, function (err) {
    done(err);
  });
}

function deserializeUser(id, done) {
  (0, _co2.default)(regeneratorRuntime.mark(function _callee2() {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _users2.default.findOne({ _id: id });

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', done(null, false));

          case 5:
            done(null, user);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })).then(function (val) {}, function (err) {
    done(err);
  });
}
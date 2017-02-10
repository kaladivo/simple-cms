'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = isLoggedIn;
exports.isNotLoggedIn = isNotLoggedIn;

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _settings = require('../../settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [isLoggedIn, isNotLoggedIn].map(regeneratorRuntime.mark);

var settings = (0, _settings.getSettings)();

/**
 * Will redirect user to login page if not logged in.
 * @param {Function} next
 */
function isLoggedIn(next) {
  return regeneratorRuntime.wrap(function isLoggedIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isAuthenticated()) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return next;

        case 3:
          return _context.abrupt('return', _context.sent);

        case 6:
          // this.flash('error', i18n.__('Please log in.'));
          this.redirect(settings.adminUrl + '/login');

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

/**
 * Will redirect user to main admin page if logged in.
 * @param {Function} next
 */
function isNotLoggedIn(next) {
  return regeneratorRuntime.wrap(function isNotLoggedIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.isUnauthenticated()) {
            _context2.next = 6;
            break;
          }

          _context2.next = 3;
          return next;

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 6:
          this.redirect(settings.adminUrl);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}
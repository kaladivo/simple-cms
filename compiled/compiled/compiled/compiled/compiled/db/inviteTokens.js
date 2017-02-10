'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInviteToken = createInviteToken;

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _coBcrypt = require('co-bcrypt');

var _coBcrypt2 = _interopRequireDefault(_coBcrypt);

var _coCrypto = require('co-crypto');

var _settings = require('../settings');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _marked = [createInviteToken].map(regeneratorRuntime.mark);

var settings = (0, _settings.getSettings)();
var db = settings.db;

var inviteTokens = db.get('inviteTokens');

function createInviteToken(forEmail) {
  var token;
  return regeneratorRuntime.wrap(function createInviteToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = new Date().getTime();
          _context.next = 3;
          return (0, _coCrypto.randomBytes)(4);

        case 3:
          _context.t1 = _context.sent.toString('hex');
          token = _context.t0 + _context.t1;
          _context.next = 7;
          return inviteTokens.insert({ forEmail: forEmail, token: token });

        case 7:
          return _context.abrupt('return', token);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

exports.default = inviteTokens;
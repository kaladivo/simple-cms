'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.generatePasswordHash = generatePasswordHash;
exports.verifyPassword = verifyPassword;
exports.generateResetToken = generateResetToken;

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _coBcrypt = require('co-bcrypt');

var _coBcrypt2 = _interopRequireDefault(_coBcrypt);

var _coCrypto = require('co-crypto');

var _settings = require('../settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [createUser, generatePasswordHash, verifyPassword, generateResetToken].map(regeneratorRuntime.mark);

var settings = (0, _settings.getSettings)();
var db = settings.db;

var users = db.get('users'); //TODO move collection name to the settings.

/**
 * Will insert new user to the database. Throws an error if user does not exist.
 * @param  {String} email    User's email.
 * @param  {String} password User's password. Will be stored as a hash.
 * @param  {Object} data     Additional data to store with the user. 
 * @return {[generator function]}         
 */
function createUser(email, password) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var hash;
  return regeneratorRuntime.wrap(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return users.findOne({ email: email });

        case 2:
          if (!_context.sent) {
            _context.next = 4;
            break;
          }

          throw new Error(_i18n2.default.__('User with that email already exists'));

        case 4:
          _context.next = 6;
          return generatePasswordHash(password);

        case 6:
          hash = _context.sent;
          _context.next = 9;
          return users.insert({
            email: email,
            password: hash,
            created: new Date(),
            data: data
          });

        case 9:
          return _context.abrupt('return', _context.sent);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function generatePasswordHash(password) {
  var salt, hash;
  return regeneratorRuntime.wrap(function generatePasswordHash$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _coBcrypt2.default.genSalt(10);

        case 2:
          salt = _context2.sent;
          _context2.next = 5;
          return _coBcrypt2.default.hash(password, salt);

        case 5:
          hash = _context2.sent;
          return _context2.abrupt('return', hash);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function verifyPassword(user, password) {
  return regeneratorRuntime.wrap(function verifyPassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _coBcrypt2.default.compare(password, user.password);

        case 2:
          return _context3.abrupt('return', _context3.sent);

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function generateResetToken(email) {
  var token, user;
  return regeneratorRuntime.wrap(function generateResetToken$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _coCrypto.randomBytes)(4);

        case 2:
          token = _context4.sent.toString('hex');
          _context4.next = 5;
          return users.findOneAndUpdate({ email: email }, { $set: { resetToken: { token: token, createdAt: new Date() } } });

        case 5:
          user = _context4.sent;

          if (!(user.value === null)) {
            _context4.next = 8;
            break;
          }

          throw new Error(_i18n2.default.__("User with that email does not exist"));

        case 8:
          return _context4.abrupt('return', user);

        case 9:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

exports.default = users;
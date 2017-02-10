'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

var _users = require('../../db/users');

var _users2 = _interopRequireDefault(_users);

var _inviteTokens = require('../../db/inviteTokens');

var _inviteTokens2 = _interopRequireDefault(_inviteTokens);

var _authMiddlewares = require('./authMiddlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [validateRegistration, registerUser].map(regeneratorRuntime.mark);

var settings = (0, _settings2.default)();

var registerRouter = (0, _koaRouter2.default)();
registerRouter.use(_authMiddlewares.isNotLoggedIn);

//validate invite token
registerRouter.use(regeneratorRuntime.mark(function _callee(next) {
  var inviteToken, tokenObject;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _users2.default.count({});

        case 2:
          _context.t0 = _context.sent;

          if (!(_context.t0 == 0)) {
            _context.next = 7;
            break;
          }

          _context.next = 6;
          return next;

        case 6:
          return _context.abrupt('return', _context.sent);

        case 7:
          inviteToken = this.request.query.inviteToken;
          _context.next = 10;
          return _inviteTokens2.default.findOne({ token: inviteToken });

        case 10:
          tokenObject = _context.sent;


          if (!tokenObject) this.throw("Invalid invite token", 403);

          //If user is already registered
          _context.next = 14;
          return _users2.default.count({ email: tokenObject.forEmail });

        case 14:
          _context.t1 = _context.sent;

          if (!(_context.t1 > 0)) {
            _context.next = 19;
            break;
          }

          this.flash('message', _i18n2.default.__('User already registered'));
          this.redirect(settings.adminUrl + "/login");
          return _context.abrupt('return');

        case 19:

          this.inviteToken = tokenObject;

          _context.next = 22;
          return next;

        case 22:
          return _context.abrupt('return', _context.sent);

        case 23:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

var compileRegisterPage = _pug2.default.compileFile(settings.viewsDir + '/registerPage.pug');

registerRouter.get('/', regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (this.inviteToken) this.body = compileRegisterPage({ settings: settings, email: this.inviteToken.forEmail, disableEmailInput: true });else this.body = compileRegisterPage({ settings: settings });

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

registerRouter.post('/', validateRegistration, registerUser);

function validateRegistration(next) {
  var errors, _request$body, password, passwordCheck;

  return regeneratorRuntime.wrap(function validateRegistration$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:

          if (this.inviteToken) {
            this.request.body.email = this.inviteToken.forEmail;
          }

          _context3.next = 3;
          return this.validateBody({
            email: 'required|email',
            password: 'required|minLength:6'
          }, {
            'email.email': _i18n2.default.__('Enter valid email'),
            'email.required': _i18n2.default.__('Enter valid email'),
            'password.required': _i18n2.default.__('Password is required'),
            'password.minLength': _i18n2.default.__('Password must be at least 6 characters long')
          }, {
            before: {
              email: 'lowercase'
            }
          });

        case 3:
          if (!this.validationErrors) {
            _context3.next = 7;
            break;
          }

          errors = this.validationErrors.map(function (value) {
            return value[Object.keys(value)[0]].message;
          });

          this.body = compileRegisterPage({ settings: settings, errors: errors, email: this.request.body.email, disableEmailInput: this.inviteToken });
          return _context3.abrupt('return');

        case 7:
          _request$body = this.request.body, password = _request$body.password, passwordCheck = _request$body.passwordCheck;

          if (!(password !== passwordCheck)) {
            _context3.next = 11;
            break;
          }

          this.body = compileRegisterPage({ settings: settings, errors: [_i18n2.default.__('Passwords do not match')], email: this.request.body.email, disableEmailInput: this.inviteToken });
          return _context3.abrupt('return');

        case 11:
          _context3.next = 13;
          return next;

        case 13:
          return _context3.abrupt('return', _context3.sent);

        case 14:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[0], this);
}

function registerUser(next) {
  var _request$body2, email, password, createdUser;

  return regeneratorRuntime.wrap(function registerUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _request$body2 = this.request.body, email = _request$body2.email, password = _request$body2.password;
          _context4.prev = 1;
          _context4.next = 4;
          return (0, _users.createUser)(email, password);

        case 4:
          createdUser = _context4.sent;

          this.flash('message', _i18n2.default.__('Successfully registered. Please login.'));
          this.redirect(settings.adminUrl + '/login');
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4['catch'](1);

          this.body = compileRegisterPage({ settings: settings, errors: [_context4.t0.message], disableEmailInput: this.inviteToken });

        case 12:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[1], this, [[1, 9]]);
}

exports.default = registerRouter;
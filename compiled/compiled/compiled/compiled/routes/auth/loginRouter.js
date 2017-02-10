'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _authMiddlewares = require('./authMiddlewares');

var _users = require('../../db/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var settings = (0, _settings2.default)();

var loginRouter = (0, _koaRouter2.default)();
// loginRouter.use(KoaBody());

//Redirect to register page if no user registered yet
loginRouter.use(regeneratorRuntime.mark(function _callee(next) {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _users2.default.count();

        case 2:
          _context.t0 = _context.sent;

          if (!(_context.t0 == 0)) {
            _context.next = 7;
            break;
          }

          this.redirect(settings.adminUrl + "/register");
          _context.next = 9;
          break;

        case 7:
          _context.next = 9;
          return next;

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

var compileLoginPage = _pug2.default.compileFile(settings.viewsDir + '/loginPage.pug');

// Display login page.
loginRouter.get('/', _authMiddlewares.isNotLoggedIn, regeneratorRuntime.mark(function _callee2() {
  var args;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          args = {
            messages: this.flash('message'),
            errors: this.flash('error'),
            settings: settings
          };

          this.body = compileLoginPage(args);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

// Login user.
loginRouter.post('/', _authMiddlewares.isNotLoggedIn, regeneratorRuntime.mark(function _callee3(next) {
  var errors, _request$body, email, password;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return next;

        case 3:
          _context3.next = 13;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3['catch'](0);
          errors = [];
          _request$body = this.request.body, email = _request$body.email, password = _request$body.password;

          if (!password) errors.push(_i18n2.default.__("Password required"));
          if (!email) errors.push(_i18n2.default.__("Email required"));
          if (password && email) errors.push(_i18n2.default.__("Bad credentials"));

          this.body = compileLoginPage({
            errors: errors,
            email: this.request.body.email,
            settings: settings
          });

        case 13:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this, [[0, 5]]);
}), _passport2.default.authenticate('local', {
  successRedirect: settings.adminUrl,
  failWithError: true
}));

// logout user.
loginRouter.get('/logout', _authMiddlewares.isLoggedIn, regeneratorRuntime.mark(function _callee4() {
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          this.logout();
          this.flash('message', _i18n2.default.__('Logout successful.'));
          this.redirect(settings.adminUrl + '/login');

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
}));

exports.default = loginRouter;
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

var _emailTransporter = require('../../emailTransporter');

var _emailTransporter2 = _interopRequireDefault(_emailTransporter);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _marked = [validateReset, validateRequireReset, requestResetPassword, resetPassword, validateTokenInUrl].map(regeneratorRuntime.mark);

var settings = (0, _settings2.default)();

var resetPasswordRouter = (0, _koaRouter2.default)();
// resetPasswordRouter.use(KoaBody());

var compileRequestResetPasswordPage = _pug2.default.compileFile(settings.viewsDir + '/requestResetPasswordPage.pug');
var compileResetPasswordPage = _pug2.default.compileFile(settings.viewsDir + '/resetPasswordPage.pug');
var compileResetPasswordEmail = _pug2.default.compileFile(settings.viewsDir + '/emailTemplates/resetPasswordEmail.pug');

resetPasswordRouter.get("/", regeneratorRuntime.mark(function _callee(next) {
  var errors;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = this.flash('errors');

          this.body = compileRequestResetPasswordPage({ settings: settings, errors: errors });

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));
resetPasswordRouter.get("/:token", validateTokenInUrl, regeneratorRuntime.mark(function _callee2(next) {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.body = compileResetPasswordPage({ settings: settings });

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
resetPasswordRouter.post("/", validateRequireReset, requestResetPassword);
resetPasswordRouter.post("/:token", validateTokenInUrl, validateReset, resetPassword);

function validateReset(next) {
  var errors, _request$body, password, passwordCheck;

  return regeneratorRuntime.wrap(function validateReset$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return this.validateBody({
            password: 'required|minLength:6'
          }, {
            'password.required': _i18n2.default.__('Password is required'),
            'password.minLength': _i18n2.default.__('Password must be at least 6 characters long')
          });

        case 2:
          if (!this.validationErrors) {
            _context3.next = 6;
            break;
          }

          errors = this.validationErrors.map(function (value) {
            return value[Object.keys(value)[0]].message;
          });

          this.body = compileResetPasswordPage({ settings: settings, errors: errors });
          return _context3.abrupt('return');

        case 6:
          _request$body = this.request.body, password = _request$body.password, passwordCheck = _request$body.passwordCheck;

          if (!(password !== passwordCheck)) {
            _context3.next = 10;
            break;
          }

          this.body = compileResetPasswordPage({ settings: settings, errors: [_i18n2.default.__('passwords do not match')] });
          return _context3.abrupt('return');

        case 10:
          _context3.next = 12;
          return next;

        case 12:
          return _context3.abrupt('return', _context3.sent);

        case 13:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[0], this);
}

function validateRequireReset(next) {
  var errors;
  return regeneratorRuntime.wrap(function validateRequireReset$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return this.validateBody({
            'email': 'required|email'
          }, {
            'email.email': _i18n2.default.__('Enter valid email'),
            'email.required': _i18n2.default.__('Enter valid email')
          }, {
            before: {
              email: 'lowercase'
            }
          });

        case 2:
          if (!this.validationErrors) {
            _context4.next = 6;
            break;
          }

          errors = this.validationErrors.map(function (value) {
            return value[Object.keys(value)[0]].message;
          });

          this.body = compileRequestResetPasswordPage({ settings: settings, errors: errors });
          return _context4.abrupt('return');

        case 6:
          _context4.next = 8;
          return next;

        case 8:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[1], this);
}

function requestResetPassword(next) {
  var user;
  return regeneratorRuntime.wrap(function requestResetPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _users.generateResetToken)(this.request.body.email);

        case 3:
          user = _context5.sent;

          createAndSendResetMail(user);

          this.flash('message', _i18n2.default.__("Reset token was send please check your email."));
          this.redirect(settings.adminUrl + '/login');
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5['catch'](0);

          this.body = compileRequestResetPasswordPage({ settings: settings, errors: [_context5.t0.message] });

        case 12:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[2], this, [[0, 9]]);
}

function resetPassword(next) {
  var hash, mustBeGreaterThan, user;
  return regeneratorRuntime.wrap(function resetPassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _users.generatePasswordHash)(this.request.body.password);

        case 2:
          hash = _context6.sent;
          mustBeGreaterThan = new Date();

          mustBeGreaterThan.setMinutes(mustBeGreaterThan.getMinutes() - 10);

          _context6.next = 7;
          return _users2.default.findOneAndUpdate({
            "resetToken.token": this.params.token,
            "resetToken.createdAt": { $gte: mustBeGreaterThan }
          }, { $set: { password: hash }, $unset: { resetToken: 1 } });

        case 7:
          user = _context6.sent;

          this.flash("message", _i18n2.default.__("Password was successfully changed. You can now login."));
          this.redirect(settings.adminUrl + "/login");

        case 10:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[3], this);
}

function createAndSendResetMail(user) {
  var resetUrl = settings.siteUrl + "/admin/resetPassword/" + user.resetToken.token;
  var message = {
    from: settings.emailAddress,
    to: user.email,
    subject: _i18n2.default.__("Password reset"),
    html: compileResetPasswordEmail({ settings: settings, resetUrl: resetUrl })
  };

  _emailTransporter2.default.sendMail(message, function (err, info) {});
}

function validateTokenInUrl(next) {
  var mustBeGreaterThan, userExist;
  return regeneratorRuntime.wrap(function validateTokenInUrl$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          mustBeGreaterThan = new Date();

          mustBeGreaterThan.setMinutes(mustBeGreaterThan.getMinutes() - 10);

          _context7.next = 4;
          return _users2.default.count({
            "resetToken.token": this.params.token,
            "resetToken.createdAt": { $gte: mustBeGreaterThan }
          });

        case 4:
          _context7.t0 = _context7.sent;
          userExist = _context7.t0 > 0;

          if (userExist) {
            _context7.next = 10;
            break;
          }

          this.flash("errors", _i18n2.default.__("Url is not valid, please request reset again."));
          this.redirect(settings.adminUrl + "/resetPassword");
          return _context7.abrupt('return');

        case 10:
          _context7.next = 12;
          return next;

        case 12:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[4], this);
}

exports.default = resetPasswordRouter;
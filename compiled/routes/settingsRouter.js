'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _authMiddlewares = require('./auth/authMiddlewares');

var _users = require('../db/users');

var _users2 = _interopRequireDefault(_users);

var _inviteTokens = require('../db/inviteTokens');

var _emailTransporter = require('../emailTransporter');

var _emailTransporter2 = _interopRequireDefault(_emailTransporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = (0, _settings2.default)();

var settingsRouter = (0, _koaRouter2.default)();

var compileFile = _pug2.default.compileFile(settings.viewsDir + '/settingsPage.pug');
var compileInviteEmail = _pug2.default.compileFile(settings.viewsDir + '/emailTemplates/inviteEmail.pug');
settingsRouter.use(_authMiddlewares.isLoggedIn);

settingsRouter.get('/', regeneratorRuntime.mark(function _callee(next) {
  var fetchedUsers;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _users2.default.find({});

        case 2:
          fetchedUsers = _context.sent;

          this.body = compileFile({
            settings: settings,
            users: fetchedUsers,
            currentUser: this.req.user,
            messages: this.flash('message'),
            errors: this.flash('error'),
            loggedUser: this.req.user
          });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

settingsRouter.post('/inviteUser', regeneratorRuntime.mark(function _callee2(next) {
  var email, inviteToken, emailHtml, message;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = this.request.body.email;

          if (email) {
            _context2.next = 5;
            break;
          }

          this.flash('error', _i18n2.default.__('Please fill mail'));
          this.redirect(settings.adminUrl + '/settings');
          return _context2.abrupt('return');

        case 5:
          _context2.next = 7;
          return _users2.default.count({ email: email });

        case 7:
          _context2.t0 = _context2.sent;

          if (!(_context2.t0 > 0)) {
            _context2.next = 12;
            break;
          }

          this.flash('error', _i18n2.default.__('Email already in database'));
          this.redirect(settings.adminUrl + '/settings');
          return _context2.abrupt('return');

        case 12:
          _context2.next = 14;
          return (0, _inviteTokens.createInviteToken)(email);

        case 14:
          inviteToken = _context2.sent;
          emailHtml = compileInviteEmail({ settings: settings, inviteToken: inviteToken });
          message = {
            from: settings.emailAddress,
            to: email,
            subject: _i18n2.default.__("Admin invitation"),
            html: emailHtml
          };


          _emailTransporter2.default.sendMail(message, function (err, info) {});

          this.flash('message', _i18n2.default.__("User invited"));
          this.redirect(settings.adminUrl + "/settings");

        case 20:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

settingsRouter.post('/changePassword', regeneratorRuntime.mark(function _callee3(next) {
  var errors, _request$body, password, passwordCheck, passwordHash;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
            _context3.next = 7;
            break;
          }

          errors = this.validationErrors.map(function (value) {
            return value[Object.keys(value)[0]].message;
          });

          this.flash('error', errors);
          this.redirect(settings.adminUrl + "/settings");
          return _context3.abrupt('return');

        case 7:
          _request$body = this.request.body, password = _request$body.password, passwordCheck = _request$body.passwordCheck;

          if (!(password != passwordCheck)) {
            _context3.next = 12;
            break;
          }

          this.flash('error', _i18n2.default.__("passwords do not match"));
          this.redirect(settings.adminUrl + "/settings");
          return _context3.abrupt('return');

        case 12:
          _context3.next = 14;
          return (0, _users.generatePasswordHash)(password);

        case 14:
          passwordHash = _context3.sent;
          _context3.next = 17;
          return _users2.default.update(this.req.user._id, { '$set': { password: passwordHash } });

        case 17:

          this.flash('message', _i18n2.default.__("password changed"));
          this.redirect(settings.adminUrl + "/settings");

        case 19:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

settingsRouter.get('/removeUser/:userId', regeneratorRuntime.mark(function _callee4(next) {
  var userId, res;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = this.params.userId;

          if (!(userId == this.req.user._id.toString())) {
            _context4.next = 6;
            break;
          }

          console.log(userId);
          this.flash('error', _i18n2.default.__("You can not remove yourself"));
          this.redirect(settings.adminUrl + "/settings");
          return _context4.abrupt('return');

        case 6:
          _context4.next = 8;
          return _users2.default.remove(userId);

        case 8:
          res = _context4.sent;

          this.flash('message', _i18n2.default.__("User removed"));
          this.redirect(settings.adminUrl + "/settings");

        case 11:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
}));

exports.default = settingsRouter;
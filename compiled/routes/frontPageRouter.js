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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = (0, _settings2.default)();

var frontPageRouter = (0, _koaRouter2.default)();

var compileFrontPage = _pug2.default.compileFile(settings.viewsDir + '/frontPage.pug');

frontPageRouter.get('/', _authMiddlewares.isLoggedIn, regeneratorRuntime.mark(function _callee(next) {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.body = compileFrontPage({
            user: this.req.user,
            settings: settings,
            loggedUser: this.req.user
          });

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

exports.default = frontPageRouter;
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

var _utils = require('../utils');

var _authMiddlewares = require('./auth/authMiddlewares');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _marked = [findSection].map(regeneratorRuntime.mark);

var settings = (0, _settings2.default)();

var compileSectionPage = _pug2.default.compileFile(settings.viewsDir + '/sectionPage.pug');

var sectionsRouter = (0, _koaRouter2.default)();

sectionsRouter.use(_authMiddlewares.isLoggedIn);
sectionsRouter.use(findSection);

sectionsRouter.get(/(.*)/, regeneratorRuntime.mark(function _callee(next) {
  var backInfo;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          backInfo = void 0;

          if (this.request.query.id || this.request.query.action == "new") backInfo = { url: this.section.getUrl(), title: "Back to " + this.section.title.toLowerCase() };

          _context.t0 = compileSectionPage;
          _context.t1 = this.section;
          _context.next = 6;
          return this.section.renderHtml(this.request, this.response);

        case 6:
          _context.t2 = _context.sent;
          _context.t3 = settings;
          _context.t4 = backInfo;
          _context.t5 = this.req.user;
          _context.t6 = {
            section: _context.t1,
            sectionHtml: _context.t2,
            settings: _context.t3,
            backInfo: _context.t4,
            loggedUser: _context.t5
          };
          this.body = (0, _context.t0)(_context.t6);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

sectionsRouter.post(/(.*)/, regeneratorRuntime.mark(function _callee2(next) {
  var result, sectionHtml, backInfo;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return this.section.savePost(this.request, this.response);

        case 2:
          result = _context2.sent;
          sectionHtml = void 0;
          backInfo = void 0;

          if (this.request.query.id || this.request.query.action == "new") backInfo = { url: this.section.getUrl(), title: "Back to " + this.section.title.toLowerCase() };
          // console.log(result);

          if (!(!result || result._id)) {
            _context2.next = 12;
            break;
          }

          _context2.next = 9;
          return this.section.renderHtml(this.request, { values: result });

        case 9:
          sectionHtml = _context2.sent;
          _context2.next = 13;
          break;

        case 12:
          sectionHtml = result;

        case 13:
          this.body = compileSectionPage({
            section: this.section,
            sectionHtml: sectionHtml,
            settings: settings,
            loggedUser: this.req.user,
            backInfo: backInfo
          });

        case 14:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

function findSection(next) {
  var section;
  return regeneratorRuntime.wrap(function findSection$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          section = (0, _utils.getSectionByUrl)(this.params[0].replace("/admin", ""));

          if (!section) this.throw('Not found', 404);

          this.section = section;
          _context3.next = 5;
          return next;

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[0], this);
}

exports.default = sectionsRouter;
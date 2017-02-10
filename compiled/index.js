'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorField = exports.TextField = exports.AddableModel = exports.SpecificPageModel = exports.List = exports.AddableList = undefined;

exports.default = function (settings) {
  (0, _settings.initSettings)(settings);
  settings = (0, _settings.getSettings)();

  _i18n2.default.configure({
    defaultLocale: settings.lang,
    directory: settings.localesDir
  });

  //All modules must be imported after settings are initialized.
  var localStrategy = require('./authStrategies/localStrategy').default;

  var _require = require('./authStrategies/userSerializer'),
      serializeUser = _require.serializeUser,
      deserializeUser = _require.deserializeUser;

  var _require2 = require('./routes/auth/authMiddlewares'),
      isLoggedIn = _require2.isLoggedIn,
      isNotLoggedIn = _require2.isNotLoggedIn;

  //setup router


  var mainRouter = (0, _koaRouter2.default)();
  mainRouter.use((0, _koaValidation2.default)());
  mainRouter.use((0, _koaConnectFlash2.default)());
  mainRouter.use(_koaPassport2.default.initialize());
  mainRouter.use(_koaPassport2.default.session());
  mainRouter.use((0, _koaBody2.default)());

  //setup passport
  _koaPassport2.default.use(localStrategy);
  _koaPassport2.default.serializeUser(serializeUser);
  _koaPassport2.default.deserializeUser(deserializeUser);

  //Setup error handling
  mainRouter.use(regeneratorRuntime.mark(function _callee(next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next;

          case 3:
            _context.next = 10;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            this.status = _context.t0.status || 500;
            this.body = _context.t0.message;
            this.app.emit('error', _context.t0, this);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 5]]);
  }));

  //Setup static files serving 
  mainRouter.get(new RegExp("\\" + settings.adminUrl + "\/public\/.(.*)"), regeneratorRuntime.mark(function _callee2(next) {
    var filename;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filename = this.params['0'].match(new RegExp("public\/(.*)$"))[1];
            _context2.next = 3;
            return (0, _koaSend2.default)(this, filename, { root: settings.viewsPublicDir });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  //Routers
  var loginRouter = require('./routes/auth/loginRouter').default;
  var registerRouter = require('./routes/auth/registerRouter').default;
  var resetPasswordRouter = require('./routes/auth/resetPasswordRouter').default;

  var frontPageRouter = require('./routes/frontPageRouter').default;
  var settingsRouter = require('./routes/settingsRouter').default;
  var sectionsRouter = require('./routes/sectionsRouter').default;

  mainRouter.use(settings.adminUrl + "/resetPassword", resetPasswordRouter.routes(), resetPasswordRouter.allowedMethods());
  mainRouter.use(settings.adminUrl + "/login", loginRouter.routes(), loginRouter.allowedMethods());
  mainRouter.use(settings.adminUrl + "/register", registerRouter.routes(), registerRouter.allowedMethods());

  mainRouter.use(settings.adminUrl + "/settings", settingsRouter.routes(), settingsRouter.allowedMethods());
  mainRouter.use(settings.adminUrl, frontPageRouter.routes(), frontPageRouter.allowedMethods());
  mainRouter.use(settings.adminUrl, sectionsRouter.routes(), sectionsRouter.allowedMethods());

  return mainRouter;
};

var _AddableList = require('./elements/sections/AddableList');

Object.defineProperty(exports, 'AddableList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AddableList).default;
  }
});

var _List = require('./elements/sections/List');

Object.defineProperty(exports, 'List', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_List).default;
  }
});

var _SpecificPageModel = require('./elements/sections/SpecificPageModel');

Object.defineProperty(exports, 'SpecificPageModel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SpecificPageModel).default;
  }
});

var _AddableModel = require('./elements/sections/AddableModel');

Object.defineProperty(exports, 'AddableModel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AddableModel).default;
  }
});

var _TextField = require('./elements/fields/TextField');

Object.defineProperty(exports, 'TextField', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TextField).default;
  }
});

var _EditorField = require('./elements/fields/EditorField');

Object.defineProperty(exports, 'EditorField', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EditorField).default;
  }
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaValidation = require('koa-validation');

var _koaValidation2 = _interopRequireDefault(_koaValidation);

var _settings = require('./settings');

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _koaConnectFlash = require('koa-connect-flash');

var _koaConnectFlash2 = _interopRequireDefault(_koaConnectFlash);

var _koaSession = require('koa-session');

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
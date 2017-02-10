'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field2 = require('./Field');

var _Field3 = _interopRequireDefault(_Field2);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorField = function (_Field) {
  _inherits(EditorField, _Field);

  function EditorField(name, data) {
    _classCallCheck(this, EditorField);

    return _possibleConstructorReturn(this, (EditorField.__proto__ || Object.getPrototypeOf(EditorField)).call(this, name, data));
  }

  _createClass(EditorField, [{
    key: 'renderHtml',
    value: regeneratorRuntime.mark(function renderHtml(request, value) {
      return regeneratorRuntime.wrap(function renderHtml$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = value || this.default;
              return _context.abrupt('return', _pug2.default.renderFile((0, _settings2.default)().viewsDir + '/elements/fields/editorField.pug', {
                field: this,
                value: value,
                settings: (0, _settings2.default)()
              }));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, renderHtml, this);
    })
  }]);

  return EditorField;
}(_Field3.default);

exports.default = EditorField;
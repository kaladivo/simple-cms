'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParentSection2 = require('./ParentSection');

var _ParentSection3 = _interopRequireDefault(_ParentSection2);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddableList = function (_ParentSection) {
  _inherits(AddableList, _ParentSection);

  function AddableList(data) {
    _classCallCheck(this, AddableList);

    var _this = _possibleConstructorReturn(this, (AddableList.__proto__ || Object.getPrototypeOf(AddableList)).call(this, data));

    _this.onOnePage = data.onOnePage || 10;
    _this.previewFields = data.previewFields;
    _this.sortQuery = data.sortQuery;
    _this.dbDocument = data.dbDocument;
    _this.model = data.model;
    _this.model.setParent(_this);
    return _this;
  }

  _createClass(AddableList, [{
    key: 'renderHtml',
    value: regeneratorRuntime.mark(function renderHtml(request, response) {
      var _request$query, id, action, messages, values, totalPages;

      return regeneratorRuntime.wrap(function renderHtml$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _request$query = request.query, id = _request$query.id, action = _request$query.action;
              messages = [];

              if (!(action == "remove" && id)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return this.dbDocument.remove(id);

            case 5:
              messages.push("removed");
              _context.next = 15;
              break;

            case 8:
              if (!id) {
                _context.next = 15;
                break;
              }

              _context.next = 11;
              return this.dbDocument.findOne(request.query.id);

            case 11:
              values = _context.sent;
              _context.next = 14;
              return this.model.renderHtml(request, { values: values });

            case 14:
              return _context.abrupt('return', _context.sent);

            case 15:
              if (!(action == "new")) {
                _context.next = 19;
                break;
              }

              _context.next = 18;
              return this.model.renderHtml(request, { values: {} });

            case 18:
              return _context.abrupt('return', _context.sent);

            case 19:
              _context.t0 = Math;
              _context.next = 22;
              return this.dbDocument.count();

            case 22:
              _context.t1 = _context.sent;
              _context.t2 = this.onOnePage;
              _context.t3 = _context.t1 / _context.t2;
              totalPages = _context.t0.ceil.call(_context.t0, _context.t3);

              if (!(request.query.page > totalPages)) {
                _context.next = 28;
                break;
              }

              return _context.abrupt('return', response.redirect(this.getUrl() + "/?page=" + totalPages));

            case 28:
              if (!(request.query.page < 1)) {
                _context.next = 30;
                break;
              }

              return _context.abrupt('return', response.redirect(this.getUrl() + "/?page=1"));

            case 30:
              _context.t4 = _pug2.default;
              _context.t5 = (0, _settings2.default)().viewsDir + '/elements/sections/AddableList.pug';
              _context.t6 = this;
              _context.t7 = (0, _settings2.default)();
              _context.t8 = this.previewFields;
              _context.next = 37;
              return this._getItemsToRender(request.query.page - 1);

            case 37:
              _context.t9 = _context.sent;
              _context.t10 = totalPages;
              _context.t11 = request.query.page || 1;
              _context.t12 = messages;
              _context.t13 = {
                section: _context.t6,
                settings: _context.t7,
                previewFields: _context.t8,
                items: _context.t9,
                totalPages: _context.t10,
                page: _context.t11,
                messages: _context.t12
              };
              return _context.abrupt('return', _context.t4.renderFile.call(_context.t4, _context.t5, _context.t13));

            case 43:
            case 'end':
              return _context.stop();
          }
        }
      }, renderHtml, this);
    })
  }, {
    key: 'savePost',
    value: regeneratorRuntime.mark(function savePost(request, response) {
      var savedPost;
      return regeneratorRuntime.wrap(function savePost$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.model.savePost(request);

            case 2:
              savedPost = _context2.sent;

              if (savedPost._id) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', savedPost);

            case 5:
              if (!request.query.id) response.redirect(this.getUrl() + "/?id=" + savedPost._id);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, savePost, this);
    })
  }, {
    key: '_getItemsToRender',
    value: regeneratorRuntime.mark(function _getItemsToRender(pageIndex) {
      var items;
      return regeneratorRuntime.wrap(function _getItemsToRender$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.dbDocument.find({}, { limit: this.onOnePage, sort: this.sortQuery, skip: pageIndex * this.onOnePage });

            case 2:
              items = _context3.sent;
              return _context3.abrupt('return', items);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _getItemsToRender, this);
    })
  }]);

  return AddableList;
}(_ParentSection3.default);

exports.default = AddableList;
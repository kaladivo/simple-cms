'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getSectionByUrl = getSectionByUrl;

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns section defined in settings that should be displayed at given url.
 * @param  {String} url [path after '/admin' (example '/something/posts').]
 * @return {Object}     [Section that sould be displayed at given url.]
 */
function getSectionByUrl(url) {
  url = url.replace(/^(\/)|(\/)$/g, "");
  var urls = url.split('/');

  var section = (0, _settings2.default)().sections.find(function (e) {
    return e.urlName === urls[0];
  });
  if (!section) return null;

  var _loop = function _loop(i) {
    if (!section.children) return {
        v: null
      };
    section = section.children.find(function (e) {
      return e.urlName === urls[i];
    });

    if (!section) return {
        v: null
      };
  };

  for (var i = 1; i < urls.length; i++) {
    var _ret = _loop(i);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return section;
}
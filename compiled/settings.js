"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = exports.initSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultSettings = require("./defaultSettings");

var _defaultSettings2 = _interopRequireDefault(_defaultSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mSettings = null;

function getSettings() {
  if (mSettings == null) throw new Error('Settings must be initialized first');
  return mSettings;
}

function initSettings(settings) {
  mSettings = injectDefaultValues(settings);
}

function injectDefaultValues(settings) {
  return _extends({}, _defaultSettings2.default, settings);
}

exports.initSettings = initSettings;
exports.getSettings = getSettings;
exports.default = getSettings;
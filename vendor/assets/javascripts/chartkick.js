(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["Chartkick"] = factory();
  else
    root["Chartkick"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId]) {
/******/      return installedModules[moduleId].exports;
/******/    }
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.l = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };
/******/
/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };
/******/
/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isArray(variable) {
  return Object.prototype.toString.call(variable) === "[object Array]";
}

function isFunction(variable) {
  return variable instanceof Function;
}

function isPlainObject(variable) {
  return !isFunction(variable) && variable instanceof Object;
}

// https://github.com/madrobby/zepto/blob/master/src/zepto.js
function extend(target, source) {
  var key = void 0;
  for (key in source) {
    if (isPlainObject(source[key]) || isArray(source[key])) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      extend(target[key], source[key]);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

function merge(obj1, obj2) {
  var target = {};
  extend(target, obj1);
  extend(target, obj2);
  return target;
}

var DATE_PATTERN = /^(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)$/i;

// https://github.com/Do/iso8601.js
var ISO8601_PATTERN = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([.,]\d+)?($|Z|([+-])(\d\d)(:)?(\d\d)?)/i;
var DECIMAL_SEPARATOR = String(1.5).charAt(1);

function parseISO8601(input) {
  var day = void 0,
      hour = void 0,
      matches = void 0,
      milliseconds = void 0,
      minutes = void 0,
      month = void 0,
      offset = void 0,
      result = void 0,
      seconds = void 0,
      type = void 0,
      year = void 0;
  type = Object.prototype.toString.call(input);
  if (type === "[object Date]") {
    return input;
  }
  if (type !== "[object String]") {
    return;
  }
  matches = input.match(ISO8601_PATTERN);
  if (matches) {
    year = parseInt(matches[1], 10);
    month = parseInt(matches[3], 10) - 1;
    day = parseInt(matches[5], 10);
    hour = parseInt(matches[7], 10);
    minutes = matches[9] ? parseInt(matches[9], 10) : 0;
    seconds = matches[11] ? parseInt(matches[11], 10) : 0;
    milliseconds = matches[12] ? parseFloat(DECIMAL_SEPARATOR + matches[12].slice(1)) * 1000 : 0;
    result = Date.UTC(year, month, day, hour, minutes, seconds, milliseconds);
    if (matches[13] && matches[14]) {
      offset = matches[15] * 60;
      if (matches[17]) {
        offset += parseInt(matches[17], 10);
      }
      offset *= matches[14] === "-" ? -1 : 1;
      result -= offset * 60 * 1000;
    }
    return new Date(result);
  }
}
// end iso8601.js

function negativeValues(series) {
  var i = void 0,
      j = void 0,
      data = void 0;
  for (i = 0; i < series.length; i++) {
    data = series[i].data;
    for (j = 0; j < data.length; j++) {
      if (data[j][1] < 0) {
        return true;
      }
    }
  }
  return false;
}

function toStr(n) {
  return "" + n;
}

function toFloat(n) {
  return parseFloat(n);
}

function toDate(n) {
  var matches = void 0,
      year = void 0,
      month = void 0,
      day = void 0;
  if ((typeof n === "undefined" ? "undefined" : _typeof(n)) !== "object") {
    if (typeof n === "number") {
      n = new Date(n * 1000); // ms
    } else {
      n = toStr(n);
      if (matches = n.match(DATE_PATTERN)) {
        year = parseInt(matches[1], 10);
        month = parseInt(matches[3], 10) - 1;
        day = parseInt(matches[5], 10);
        return new Date(year, month, day);
      } else {
        // str
        // try our best to get the str into iso8601
        // TODO be smarter about this
        var str = n.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
        n = parseISO8601(str) || new Date(n);
      }
    }
  }
  return n;
}

function toArr(n) {
  if (!isArray(n)) {
    var arr = [],
        i = void 0;
    for (i in n) {
      if (n.hasOwnProperty(i)) {
        arr.push([i, n[i]]);
      }
    }
    n = arr;
  }
  return n;
}

function jsOptionsFunc(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle) {
  return function (chart, opts, chartOptions) {
    var series = chart.data;
    var options = merge({}, defaultOptions);
    options = merge(options, chartOptions || {});

    if (chart.hideLegend || "legend" in opts) {
      hideLegend(options, opts.legend, chart.hideLegend);
    }

    if (opts.title) {
      setTitle(options, opts.title);
    }

    // min
    if ("min" in opts) {
      setMin(options, opts.min);
    } else if (!negativeValues(series)) {
      setMin(options, 0);
    }

    // max
    if (opts.max) {
      setMax(options, opts.max);
    }

    if ("stacked" in opts) {
      setStacked(options, opts.stacked);
    }

    if (opts.colors) {
      options.colors = opts.colors;
    }

    if (opts.xtitle) {
      setXtitle(options, opts.xtitle);
    }

    if (opts.ytitle) {
      setYtitle(options, opts.ytitle);
    }

    // merge library last
    options = merge(options, opts.library || {});

    return options;
  };
}

function sortByTime(a, b) {
  return a[0].getTime() - b[0].getTime();
}

function sortByNumberSeries(a, b) {
  return a[0] - b[0];
}

function sortByNumber(a, b) {
  return a - b;
}

function isMinute(d) {
  return d.getMilliseconds() === 0 && d.getSeconds() === 0;
}

function isHour(d) {
  return isMinute(d) && d.getMinutes() === 0;
}

function isDay(d) {
  return isHour(d) && d.getHours() === 0;
}

function isWeek(d, dayOfWeek) {
  return isDay(d) && d.getDay() === dayOfWeek;
}

function isMonth(d) {
  return isDay(d) && d.getDate() === 1;
}

function isYear(d) {
  return isMonth(d) && d.getMonth() === 0;
}

function isDate(obj) {
  return !isNaN(toDate(obj)) && toStr(obj).length >= 6;
}

function formatValue(pre, value, options) {
  pre = pre || "";
  if (options.prefix) {
    if (value < 0) {
      value = value * -1;
      pre += "-";
    }
    pre += options.prefix;
  }

  if (options.thousands || options.decimal) {
    value = toStr(value);
    var parts = value.split(".");
    value = parts[0];
    if (options.thousands) {
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousands);
    }
    if (parts.length > 1) {
      value += (options.decimal || ".") + parts[1];
    }
  }

  return pre + value + (options.suffix || "");
}

exports.formatValue = formatValue;
exports.jsOptionsFunc = jsOptionsFunc;
exports.merge = merge;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.toStr = toStr;
exports.toFloat = toFloat;
exports.toDate = toDate;
exports.toArr = toArr;
exports.sortByTime = sortByTime;
exports.sortByNumberSeries = sortByNumberSeries;
exports.sortByNumber = sortByNumber;
exports.isMinute = isMinute;
exports.isHour = isHour;
exports.isDay = isDay;
exports.isWeek = isWeek;
exports.isMonth = isMonth;
exports.isYear = isYear;
exports.isDate = isDate;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                              * Chartkick.js
                                                                                                                                                                                                                                                                              * Create beautiful charts with one line of JavaScript
                                                                                                                                                                                                                                                                              * https://github.com/ankane/chartkick.js
                                                                                                                                                                                                                                                                              * v2.3.3
                                                                                                                                                                                                                                                                              * MIT License
                                                                                                                                                                                                                                                                              */

var _chartjs = __webpack_require__(2);

var _chartjs2 = _interopRequireDefault(_chartjs);

var _highcharts = __webpack_require__(3);

var _highcharts2 = _interopRequireDefault(_highcharts);

var _google = __webpack_require__(4);

var _google2 = _interopRequireDefault(_google);

var _helpers = __webpack_require__(0);

var _request_queue = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = window.Chartkick || {};
var adapters = [];

// helpers

function setText(element, text) {
  if (document.body.innerText) {
    element.innerText = text;
  } else {
    element.textContent = text;
  }
}

function chartError(element, message) {
  setText(element, "Error Loading Chart: " + message);
  element.style.color = "#ff0000";
}

function errorCatcher(chart) {
  try {
    chart.__render();
  } catch (err) {
    chartError(chart.element, err.message);
    throw err;
  }
}

function fetchDataSource(chart, dataSource) {
  if (typeof dataSource === "string") {
    (0, _request_queue.pushRequest)(dataSource, function (data) {
      chart.rawData = data;
      errorCatcher(chart);
    }, function (message) {
      chartError(chart.element, message);
    });
  } else {
    chart.rawData = dataSource;
    errorCatcher(chart);
  }
}

function addDownloadButton(chart) {
  var element = chart.element;
  var link = document.createElement("a");
  link.download = chart.options.download === true ? "chart.png" : chart.options.download; // http://caniuse.com/download
  link.style.position = "absolute";
  link.style.top = "20px";
  link.style.right = "20px";
  link.style.zIndex = 1000;
  link.style.lineHeight = "20px";
  link.target = "_blank"; // for safari
  var image = document.createElement("img");
  image.alt = "Download";
  image.style.border = "none";
  // icon from font-awesome
  // http://fa2png.io/
  image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==";
  link.appendChild(image);
  element.style.position = "relative";

  chart.downloadAttached = true;

  // mouseenter
  addEvent(element, "mouseover", function (e) {
    var related = e.relatedTarget;
    // check download option again to ensure it wasn't changed
    if (!related || related !== this && !childOf(this, related) && chart.options.download) {
      link.href = chart.toImage();
      element.appendChild(link);
    }
  });

  // mouseleave
  addEvent(element, "mouseout", function (e) {
    var related = e.relatedTarget;
    if (!related || related !== this && !childOf(this, related)) {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }
  });
}

// http://stackoverflow.com/questions/10149963/adding-event-listener-cross-browser
function addEvent(elem, event, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(event, fn, false);
  } else {
    elem.attachEvent("on" + event, function () {
      // set the this pointer same as addEventListener when fn is called
      return fn.call(elem, window.event);
    });
  }
}

// https://gist.github.com/shawnbot/4166283
function childOf(p, c) {
  if (p === c) return false;
  while (c && c !== p) {
    c = c.parentNode;
  }return c === p;
}

function addAdapter(adapter) {
  if (adapters.indexOf(adapter) === -1) {
    adapters.push(adapter);
  }
}

function loadAdapters() {
  if ("Chart" in window) {
    addAdapter(_chartjs2.default);
  }

  if ("Highcharts" in window) {
    addAdapter(_highcharts2.default);
  }

  if (window.google && (window.google.setOnLoadCallback || window.google.charts)) {
    addAdapter(_google2.default);
  }
}

function dataEmpty(data, chartType) {
  if (chartType === "PieChart" || chartType === "GeoChart" || chartType === "Timeline") {
    return data.length === 0;
  } else {
    for (var i = 0; i < data.length; i++) {
      if (data[i].data.length > 0) {
        return false;
      }
    }
    return true;
  }
}

function renderChart(chartType, chart) {
  if (chart.options.messages && chart.options.messages.empty && dataEmpty(chart.data, chartType)) {
    setText(chart.element, chart.options.messages.empty);
  } else {
    callAdapter(chartType, chart);
    if (chart.options.download && !chart.downloadAttached && chart.adapter === "chartjs") {
      addDownloadButton(chart);
    }
  }
}

// TODO remove chartType if cross-browser way
// to get the name of the chart class
function callAdapter(chartType, chart) {
  var i = void 0,
      adapter = void 0,
      fnName = void 0,
      adapterName = void 0;
  fnName = "render" + chartType;
  adapterName = chart.options.adapter;

  loadAdapters();

  for (i = 0; i < adapters.length; i++) {
    adapter = adapters[i];
    if ((!adapterName || adapterName === adapter.name) && (0, _helpers.isFunction)(adapter[fnName])) {
      chart.adapter = adapter.name;
      return adapter[fnName](chart);
    }
  }

  if (adapters.length > 0) {
    throw new Error("No charting library found for " + chartType);
  } else {
    throw new Error("No charting libraries found - be sure to include one before your charts");
  }
}

// process data

var toFormattedKey = function toFormattedKey(key, keyType) {
  if (keyType === "number") {
    key = (0, _helpers.toFloat)(key);
  } else if (keyType === "datetime") {
    key = (0, _helpers.toDate)(key);
  } else {
    key = (0, _helpers.toStr)(key);
  }
  return key;
};

var formatSeriesData = function formatSeriesData(data, keyType) {
  var r = [],
      key = void 0,
      j = void 0;
  for (j = 0; j < data.length; j++) {
    if (keyType === "bubble") {
      r.push([(0, _helpers.toFloat)(data[j][0]), (0, _helpers.toFloat)(data[j][1]), (0, _helpers.toFloat)(data[j][2])]);
    } else {
      key = toFormattedKey(data[j][0], keyType);
      r.push([key, (0, _helpers.toFloat)(data[j][1])]);
    }
  }
  if (keyType === "datetime") {
    r.sort(_helpers.sortByTime);
  } else if (keyType === "number") {
    r.sort(_helpers.sortByNumberSeries);
  }
  return r;
};

function detectDiscrete(series) {
  var i = void 0,
      j = void 0,
      data = void 0;
  for (i = 0; i < series.length; i++) {
    data = (0, _helpers.toArr)(series[i].data);
    for (j = 0; j < data.length; j++) {
      if (!(0, _helpers.isDate)(data[j][0])) {
        return true;
      }
    }
  }
  return false;
}

// creates a shallow copy of each element of the array
// elements are expected to be objects
function copySeries(series) {
  var newSeries = [],
      i = void 0,
      j = void 0;
  for (i = 0; i < series.length; i++) {
    var copy = {};
    for (j in series[i]) {
      if (series[i].hasOwnProperty(j)) {
        copy[j] = series[i][j];
      }
    }
    newSeries.push(copy);
  }
  return newSeries;
}

function processSeries(chart, keyType) {
  var i = void 0;

  var opts = chart.options;
  var series = chart.rawData;

  // see if one series or multiple
  if (!(0, _helpers.isArray)(series) || _typeof(series[0]) !== "object" || (0, _helpers.isArray)(series[0])) {
    series = [{ name: opts.label || "Value", data: series }];
    chart.hideLegend = true;
  } else {
    chart.hideLegend = false;
  }
  if ((opts.discrete === null || opts.discrete === undefined) && keyType !== "bubble" && keyType !== "number") {
    chart.discrete = detectDiscrete(series);
  } else {
    chart.discrete = opts.discrete;
  }
  if (chart.discrete) {
    keyType = "string";
  }
  if (chart.options.xtype) {
    keyType = chart.options.xtype;
  }

  // right format
  series = copySeries(series);
  for (i = 0; i < series.length; i++) {
    series[i].data = formatSeriesData((0, _helpers.toArr)(series[i].data), keyType);
  }

  return series;
}

function processSimple(chart) {
  var perfectData = (0, _helpers.toArr)(chart.rawData),
      i = void 0;
  for (i = 0; i < perfectData.length; i++) {
    perfectData[i] = [(0, _helpers.toStr)(perfectData[i][0]), (0, _helpers.toFloat)(perfectData[i][1])];
  }
  return perfectData;
}

// define classes

var Chart = function () {
  function Chart(element, dataSource, options) {
    _classCallCheck(this, Chart);

    var elementId = void 0;
    if (typeof element === "string") {
      elementId = element;
      element = document.getElementById(element);
      if (!element) {
        throw new Error("No element with id " + elementId);
      }
    }
    this.element = element;
    this.options = (0, _helpers.merge)(Chartkick.options, options || {});
    this.dataSource = dataSource;

    Chartkick.charts[element.id] = this;

    fetchDataSource(this, dataSource);

    if (this.options.refresh) {
      this.startRefresh();
    }
  }

  _createClass(Chart, [{
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "getDataSource",
    value: function getDataSource() {
      return this.dataSource;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: "getChartObject",
    value: function getChartObject() {
      return this.chart;
    }
  }, {
    key: "getAdapter",
    value: function getAdapter() {
      return this.adapter;
    }
  }, {
    key: "updateData",
    value: function updateData(dataSource, options) {
      this.dataSource = dataSource;
      if (options) {
        this.__updateOptions(options);
      }
      fetchDataSource(this, dataSource);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.__updateOptions(options);
      this.redraw();
    }
  }, {
    key: "redraw",
    value: function redraw() {
      fetchDataSource(this, this.rawData);
    }
  }, {
    key: "refreshData",
    value: function refreshData() {
      if (typeof this.dataSource === "string") {
        // prevent browser from caching
        var sep = this.dataSource.indexOf("?") === -1 ? "?" : "&";
        var url = this.dataSource + sep + "_=" + new Date().getTime();
        fetchDataSource(this, url);
      }
    }
  }, {
    key: "startRefresh",
    value: function startRefresh() {
      var _this = this;

      var refresh = this.options.refresh;

      if (!this.intervalId) {
        if (refresh) {
          this.intervalId = setInterval(function () {
            _this.refreshData();
          }, refresh * 1000);
        } else {
          throw new Error("No refresh interval");
        }
      }
    }
  }, {
    key: "stopRefresh",
    value: function stopRefresh() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }, {
    key: "toImage",
    value: function toImage() {
      if (this.adapter === "chartjs") {
        return this.chart.toBase64Image();
      } else {
        return null;
      }
    }
  }, {
    key: "__updateOptions",
    value: function __updateOptions(options) {
      var updateRefresh = options.refresh && options.refresh !== this.options.refresh;
      this.options = (0, _helpers.merge)(Chartkick.options, options);
      if (updateRefresh) {
        this.stopRefresh();
        this.startRefresh();
      }
    }
  }, {
    key: "__render",
    value: function __render() {
      this.data = this.__processData();
      renderChart(this.__chartName(), this);
    }
  }]);

  return Chart;
}();

var LineChart = function (_Chart) {
  _inherits(LineChart, _Chart);

  function LineChart() {
    _classCallCheck(this, LineChart);

    return _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).apply(this, arguments));
  }

  _createClass(LineChart, [{
    key: "__processData",
    value: function __processData() {
      return processSeries(this, "datetime");
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "LineChart";
    }
  }]);

  return LineChart;
}(Chart);

var PieChart = function (_Chart2) {
  _inherits(PieChart, _Chart2);

  function PieChart() {
    _classCallCheck(this, PieChart);

    return _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).apply(this, arguments));
  }

  _createClass(PieChart, [{
    key: "__processData",
    value: function __processData() {
      return processSimple(this);
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "PieChart";
    }
  }]);

  return PieChart;
}(Chart);

var ColumnChart = function (_Chart3) {
  _inherits(ColumnChart, _Chart3);

  function ColumnChart() {
    _classCallCheck(this, ColumnChart);

    return _possibleConstructorReturn(this, (ColumnChart.__proto__ || Object.getPrototypeOf(ColumnChart)).apply(this, arguments));
  }

  _createClass(ColumnChart, [{
    key: "__processData",
    value: function __processData() {
      return processSeries(this, "string");
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "ColumnChart";
    }
  }]);

  return ColumnChart;
}(Chart);

var BarChart = function (_Chart4) {
  _inherits(BarChart, _Chart4);

  function BarChart() {
    _classCallCheck(this, BarChart);

    return _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).apply(this, arguments));
  }

  _createClass(BarChart, [{
    key: "__processData",
    value: function __processData() {
      return processSeries(this, "string");
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "BarChart";
    }
  }]);

  return BarChart;
}(Chart);

var AreaChart = function (_Chart5) {
  _inherits(AreaChart, _Chart5);

  function AreaChart() {
    _classCallCheck(this, AreaChart);

    return _possibleConstructorReturn(this, (AreaChart.__proto__ || Object.getPrototypeOf(AreaChart)).apply(this, arguments));
  }

  _createClass(AreaChart, [{
    key: "__processData",
    value: function __processData() {
      return processSeries(this, "datetime");
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "AreaChart";
    }
  }]);

  return AreaChart;
}(Chart);

var GeoChart = function (_Chart6) {
  _inherits(GeoChart, _Chart6);

  function GeoChart() {
    _classCallCheck(this, GeoChart);

    return _possibleConstructorReturn(this, (GeoChart.__proto__ || Object.getPrototypeOf(GeoChart)).apply(this, arguments));
  }

  _createClass(GeoChart, [{
    key: "__processData",
    value: function __processData() {
      return processSimple(this);
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "GeoChart";
    }
  }]);

  return GeoChart;
}(Chart);

var ScatterChart = function (_Chart7) {
  _inherits(ScatterChart, _Chart7);

  function ScatterChart() {
    _classCallCheck(this, ScatterChart);

    return _possibleConstructorReturn(this, (ScatterChart.__proto__ || Object.getPrototypeOf(ScatterChart)).apply(this, arguments));
  }

  _createClass(ScatterChart, [{
    key: "__processData",
    value: function __processData() {
      return processSeries(this, "number");
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "ScatterChart";
    }
  }]);

  return ScatterChart;
}(Chart);

var BubbleChart = function (_Chart8) {
  _inherits(BubbleChart, _Chart8);

  function BubbleChart() {
    _classCallCheck(this, BubbleChart);

    return _possibleConstructorReturn(this, (BubbleChart.__proto__ || Object.getPrototypeOf(BubbleChart)).apply(this, arguments));
  }

  _createClass(BubbleChart, [{
    key: "__processData",
    value: function __processData() {
      return processSeries(this, "bubble");
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "BubbleChart";
    }
  }]);

  return BubbleChart;
}(Chart);

var Timeline = function (_Chart9) {
  _inherits(Timeline, _Chart9);

  function Timeline() {
    _classCallCheck(this, Timeline);

    return _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
  }

  _createClass(Timeline, [{
    key: "__processData",
    value: function __processData() {
      var i = void 0,
          data = this.rawData;
      for (i = 0; i < data.length; i++) {
        data[i][1] = (0, _helpers.toDate)(data[i][1]);
        data[i][2] = (0, _helpers.toDate)(data[i][2]);
      }
      return data;
    }
  }, {
    key: "__chartName",
    value: function __chartName() {
      return "Timeline";
    }
  }]);

  return Timeline;
}(Chart);

var Chartkick = {
  LineChart: LineChart,
  PieChart: PieChart,
  ColumnChart: ColumnChart,
  BarChart: BarChart,
  AreaChart: AreaChart,
  GeoChart: GeoChart,
  ScatterChart: ScatterChart,
  BubbleChart: BubbleChart,
  Timeline: Timeline,
  charts: {},
  configure: function configure(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        Chartkick.config[key] = options[key];
      }
    }
  },
  eachChart: function eachChart(callback) {
    for (var chartId in Chartkick.charts) {
      if (Chartkick.charts.hasOwnProperty(chartId)) {
        callback(Chartkick.charts[chartId]);
      }
    }
  },
  config: config,
  options: {},
  adapters: adapters
};

exports.default = Chartkick;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

function allZeros(data) {
  var i = void 0,
      j = void 0,
      d = void 0;
  for (i = 0; i < data.length; i++) {
    d = data[i].data;
    for (j = 0; j < d.length; j++) {
      if (d[j][1] != 0) {
        return false;
      }
    }
  }
  return true;
}

var baseOptions = {
  maintainAspectRatio: false,
  animation: false,
  tooltips: {
    displayColors: false,
    callbacks: {}
  },
  legend: {},
  title: { fontSize: 20, fontColor: "#333" }
};

var defaultOptions = {
  scales: {
    yAxes: [{
      ticks: {
        maxTicksLimit: 4
      },
      scaleLabel: {
        fontSize: 16,
        // fontStyle: "bold",
        fontColor: "#333"
      }
    }],
    xAxes: [{
      gridLines: {
        drawOnChartArea: false
      },
      scaleLabel: {
        fontSize: 16,
        // fontStyle: "bold",
        fontColor: "#333"
      },
      time: {},
      ticks: {}
    }]
  }
};

// http://there4.io/2012/05/02/google-chart-color-list/
var defaultColors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"];

var hideLegend = function hideLegend(options, legend, _hideLegend) {
  if (legend !== undefined) {
    options.legend.display = !!legend;
    if (legend && legend !== true) {
      options.legend.position = legend;
    }
  } else if (_hideLegend) {
    options.legend.display = false;
  }
};

var setTitle = function setTitle(options, title) {
  options.title.display = true;
  options.title.text = title;
};

var setMin = function setMin(options, min) {
  if (min !== null) {
    options.scales.yAxes[0].ticks.min = (0, _helpers.toFloat)(min);
  }
};

var setMax = function setMax(options, max) {
  options.scales.yAxes[0].ticks.max = (0, _helpers.toFloat)(max);
};

var setBarMin = function setBarMin(options, min) {
  if (min !== null) {
    options.scales.xAxes[0].ticks.min = (0, _helpers.toFloat)(min);
  }
};

var setBarMax = function setBarMax(options, max) {
  options.scales.xAxes[0].ticks.max = (0, _helpers.toFloat)(max);
};

var setStacked = function setStacked(options, stacked) {
  options.scales.xAxes[0].stacked = !!stacked;
  options.scales.yAxes[0].stacked = !!stacked;
};

var setXtitle = function setXtitle(options, title) {
  options.scales.xAxes[0].scaleLabel.display = true;
  options.scales.xAxes[0].scaleLabel.labelString = title;
};

var setYtitle = function setYtitle(options, title) {
  options.scales.yAxes[0].scaleLabel.display = true;
  options.scales.yAxes[0].scaleLabel.labelString = title;
};

var drawChart = function drawChart(chart, type, data, options) {
  if (chart.chart) {
    chart.chart.destroy();
  } else {
    chart.element.innerHTML = "<canvas></canvas>";
  }

  var ctx = chart.element.getElementsByTagName("CANVAS")[0];
  chart.chart = new window.Chart(ctx, {
    type: type,
    data: data,
    options: options
  });
};

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
var addOpacity = function addOpacity(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? "rgba(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", " + opacity + ")" : hex;
};

var setLabelSize = function setLabelSize(chart, data, options) {
  var maxLabelSize = Math.ceil(chart.element.offsetWidth / 4.0 / data.labels.length);
  if (maxLabelSize > 25) {
    maxLabelSize = 25;
  }
  options.scales.xAxes[0].ticks.callback = function (value) {
    value = (0, _helpers.toStr)(value);
    if (value.length > maxLabelSize) {
      return value.substring(0, maxLabelSize - 2) + "...";
    } else {
      return value;
    }
  };
};

var setFormatOptions = function setFormatOptions(chart, options, chartType) {
  var formatOptions = {
    prefix: chart.options.prefix,
    suffix: chart.options.suffix,
    thousands: chart.options.thousands,
    decimal: chart.options.decimal
  };

  if (formatOptions.prefix || formatOptions.suffix || formatOptions.thousands || formatOptions.decimal) {
    if (chartType !== "pie") {
      var myAxes = options.scales.yAxes;
      if (chartType === "bar") {
        myAxes = options.scales.xAxes;
      }

      if (!myAxes[0].ticks.callback) {
        myAxes[0].ticks.callback = function (value) {
          return (0, _helpers.formatValue)("", value, formatOptions);
        };
      }
    }

    if (!options.tooltips.callbacks.label) {
      if (chartType !== "pie") {
        var valueLabel = chartType === "bar" ? "xLabel" : "yLabel";
        options.tooltips.callbacks.label = function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          return (0, _helpers.formatValue)(label, tooltipItem[valueLabel], formatOptions);
        };
      } else {
        // need to use separate label for pie charts
        options.tooltips.callbacks.label = function (tooltipItem, data) {
          var dataLabel = data.labels[tooltipItem.index];
          var value = ': ';

          if ((0, _helpers.isArray)(dataLabel)) {
            // show value on first line of multiline label
            // need to clone because we are changing the value
            dataLabel = dataLabel.slice();
            dataLabel[0] += value;
          } else {
            dataLabel += value;
          }

          return (0, _helpers.formatValue)(dataLabel, data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], formatOptions);
        };
      }
    }
  }
};

var jsOptions = (0, _helpers.jsOptionsFunc)((0, _helpers.merge)(baseOptions, defaultOptions), hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

var createDataTable = function createDataTable(chart, options, chartType) {
  var datasets = [];
  var labels = [];

  var colors = chart.options.colors || defaultColors;

  var day = true;
  var week = true;
  var dayOfWeek = void 0;
  var month = true;
  var year = true;
  var hour = true;
  var minute = true;
  var detectType = (chartType === "line" || chartType === "area") && !chart.discrete;

  var series = chart.data;

  var sortedLabels = [];

  var i = void 0,
      j = void 0,
      s = void 0,
      d = void 0,
      key = void 0,
      rows = [];
  for (i = 0; i < series.length; i++) {
    s = series[i];

    for (j = 0; j < s.data.length; j++) {
      d = s.data[j];
      key = detectType ? d[0].getTime() : d[0];
      if (!rows[key]) {
        rows[key] = new Array(series.length);
      }
      rows[key][i] = (0, _helpers.toFloat)(d[1]);
      if (sortedLabels.indexOf(key) === -1) {
        sortedLabels.push(key);
      }
    }
  }

  if (detectType || chart.options.xtype === "number") {
    sortedLabels.sort(_helpers.sortByNumber);
  }

  var rows2 = [];
  for (j = 0; j < series.length; j++) {
    rows2.push([]);
  }

  var value = void 0;
  var k = void 0;
  for (k = 0; k < sortedLabels.length; k++) {
    i = sortedLabels[k];
    if (detectType) {
      value = new Date((0, _helpers.toFloat)(i));
      // TODO make this efficient
      day = day && (0, _helpers.isDay)(value);
      if (!dayOfWeek) {
        dayOfWeek = value.getDay();
      }
      week = week && (0, _helpers.isWeek)(value, dayOfWeek);
      month = month && (0, _helpers.isMonth)(value);
      year = year && (0, _helpers.isYear)(value);
      hour = hour && (0, _helpers.isHour)(value);
      minute = minute && (0, _helpers.isMinute)(value);
    } else {
      value = i;
    }
    labels.push(value);
    for (j = 0; j < series.length; j++) {
      // Chart.js doesn't like undefined
      rows2[j].push(rows[i][j] === undefined ? null : rows[i][j]);
    }
  }

  for (i = 0; i < series.length; i++) {
    s = series[i];

    var color = s.color || colors[i];
    var backgroundColor = chartType !== "line" ? addOpacity(color, 0.5) : color;

    var dataset = {
      label: s.name,
      data: rows2[i],
      fill: chartType === "area",
      borderColor: color,
      backgroundColor: backgroundColor,
      pointBackgroundColor: color,
      borderWidth: 2
    };

    if (s.stack) {
      dataset.stack = s.stack;
    }

    if (chart.options.curve === false) {
      dataset.lineTension = 0;
    }

    if (chart.options.points === false) {
      dataset.pointRadius = 0;
      dataset.pointHitRadius = 5;
    }

    datasets.push((0, _helpers.merge)(dataset, s.library || {}));
  }

  if (detectType && labels.length > 0) {
    var minTime = labels[0].getTime();
    var maxTime = labels[0].getTime();
    for (i = 1; i < labels.length; i++) {
      value = labels[i].getTime();
      if (value < minTime) {
        minTime = value;
      }
      if (value > maxTime) {
        maxTime = value;
      }
    }

    var timeDiff = (maxTime - minTime) / (86400 * 1000.0);

    if (!options.scales.xAxes[0].time.unit) {
      var step = void 0;
      if (year || timeDiff > 365 * 10) {
        options.scales.xAxes[0].time.unit = "year";
        step = 365;
      } else if (month || timeDiff > 30 * 10) {
        options.scales.xAxes[0].time.unit = "month";
        step = 30;
      } else if (day || timeDiff > 10) {
        options.scales.xAxes[0].time.unit = "day";
        step = 1;
      } else if (hour || timeDiff > 0.5) {
        options.scales.xAxes[0].time.displayFormats = { hour: "MMM D, h a" };
        options.scales.xAxes[0].time.unit = "hour";
        step = 1 / 24.0;
      } else if (minute) {
        options.scales.xAxes[0].time.displayFormats = { minute: "h:mm a" };
        options.scales.xAxes[0].time.unit = "minute";
        step = 1 / 24.0 / 60.0;
      }

      if (step && timeDiff > 0) {
        var unitStepSize = Math.ceil(timeDiff / step / (chart.element.offsetWidth / 100.0));
        if (week && step === 1) {
          unitStepSize = Math.ceil(unitStepSize / 7.0) * 7;
        }
        options.scales.xAxes[0].time.unitStepSize = unitStepSize;
      }
    }

    if (!options.scales.xAxes[0].time.tooltipFormat) {
      if (day) {
        options.scales.xAxes[0].time.tooltipFormat = "ll";
      } else if (hour) {
        options.scales.xAxes[0].time.tooltipFormat = "MMM D, h a";
      } else if (minute) {
        options.scales.xAxes[0].time.tooltipFormat = "h:mm a";
      }
    }
  }

  var data = {
    labels: labels,
    datasets: datasets
  };

  return data;
};

var renderLineChart = function renderLineChart(chart, chartType) {
  if (chart.options.xtype === "number") {
    return renderScatterChart(chart, chartType, true);
  }

  var chartOptions = {};
  if (chartType === "area") {}
  // TODO fix area stacked
  // chartOptions.stacked = true;

  // fix for https://github.com/chartjs/Chart.js/issues/2441
  if (!chart.options.max && allZeros(chart.data)) {
    chartOptions.max = 1;
  }

  var options = jsOptions(chart, (0, _helpers.merge)(chartOptions, chart.options));
  setFormatOptions(chart, options, chartType);

  var data = createDataTable(chart, options, chartType || "line");

  options.scales.xAxes[0].type = chart.discrete ? "category" : "time";

  drawChart(chart, "line", data, options);
};

var renderPieChart = function renderPieChart(chart) {
  var options = (0, _helpers.merge)({}, baseOptions);
  if (chart.options.donut) {
    options.cutoutPercentage = 50;
  }

  if ("legend" in chart.options) {
    hideLegend(options, chart.options.legend);
  }

  if (chart.options.title) {
    setTitle(options, chart.options.title);
  }

  options = (0, _helpers.merge)(options, chart.options.library || {});
  setFormatOptions(chart, options, "pie");

  var labels = [];
  var values = [];
  for (var i = 0; i < chart.data.length; i++) {
    var point = chart.data[i];
    labels.push(point[0]);
    values.push(point[1]);
  }

  var data = {
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: chart.options.colors || defaultColors
    }]
  };

  drawChart(chart, "pie", data, options);
};

var renderColumnChart = function renderColumnChart(chart, chartType) {
  var options = void 0;
  if (chartType === "bar") {
    options = (0, _helpers.jsOptionsFunc)((0, _helpers.merge)(baseOptions, defaultOptions), hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options);
  } else {
    options = jsOptions(chart, chart.options);
  }
  setFormatOptions(chart, options, chartType);
  var data = createDataTable(chart, options, "column");
  if (chartType !== "bar") {
    setLabelSize(chart, data, options);
  }
  drawChart(chart, chartType === "bar" ? "horizontalBar" : "bar", data, options);
};

var renderAreaChart = function renderAreaChart(chart) {
  renderLineChart(chart, "area");
};

var renderBarChart = function renderBarChart(chart) {
  renderColumnChart(chart, "bar");
};

var renderScatterChart = function renderScatterChart(chart, chartType, lineChart) {
  chartType = chartType || "line";

  var options = jsOptions(chart, chart.options);
  if (!lineChart) {
    setFormatOptions(chart, options, chartType);
  }

  var colors = chart.options.colors || defaultColors;

  var datasets = [];
  var series = chart.data;
  for (var i = 0; i < series.length; i++) {
    var s = series[i];
    var d = [];
    for (var j = 0; j < s.data.length; j++) {
      var point = {
        x: (0, _helpers.toFloat)(s.data[j][0]),
        y: (0, _helpers.toFloat)(s.data[j][1])
      };
      if (chartType === "bubble") {
        point.r = (0, _helpers.toFloat)(s.data[j][2]);
      }
      d.push(point);
    }

    var color = s.color || colors[i];
    var backgroundColor = chartType === "area" ? addOpacity(color, 0.5) : color;

    datasets.push({
      label: s.name,
      showLine: lineChart || false,
      data: d,
      borderColor: color,
      backgroundColor: backgroundColor,
      pointBackgroundColor: color,
      fill: chartType === "area"
    });
  }

  if (chartType === "area") {
    chartType = "line";
  }

  var data = { datasets: datasets };

  options.scales.xAxes[0].type = "linear";
  options.scales.xAxes[0].position = "bottom";

  drawChart(chart, chartType, data, options);
};

var renderBubbleChart = function renderBubbleChart(chart) {
  renderScatterChart(chart, "bubble");
};

exports.default = {
  name: "chartjs",
  renderLineChart: renderLineChart,
  renderPieChart: renderPieChart,
  renderColumnChart: renderColumnChart,
  renderBarChart: renderBarChart,
  renderAreaChart: renderAreaChart,
  renderScatterChart: renderScatterChart,
  renderBubbleChart: renderBubbleChart
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var defaultOptions = {
  chart: {},
  xAxis: {
    title: {
      text: null
    },
    labels: {
      style: {
        fontSize: "12px"
      }
    }
  },
  yAxis: {
    title: {
      text: null
    },
    labels: {
      style: {
        fontSize: "12px"
      }
    }
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  legend: {
    borderWidth: 0
  },
  tooltip: {
    style: {
      fontSize: "12px"
    }
  },
  plotOptions: {
    areaspline: {},
    series: {
      marker: {}
    }
  }
};

var hideLegend = function hideLegend(options, legend, _hideLegend) {
  if (legend !== undefined) {
    options.legend.enabled = !!legend;
    if (legend && legend !== true) {
      if (legend === "top" || legend === "bottom") {
        options.legend.verticalAlign = legend;
      } else {
        options.legend.layout = "vertical";
        options.legend.verticalAlign = "middle";
        options.legend.align = legend;
      }
    }
  } else if (_hideLegend) {
    options.legend.enabled = false;
  }
};

var setTitle = function setTitle(options, title) {
  options.title.text = title;
};

var setMin = function setMin(options, min) {
  options.yAxis.min = min;
};

var setMax = function setMax(options, max) {
  options.yAxis.max = max;
};

var setStacked = function setStacked(options, stacked) {
  options.plotOptions.series.stacking = stacked ? stacked === true ? "normal" : stacked : null;
};

var setXtitle = function setXtitle(options, title) {
  options.xAxis.title.text = title;
};

var setYtitle = function setYtitle(options, title) {
  options.yAxis.title.text = title;
};

var jsOptions = (0, _helpers.jsOptionsFunc)(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

var drawChart = function drawChart(chart, data, options) {
  if (chart.chart) {
    chart.chart.destroy();
  }

  options.chart.renderTo = chart.element.id;
  options.series = data;
  chart.chart = new window.Highcharts.Chart(options);
};

var setFormatOptions = function setFormatOptions(chart, options, chartType) {
  var formatOptions = {
    prefix: chart.options.prefix,
    suffix: chart.options.suffix,
    thousands: chart.options.thousands,
    decimal: chart.options.decimal
  };

  if (formatOptions.prefix || formatOptions.suffix || formatOptions.thousands || formatOptions.decimal) {
    if (chartType !== "pie" && !options.yAxis.labels.formatter) {
      options.yAxis.labels.formatter = function () {
        return (0, _helpers.formatValue)("", this.value, formatOptions);
      };
    }

    if (!options.tooltip.pointFormatter) {
      options.tooltip.pointFormatter = function () {
        return '<span style="color:' + this.color + ">\u25CF</span> " + (0, _helpers.formatValue)(this.series.name + ': <b>', this.y, formatOptions) + '</b><br/>';
      };
    }
  }
};

var renderLineChart = function renderLineChart(chart, chartType) {
  chartType = chartType || "spline";
  var chartOptions = {};
  if (chartType === "areaspline") {
    chartOptions = {
      plotOptions: {
        areaspline: {
          stacking: "normal"
        },
        area: {
          stacking: "normal"
        },
        series: {
          marker: {
            enabled: false
          }
        }
      }
    };
  }

  if (chart.options.curve === false) {
    if (chartType === "areaspline") {
      chartType = "area";
    } else if (chartType === "spline") {
      chartType = "line";
    }
  }

  var options = jsOptions(chart, chart.options, chartOptions),
      data = void 0,
      i = void 0,
      j = void 0;
  options.xAxis.type = chart.discrete ? "category" : "datetime";
  if (!options.chart.type) {
    options.chart.type = chartType;
  }
  setFormatOptions(chart, options, chartType);

  var series = chart.data;
  for (i = 0; i < series.length; i++) {
    data = series[i].data;
    if (!chart.discrete) {
      for (j = 0; j < data.length; j++) {
        data[j][0] = data[j][0].getTime();
      }
    }
    series[i].marker = { symbol: "circle" };
    if (chart.options.points === false) {
      series[i].marker.enabled = false;
    }
  }

  drawChart(chart, series, options);
};

var renderScatterChart = function renderScatterChart(chart) {
  var options = jsOptions(chart, chart.options, {});
  options.chart.type = "scatter";
  drawChart(chart, chart.data, options);
};

var renderPieChart = function renderPieChart(chart) {
  var chartOptions = (0, _helpers.merge)(defaultOptions, {});

  if (chart.options.colors) {
    chartOptions.colors = chart.options.colors;
  }
  if (chart.options.donut) {
    chartOptions.plotOptions = { pie: { innerSize: "50%" } };
  }

  if ("legend" in chart.options) {
    hideLegend(chartOptions, chart.options.legend);
  }

  if (chart.options.title) {
    setTitle(chartOptions, chart.options.title);
  }

  var options = (0, _helpers.merge)(chartOptions, chart.options.library || {});
  setFormatOptions(chart, options, "pie");
  var series = [{
    type: "pie",
    name: chart.options.label || "Value",
    data: chart.data
  }];

  drawChart(chart, series, options);
};

var renderColumnChart = function renderColumnChart(chart, chartType) {
  chartType = chartType || "column";
  var series = chart.data;
  var options = jsOptions(chart, chart.options),
      i = void 0,
      j = void 0,
      s = void 0,
      d = void 0,
      rows = [],
      categories = [];
  options.chart.type = chartType;
  setFormatOptions(chart, options, chartType);

  for (i = 0; i < series.length; i++) {
    s = series[i];

    for (j = 0; j < s.data.length; j++) {
      d = s.data[j];
      if (!rows[d[0]]) {
        rows[d[0]] = new Array(series.length);
        categories.push(d[0]);
      }
      rows[d[0]][i] = d[1];
    }
  }

  if (chart.options.xtype === "number") {
    categories.sort(_helpers.sortByNumber);
  }

  options.xAxis.categories = categories;

  var newSeries = [],
      d2 = void 0;
  for (i = 0; i < series.length; i++) {
    d = [];
    for (j = 0; j < categories.length; j++) {
      d.push(rows[categories[j]][i] || 0);
    }

    d2 = {
      name: series[i].name,
      data: d
    };
    if (series[i].stack) {
      d2.stack = series[i].stack;
    }

    newSeries.push(d2);
  }

  drawChart(chart, newSeries, options);
};

var renderBarChart = function renderBarChart(chart) {
  renderColumnChart(chart, "bar");
};

var renderAreaChart = function renderAreaChart(chart) {
  renderLineChart(chart, "areaspline");
};

exports.default = {
  name: "highcharts",
  renderLineChart: renderLineChart,
  renderPieChart: renderPieChart,
  renderColumnChart: renderColumnChart,
  renderBarChart: renderBarChart,
  renderAreaChart: renderAreaChart,
  renderScatterChart: renderScatterChart
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var loaded = {};
var callbacks = [];

var runCallbacks = function runCallbacks() {
  var cb = void 0,
      call = void 0;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    call = window.google.visualization && (cb.pack === "corechart" && window.google.visualization.LineChart || cb.pack === "timeline" && window.google.visualization.Timeline);
    if (call) {
      cb.callback();
      callbacks.splice(i, 1);
      i--;
    }
  }
};

var waitForLoaded = function waitForLoaded(pack, callback) {
  if (!callback) {
    callback = pack;
    pack = "corechart";
  }

  callbacks.push({ pack: pack, callback: callback });

  if (loaded[pack]) {
    runCallbacks();
  } else {
    loaded[pack] = true;

    // https://groups.google.com/forum/#!topic/google-visualization-api/fMKJcyA2yyI
    var loadOptions = {
      packages: [pack],
      callback: runCallbacks
    };
    var config = window.Chartkick.config;
    if (config.language) {
      loadOptions.language = config.language;
    }
    if (pack === "corechart" && config.mapsApiKey) {
      loadOptions.mapsApiKey = config.mapsApiKey;
    }

    if (window.google.setOnLoadCallback) {
      window.google.load("visualization", "1", loadOptions);
    } else {
      window.google.charts.load("current", loadOptions);
    }
  }
};

// Set chart options
var defaultOptions = {
  chartArea: {},
  fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
  pointSize: 6,
  legend: {
    textStyle: {
      fontSize: 12,
      color: "#444"
    },
    alignment: "center",
    position: "right"
  },
  curveType: "function",
  hAxis: {
    textStyle: {
      color: "#666",
      fontSize: 12
    },
    titleTextStyle: {},
    gridlines: {
      color: "transparent"
    },
    baselineColor: "#ccc",
    viewWindow: {}
  },
  vAxis: {
    textStyle: {
      color: "#666",
      fontSize: 12
    },
    titleTextStyle: {},
    baselineColor: "#ccc",
    viewWindow: {}
  },
  tooltip: {
    textStyle: {
      color: "#666",
      fontSize: 12
    }
  }
};

var hideLegend = function hideLegend(options, legend, _hideLegend) {
  if (legend !== undefined) {
    var position = void 0;
    if (!legend) {
      position = "none";
    } else if (legend === true) {
      position = "right";
    } else {
      position = legend;
    }
    options.legend.position = position;
  } else if (_hideLegend) {
    options.legend.position = "none";
  }
};

var setTitle = function setTitle(options, title) {
  options.title = title;
  options.titleTextStyle = { color: "#333", fontSize: "20px" };
};

var setMin = function setMin(options, min) {
  options.vAxis.viewWindow.min = min;
};

var setMax = function setMax(options, max) {
  options.vAxis.viewWindow.max = max;
};

var setBarMin = function setBarMin(options, min) {
  options.hAxis.viewWindow.min = min;
};

var setBarMax = function setBarMax(options, max) {
  options.hAxis.viewWindow.max = max;
};

var setStacked = function setStacked(options, stacked) {
  options.isStacked = stacked ? stacked : false;
};

var setXtitle = function setXtitle(options, title) {
  options.hAxis.title = title;
  options.hAxis.titleTextStyle.italic = false;
};

var setYtitle = function setYtitle(options, title) {
  options.vAxis.title = title;
  options.vAxis.titleTextStyle.italic = false;
};

var jsOptions = (0, _helpers.jsOptionsFunc)(defaultOptions, hideLegend, setTitle, setMin, setMax, setStacked, setXtitle, setYtitle);

// cant use object as key
var createDataTable = function createDataTable(series, columnType, xtype) {
  var i = void 0,
      j = void 0,
      s = void 0,
      d = void 0,
      key = void 0,
      rows = [],
      sortedLabels = [];
  for (i = 0; i < series.length; i++) {
    s = series[i];

    for (j = 0; j < s.data.length; j++) {
      d = s.data[j];
      key = columnType === "datetime" ? d[0].getTime() : d[0];
      if (!rows[key]) {
        rows[key] = new Array(series.length);
        sortedLabels.push(key);
      }
      rows[key][i] = (0, _helpers.toFloat)(d[1]);
    }
  }

  var rows2 = [];
  var day = true;
  var value = void 0;
  for (j = 0; j < sortedLabels.length; j++) {
    i = sortedLabels[j];
    if (columnType === "datetime") {
      value = new Date((0, _helpers.toFloat)(i));
      day = day && (0, _helpers.isDay)(value);
    } else if (columnType === "number") {
      value = (0, _helpers.toFloat)(i);
    } else {
      value = i;
    }
    rows2.push([value].concat(rows[i]));
  }
  if (columnType === "datetime") {
    rows2.sort(_helpers.sortByTime);
  } else if (columnType === "number") {
    rows2.sort(_helpers.sortByNumberSeries);
  }

  if (xtype === "number") {
    rows2.sort(_helpers.sortByNumberSeries);

    for (i = 0; i < rows2.length; i++) {
      rows2[i][0] = (0, _helpers.toStr)(rows2[i][0]);
    }
  }

  // create datatable
  var data = new window.google.visualization.DataTable();
  columnType = columnType === "datetime" && day ? "date" : columnType;
  data.addColumn(columnType, "");
  for (i = 0; i < series.length; i++) {
    data.addColumn("number", series[i].name);
  }
  data.addRows(rows2);

  return data;
};

var resize = function resize(callback) {
  if (window.attachEvent) {
    window.attachEvent("onresize", callback);
  } else if (window.addEventListener) {
    window.addEventListener("resize", callback, true);
  }
  callback();
};

var drawChart = function drawChart(chart, type, data, options) {
  if (chart.chart) {
    chart.chart.clearChart();
  }

  chart.chart = new type(chart.element);
  resize(function () {
    chart.chart.draw(data, options);
  });
};

var renderLineChart = function renderLineChart(chart) {
  waitForLoaded(function () {
    var chartOptions = {};

    if (chart.options.curve === false) {
      chartOptions.curveType = "none";
    }

    if (chart.options.points === false) {
      chartOptions.pointSize = 0;
    }

    var options = jsOptions(chart, chart.options, chartOptions);
    var columnType = chart.discrete ? "string" : "datetime";
    if (chart.options.xtype === "number") {
      columnType = "number";
    }
    var data = createDataTable(chart.data, columnType);

    drawChart(chart, window.google.visualization.LineChart, data, options);
  });
};

var renderPieChart = function renderPieChart(chart) {
  waitForLoaded(function () {
    var chartOptions = {
      chartArea: {
        top: "10%",
        height: "80%"
      },
      legend: {}
    };
    if (chart.options.colors) {
      chartOptions.colors = chart.options.colors;
    }
    if (chart.options.donut) {
      chartOptions.pieHole = 0.5;
    }
    if ("legend" in chart.options) {
      hideLegend(chartOptions, chart.options.legend);
    }
    if (chart.options.title) {
      setTitle(chartOptions, chart.options.title);
    }
    var options = (0, _helpers.merge)((0, _helpers.merge)(defaultOptions, chartOptions), chart.options.library || {});

    var data = new window.google.visualization.DataTable();
    data.addColumn("string", "");
    data.addColumn("number", "Value");
    data.addRows(chart.data);

    drawChart(chart, window.google.visualization.PieChart, data, options);
  });
};

var renderColumnChart = function renderColumnChart(chart) {
  waitForLoaded(function () {
    var options = jsOptions(chart, chart.options);
    var data = createDataTable(chart.data, "string", chart.options.xtype);

    drawChart(chart, window.google.visualization.ColumnChart, data, options);
  });
};

var renderBarChart = function renderBarChart(chart) {
  waitForLoaded(function () {
    var chartOptions = {
      hAxis: {
        gridlines: {
          color: "#ccc"
        }
      }
    };
    var options = (0, _helpers.jsOptionsFunc)(defaultOptions, hideLegend, setTitle, setBarMin, setBarMax, setStacked, setXtitle, setYtitle)(chart, chart.options, chartOptions);
    var data = createDataTable(chart.data, "string", chart.options.xtype);

    drawChart(chart, window.google.visualization.BarChart, data, options);
  });
};

var renderAreaChart = function renderAreaChart(chart) {
  waitForLoaded(function () {
    var chartOptions = {
      isStacked: true,
      pointSize: 0,
      areaOpacity: 0.5
    };

    var options = jsOptions(chart, chart.options, chartOptions);
    var columnType = chart.discrete ? "string" : "datetime";
    if (chart.options.xtype === "number") {
      columnType = "number";
    }
    var data = createDataTable(chart.data, columnType);

    drawChart(chart, window.google.visualization.AreaChart, data, options);
  });
};

var renderGeoChart = function renderGeoChart(chart) {
  waitForLoaded(function () {
    var chartOptions = {
      legend: "none",
      colorAxis: {
        colors: chart.options.colors || ["#f6c7b6", "#ce502d"]
      }
    };
    var options = (0, _helpers.merge)((0, _helpers.merge)(defaultOptions, chartOptions), chart.options.library || {});

    var data = new window.google.visualization.DataTable();
    data.addColumn("string", "");
    data.addColumn("number", chart.options.label || "Value");
    data.addRows(chart.data);

    drawChart(chart, window.google.visualization.GeoChart, data, options);
  });
};

var renderScatterChart = function renderScatterChart(chart) {
  waitForLoaded(function () {
    var chartOptions = {};
    var options = jsOptions(chart, chart.options, chartOptions);

    var series = chart.data,
        rows2 = [],
        i = void 0,
        j = void 0,
        data = void 0,
        d = void 0;
    for (i = 0; i < series.length; i++) {
      d = series[i].data;
      for (j = 0; j < d.length; j++) {
        var row = new Array(series.length + 1);
        row[0] = d[j][0];
        row[i + 1] = d[j][1];
        rows2.push(row);
      }
    }

    data = new window.google.visualization.DataTable();
    data.addColumn("number", "");
    for (i = 0; i < series.length; i++) {
      data.addColumn("number", series[i].name);
    }
    data.addRows(rows2);

    drawChart(chart, window.google.visualization.ScatterChart, data, options);
  });
};

var renderTimeline = function renderTimeline(chart) {
  waitForLoaded("timeline", function () {
    var chartOptions = {
      legend: "none"
    };

    if (chart.options.colors) {
      chartOptions.colors = chart.options.colors;
    }
    var options = (0, _helpers.merge)((0, _helpers.merge)(defaultOptions, chartOptions), chart.options.library || {});

    var data = new window.google.visualization.DataTable();
    data.addColumn({ type: "string", id: "Name" });
    data.addColumn({ type: "date", id: "Start" });
    data.addColumn({ type: "date", id: "End" });
    data.addRows(chart.data);

    chart.element.style.lineHeight = "normal";

    drawChart(chart, window.google.visualization.Timeline, data, options);
  });
};

exports.default = {
  name: "google",
  renderLineChart: renderLineChart,
  renderPieChart: renderPieChart,
  renderColumnChart: renderColumnChart,
  renderBarChart: renderBarChart,
  renderAreaChart: renderAreaChart,
  renderScatterChart: renderScatterChart,
  renderGeoChart: renderGeoChart,
  renderTimeline: renderTimeline
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pendingRequests = [],
    runningRequests = 0,
    maxRequests = 4;

function pushRequest(url, success, error) {
  pendingRequests.push([url, success, error]);
  runNext();
}

function runNext() {
  if (runningRequests < maxRequests) {
    var request = pendingRequests.shift();
    if (request) {
      runningRequests++;
      getJSON(request[0], request[1], request[2]);
      runNext();
    }
  }
}

function requestComplete() {
  runningRequests--;
  runNext();
}

function getJSON(url, success, error) {
  ajaxCall(url, success, function (jqXHR, textStatus, errorThrown) {
    var message = typeof errorThrown === "string" ? errorThrown : errorThrown.message;
    error(message);
  });
}

function ajaxCall(url, success, error) {
  var $ = window.jQuery || window.Zepto || window.$;

  if ($) {
    $.ajax({
      dataType: "json",
      url: url,
      success: success,
      error: error,
      complete: requestComplete
    });
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      requestComplete();
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText), xhr.statusText, xhr);
      } else {
        error(xhr, "error", xhr.statusText);
      }
    };
    xhr.send();
  }
}

exports.pushRequest = pushRequest;

/***/ })
/******/ ])["default"];
});

/*
 * Chartkick.js
 * Create beautiful Javascript charts with minimal code
 * https://github.com/ankane/chartkick.js
 * v1.0.2
 * MIT License
 */

/*jslint browser: true, indent: 2, plusplus: true */
/*global google, $*/

(function() {
  'use strict';

  // helpers

  function isArray(variable) {
    return Object.prototype.toString.call(variable) === "[object Array]";
  }

  function isPlainObject(variable) {
    return variable instanceof Object;
  }

  // https://github.com/madrobby/zepto/blob/master/src/zepto.js
  function extend(target, source) {
    var key;
    for (key in source) {
      if (isPlainObject(source[key]) || isArray(source[key])) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
          target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])) {
          target[key] = [];
        }
        extend(target[key], source[key]);
      }
      else if (source[key] !== undefined) {
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

  // https://github.com/Do/iso8601.js
  var ISO8601_PATTERN = /(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i;
  var DECIMAL_SEPARATOR = String(1.5).charAt(1);

  function parseISO8601(input) {
    var day, hour, matches, milliseconds, minutes, month, offset, result, seconds, type, year;
    type = Object.prototype.toString.call(input);
    if (type === '[object Date]') {
      return input;
    }
    if (type !== '[object String]') {
      return;
    }
    if (matches = input.match(ISO8601_PATTERN)) {
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
        offset *= matches[14] === '-' ? -1 : 1;
        result -= offset * 60 * 1000;
      }
      return new Date(result);
    }
  }
  // end iso8601.js

  function negativeValues(series) {
    var i, j, data;
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

  function jsOptionsFunc(defaultOptions, hideLegend, setMin, setMax) {
    return function(series, opts) {
      var options = merge({}, defaultOptions);

      // hide legend
      // this is *not* an external option!
      if (opts.hideLegend) {
        hideLegend(options);
      }

      // min
      if ("min" in opts) {
        setMin(options, opts.min);
      }
      else if (!negativeValues(series)) {
        setMin(options, 0);
      }

      // max
      if ("max" in opts) {
        setMax(options, opts.max);
      }

      // merge library last
      options = merge(options, opts.library || {});

      return options;
    };
  }

  // only functions that need defined specific to charting library
  var renderLineChart, renderPieChart, renderColumnChart;

  if ("Highcharts" in window) {

    var defaultOptions = {
      xAxis: {
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
      }
    };

    var hideLegend = function(options) {
      options.legend.enabled = false;
    };

    var setMin = function(options, min) {
      options.yAxis.min = min;
    };

    var setMax = function(options, max) {
      options.yAxis.max = max;
    };

    var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setMin, setMax);

    renderLineChart = function(element, series, opts) {
      var options = jsOptions(series, opts), data, i, j;
      options.xAxis.type = "datetime";
      options.chart = {type: "spline", renderTo: element.id};

      for (i = 0; i < series.length; i++) {
        data = series[i].data;
        for (j = 0; j < data.length; j++) {
          data[j][0] = data[j][0].getTime();
        }
        series[i].marker = {symbol: "circle"};
      }
      options.series = series;
      new Highcharts.Chart(options);
    };

    renderPieChart = function(element, series, opts) {
      var options = merge(defaultOptions, opts.library || {});
      options.chart = {renderTo: element.id};
      options.series = [{
        type: "pie",
        name: "Value",
        data: series
      }];
      new Highcharts.Chart(options);
    };

    renderColumnChart = function(element, series, opts) {
      var options = jsOptions(series, opts), i, j, s, d, rows = [];
      options.chart = {type: "column", renderTo: element.id};

      for (i = 0; i < series.length; i++) {
        s = series[i];

        for (j = 0; j < s.data.length; j++) {
          d = s.data[j];
          if (!rows[d[0]]) {
            rows[d[0]] = new Array(series.length);
          }
          rows[d[0]][i] = d[1];
        }
      }

      var categories = [];
      for (i in rows) {
        if (rows.hasOwnProperty(i)) {
          categories.push(i);
        }
      }
      options.xAxis.categories = categories;

      var newSeries = [];
      for (i = 0; i < series.length; i++) {
        d = [];
        for (j = 0; j < categories.length; j++) {
          d.push(rows[categories[j]][i]);
        }

        newSeries.push({
          name: series[i].name,
          data: d
        });
      }
      options.series = newSeries;

      new Highcharts.Chart(options);
    };
  } else if ("google" in window) { // Google charts
    // load from google
    var loaded = false;
    google.setOnLoadCallback(function() {
      loaded = true;
    });
    google.load("visualization", "1.0", {"packages": ["corechart"]});

    var waitForLoaded = function(callback) {
      google.setOnLoadCallback(callback); // always do this to prevent race conditions (watch out for other issues due to this)
      if (loaded) {
        callback();
      }
    };

    // Set chart options
    var defaultOptions = {
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
        gridlines: {
          color: "transparent"
        },
        baselineColor: "#ccc"
      },
      vAxis: {
        textStyle: {
          color: "#666",
          fontSize: 12
        },
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

    var hideLegend = function(options) {
      options.legend.position = "none";
    };

    var setMin = function(options, min) {
      options.vAxis.viewWindow.min = min;
    };

    var setMax = function(options, max) {
      options.vAxis.viewWindow.max = max;
    };

    var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setMin, setMax);

    // cant use object as key
    var createDataTable = function(series, columnType) {
      var data = new google.visualization.DataTable();
      data.addColumn(columnType, "");

      var i, j, s, d, key, rows = [];
      for (i = 0; i < series.length; i++) {
        s = series[i];
        data.addColumn("number", s.name);

        for (j = 0; j < s.data.length; j++) {
          d = s.data[j];
          key = (columnType === "datetime") ? d[0].getTime() : d[0];
          if (!rows[key]) {
            rows[key] = new Array(series.length);
          }
          rows[key][i] = toFloat(d[1]);
        }
      }

      var rows2 = [];
      for (i in rows) {
        if (rows.hasOwnProperty(i)) {
          rows2.push([(columnType === "datetime") ? new Date(toFloat(i)) : i].concat(rows[i]));
        }
      }
      if (columnType === "datetime") {
        rows2.sort(sortByTime);
      }
      data.addRows(rows2);

      return data;
    };

    renderLineChart = function(element, series, opts) {
      waitForLoaded(function() {
        var options = jsOptions(series, opts);
        var data = createDataTable(series, "datetime");
        var chart = new google.visualization.LineChart(element);
        chart.draw(data, options);
      });
    };

    renderPieChart = function(element, series, opts) {
      waitForLoaded(function() {
        var options = merge(defaultOptions, opts.library || {});
        options.chartArea = {
          top: "10%",
          height: "80%"
        };

        var data = new google.visualization.DataTable();
        data.addColumn("string", "");
        data.addColumn("number", "Value");
        data.addRows(series);

        var chart = new google.visualization.PieChart(element);
        chart.draw(data, options);
      });
    };

    renderColumnChart = function(element, series, opts) {
      waitForLoaded(function() {
        var options = jsOptions(series, opts);
        var data = createDataTable(series, "string");
        var chart = new google.visualization.ColumnChart(element);
        chart.draw(data, options);
      });
    };
  } else { // no chart library installed
    renderLineChart = renderPieChart = renderColumnChart = function() {
      throw new Error("Please install Google Charts or Highcharts");
    };
  }

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

  function getJSON(element, url, success) {
    $.ajax({
      dataType: "json",
      url: url,
      success: success,
      error: function(jqXHR, textStatus, errorThrown) {
        var message = (typeof errorThrown === "string") ? errorThrown : errorThrown.message;
        chartError(element, message);
      }
    });
  }

  function errorCatcher(element, data, opts, callback) {
    try {
      callback(element, data, opts);
    } catch (err) {
      chartError(element, err.message);
      throw err;
    }
  }

  function fetchDataSource(element, dataSource, opts, callback) {
    if (typeof dataSource === "string") {
      getJSON(element, dataSource, function(data, textStatus, jqXHR) {
        errorCatcher(element, data, opts, callback);
      });
    } else {
      errorCatcher(element, dataSource, opts, callback);
    }
  }

  // type conversions

  function toStr(n) {
    return "" + n;
  }

  function toFloat(n) {
    return parseFloat(n);
  }

  function toDate(n) {
    if (typeof n !== "object") {
      if (typeof n === "number") {
        n = new Date(n * 1000); // ms
      } else { // str
        // try our best to get the str into iso8601
        // TODO be smarter about this
        var str = n.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
        n = parseISO8601(str) || new Date(n);
      }
    }
    return n;
  }

  function toArr(n) {
    if (!isArray(n)) {
      var arr = [], i;
      for (i in n) {
        if (n.hasOwnProperty(i)) {
          arr.push([i, n[i]]);
        }
      }
      n = arr;
    }
    return n;
  }

  // process data

  function sortByTime(a, b) {
    return a[0].getTime() - b[0].getTime();
  }

  function processSeries(series, opts, time) {
    var i, j, data, r, key;

    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      series = [{name: "Value", data: series}];
      opts.hideLegend = true;
    } else {
      opts.hideLegend = false;
    }

    // right format
    for (i = 0; i < series.length; i++) {
      data = toArr(series[i].data);
      r = [];
      for (j = 0; j < data.length; j++) {
        key = data[j][0];
        key = time ? toDate(key) : toStr(key);
        r.push([key, toFloat(data[j][1])]);
      }
      if (time) {
        r.sort(sortByTime);
      }
      series[i].data = r;
    }

    return series;
  }

  function processLineData(element, data, opts) {
    renderLineChart(element, processSeries(data, opts, true), opts);
  }

  function processColumnData(element, data, opts) {
    renderColumnChart(element, processSeries(data, opts, false), opts);
  }

  function processPieData(element, data, opts) {
    var perfectData = toArr(data), i;
    for (i = 0; i < perfectData.length; i++) {
      perfectData[i] = [toStr(perfectData[i][0]), toFloat(perfectData[i][1])];
    }
    renderPieChart(element, perfectData, opts);
  }

  function setElement(element, data, opts, callback) {
    if (typeof element === "string") {
      element = document.getElementById(element);
    }
    fetchDataSource(element, data, opts || {}, callback);
  }

  // define classes

  var Chartkick = {
    LineChart: function(element, dataSource, opts) {
      setElement(element, dataSource, opts, processLineData);
    },
    ColumnChart: function(element, dataSource, opts) {
      setElement(element, dataSource, opts, processColumnData);
    },
    PieChart: function(element, dataSource, opts) {
      setElement(element, dataSource, opts, processPieData);
    }
  };

  window.Chartkick = Chartkick;
})();

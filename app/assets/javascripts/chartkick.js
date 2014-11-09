/*
 * Chartkick.js
 * Create beautiful Javascript charts with minimal code
 * https://github.com/ankane/chartkick.js
 * v1.2.2
 * MIT License
 */

/*jslint browser: true, indent: 2, plusplus: true, vars: true */

(function (window) {
  'use strict';

  var config = window.Chartkick || {};
  var Chartkick, ISO8601_PATTERN, DECIMAL_SEPARATOR, adapters = [];

  // helpers

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

  // https://github.com/Do/iso8601.js
  ISO8601_PATTERN = /(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i;
  DECIMAL_SEPARATOR = String(1.5).charAt(1);

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

  function jsOptionsFunc(defaultOptions, hideLegend, setMin, setMax, setStacked) {
    return function (series, opts, chartOptions) {
      var options = merge({}, defaultOptions);
      options = merge(options, chartOptions || {});

      // hide legend
      // this is *not* an external option!
      if (opts.hideLegend) {
        hideLegend(options);
      }

      // min
      if ("min" in opts) {
        setMin(options, opts.min);
      } else if (!negativeValues(series)) {
        setMin(options, 0);
      }

      // max
      if ("max" in opts) {
        setMax(options, opts.max);
      }

      if (opts.stacked) {
        setStacked(options);
      }

      if (opts.colors) {
        options.colors = opts.colors;
      }

      // merge library last
      options = merge(options, opts.library || {});

      return options;
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
    var $ = window.jQuery || window.Zepto || window.$;
    $.ajax({
      dataType: "json",
      url: url,
      success: success,
      error: function (jqXHR, textStatus, errorThrown) {
        var message = (typeof errorThrown === "string") ? errorThrown : errorThrown.message;
        chartError(element, message);
      }
    });
  }

  function errorCatcher(chart, callback) {
    try {
      callback(chart);
    } catch (err) {
      chartError(chart.element, err.message);
      throw err;
    }
  }

  function fetchDataSource(chart, callback) {
    if (typeof chart.dataSource === "string") {
      getJSON(chart.element, chart.dataSource, function (data, textStatus, jqXHR) {
        chart.data = data;
        errorCatcher(chart, callback);
      });
    } else {
      chart.data = chart.dataSource;
      errorCatcher(chart, callback);
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

  function sortByTime(a, b) {
    return a[0].getTime() - b[0].getTime();
  }

  function capitalize(s)
  {
    return s[0].toUpperCase() + s.slice(1);
  }

  var CUSTOM_TOOLTIP_LABEL = "tooltip_string";
  
  
  if ("Highcharts" in window) {
    var HighchartsAdapter = new function () {
      var Highcharts = window.Highcharts;

      var defaultOptions = {
        chart: {},
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
        },
        plotOptions: {
          areaspline: {},
          series: {
            marker: {}
          }
        }
      };

      var hideLegend = function (options) {
        options.legend.enabled = false;
      };

      var setMin = function (options, min) {
        options.yAxis.min = min;
      };

      var setMax = function (options, max) {
        options.yAxis.max = max;
      };

      var setStacked = function (options) {
        options.plotOptions.series.stacking = "normal";
      };

      var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setMin, setMax, setStacked);

      this.renderLineChart = function (chart, chartType) {
        chartType = chartType || "spline";
        var chartOptions = {};
        if (chartType === "areaspline") {
          chartOptions = {
            plotOptions: {
              areaspline: {
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
        var options = jsOptions(chart.data, chart.options, chartOptions), data, i, j;
        options.xAxis.type = chart.options.discrete ? "category" : "datetime";
        options.chart.type = chartType;
        options.chart.renderTo = chart.element.id;

        var series = chart.data;
        for (i = 0; i < series.length; i++) {
          data = series[i].data;
          if (!chart.options.discrete) {
            for (j = 0; j < data.length; j++) {
              data[j][0] = data[j][0].getTime();
            }
          }
          series[i].marker = {symbol: "circle"};
        }
        options.series = series;
        new Highcharts.Chart(options);
      };

      this.renderPieChart = function (chart) {
        var chartOptions = {};
        if (chart.options.colors) {
          chartOptions.colors = chart.options.colors;
        }
        var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});
        options.chart.renderTo = chart.element.id;
        options.series = [{
          type: "pie",
          name: "Value",
          data: chart.data
        }];
        new Highcharts.Chart(options);
      };

      this.renderColumnChart = function (chart, chartType) {
        var chartType = chartType || "column";
        var series = chart.data;
        var options = jsOptions(series, chart.options), i, j, s, d, rows = [];
        options.chart.type = chartType;
        options.chart.renderTo = chart.element.id;

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
            d.push(rows[categories[j]][i] || 0);
          }

          newSeries.push({
            name: series[i].name,
            data: d
          });
        }
        options.series = newSeries;

        new Highcharts.Chart(options);
      };

      var self = this;

      this.renderBarChart = function (chart) {
        self.renderColumnChart(chart, "bar");
      };

      this.renderAreaChart = function (chart) {
        self.renderLineChart(chart, "areaspline");
      };
    };
    adapters.push(HighchartsAdapter);
  }
  if (window.google && window.google.setOnLoadCallback) {
    var GoogleChartsAdapter = new function () {
      var google = window.google;

      var loaded = {};
      var callbacks = [];

      var runCallbacks = function () {
        var cb, call;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          call = google.visualization && ((cb.pack == "corechart" && google.visualization.LineChart) || (cb.pack == "timeline" && google.visualization.Timeline))
          if (call) {
            cb.callback();
            callbacks.splice(i, 1);
            i--;
          }
        }
      };

      var waitForLoaded = function (pack, callback) {
        if (!callback) {
          callback = pack;
          pack = "corechart";
        }

        callbacks.push({pack: pack, callback: callback});

        if (loaded[pack]) {
          runCallbacks();
        } else {
          loaded[pack] = true;

          // https://groups.google.com/forum/#!topic/google-visualization-api/fMKJcyA2yyI
          var loadOptions = {
            packages: [pack],
            callback: runCallbacks
          };
          if (config.language) {
            loadOptions.language = config.language;
          }
          google.load("visualization", "1", loadOptions);
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

      var hideLegend = function (options) {
        options.legend.position = "none";
      };

      var setMin = function (options, min) {
        options.vAxis.viewWindow.min = min;
      };

      var setMax = function (options, max) {
        options.vAxis.viewWindow.max = max;
      };

      var setBarMin = function (options, min) {
        options.hAxis.viewWindow.min = min;
      };

      var setBarMax = function (options, max) {
        options.hAxis.viewWindow.max = max;
      };

      var setStacked = function (options) {
        options.isStacked = true;
      };
      
      var jsOptions = jsOptionsFunc(defaultOptions, hideLegend, setMin, setMax, setStacked);

      // cant use object as key
      var createDataTable = function (series, columnType) {
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

      var resize = function (callback) {
        if (window.attachEvent) {
          window.attachEvent("onresize", callback);
        } else if (window.addEventListener) {
          window.addEventListener("resize", callback, true);
        }
        callback();
      };

      this.renderLineChart = function (chart) {
        waitForLoaded(function () {
          var options = jsOptions(chart.data, chart.options);
          var data = createDataTable(chart.data, chart.options.discrete ? "string" : "datetime");
          chart.chart = new google.visualization.LineChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };

      this.renderPieChart = function (chart) {
        waitForLoaded(function () {
          var chartOptions = {
            chartArea: {
              top: "10%",
              height: "80%"
            }
          };
          if (chart.options.colors) {
            chartOptions.colors = chart.options.colors;
          }
          var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});
          
          var data = new google.visualization.DataTable();
          data.addColumn("string", "");
          data.addColumn("number", "Value");
          // handle supplied custom tooltips
          if (chart.custom_tooltip_bool) {
            data.addColumn({type:"string", role:"tooltip"});
          }
          
          data.addRows(chart.data);

          chart.chart = new google.visualization.PieChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };

      this.renderColumnChart = function (chart) {
        waitForLoaded(function () {
          var data;
          var options = jsOptions(chart.data, chart.options);
          if (chart.custom_tooltip_bool) {
            var chart_data = chart.data[0].data;
            var num_columns = chart_data[0].length;
            data = google.visualization.arrayToDataTable(chart_data);
            data.setColumnProperty(num_columns - 1, 'role', 'tooltip');
            data.setColumnProperty(num_columns - 1, 'type', 'string');
          }
          else {
            data = createDataTable(chart.data, "string");
          }
          chart.chart = new google.visualization.ColumnChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };

      this.renderBarChart = function (chart) {
        waitForLoaded(function () {
          var chartOptions = {
            hAxis: {
              gridlines: {
                color: "#ccc"
              }
            }
          };
          var options = jsOptionsFunc(defaultOptions, hideLegend, setBarMin, setBarMax, setStacked)(chart.data, chart.options, chartOptions);
          var data = createDataTable(chart.data, "string");
          chart.chart = new google.visualization.BarChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };

      this.renderAreaChart = function (chart) {
        waitForLoaded(function () {
          var chartOptions = {
            isStacked: true,
            pointSize: 0,
            areaOpacity: 0.5
          };
          var options = jsOptions(chart.data, chart.options, chartOptions);
          var data = createDataTable(chart.data, chart.options.discrete ? "string" : "datetime");
          chart.chart = new google.visualization.AreaChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };

      this.renderGeoChart = function (chart) {
        waitForLoaded(function () {
          var chartOptions = {
            legend: "none",
            colorAxis: {
              colors: chart.options.colors || ["#f6c7b6", "#ce502d"]
            }
          };
          var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});
          var data = new google.visualization.DataTable();
          
          // column labels are preincluded for double series rendering
          if ((typeof chart.data[0][1] !== "string") || (typeof chart.data[0][2] !== "string")) {
            data.addColumn("string", "");
            data.addColumn("number", "Value");
            // handle supplied custom tooltips
            if (chart.custom_tooltip_bool) {
              data.addColumn({type:"string", role:"tooltip"});
            }
            data.addRows(chart.data);
          }
          else {
            data = google.visualization.arrayToDataTable(chart.data);
            // handle supplied custom tooltips
            if (chart.custom_tooltip_bool) {
              data.setColumnProperty(chart.data.length - 1, 'role', 'tooltip');
              data.setColumnProperty(chart.data.length - 1, 'type', 'string');
            }
          }
          
          chart.chart = new google.visualization.GeoChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };

      this.renderTimeline = function (chart) {
        waitForLoaded("timeline", function () {
          var chartOptions = {
            legend: "none"
          };

          if (chart.options.colors) {
            chartOptions.colorAxis.colors = chart.options.colors;
          }
          var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});

          var data = new google.visualization.DataTable();
          data.addColumn({type: "string", id: "Name"});
          data.addColumn({type: "date", id: "Start"});
          data.addColumn({type: "date", id: "End"});
          data.addRows(chart.data);

          chart.chart = new google.visualization.Timeline(chart.element);

          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };
      
      this.renderBubbleChart = function (chart) {
        waitForLoaded(function () {
          var chartOptions = {
            vAxis: { ticks: chart.vAxis_ticks,
              minValue: chart.vAxis_min,
              baseline: chart.vAxis_min },
            hAxis: { ticks: chart.hAxis_ticks },
          };
          if (chart.options.colors) {
            chartOptions.colors = chart.options.colors;
          }
          var options = merge(merge(defaultOptions, chartOptions), chart.options.library || {});
          // one number in each data set: y coordinate only,
          var data = new google.visualization.DataTable();
          data.addColumn("string", "Bubble ID");
          data.addColumn("number", "");
          data.addColumn("number", "Value");
          data.addColumn("string", "Scope");
          
          // handle supplied custom tooltips
          if (chart.custom_tooltip_bool) {
            data.addColumn({type:"string", role:"tooltip"});
          }
          
          var i
          for (i = 0; i < chart.data.length; i++) {
            data.addRows(chart.data[i].data);
          }
          chart.chart = new google.visualization.BubbleChart(chart.element);
          resize(function () {
            chart.chart.draw(data, options);
          });
        });
      };
    };

    adapters.push(GoogleChartsAdapter);
  }

  // TODO add adapter option
  // TODO remove chartType if cross-browser way
  // to get the name of the chart class
  function renderChart(chartType, chart) {
    var i, adapter, fnName;
    fnName = "render" + chartType;

    for (i = 0; i < adapters.length; i++) {
      adapter = adapters[i];
      if (isFunction(adapter[fnName])) {
        return adapter[fnName](chart);
      }
    }
    throw new Error("No adapter found");
  }

  // process data

  function processSeries(chart, time) {
    var series = chart.data;
    var opts = chart.options;
    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      series = [{name: "Value", data: series}];
      opts.hideLegend = true;
    } else {
      opts.hideLegend = false;
    }
    if (opts.discrete) {
      time = false;
    }
  
    // check if the data returned is packed with custom tooltip info, and if so
    // pass it along as well!    
    chart.custom_tooltip_bool = false;
    if (isArray(series[0].data[0]) && (series[0].data[0][2] == CUSTOM_TOOLTIP_LABEL)) {
      chart.custom_tooltip_bool = true;
    }
    
    // right format
    var i, j, data, r, key;
    for (i = 0; i < series.length; i++) {
      j = 0;
      data = toArr(series[i].data);
      r = [];
      if (chart.custom_tooltip_bool) {
        j = 1;
        r.push([toStr(data[0][0]), toStr(data[0][1]), toStr(data[0][2])]);
      }
        
      for (j; j < data.length; j++) {
        key = data[j][0];
        key = time ? toDate(key) : toStr(key);
        if (chart.custom_tooltip_bool) {
          r.push([key, toFloat(data[j][1]), toStr(data[j][2])]);
        }
        else {
          r.push([key, toFloat(data[j][1])]);
        }
      }
      if (time) {
        r.sort(sortByTime);
      }
      series[i].data = r;
    }
    
    return series;
  }

  function processSimple(chart) {
    var perfectData = toArr(chart.data), i = 0;
    chart.custom_tooltip_bool = false;
    
    // check if the data returned is packed with custom tooltip info, and if so
    // pass it along as well!
    if ((typeof perfectData[0][2] === "string") && (perfectData[0][2] == CUSTOM_TOOLTIP_LABEL)) {
      chart.custom_tooltip_bool = true;
      i = 1;
      perfectData[0] = [toStr(perfectData[0][0]), toStr(perfectData[0][1]), toStr(perfectData[0][2])];
    }
    for (i; i < perfectData.length; i++) {
      if (chart.custom_tooltip_bool) {
        perfectData[i] = [toStr(perfectData[i][0]), toFloat(perfectData[i][1]), toStr(perfectData[i][2])];
      }
      else {
        perfectData[i] = [toStr(perfectData[i][0]), toFloat(perfectData[i][1])];
      }
    }
    return perfectData;
  }

  function processGeo(chart)
  {
    var series = chart.data;
    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      // single series, single data array -- use processSimple as before!
      var chartData = processSimple(chart);
      return chartData;
    }
    else {
      // NOTE that googlecharts does not currently support multi-series geo
      // charts so this is kind of a hack
      // NOTE that more than 2 series is currently not supported!
      // ...we actually utilize the googlecharts data input definitions which  
      // allow assigning of two values for each geo marker, and "flatten" the 
      // two series into a single one 
      // we want to name the series', so we use the names in the data received
      var flattened_series = [["", capitalize(series[0].name), capitalize(series[1].name)]];
      var i, j;      
      
      // check if the data returned is packed with custom tooltip info, and if so
      // pass it along as well!
      chart.custom_tooltip_bool = false;
      
      if ((typeof series[0].data[0][2] === "string") && (series[0].data[0][2] == CUSTOM_TOOLTIP_LABEL)) {
        chart.custom_tooltip_bool = true;
      }
      
      for (j = 0; j < series[0].data.length; j++) {
        var r = [];
        var key = toStr(series[0].data[j][0]);
        r.push(key);
        for (i = 0; i < series.length; i++) {
          r.push(toFloat(series[i].data[j][1]));
        }
        // single tooltip string (as both values will be represented in the 
        // same data point) is taken from series[0]
        if (chart.custom_tooltip_bool) {
          r.push(toStr(series[0].data[j][2]));
        }
        flattened_series.push(r);
      }

      return flattened_series;
    }
  }

  function processTime(chart)
  {
    var data = chart.data;
    var i;
    
    for (i = 0; i < data.length; i++) {
      data[i][1] = toDate(data[i][1]);
      data[i][2] = toDate(data[i][2]);
    }
    return data;
  }
  
  function deriveBubbleVaxisTicks(min_vAxis_val, max_vAxis_val, vAxis_max_round) {
    // the max y axis value will be the max value displayed rounded up 
    // to the nearest vAxis_max_round, and the ticks are determined accordingly
    var vAxis_tick_jump = vAxis_max_round / 2;
    var vAxis_min = 0;
    var vAxis_max = Math.ceil(max_vAxis_val / vAxis_max_round) * vAxis_max_round;
    // if the min/max values are too close to the edge of the chart, 
    // we want to leave some space so that the entire marker is always displayed
    vAxis_min = (min_vAxis_val <= vAxis_tick_jump) ? -vAxis_tick_jump : 0;
    vAxis_max = (vAxis_max - max_vAxis_val <= vAxis_tick_jump) ? (vAxis_max + vAxis_tick_jump) : vAxis_max;
    var tick_val = 0;
    var vAxis_ticks = [vAxis_min]; // pack the min chart scope here
    while (tick_val < vAxis_max) {
      vAxis_ticks.push(tick_val);
      tick_val += vAxis_tick_jump;
    }
    vAxis_ticks.push(vAxis_max);
    return vAxis_ticks;
  }
  
  function processBubble(chart)
  {
    var series = chart.data;
    var series_bool = true;
    // see if one series or multiple
    if (!isArray(series) || typeof series[0] !== "object" || isArray(series[0])) {
      // one series, single data array -- not supported yet
      // series = [{name: "Value", data: series}];
      series_bool = false;
    }
    else {
      var hAxis_ticks = [ { v: 0, f: '' } ];
      var y_min, y_max;
      var i, data;
      for (i = 0; i < series.length; i++) {
        data = toArr(series[i].data);
        if (i == 0) {  
          y_min = data[0][2];
          y_max = data[0][2];
        }  // init min/max with first series first values
        var category_counter = 0;
        var j, r = [];
        for (j = 0; j < data.length; j++) {
          var bubble_id = data[j][0];
          var x_coor = data[j][1];
          // the x "coordinate" can't be a string when passed to Googlecharts; if
          // it was passed as a string here that means we want to define it as a 
          // category 
          if (typeof x_coor === "string") {
            category_counter++;
            // only do this for the first series to avoid repetitions!
            if (i == 0) {
              hAxis_ticks.push({ v: category_counter, f: x_coor });
            }
            x_coor = category_counter;
          }
          var y_coor = data[j][2];
          // keep track of min/max values for y axis min/max definitions
          y_min = y_min < y_coor ? y_min : y_coor;
          y_max = y_max > y_coor ? y_max : y_coor;
          var series_id = capitalize(data[j][3]);
          r.push([toStr(bubble_id), toFloat(x_coor), toFloat(y_coor), toStr(series_id)]);
        }
        series[i].data = r;
      }
      hAxis_ticks.push({ v: hAxis_ticks.length, f: '' }); // fix chart spacing
      chart.hAxis_ticks = hAxis_ticks;
      
      // retrieve (and then delete) y axis rounding value from passed
      // chart options library
      var vAxis_max_round = chart.options.library.vAxis_max_round;
      delete chart.options.library.vAxis_max_round;
      var vAxis_ticks = deriveBubbleVaxisTicks(y_min, y_max, vAxis_max_round);
      chart.vAxis_min = vAxis_ticks.shift();
      chart.vAxis_ticks = vAxis_ticks;
    }
    
    return series;
  }

  function processLineData(chart) {
    chart.data = processSeries(chart, true);
    renderChart("LineChart", chart);
  }

  function processColumnData(chart) {
    chart.data = processSeries(chart, false);
    renderChart("ColumnChart", chart);
  }

  function processPieData(chart) {
    chart.data = processSimple(chart);
    renderChart("PieChart", chart);
  }

  function processBarData(chart) {
    chart.data = processSeries(chart, false);
    renderChart("BarChart", chart);
  }

  function processAreaData(chart) {
    chart.data = processSeries(chart, true);
    renderChart("AreaChart", chart);
  }

  function processGeoData(chart) {
    chart.data = processGeo(chart);
    renderChart("GeoChart", chart);
  }

  function processTimelineData(chart) {
    chart.data = processTime(chart);
    renderChart("Timeline", chart);
  }

  function processBubbleData(chart) {
    chart.data = processBubble(chart);
    renderChart("BubbleChart", chart);
  }
  
  function setElement(chart, element, dataSource, opts, callback) {
    if (typeof element === "string") {
      element = document.getElementById(element);
    }
    chart.element = element;
    chart.options = opts || {};
    chart.dataSource = dataSource;
    Chartkick.charts[element.id] = chart;
    fetchDataSource(chart, callback);
  }

  // define classes

  Chartkick = {
    LineChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processLineData);
    },
    PieChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processPieData);
    },
    ColumnChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processColumnData);
    },
    BarChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processBarData);
    },
    AreaChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processAreaData);
    },
    GeoChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processGeoData);
    },
    Timeline: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processTimelineData);
    },
    BubbleChart: function (element, dataSource, opts) {
      setElement(this, element, dataSource, opts, processBubbleData);
    },
    charts: {}
  };

  window.Chartkick = Chartkick;
}(window));

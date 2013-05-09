/*jslint browser: true, indent: 2 */
/*global google*/

(function() {
  'use strict';

  var defaultOptions = {
    xAxis: {},
    yAxis: {
      title: {
        text: null
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
    }
  };

  // http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
  var clone = function(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  var jsOptions = function(opts) {
    var options = clone(defaultOptions);
    if ("min" in opts) {
      options.yAxis.min = opts.min;
    }
    if ("max" in opts) {
      options.yAxis.max = opts.max;
    }
    return options;
  }

  var Chartkick = {
    LineChart: function(elementId, series, opts) {
      var options = jsOptions(opts), data, i, j;
      options.xAxis.type = "datetime";
      options.chart = {type: "spline"};

      for (i = 0; i < series.length; i += 1) {
        data = series[i].data;
        for (j = 0; j < data.length; j += 1) {
          data[j][0] = data[j][0] * 1000;
        }
      }
      options.series = series;

      if (series.length == 1) {
        options.legend = {enabled: false};
      }
      $(document.getElementById(elementId)).highcharts(options);
    },
    PieChart: function(elementId, series, opts) {
      var options = jsOptions(opts);
      options.series = [{
        type: "pie",
        name: "Value",
        data: series
      }];
      $(document.getElementById(elementId)).highcharts(options);
    },
    ColumnChart: function(elementId, series, opts) {
      var options = jsOptions(opts), data, i, j;
      options.chart = {type: "column"};

      var i, j, s, d, rows = [];
      for (i = 0; i < series.length; i += 1) {
        s = series[i];

        for (j = 0; j < s.data.length; j += 1) {
          d = s.data[j];
          if (!rows[d[0]]) {
            rows[d[0]] = new Array(series.length);
          }
          rows[d[0]][i] = d[1];
        }
      }

      var categories = [];
      for (i in rows) {
        categories.push(i);
      }
      options.xAxis.categories = categories;

      var newSeries = [];
      for (i = 0; i < series.length; i += 1) {
        d = [];
        for (j = 0; j < categories.length; j += 1) {
          d.push(rows[categories[j]][i]);
        }

        newSeries.push({
          name: series[i].name,
          data: d
        });
      }
      options.series = newSeries;

      if (series.length == 1) {
        options.legend.enabled = false;
      }
      $(document.getElementById(elementId)).highcharts(options);
    }
  };

  window.Chartkick = Chartkick;
})();

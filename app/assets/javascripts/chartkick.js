/*jslint browser: true, indent: 2 */
/*global google*/

(function() {
  'use strict';

  google.load("visualization", "1.0", {"packages": ["corechart"]});

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
      viewWindow: {
        min: 0
      }
    },
    tooltip: {
      textStyle: {
        color: "#666",
        fontSize: 12
      }
    }
  }

  var createDataTable = function(series, columnType) {
    var data = new google.visualization.DataTable()
    data.addColumn(columnType, "");

    var i, j, s, d, rows = [];
    for (i = 0; i < series.length; i += 1) {
      s = series[i];
      data.addColumn("number", s.name);

      for (j = 0; j < s.data.length; j += 1) {
        d = s.data[j];
        if (!rows[d[0]]) {
          rows[d[0]] = new Array(series.length);
        }
        rows[d[0]][i] = d[1];
      }
    }

    var rows2 = [];
    for (i in rows) {
      rows2.push([columnType == "datetime" ? new Date(i * 1000) : i].concat(rows[i]));
    }
    data.addRows(rows2);

    return data;
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

  var Chartkick = {
    LineChart: function(elementId, series) {
      google.setOnLoadCallback(function() {
        var data = createDataTable(series, "datetime");

        var options = clone(defaultOptions);
        if (series.length == 1) {
          options.legend.position = "none";
        }

        var chart = new google.visualization.LineChart(document.getElementById(elementId));
        chart.draw(data, options);
      });
    },
    PieChart: function(elementId, series) {
      google.setOnLoadCallback(function() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "");
        data.addColumn("number", "Value");
        data.addRows(series);

        var options = clone(defaultOptions);
        options.chartArea = {
          top: "10%",
          height: "80%"
        };

        var chart = new google.visualization.PieChart(document.getElementById(elementId));
        chart.draw(data, options);
      });
    },
    ColumnChart: function(elementId, series) {
      google.setOnLoadCallback(function() {
        var data = createDataTable(series, "string");

        var options = clone(defaultOptions);
        if (series.length == 1) {
          options.legend.position = "none";
        }

        var chart = new google.visualization.ColumnChart(document.getElementById(elementId));
        chart.draw(data, options);
      });
    }
  };

  window.Chartkick = Chartkick;
})();

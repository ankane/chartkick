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
      alignment: "center"
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

  var mergeSeries = function(data, rows, series) {
    var i, j, s, d;
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
  };

  var Chartkick = {
    LineChart: function(elementId, series) {
      google.setOnLoadCallback(function() {
        // Create the data table.
        var data = new google.visualization.DataTable(), rows = {}, k, rows2 = [], options, chart;

        data.addColumn("datetime", "");

        mergeSeries(data, rows, series);

        // columns
        rows2 = [];
        for (k in rows) {
          rows2.push([new Date(k * 1000)].concat(rows[k]));
        }
        data.addRows(rows2);

        options = defaultOptions; // TODO clone
        if (series.length > 1) {
          options.legend.position = "right";
        } else {
          options.legend.position = "none";
        }
        options.chartArea = null;

        chart = new google.visualization.LineChart(document.getElementById(elementId));
        chart.draw(data, options);
      });
    },
    PieChart: function(elementId, series) {
      google.setOnLoadCallback(function() {
        // Create the data table.
        var data = new google.visualization.DataTable();

        // columns
        data.addColumn("string", "");
        data.addColumn("number", "Value");
        data.addRows(series);

        var options = defaultOptions; // TODO clone
        options.legend.position = "right";
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
        // Create the data table.
        var data = new google.visualization.DataTable(), rows = {}, k, rows2 = [], options, chart;

        data.addColumn("string", "");

        mergeSeries(data, rows, series);

        // columns
        rows2 = [];
        for (k in rows) {
          rows2.push([k].concat(rows[k]));
        }
        data.addRows(rows2);

        var options = defaultOptions; // TODO clone
        if (series.length > 1) {
          options.legend.position = "right";
        } else {
          options.legend.position = "none";
        }
        options.chartArea = null;

        var chart = new google.visualization.ColumnChart(document.getElementById(elementId));
        chart.draw(data, options);
      });
    }
  };

  window.Chartkick = Chartkick;
})();

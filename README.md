# Chartkick

Create beautiful JavaScript charts with one line of Ruby. No more fighting with charting libraries!

[See it in action](https://chartkick.com)

:fire: For admin charts and dashboards, check out [Blazer](https://github.com/ankane/blazer/)

:two_hearts: A perfect companion to [Groupdate](https://github.com/ankane/groupdate), [Hightop](https://github.com/ankane/hightop), and [ActiveMedian](https://github.com/ankane/active_median)

## Quick Start

Add this line to your application's Gemfile:

```ruby
gem "chartkick"
```

For Rails 6 / Webpacker, run:

```sh
yarn add chartkick chart.js
```

And in `app/javascript/packs/application.js`, add:

```js
require("chartkick")
require("chart.js")
```

For Rails 5 / Sprockets, in `app/assets/javascripts/application.js`, add:

```js
//= require chartkick
//= require Chart.bundle
```

This sets up Chartkick with Chart.js. For other charting libraries, see [detailed instructions](#installation).

## Charts

Line chart

```erb
<%= line_chart User.group_by_day(:created_at).count %>
```

Pie chart

```erb
<%= pie_chart Goal.group(:name).count %>
```

Column chart

```erb
<%= column_chart Task.group_by_hour_of_day(:created_at, format: "%l %P").count %>
```

Bar chart

```erb
<%= bar_chart Shirt.group(:size).sum(:price) %>
```

Area chart

```erb
<%= area_chart Visit.group_by_minute(:created_at).maximum(:load_time) %>
```

Scatter chart

```erb
<%= scatter_chart City.pluck(:size, :population) %>
```

Geo chart - *Google Charts*

```erb
<%= geo_chart Medal.group(:country).count %>
```

Timeline - *Google Charts*

```erb
<%= timeline [
  ["Washington", "1789-04-29", "1797-03-03"],
  ["Adams", "1797-03-03", "1801-03-03"],
  ["Jefferson", "1801-03-03", "1809-03-03"]
] %>
```

Multiple series

```erb
<%= line_chart @goals.map { |goal|
    {name: goal.name, data: goal.feats.group_by_week(:created_at).count}
} %>
```

or

```erb
<%= line_chart Feat.group(:goal_id).group_by_week(:created_at).count %>
```

### Say Goodbye To Timeouts

Make your pages load super fast and stop worrying about timeouts. Give each chart its own endpoint.

```erb
<%= line_chart completed_tasks_charts_path %>
```

And in your controller, pass the data as JSON.

```ruby
class ChartsController < ApplicationController
  def completed_tasks
    render json: Task.group_by_day(:completed_at).count
  end
end
```

For multiple series, add `chart_json` at the end.

```ruby
render json: Task.group(:goal_id).group_by_day(:completed_at).count.chart_json
```

### Options

Id, width, and height

```erb
<%= line_chart data, id: "users-chart", width: "800px", height: "500px" %>
```

Min and max values

```erb
<%= line_chart data, min: 1000, max: 5000 %>
```

`min` defaults to 0 for charts with non-negative values. Use `nil` to let the charting library decide.

Min and max for x-axis - *Chart.js*

```erb
<%= line_chart data, xmin: "2018-01-01", xmax: "2019-01-01" %>
```

Colors

```erb
<%= line_chart data, colors: ["#b00", "#666"] %>
```

Stacked columns or bars

```erb
<%= column_chart data, stacked: true %>
```

Discrete axis

```erb
<%= line_chart data, discrete: true %>
```

Label (for single series)

```erb
<%= line_chart data, label: "Value" %>
```

Axis titles

```erb
<%= line_chart data, xtitle: "Time", ytitle: "Population" %>
```

Straight lines between points instead of a curve

```erb
<%= line_chart data, curve: false %>
```

Hide points

```erb
<%= line_chart data, points: false %>
```

Show or hide legend

```erb
<%= line_chart data, legend: false %>
```

Specify legend position

```erb
<%= line_chart data, legend: "bottom" %>
```

Defer chart creation until after the page loads

```erb
<%= line_chart data, defer: true %>
```

Donut chart

```erb
<%= pie_chart data, donut: true %>
```

Prefix, useful for currency - *Chart.js, Highcharts*

```erb
<%= line_chart data, prefix: "$" %>
```

Suffix, useful for percentages - *Chart.js, Highcharts*

```erb
<%= line_chart data, suffix: "%" %>
```

Set a thousands separator - *Chart.js, Highcharts*

```erb
<%= line_chart data, thousands: "," %>
```

Set a decimal separator - *Chart.js, Highcharts*

```erb
<%= line_chart data, decimal: "," %>
```

Set significant digits - *Chart.js, Highcharts*

```erb
<%= line_chart data, precision: 3 %>
```

Set rounding - *Chart.js, Highcharts*

```erb
<%= line_chart data, round: 2 %>
```

Show insignificant zeros, useful for currency - *Chart.js, Highcharts*

```erb
<%= line_chart data, round: 2, zeros: true %>
```

Friendly byte sizes - *Chart.js 2.8+*

```erb
<%= line_chart data, bytes: true %>
```

Show a message when data is empty

```erb
<%= line_chart data, messages: {empty: "No data"} %>
```

Refresh data from a remote source every `n` seconds

```erb
<%= line_chart url, refresh: 60 %>
```

You can pass options directly to the charting library with:

```erb
<%= line_chart data, library: {backgroundColor: "#eee"} %>
```

See the documentation for [Chart.js](https://www.chartjs.org/docs/), [Google Charts](https://developers.google.com/chart/interactive/docs/gallery), and [Highcharts](https://api.highcharts.com/highcharts) for more info.

To customize datasets in Chart.js, use:

```erb
<%= line_chart data, dataset: {borderWidth: 10} %>
```

You can pass this option to individual series as well.

### Global Options

To set options for all of your charts, create an initializer `config/initializers/chartkick.rb` with:

```ruby
Chartkick.options = {
  height: "400px",
  colors: ["#b00", "#666"]
}
```

Customize the html

```ruby
Chartkick.options[:html] = '<div id="%{id}" style="height: %{height};">Loading...</div>'
```

You capture the JavaScript in a content block with:

```ruby
Chartkick.options[:content_for] = :charts_js
```

Then, in your layout, use:

```erb
<%= yield :charts_js %>
```

> For Padrino, use `yield_content` instead of `yield`

This is great for including all of your JavaScript at the bottom of the page.

### Data

Pass data as a hash or array

```erb
<%= pie_chart({"Football" => 10, "Basketball" => 5}) %>
<%= pie_chart [["Football", 10], ["Basketball", 5]] %>
```

For multiple series, use the format

```erb
<%= line_chart [
  {name: "Series A", data: series_a},
  {name: "Series B", data: series_b}
] %>
```

Times can be a time or a string (strings are parsed)

```erb
<%= line_chart({20.day.ago => 5, "2013-05-07 00:00:00 UTC" => 7}) %>
```

### Multiple Series

You can pass a few options with a series:

- `name`
- `data`
- `color`
- `dataset` - *Chart.js only*
- `points` - *Chart.js only*
- `curve` - *Chart.js only*

### Code

If you want to use the charting library directly, get the code with:

```erb
<%= line_chart data, code: true %>
```

The code will be logged to the JavaScript console.

> JavaScript functions cannot be logged, so it may not be identical.

### Download Charts

*Chart.js only*

Give users the ability to download charts. It all happens in the browser - no server-side code needed.

```erb
<%= line_chart data, download: true %>
```

> Safari will open the image in a new window instead of downloading.

Set the filename

```erb
<%= line_chart data, download: {filename: "boom"} %>
```

Set the background color

```erb
<%= line_chart data, download: {background: "#ffffff"} %>
```

Set title

```erb
<%= line_chart data, title: "Awesome chart" %>
```

## Installation

Add this line to your application's Gemfile:

```ruby
gem "chartkick"
```

Next, choose your charting library.

- [Chart.js](#chart-js)
- [Google Charts](#google-charts)
- [Highcharts](#highcharts)

> In the instructions below, `application.js` must be included **before** the charts in your views, unless using the `:content_for` option.

### Chart.js

For Rails 6 / Webpacker, run:

```sh
yarn add chartkick chart.js
```

And in `app/javascript/packs/application.js`, add:

```js
require("chartkick")
require("chart.js")
```

For Rails 5 / Sprockets, in `app/assets/javascripts/application.js`, add:

```js
//= require chartkick
//= require Chart.bundle
```

### Google Charts

In your layout or views, add:

```erb
<%= javascript_include_tag "https://www.gstatic.com/charts/loader.js" %>
```

For Rails 6 / Webpacker, run:

```sh
yarn add chartkick
```

And in `app/javascript/packs/application.js`, add:

```js
require("chartkick")
```

For Rails 5 / Sprockets, in `app/assets/javascripts/application.js`, add:

```js
//= require chartkick
```

To specify a language or Google Maps API key, use:

```js
Chartkick.configure({language: "de", mapsApiKey: "..."})
```

before your charts.

### Highcharts

For Rails 6 / Webpacker, run:

```sh
yarn add chartkick highcharts
```

And in `app/javascript/packs/application.js`, add:

```js
require("chartkick").use(require("highcharts"))
```

For Rails 5 / Sprockets, download [highcharts.js](https://code.highcharts.com/highcharts.js) into `vendor/assets/javascripts` (or use `yarn add highcharts` in Rails 5.1+), and in `app/assets/javascripts/application.js`, add:

```js
//= require chartkick
//= require highcharts
```

### Sinatra and Padrino

Download [chartkick.js](https://raw.githubusercontent.com/ankane/chartkick/master/vendor/assets/javascripts/chartkick.js) and include it manually.

```html
<script src="chartkick.js"></script>
```

### Multiple Libraries

If more than one charting library is loaded, choose between them with:

```erb
<%= line_chart data, adapter: "google" %> <!-- or highcharts or chartjs -->
```

## JavaScript API

Access a chart with:

```javascript
var chart = Chartkick.charts["chart-id"]
```

Get the underlying chart object with:

```javascript
chart.getChartObject()
```

You can also use:

```javascript
chart.getElement()
chart.getData()
chart.getOptions()
chart.getAdapter()
```

Update the data with:

```javascript
chart.updateData(newData)
```

You can also specify new options:

```javascript
chart.setOptions(newOptions)
// or
chart.updateData(newData, newOptions)
```

Refresh the data from a remote source:

```javascript
chart.refreshData()
```

Redraw the chart with:

```javascript
chart.redraw()
```

Loop over charts with:

```javascript
Chartkick.eachChart( function(chart) {
  // do something
})
```

## Content Security Policy (CSP)

Check out [how to configure CSP](https://github.com/ankane/chartkick/blob/master/guides/Content-Security-Policy.md)

## No Ruby? No Problem

Check out [chartkick.js](https://github.com/ankane/chartkick.js)

## Tutorials

- [Charts with Chartkick and Groupdate](https://gorails.com/episodes/charts-with-chartkick-and-groupdate)
- [Creando gráficos en Ruby on Rails con Chartkick y Chart.js](https://www.youtube.com/watch?v=W92AlkwQn3M)
- [Make Easy Graphs and Charts on Rails with Chartkick](https://www.sitepoint.com/make-easy-graphs-and-charts-on-rails-with-chartkick/)
- [Practical Graphs on Rails: Chartkick in Practice](https://www.sitepoint.com/graphs-on-rails-chartkick-in-practice/)

## Upgrading

### 3.0

Breaking changes

- Removed support for Rails < 4.2
- Removed chartkick.js from asset precompile (no longer needed)
- Removed `xtype` option - numeric axes are automatically detected
- Removed `window.Chartkick = {...}` way to set config - use `Chartkick.configure` instead
- Removed support for the Google Charts jsapi loader - use loader.js instead

### 2.0

Breaking changes

- Chart.js is now the default adapter if multiple are loaded - yay open source!
- Axis types are automatically detected - no need for `discrete: true`
- Better date support - dates are no longer treated as UTC

## Credits

Chartkick uses [iso8601.js](https://github.com/Do/iso8601.js) to parse dates and times.

## History

View the [changelog](https://github.com/ankane/chartkick/blob/master/CHANGELOG.md)

Chartkick follows [Semantic Versioning](https://semver.org/)

## Contributing

Everyone is encouraged to help improve this project. Here are a few ways you can help:

- [Report bugs](https://github.com/ankane/chartkick/issues)
- Fix bugs and [submit pull requests](https://github.com/ankane/chartkick/pulls)
- Write, clarify, or fix documentation
- Suggest or add new features

# Chartkick

Create beautiful JavaScript charts with one line of Ruby. No more fighting with charting libraries!

[See it in action](http://ankane.github.io/chartkick/)

:fire: For admin charts and dashboards, check out [Blazer](https://github.com/ankane/blazer/)

:two_hearts: A perfect companion to [Groupdate](https://github.com/ankane/groupdate), [Hightop](https://github.com/ankane/hightop), and [ActiveMedian](https://github.com/ankane/active_median)

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

Colors

```erb
<%= line_chart data, colors: ["pink", "#999"] %>
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

You can pass options directly to the charting library with:

```erb
<%= line_chart data, library: {backgroundColor: "#eee"} %>
```

See the documentation for [Google Charts](https://developers.google.com/chart/interactive/docs/gallery), [Highcharts](http://api.highcharts.com/highcharts), and [Chart.js](http://www.chartjs.org/docs/) for more info.

### Global Options

To set options for all of your charts, create an initializer `config/initializers/chartkick.rb` with:

```ruby
Chartkick.options = {
  height: "400px",
  colors: ["pink", "#999"]
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

Then, in your layout:

```erb
<%= yield :charts_js %> <%# Rails %>
<%= yield_content :charts_js %> <%# Padrino %>
```

This is great for including all of your JavaScript at the bottom of the page.

### Data

Pass data as a Hash or Array

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

Times can be a time, a timestamp, or a string (strings are parsed)

```erb
<%= line_chart({20.day.ago => 5, 1368174456 => 4, "2013-05-07 00:00:00 UTC" => 7}) %>
```

## Installation

Add this line to your application's Gemfile:

```ruby
gem "chartkick"
```

Next, choose your charting library.

**Note:** In the instructions below, `application.js` must be included **before** the helper methods in your views, unless using the `:content_for` option.

#### Chart.js

In `application.js`, add:

```js
//= require Chart.bundle
//= require chartkick
```

#### Google Charts

In `application.js`, add:

```js
//= require chartkick
```

In your views, before `application.js`, add:

```erb
<%= javascript_include_tag "https://www.google.com/jsapi" %>
```

#### Highcharts

Download [highcharts.js](https://code.highcharts.com/highcharts.js) into `vendor/assets/javascripts`.

In `application.js`, add:

```js
//= require highcharts
//= require chartkick
```

Works with Highcharts 2.1+

### For Sinatra

You must include `chartkick.js` manually.  [Download it here](https://raw.github.com/ankane/chartkick/master/app/assets/javascripts/chartkick.js)

```html
<script src="https://www.google.com/jsapi"></script>
<script src="chartkick.js"></script>
```

### For Padrino

You must include `chartkick.js` manually.  [Download it here](https://raw.github.com/ankane/chartkick/master/app/assets/javascripts/chartkick.js)

```erb
<%= javascript_include_tag "https://www.google.com/jsapi", "chartkick" %>
```

### Localization

To specify a language for Google Charts, add:

```javascript
Chartkick.configure({"language": "de"});
```

after the JavaScript files and before your charts.

## JavaScript API

Access a chart with:

```javascript
var chart = Chartkick.charts["chart-id"];
```

Get the underlying chart object with:

```javascript
chart.getChartObject();
```

You can also use:

```javascript
chart.getElement();
chart.getData();
chart.getOptions();
```

## No Ruby? No Problem

Check out [chartkick.js](https://github.com/ankane/chartkick.js)

## Tutorials

- [Make Easy Graphs and Charts on Rails with Chartkick](https://www.sitepoint.com/make-easy-graphs-and-charts-on-rails-with-chartkick/)
- [Practical Graphs on Rails: Chartkick in Practice](https://www.sitepoint.com/graphs-on-rails-chartkick-in-practice/)

## Upgrading

### 2.0

Breaking changes

- Chart.js is now the default adapter if multiple are loaded - yay open source!
- Axis types are automatically detected - no need for `discrete: true`
- Better date support - dates are no longer treated as UTC

## Credits

Chartkick uses [iso8601.js](https://github.com/Do/iso8601.js) to parse dates and times.

## History

View the [changelog](https://github.com/ankane/chartkick/blob/master/CHANGELOG.md)

Chartkick follows [Semantic Versioning](http://semver.org/)

## Contributing

Everyone is encouraged to help improve this project. Here are a few ways you can help:

- [Report bugs](https://github.com/ankane/chartkick/issues)
- Fix bugs and [submit pull requests](https://github.com/ankane/chartkick/pulls)
- Write, clarify, or fix documentation
- Suggest or add new features

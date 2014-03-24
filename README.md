# Chartkick

Create beautiful Javascript charts with one line of Ruby. No more fighting with charting libraries!

[See it in action](http://ankane.github.io/chartkick/)

Works with Rails, Sinatra and most browsers (including IE 6)

:two_hearts: A perfect companion to [groupdate](https://github.com/ankane/groupdate) and [active_median](https://github.com/ankane/active_median)

## Usage

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

Geo chart

```erb
<%= geo_chart Medal.group(:country).count %>
```

Multiple series (except pie chart)

```erb
<%= line_chart @goals.map{|goal|
    {name: goal.name, data: goal.feats.group_by_week(:created_at).count}
} %>
```

### Say Goodbye To Timeouts

Make your pages load super fast and stop worrying about timeouts.  Give each chart its own endpoint.

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

**Note:** This feature requires [jQuery](http://jquery.com/) or [Zepto](http://zeptojs.com/) at the moment.

### Options

Id and height

```erb
<%= line_chart data, id: "users-chart", height: "500px" %>
```

Min and max values (except pie chart)

```erb
<%= line_chart data, min: 1000, max: 5000 %>
```

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

You can pass options directly to the charting library with:

```erb
<%= line_chart data, library: {backgroundColor: "#eee"} %>
```

See the documentation for [Google Charts](https://developers.google.com/chart/interactive/docs/gallery) and [Highcharts](http://api.highcharts.com/highcharts) for more info.

You can also pass a content_for option, which will put the javascript in a content block.  This is great for including all of your javascript at the bottom of the page.

```erb
<%= line_chart data, content_for: :charts_js %>
```
Then, in your layout:

```erb
<%= yield :charts_js %> <%# Rails %>
<%= yield_content :charts_js %> <%# Padrino %>
```

### Global Options

To set options for all of your charts, create an initializer with:

```ruby
Chartkick.options = {
  height: "400px",
  colors: ["pink", "#999"],
  content_for: :charts_js
}
```

### Google Charts customisation

Here are a couple of examples of how you might use Chartkick with Google Charts. 

Changing fonts and graph colours: 

```erb
<%= line_chart data, :library => { fontName: "Verdana", colors: ["#80cd30", "#99CCFF"]} %>
```

Chart layout/position: 

```erb
<%= line_chart data, :library => { chartArea: { top: 40, left: 50, width: '85%', height: '70%' }} %>
```

Formatting the axis: 

```erb
<%= line_chart data, :library => { hAxis: { textStyle: { color: "#072982", fontSize: 13 }}} %>
```

For more formatting options, see the [Google Charts Configuration Options](https://developers.google.com/chart/interactive/docs/gallery/areachart#Configuration_Options) and follow the pattern above.

### Highcharts customisation

Here are a couple of examples of how you might use Chartkick with Highcharts. 

Changing graph colours (font can be changed when formatting the axis, below): 

```erb
<%= line_chart data, :library => { colors: ["#80cd30", "#99CCFF"]} %>
```

Chart layout/position: 

```erb
<%= line_chart data, :library => { chart: { marginLeft: 100, marginTop: 50, height: 500 }} %>
```

Formatting the axis: 

```erb
<%= line_chart data, :library => { xAxis: { labels: { style: { color: "#072982", fontSize: "15px", fontFamily: "Verdana" }}}} %>
```

For more formatting options, see the [Highcharts Options Reference](http://api.highcharts.com/highcharts) and follow the pattern above.

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

And add the javascript files to your views.  These files must be included **before** the helper methods, unless using the `:content_for` option.

For Google Charts, use:

```erb
<%= javascript_include_tag "//www.google.com/jsapi", "chartkick" %>
```

If you prefer Highcharts, use:

```erb
<%= javascript_include_tag "path/to/highcharts.js", "chartkick" %>
```

### For Rails 3.1+

`chartkick.js` runs as a Rails engine - no need to install it.

### For Rails 2.3 and 3.0

You must include `chartkick.js` manually.  [Download it here](https://raw.github.com/ankane/chartkick/master/app/assets/javascripts/chartkick.js)

For Rails 2.3, you must use a script tag for Google Charts due to [this bug](https://rails.lighthouseapp.com/projects/8994/tickets/1664-javascript_include_tag-shouldnt-append-a-js-onto-external-urls).

```html
<script src="//www.google.com/jsapi"></script>
```

### For Sinatra

You must include `chartkick.js` manually.  [Download it here](https://raw.github.com/ankane/chartkick/master/app/assets/javascripts/chartkick.js)

```html
<script src="//www.google.com/jsapi"></script>
<script src="chartkick.js"></script>
```

### For Padrino

You must include `chartkick.js` manually.  [Download it here](https://raw.github.com/ankane/chartkick/master/app/assets/javascripts/chartkick.js)

In addition, you must specify `http` or `https` if you use Google Charts, since Padrino tries to append `.js` to protocol relative urls.

```erb
<%= javascript_include_tag "https://www.google.com/jsapi", "chartkick" %>
```

### Localization

To specify a language for Google Charts, add:

```html
<script>
  var Chartkick = {"language": "de"};
</script>
```

**before** the javascript files.

## No Ruby? No Problem

Check out [chartkick.js](https://github.com/ankane/chartkick.js)

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

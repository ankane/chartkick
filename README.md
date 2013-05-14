# Chartkick

Create beautiful Javascript charts with one line of Ruby. No more fighting with charting libraries!

[See it in action](http://ankane.github.io/chartkick/)

Works with Rails 3.1+ and most browsers (including IE 6)

:two_hearts: A perfect companion to [groupdate](http://ankane.github.io/groupdate/)

## Usage

Line chart

```erb
<%= line_chart User.group_by_day(:created_at).count %>
```

Pie chart

```erb
<%= pie_chart Goal.group("name").count %>
```

Column chart

```erb
<%= column_chart Task.group_by_hour_of_day(:created_at).count %>
```

Multiple series (except pie chart)

```erb
<%= line_chart @goals.map{|goal|
    {:name => goal.name, :data => goal.feats.group_by_week(:created_at).count }
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
    render :json => Task.group_by_day(:completed_at).count
  end
end
```

**Note:** This feature requires jQuery at the moment.

### Options

id and height

```erb
<%= line_chart User.group_by_day(:created_at).count, :id => "users-chart", :height => "500px" %>
```

min and max values (except pie chart)

```erb
<%= line_chart User.group_by_day(:created_at).count, :min => 1000, :max => 5000 %>
```

**Note:** min defaults to 0 - use `:min => nil` to allow the chart to choose the minimum.

### Data

Pass data as a Hash or Array

```erb
<%= pie_chart({"Football" => 10, "Basketball" => 5}) %>
<%= pie_chart [["Football", 10], ["Basketball", 5]] %>
```

For multiple series, use the format

```erb
<%= line_chart [
  {:name => "Series A", :data => series_a},
  {:name => "Series B", :data => series_b}
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

And add the javascript files to your views. `chartkick.js` runs as a Rails engine - no need to install it.

**Note:** These files must be included **before** the helper methods.

For Google Charts, use:

```erb
<%= javascript_include_tag "//www.google.com/jsapi", "chartkick" %>
```

If you prefer Highcharts, use:

```erb
<%= javascript_include_tag "path/to/highcharts.js", "chartkick" %>
```

## No Ruby? No Problem

Chartkick doesn’t require Ruby.

```html
<script src="/path/to/chartkick.js"></script>
<div id="chart-1" style="height: 300px;"></div>
<script>
  var chart = document.getElementById("chart-1");
  new Chartkick.PieChart(chart, {"Football": 45, "Soccer": 56, "Basketball": 98});
  // or remote
  new Chartkick.LineChart(chart, "/charts/stocks");
</script>
```

Download [chartkick.js](https://raw.github.com/ankane/chartkick/master/app/assets/javascripts/chartkick.js)

## Credits

Chartkick uses [iso8601.js](https://github.com/Do/iso8601.js) to parse dates and times.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

# Chartkick

Create beautiful Javascript charts with one line of Ruby

[Demo](http://ankane.github.io/chartkick/)

:two_hearts: A perfect companion to [groupdate](http://ankane.github.io/groupdate/)

Works with Rails 3.0+

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
<%= line_chart Goal.all.map{|goal| {:name => goal.name, :data => goal.feats.group_by_week(:created_at).count } } %>
```

### Data

For line charts, times can be a time or a string (strings are parsed)

```erb
<% line_chart({20.day.ago => 5, "2013-05-07 00:00:00 UTC" => 7}) %>
```

Pass data as a Hash or Array

```erb
<%= pie_chart({"Football" => 10, "Basketball" => 5}) %>
<%= pie_chart [["Football", 10], ["Basketball", 5]] %>
```

For multiple series, use the format

```erb
<% series_a = {time_0 => 5, time_1 => 7} # Hash %>
<% series_b = [[time_0, 8], [time_1, 9]] # or Array %>
<%= line_chart [{:name => "Series A", :data => series_a, {:name => "Series B", :data => series_b}] %>
```

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

## Installation

Add this line to your application's Gemfile:

```ruby
gem "chartkick"
```

And add the javascript files to your views.

```erb
<!-- 1. Google Charts first -->
<!-- 2. chartkick.js runs as a Rails engine - no need to install it -->
<%= javascript_include_tag "//www.google.com/jsapi", "chartkick" %>
```

For Highcharts, add this instead:

```erb
<%= javascript_include_tag "path/to/highcharts.js", "chartkick.highcharts" %>
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

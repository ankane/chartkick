# Chartkick

Create beautiful Javascript charts with one line of Ruby. No more fighting with charting libraries!

[See it in action](http://ankane.github.io/chartkick/)

Works with Rails, Sinatra and most browsers (including IE 6)

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

Id and height

```erb
<%= line_chart User.group_by_day(:created_at).count, :id => "users-chart", :height => "500px" %>
```

Min and max values (except pie chart)

```erb
<%= line_chart User.group_by_day(:created_at).count, :min => 1000, :max => 5000 %>
```

You can pass options directly to the charting library with:

```erb
<%= line_chart User.group_by_day(:created_at).count, :library => {:backgroundColor => "#eee"} %>
```

You can also pass a content_for option, this will put the initializing javascripts in the content_block you specify:

```erb
<%= line_chart User.group_by_day(:created_at).count, :content_for => :js_initialization %>
```
Then, in your layout:
```erb
<%= content_for :js_initialization %>
```

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

And add the javascript files to your views.  These files must be included **before** the helper methods, unless using the content_for option to the helper. 

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

## No Ruby? No Problem

Check out [chartkick.js](https://github.com/ankane/chartkick.js)

## Credits

Chartkick uses [iso8601.js](https://github.com/Do/iso8601.js) to parse dates and times.

## History

View the [changelog](https://github.com/ankane/chartkick/blob/master/CHANGELOG.md)

Chartkick follows [Semantic Versioning](http://semver.org/)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

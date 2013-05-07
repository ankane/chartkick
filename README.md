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
<%= pie_chart Goal.group("goals.name").count %>
```

Column chart

```erb
<%= column_chart Task.group_by_hour_of_day(:created_at).count %>
```

Multiple series (line chart only)

```erb
<%= line_chart Goal.all.map{|goal| {:name => goal.name, :data => goal.feats.group_by_week(:created_at).count } } %>
```

Customize (id and height)

```erb
<%= line_chart User.group_by_day(:created_at).count, :id => "users-chart", :height => "500px" %>
```

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

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

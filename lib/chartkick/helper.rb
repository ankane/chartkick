module Chartkick
  module Helper

    def line_chart(series, options = {})
      series = chartkick_series(series) do |data|
        data.map{|k, v| [k.is_a?(Time) ? k : Time.parse(k), v] }.sort_by{|k, v| k }.map{|k, v| [k.to_i, v.to_f] }
      end
      html, element_id = chartkick_div(options)
      html << content_tag(:script) do
        concat "new Chartkick.LineChart(#{element_id.to_json}, #{series.to_json});".html_safe
      end
      html
    end

    def pie_chart(series, options = {})
      series = series.map{|k,v| [k.to_s, v.to_f] }
      html, element_id = chartkick_div(options)
      html << content_tag(:script) do
        concat "new Chartkick.PieChart(#{element_id.to_json}, #{series.to_json});".html_safe
      end
      html
    end

    def column_chart(series, options = {})
      series = chartkick_series(series) do |data|
        data.map{|k, v| [k.to_s, v.to_f] }
      end
      html, element_id = chartkick_div(options)
      html << content_tag(:script) do
        concat "new Chartkick.ColumnChart(#{element_id.to_json}, #{series.to_json});".html_safe
      end
      html
    end

    private

    def chartkick_series(series, &block)
      unless series.is_a?(Array) and series[0].is_a?(Hash)
        series = [{:name => "Value", :data => series}]
      end
      series.each do |s|
        s[:name] = s[:name].to_s
        s[:data] = yield(s[:data])
      end
      series
    end

    def chartkick_div(options)
      @chartkick_chart_id ||= 0
      element_id = options[:id] || "chart-#{@chartkick_chart_id += 1}"
      height = options[:height] || "300px"
      [content_tag(:div, :id => element_id, :style => "height: #{height};") {}, element_id]
    end

  end
end

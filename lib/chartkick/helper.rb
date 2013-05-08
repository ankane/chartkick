module Chartkick
  module Helper

    def line_chart(series, options = {})
      series = chartkick_series(series) do |data|
        data.map{|k, v| [k.is_a?(Time) ? k : Time.parse(k), v] }.sort_by{|k, v| k }.map{|k, v| [k.to_i, v.to_f] }
      end
      chartkick_chart(series, options, "LineChart")
    end

    def pie_chart(series, options = {})
      series = series.map{|k,v| [k.to_s, v.to_f] }
      chartkick_chart(series, options, "PieChart")
    end

    def column_chart(series, options = {})
      series = chartkick_series(series) do |data|
        data.map{|k, v| [k.to_s, v.to_f] }
      end
      chartkick_chart(series, options, "ColumnChart")
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

    def chartkick_chart(series, options, klass)
      @chartkick_chart_id ||= 0
      element_id = options[:id] || "chart-#{@chartkick_chart_id += 1}"
      height = options[:height] || "300px"
      js_options = {}

      html = content_tag(:div, :id => element_id, :style => "height: #{height};") {}
      html << content_tag(:script) do
        concat "new Chartkick.#{klass}(#{element_id.to_json}, #{series.to_json}, #{js_options.to_json});".html_safe
      end
      html
    end

  end
end

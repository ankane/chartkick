module Chartkick
  module Helper

    def line_chart(data_source, options = {})
      chartkick_chart data_source, options, "LineChart" do |series|
        chartkick_series(series) do |data|
          data.map{|k, v| [k.is_a?(Time) ? k : Time.parse(k), v] }.sort_by{|k, v| k }.map{|k, v| [k.to_i, v.to_f] }
        end
      end
    end

    def pie_chart(data_source, options = {})
      chartkick_chart data_source, options, "PieChart" do |series|
        series.map{|k,v| [k.to_s, v.to_f] }
      end
    end

    def column_chart(data_source, options = {})
      chartkick_chart data_source, options, "ColumnChart" do |series|
        chartkick_series(series) do |data|
          data.map{|k, v| [k.to_s, v.to_f] }
        end
      end
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

    def chartkick_chart(data_source, options, klass, &block)
      @chartkick_chart_id ||= 0
      element_id = options[:id] || "chart-#{@chartkick_chart_id += 1}"
      height = options[:height] || "300px"

      # js options
      default_options = {
        :min => 0
      }
      js_options = default_options.deep_merge(options)

      # don't quote font-family names due to rails escaping
      html =
        content_tag :div, :id => element_id, :style => "height: #{height}; text-align: center; color: #999; line-height: #{height}; font-size: 14px; font-family: Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif;" do
          concat "Loading..."
        end

      if data_source.is_a?(String)
        klass = "Remote#{klass}"
      else
        data_source = yield data_source
      end

      html << content_tag(:script) do
        concat "new Chartkick.#{klass}(document.getElementById(#{element_id.to_json}), #{data_source.to_json}, #{js_options.to_json});".html_safe
      end
      html
    end

  end
end

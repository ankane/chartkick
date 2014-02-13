require "json"
require "erb"

module Chartkick
  module Helper

    def line_chart(data_source, options = {})
      chartkick_chart "LineChart", data_source, options
    end

    def pie_chart(data_source, options = {})
      chartkick_chart "PieChart", data_source, options
    end

    def column_chart(data_source, options = {})
      chartkick_chart "ColumnChart", data_source, options
    end

    def bar_chart(data_source, options = {})
      chartkick_chart "BarChart", data_source, options
    end

    def area_chart(data_source, options = {})
      chartkick_chart "AreaChart", data_source, options
    end

    private

    def chartkick_chart(klass, data_source, options, &block)
      @chartkick_chart_id ||= 0
      options = options.dup
      element_id = options.delete(:id) || "chart-#{@chartkick_chart_id += 1}"
      style = { "height" => "300px",
                "text-align" => "center",
                "color" => "#999",
                "line-height" => "300px",
                "font-size" => "14px",
                "font-family" => "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
              }.merge(options.delete(:style) || {}).to_a.map{|attr| attr.join(': ') }.join('; ')

      html = <<HTML
<div id="#{ERB::Util.html_escape(element_id)}" style="#{ERB::Util.html_escape(style)}">
  Loading...
</div>
HTML
     js = <<JS
<script type="text/javascript">
  new Chartkick.#{klass}(#{element_id.to_json}, #{data_source.to_json}, #{options.to_json});
</script>
JS
      if options[:content_for]
        content_for(options[:content_for]) { js.respond_to?(:html_safe) ? js.html_safe : js }
      else
        html += js
      end

      html.respond_to?(:html_safe) ? html.html_safe : html
    end

  end
end

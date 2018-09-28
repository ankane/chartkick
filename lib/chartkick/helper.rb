require "json"
require "erb"

module Chartkick
  module Helper
    def line_chart(data_source, **options)
      chartkick_chart "LineChart", data_source, options
    end

    def pie_chart(data_source, **options)
      chartkick_chart "PieChart", data_source, options
    end

    def column_chart(data_source, **options)
      chartkick_chart "ColumnChart", data_source, options
    end

    def bar_chart(data_source, **options)
      chartkick_chart "BarChart", data_source, options
    end

    def area_chart(data_source, **options)
      chartkick_chart "AreaChart", data_source, options
    end

    def scatter_chart(data_source, **options)
      chartkick_chart "ScatterChart", data_source, options
    end

    def geo_chart(data_source, **options)
      chartkick_chart "GeoChart", data_source, options
    end

    def timeline(data_source, **options)
      chartkick_chart "Timeline", data_source, options
    end

    private

    def chartkick_chart(klass, data_source, **options)
      @chartkick_chart_id ||= 0
      options = chartkick_deep_merge(Chartkick.options, options)
      element_id = options.delete(:id) || "chart-#{@chartkick_chart_id += 1}"
      height = options.delete(:height) || "300px"
      width = options.delete(:width) || "100%"
      defer = !!options.delete(:defer)
      # content_for: nil must override default
      content_for = options.key?(:content_for) ? options.delete(:content_for) : Chartkick.content_for

      nonce = options.delete(:nonce)
      if nonce == true
        # Secure Headers also defines content_security_policy_nonce but it takes an argument
        # Rails 5.2 overrides this method, but earlier versions do not
        if respond_to?(:content_security_policy_nonce) && (content_security_policy_nonce rescue nil)
          # Rails 5.2
          nonce = content_security_policy_nonce
        elsif respond_to?(:content_security_policy_script_nonce)
          # Secure Headers
          nonce = content_security_policy_script_nonce
        end
      end
      nonce_html = nonce ? " nonce=\"#{ERB::Util.html_escape(nonce)}\"" : nil

      html = (options.delete(:html) || %(<div id="%{id}" style="height: %{height}; width: %{width}; text-align: center; color: #999; line-height: %{height}; font-size: 14px; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;">Loading...</div>)) % {id: ERB::Util.html_escape(element_id), height: ERB::Util.html_escape(height), width: ERB::Util.html_escape(width)}

      createjs = "new Chartkick.#{klass}(#{element_id.to_json}, #{data_source.respond_to?(:chart_json) ? data_source.chart_json : data_source.to_json}, #{options.to_json});"
      if defer
        js = <<JS
<script type="text/javascript"#{nonce_html}>
  (function() {
    var createChart = function() { #{createjs} };
    if (window.addEventListener) {
      window.addEventListener("load", createChart, true);
    } else if (window.attachEvent) {
      window.attachEvent("onload", createChart);
    } else {
      createChart();
    }
  })();
</script>
JS
      else
        js = <<JS
<script type="text/javascript"#{nonce_html}>
  #{createjs}
</script>
JS
      end

      if content_for
        content_for(content_for) { js.respond_to?(:html_safe) ? js.html_safe : js }
      else
        html += js
      end

      html.respond_to?(:html_safe) ? html.html_safe : html
    end

    # https://github.com/rails/rails/blob/master/activesupport/lib/active_support/core_ext/hash/deep_merge.rb
    def chartkick_deep_merge(hash_a, hash_b)
      hash_a = hash_a.dup
      hash_b.each_pair do |k, v|
        tv = hash_a[k]
        hash_a[k] = tv.is_a?(Hash) && v.is_a?(Hash) ? chartkick_deep_merge(tv, v) : v
      end
      hash_a
    end
  end
end

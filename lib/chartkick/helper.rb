require "json"
require "erb"

module Chartkick
  module Helper

    ["LineChart","PieChart","ColumnChart","BarChart","AreaChart","GeoChart","AnnotationChart"].each do |chart|
	    underscored_name = chart.scan(/[A-Z][a-z]*/).join("_").downcase
	    define_method(underscored_name){ |data_source, options = {} |
		    chartkick_chart chart, data_source, options
	    }
    end

    private

    def chartkick_chart(klass, data_source, options, &block)
      @chartkick_chart_id ||= 0
      options = chartkick_deep_merge(Chartkick.options, options)
      element_id = options[:id] || "chart-#{@chartkick_chart_id += 1}"
      height = options[:height] || "300px"
      # content_for: nil must override default
      content_for = options.has_key?(:content_for) ? options.delete(:content_for) : Chartkick.content_for

      html = (options[:html] || %[<div id="%{id}" style="height: %{height}; text-align: center; color: #999; line-height: %{height}; font-size: 14px; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;">Loading...</div>]) % {id: ERB::Util.html_escape(element_id), height: ERB::Util.html_escape(height)}

      js = <<JS
<script type="text/javascript">
  new Chartkick.#{klass}(#{element_id.to_json}, #{data_source.respond_to?(:chart_json) ? data_source.chart_json : data_source.to_json}, #{options.except(:id, :height, :html).to_json});
</script>
JS
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
      hash_b.each_pair do |k,v|
        tv = hash_a[k]
        hash_a[k] = tv.is_a?(Hash) && v.is_a?(Hash) ? tv.deep_merge(v) : v
      end
      hash_a
    end

  end
end

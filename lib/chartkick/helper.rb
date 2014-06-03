require "json"
require "erb"

module Chartkick
  module Helper

    def line_chart(data_source = nil, options = {}, &block)
      chartkick_chart "LineChart", data_source, options, &block
    end

    def pie_chart(data_source = nil, options = {}, &block)
      chartkick_chart "PieChart", data_source, options, &block
    end

    def column_chart(data_source = nil, options = {}, &block)
      chartkick_chart "ColumnChart", data_source, options, &block
    end

    def bar_chart(data_source = nil, options = {}, &block)
      chartkick_chart "BarChart", data_source, options, &block
    end

    def area_chart(data_source = nil, options = {}, &block)
      chartkick_chart "AreaChart", data_source, options, &block
    end

    def geo_chart(data_source = nil, options = {}, &block)
      chartkick_chart "GeoChart", data_source, options, &block
    end

    private

    def chartkick_chart(klass, data_source, options, &block)
      if block_given? && data_source.is_a?(Hash)
        options = data_source
      end

      @chartkick_chart_id = (@chartkick_chart_id || 0) + 1
      options = chartkick_deep_merge(Chartkick.options, options)

      if options.delete(:remote)
        if controller.params[:_chartkick_chart_id] # json request
          controller.chartkick_blocks ||= {}
          controller.chartkick_blocks[@chartkick_chart_id] = block
        else
          data_source = url_for(params.merge(_chartkick_chart_id: @chartkick_chart_id, format: :json))
        end
      else
        data_source = block.call if block_given?
      end

      element_id = options.delete(:id) || "chart-#{@chartkick_chart_id}"
      height = options.delete(:height) || "300px"
      # content_for: nil must override default
      content_for = options.has_key?(:content_for) ? options.delete(:content_for) : Chartkick.content_for

      html = <<HTML
<div id="#{ERB::Util.html_escape(element_id)}" style="height: #{ERB::Util.html_escape(height)}; text-align: center; color: #999; line-height: #{ERB::Util.html_escape(height)}; font-size: 14px; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;">
  Loading...
</div>
HTML
     js = <<JS
<script type="text/javascript">
  new Chartkick.#{klass}(#{element_id.to_json}, #{data_source.respond_to?(:chart_json) ? data_source.chart_json : data_source.to_json}, #{options.to_json});
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

require "chartkick/helper"
require "chartkick/version"

# integrations
require "chartkick/engine" if defined?(Rails)
require "chartkick/sinatra" if defined?(Sinatra)

if defined?(ActiveSupport.on_load)
  ActiveSupport.on_load(:action_view) do
    include Chartkick::Helper
  end
end

module Chartkick
  class << self
    attr_accessor :content_for
    attr_accessor :options
  end
  self.options = {}
end

# for multiple series
# use Enumerable so it can be called on arrays
module Enumerable
  def chart_json
    if is_a?(Hash)
      if (key = keys.first) && key.is_a?(Array) && key.size == 2
        group_by { |k, _v| k[0] }.map do |name, data|
          {name: name, data: data.map { |k, v| [k[1], v] }}
        end
      else
        to_a
      end
    elsif is_a?(Array)
      map do |v|
        if v.is_a?(Hash) && v[:data].is_a?(Hash)
          v = v.dup
          v[:data] = v[:data].to_a
        end
        v
      end
    else
      self
    end.to_json
  end
end

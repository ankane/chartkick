require "chartkick/version"
require "chartkick/helper"
require "chartkick/rails" if defined?(Rails)
require "chartkick/sinatra" if defined?(Sinatra)

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
    if is_a?(Hash) and (key = keys.first) and key.is_a?(Array) and key.size == 2
      group_by{|k, v| k[0] }.sort.map do |name, data|
        {name: name, data: data.map{|k, v| [k[1], v] }}
      end
    else
      self
    end.to_json
  end
end

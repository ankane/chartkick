# stdlib
require "erb"
require "json"

# modules
require_relative "chartkick/core_ext"
require_relative "chartkick/helper"
require_relative "chartkick/utils"
require_relative "chartkick/version"

# integrations
require_relative "chartkick/engine" if defined?(Rails)
require_relative "chartkick/sinatra" if defined?(Sinatra)

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

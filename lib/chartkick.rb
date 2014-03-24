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

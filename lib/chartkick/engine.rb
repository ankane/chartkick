module Chartkick
  class Engine < ::Rails::Engine

    initializer "precompile", :group => :all do |app|
      # use a proc instead of a string
      assets = ["chartkick.js", "chartkick.highcharts.js"]
      app.config.assets.precompile << Proc.new{|path| assets.include?(path) }
    end

    initializer "helper" do |app|
      ActiveSupport.on_load(:action_view) do
        include Helper
      end
    end

  end
end

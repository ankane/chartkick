module Chartkick
  class Engine < ::Rails::Engine
    initializer "precompile", group: :all do |app|
      if app.config.respond_to?(:assets)
        if defined?(Sprockets) && Gem::Version.new(Sprockets::VERSION) >= Gem::Version.new("4.0.0.beta1")
          app.config.assets.precompile << "chartkick.js"
        else
          # use a proc instead of a string
          app.config.assets.precompile << proc { |path| path == "chartkick.js" }
        end
      end
    end

    initializer "helper" do
      ActiveSupport.on_load(:action_view) do
        include Helper
      end
    end
  end
end

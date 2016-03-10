module Chartkick
  class Engine < ::Rails::Engine
    initializer "precompile", group: :all do |app|
      if Rails::VERSION::MAJOR >= 5
        app.config.assets.precompile << "chartkick.js"
      else
        # use a proc instead of a string
        app.config.assets.precompile << proc { |path| path == "chartkick.js" }
      end
    end

    initializer "helper" do
      ActiveSupport.on_load(:action_view) do
        include Helper
      end
    end
  end
end

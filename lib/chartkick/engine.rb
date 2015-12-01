module Chartkick
  class Engine < ::Rails::Engine
    initializer "precompile", group: :all do |app|
      # use a proc instead of a string
      app.config.assets.precompile << 'chartkick.js'
    end

    initializer "helper" do
      ActiveSupport.on_load(:action_view) do
        include Helper
      end
    end
  end
end

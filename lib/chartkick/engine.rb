module Chartkick
  class Engine < ::Rails::Engine
    # for assets

    # for importmap
    initializer "chartkick.importmap" do |app|
      if app.config.respond_to?(:assets) && defined?(Importmap) && defined?(Sprockets)
        app.config.assets.precompile << "chartkick.js"
        app.config.assets.precompile << "Chart.bundle.js"
      end
    end
  end
end

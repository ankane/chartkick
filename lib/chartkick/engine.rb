module Chartkick
  class Engine < ::Rails::Engine
    # for assets

    # for importmap
    if defined?(Importmap)
      initializer "chartkick.importmap", after: "importmap" do |app|
        app.config.assets.precompile << "chartkick.js"
        app.config.assets.precompile << "Chart.bundle.js"
      end
    end
  end
end

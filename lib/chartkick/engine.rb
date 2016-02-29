module Chartkick
  class Engine < ::Rails::Engine
    initializer "precompile", group: :all do |app|
      # use a string in rails >= 5
      if Gem::Requirement.new(">= 5.0.0.beta").satisfied_by?(Gem::Version.new(Rails.version))
        app.config.assets.precompile << 'chartkick.js'
      else
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

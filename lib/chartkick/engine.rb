module Chartkick
  class Engine < ::Rails::Engine

    initializer "precompile", :group => :all do |app|
      # use a proc instead of a string
      app.config.assets.precompile << Proc.new{|path| path == "chartkick.js" }
    end

    initializer "helper" do |app|
      ActiveSupport.on_load(:action_view) do
        include Helper
      end
    end

  end
end

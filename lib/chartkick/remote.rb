module Chartkick
  module Remote
    extend ActiveSupport::Concern
    attr_accessor :chartkick_blocks

    module Responder
      def to_json
        controller.render_to_string(options.merge(formats: [:html], layout: false))
        render json: controller.chartkick_blocks[controller.params[:_chartkick_chart_id].to_i].call
      end
    end

    def default_render(*)
      if params[:_chartkick_chart_id]
        respond_with nil
      else
        super
      end
    end

    module ClassMethods
      def chartkick_remote(options = {})
        respond_to :json, options
        self.responder = Class.new(responder) do
          include Responder
        end
      end
    end
  end
end

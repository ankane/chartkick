require 'test_helper'

module Chartkick
  class HelperTest < Minitest::Spec
    include Helper

    before do
      @data = [[34, 42], [56, 49]]
      @options = { id: 'chartkick', height: '400px' }
    end

    it "should render line chart with options" do
      html = line_chart @data, @options
      assert html
    end

    it "should render line chart without options" do
      html = line_chart @data
      assert html
    end

  end
end

require "test_helper"

class TestChartkick < Minitest::Test
  include Chartkick::Helper

  # TODO actual tests

  def setup
    @data = [[34, 42], [56, 49]]
    @three_d_data = [[34, 42, 56], [56, 49, 7]]
  end

  def test_line_chart
    assert line_chart(@data)
  end

  def test_pie_chart
    assert pie_chart(@data)
  end

  def test_column_chart
    assert column_chart(@data)
  end

  def test_bubble_chart
    assert bubble_chart(@three_d_data)
  end

  def test_options_not_mutated
    options = {id: "boom"}
    line_chart @data, options
    assert_equal "boom", options[:id]
  end
end

require "test_helper"

class TestChartkick < Minitest::Test
  include Chartkick::Helper

  # TODO actual tests

  def setup
    @data = [[34, 42], [56, 49]]
    @candlestick_data = [
        [Date.today -  1, 10, 20, 30, 40],
        [Date.today, 10, 30, 20, 60]
    ]
    @combo_data = [[["Work", 32],["Play", 1492]], types: ["line", "column"]]
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

  def test_candlestick_chart
    assert candlestick_chart(@candlestick_data)
  end

  def test_combo_chart
    assert combo_chart(@combo_data)
  end

  def test_options_not_mutated
    options = {id: "boom"}
    line_chart @data, options
    assert_equal "boom", options[:id]
  end
end

require "test_helper"

class TestChartkick < Minitest::Test
  include Chartkick::Helper

  # TODO actual tests

  def setup
    @data = [[34, 42], [56, 49]]
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

  def test_annotation_chart
    assert annotation_chart(@data)
  end

end

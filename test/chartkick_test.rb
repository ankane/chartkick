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

  def test_options_not_mutated
    options = {id: "boom"}
    line_chart @data, options
    assert_equal "boom", options[:id]
  end

  def test_chartkick_deep_merge_different_inner_key
    global_option = {library: {backgroundColor: "#eee"}}
    local_option = {library: {title: "test"}}
    correct_merge = {library: {backgroundColor: "#eee", title: "test"}}
    assert_equal chartkick_deep_merge(global_option, local_option), correct_merge
  end

  def test_chartkick_deep_merge_same_inner_key
    global_option = {library: {backgroundColor: "#eee"}}
    local_option = {library: {backgroundColor: "#fff"}}
    correct_merge = {library: {backgroundColor: "#fff"}}
    assert_equal chartkick_deep_merge(global_option, local_option), correct_merge
  end
end

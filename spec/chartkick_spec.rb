require 'spec_helper'

describe "Chartkick" do
  let(:chartkick) { Class.new { extend Chartkick::Helper }}

  before :all do
    # setup the data
    @data = [[0,1],[1,10],[2,20],[3,30],[4,40]]
  end

  context "with default parameters" do
    it "creates a line chart" do
      chart = chartkick.line_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.LineChart")
    end
    it "creates a pie chart" do
      chart = chartkick.pie_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.PieChart")
    end
    it "creates a column chart" do
      chart = chartkick.column_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.ColumnChart")
    end
    it "creates a bar chart" do
      chart = chartkick.bar_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.BarChart")
    end
    it "creates an area chart" do
      chart = chartkick.area_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.AreaChart")
    end
    it "creates a scatter chart" do
      chart = chartkick.scatter_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.ScatterChart")
    end
    it "creates a geo chart" do
      chart = chartkick.geo_chart @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.GeoChart")
    end
    it "creates a timeline chart" do
      chart = chartkick.timeline @data
      expect(chart).to be_a(String)
      expect(chart).to include("new Chartkick.Timeline")
    end
  end
end

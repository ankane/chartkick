import Chart, {
  _adapters,
  Animation,
  Animations,
  animator,
  controllers,
  DatasetController,
  Element,
  elements,
  Interaction,
  layouts,
  plugins,
  registry,
  scales,
  Scale,
  Ticks
} from "chart.js/auto"
import * as helpers from "chart.js/helpers"
import "chartjs-adapter-date-fns"

// for plugins
// match src/index.umd.ts in Chart.js
// except for platforms
Chart.helpers = {...helpers}
Chart._adapters = _adapters
Chart.Animation = Animation
Chart.Animations = Animations
Chart.animator = animator
Chart.controllers = registry.controllers.items
Chart.DatasetController = DatasetController
Chart.Element = Element
Chart.elements = elements
Chart.Interaction = Interaction
Chart.layouts = layouts
Chart.Scale = Scale
Chart.Ticks = Ticks

Object.assign(Chart, controllers, scales, elements, plugins)
Chart.Chart = Chart

export default Chart

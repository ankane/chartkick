# Chart.js Plugins

Chartkick works with Chart.js global plugins. Here’s how to add the [annotation](https://www.chartjs.org/chartjs-plugin-annotation/latest/) plugin.

For Importmaps, download the [UMD version](https://unpkg.com/chartjs-plugin-annotation@3/dist/chartjs-plugin-annotation.cjs) to `vendor/javascript`, change the extension from `.cjs` to `.js`, pin it in `config/importmap.rb`, and use:

```javascript
import "chartjs-plugin-annotation"
```

For esbuild, rollup.js, Webpack, and Webpacker, install the NPM package and use:

```javascript
import { Chart } from "chart.js"
import annotationPlugin from "chartjs-plugin-annotation"

Chart.register(annotationPlugin)
```

For Sprockets, download the [UMD version](https://unpkg.com/chartjs-plugin-annotation@3/dist/chartjs-plugin-annotation.cjs) to `vendor/assets/javascripts`, change the extension from `.cjs` to `.js`, and use:

```javascript
//= require chartjs-plugin-annotation
```

Then use the `library` option to apply it to charts:

```erb
<%= line_chart data, library: {plugins: {annotation: {annotations: {line1: {type: "line", yMin: 2, yMax: 2}}}}} %>
```

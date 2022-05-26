import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

// use same banner as projects
// 1. https://unpkg.com/chart.js@3.8.0
// 2. https://unpkg.com/chartjs-adapter-date-fns@2.0.0
// 3. https://unpkg.com/date-fns@2.28.0 (no banner)
const banner = `/*!
 * Chart.js v3.8.0
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 *
 * chartjs-adapter-date-fns v2.0.0
 * https://www.chartjs.org
 * (c) 2021 chartjs-adapter-date-fns Contributors
 * Released under the MIT license
 *
 * date-fns v2.28.0
 * https://date-fns.org
 * (c) 2021 Sasha Koss and Lesha Koss
 * Released under the MIT License
 */
`;

export default [
  {
    input: "index.js",
    output: {
      name: "Chart",
      file: "../vendor/assets/javascripts/Chart.bundle.js",
      format: "umd",
      banner: banner
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env', {targets: 'defaults'}]]
      })
    ]
  }
];

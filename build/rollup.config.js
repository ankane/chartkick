import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

// use same banner as projects
// https://unpkg.com/chart.js@4.3.1
// https://unpkg.com/@kurkle/color@0.3.2
// https://unpkg.com/chartjs-adapter-date-fns@3.0.0
// https://unpkg.com/date-fns@2.30.0 (no banner)
const banner = `/*!
 * Chart.js v4.3.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 *
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 *
 * chartjs-adapter-date-fns v3.0.0
 * https://www.chartjs.org
 * (c) 2022 chartjs-adapter-date-fns Contributors
 * Released under the MIT license
 *
 * date-fns v2.30.0
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
        babelHelpers: "bundled",
        presets: [["@babel/preset-env"]]
      })
    ]
  }
];

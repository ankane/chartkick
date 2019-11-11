## 3.3.0

- Updated Chartkick.js to 3.2.0
- Rolled back Chart.js to 2.8.0 due to legend change

## 3.2.2

- Updated Chartkick.js to 3.1.3
- Updated Chart.js to 2.9.1

## 3.2.1

- Updated Chartkick.js to 3.1.1

## 3.2.0

- Fixed XSS vulnerability - see [#488](https://github.com/ankane/chartkick/issues/488)

## 3.1.0

- Updated Chartkick.js to 3.1.0
- Updated Chart.js to 2.8.0

## 3.0.2

- Fixed error with `nonce` option with Secure Headers and Rails < 5.2
- Updated Chartkick.js to 3.0.2
- Updated Chart.js to 2.7.3

## 3.0.1

- Updated Chartkick.js to 3.0.1

## 3.0.0

- Updated Chartkick.js to 3.0.0
- Added `code` option
- Added support for `nonce: true`

Breaking changes

- Removed support for Rails < 4.2
- Removed chartkick.js from asset precompile (no longer needed)
- Removed `xtype` option - numeric axes are automatically detected
- Removed `window.Chartkick = {...}` way to set config - use `Chartkick.configure` instead
- Removed support for the Google Charts jsapi loader - use loader.js instead

## 2.3.5

- Updated Chartkick.js to 2.3.6

## 2.3.4

- Updated Chartkick.js to 2.3.5
- Updated Chart.js to 2.7.2

## 2.3.3

- Updated Chartkick.js to 2.3.4

## 2.3.2

- Updated Chartkick.js to 2.3.3

## 2.3.1

- Updated Chartkick.js to 2.3.1

## 2.3.0

- Fixed deep merge error for non-Rails apps
- Updated Chartkick.js to 2.3.0

## 2.2.5

- Updated Chart.js to 2.7.1

## 2.2.4

- Added compatibility with Rails API
- Updated Chartkick.js to 2.2.4

## 2.2.3

- Updated Chartkick.js to 2.2.3
- Updated Chart.js to 2.5.0

## 2.2.2

- Updated Chartkick.js to 2.2.2

## 2.2.1

- Updated Chartkick.js to 2.2.1

## 2.2.0

- Updated Chartkick.js to 2.2.0
- Improved JavaScript API
- Added `download` option - *Chart.js only*
- Added `refresh` option
- Added `donut` option to pie chart

## 2.1.3

- Updated Chartkick.js to 2.1.2 - fixes missing zero values for Chart.js

## 2.1.2

- Added `defer` option
- Added `nonce` option
- Updated Chartkick.js to 2.1.1

## 2.1.1

- Use custom version of Chart.js to fix label overlap

## 2.1.0

- Added basic support for new Google Charts loader
- Added `configure` function
- Dropped jQuery and Zepto dependencies for AJAX
- Updated Chart.js to 2.2.2

## 2.0.2

- Updated Chartkick.js to 2.0.1
- Updated Chart.js to 2.2.1

## 2.0.1

- Small Chartkick.js fixes
- Updated Chart.js to 2.2.0

## 2.0.0

- Chart.js is now the default adapter - yay open source!
- Axis types are automatically detected - no need for `discrete: true`
- Better date support
- New JavaScript API

## 1.5.2

- Fixed Sprockets error

## 1.5.1

- Updated chartkick.js to latest version
- Included `Chart.bundle.js`

## 1.5.0

- Added Chart.js adapter **beta**
- Fixed line height on timeline charts

## 1.4.2

- Added `width` option
- Added `label` option
- Added support for `stacked: false` for area charts
- Lazy load adapters
- Better tooltip for dates for Google Charts
- Fixed asset precompilation issue with Rails 5

## 1.4.1

- Fixed regression with `min: nil`

## 1.4.0

- Added scatter chart
- Added axis titles

## 1.3.2

- Fixed `except` error when not using Rails

## 1.3.1

- Fixed blank screen bug
- Fixed language support

## 1.3.0

- Added timelines

## 1.2.5

- Added support for multiple groups
- Added `html` option

## 1.2.4

- Added global options
- Added `colors` option

## 1.2.3

- Added geo chart
- Added `discrete` option

## 1.2.2

- Added global `content_for` option
- Added `stacked` option

## 1.2.1

- Added localization for Google Charts

## 1.2.0

- Added bar chart and area chart
- Resize Google Charts on window resize

## 1.1.3

- Added content_for option

## 1.1.2

- Updated chartkick.js to v1.0.1

## 1.1.1

- Added support for Sinatra

## 1.1.0

- Added support for Padrino and Rails 2.3+

## 1.0.1

- Updated chartkick.js to v1.0.1

## 1.0.0

- Use semantic versioning (no changes)

## 0.0.5

- Removed `:min => 0` default for charts with negative values
- Show legend when data given in `{:name => "", :data => {}}` format

## 0.0.4

- Fix for `Uncaught ReferenceError: Chartkick is not defined` when chartkick.js is included in the `<head>`

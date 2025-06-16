## 5.2.0 (2025-06-16)

- Updated Chart.js to 4.5.0
- Dropped support for Ruby < 3.2

## 5.1.5 (2025-04-15)

- Updated Chart.js to 4.4.9

## 5.1.4 (2025-02-19)

- Updated Chart.js to 4.4.8

## 5.1.3 (2025-02-01)

- Updated Chart.js to 4.4.7

## 5.1.2 (2024-10-29)

- Updated Chart.js to 4.4.6

## 5.1.1 (2024-10-16)

- Updated Chart.js to 4.4.5

## 5.1.0 (2024-08-20)

- Updated Chart.js to 4.4.4
- Dropped support for Ruby < 3.1

## 5.0.7 (2024-05-21)

- Updated Chart.js to 4.4.3

## 5.0.6 (2024-02-28)

- Updated Chart.js to 4.4.2

## 5.0.5 (2023-12-07)

- Updated Chart.js to 4.4.1

## 5.0.4 (2023-08-27)

- Updated Chart.js to 4.4.0

## 5.0.3 (2023-07-24)

- Updated Chart.js to 4.3.1

## 5.0.2 (2023-05-02)

- Updated Chart.js to 4.3.0

## 5.0.1 (2023-01-19)

- Updated Chartkick.js to 5.0.1

## 5.0.0 (2023-01-18)

- Added support for Chart.js 4
- Changed `chart_json` to be defined on `Hash` and `Array` instead of `Enumerable`
- Updated Chartkick.js to 5.0.0
- Removed support for Chart.js 3
- Removed support for Ruby < 2.7 and Rails < 6

## 4.2.1 (2022-08-02)

- Updated Chart.js to 3.9.0

## 4.2.0 (2022-06-12)

- Updated Chartkick.js to 4.2.0
- Updated Chart.js to 3.8.0

## 4.1.3 (2022-01-15)

- Support for `importmap-rails` is no longer experimental
- Updated Chart.js to 3.7.0
- Fixed asset precompilation error with `importmap-rails`

## 4.1.2 (2021-11-06)

- Removed automatic pinning for `importmap-rails` (still experimental)

## 4.1.1 (2021-11-06)

- Updated Chartkick.js to 4.1.1
- Updated Chart.js to 3.6.0

## 4.1.0 (2021-10-23)

- Added support for Turbo
- Added experimental support for `importmap-rails`
- Updated Chartkick.js to 4.1.0

## 4.0.5 (2021-07-07)

- Updated Chartkick.js to 4.0.5
- Updated Chart.js to 3.4.1

## 4.0.4 (2021-05-01)

- Updated Chartkick.js to 4.0.4
- Updated Chart.js to 3.2.1

## 4.0.3 (2021-04-10)

- Updated Chartkick.js to 4.0.3
- Updated Chart.js to 3.1.0

## 4.0.2 (2021-04-06)

- Updated Chartkick.js to 4.0.2

## 4.0.1 (2021-04-06)

- Fixed error with Uglifier
- Updated Chartkick.js to 4.0.1

## 4.0.0 (2021-04-04)

- Added support for Chart.js 3
- Added `loading` option
- Made charts deferrable by default
- Set `nonce` automatically when present
- Prefer `empty` over `messages: {empty: ...}`
- Removed support for Ruby < 2.6 and Rails < 5.2
- Updated Chartkick.js to 4.0.0

Breaking changes

- Removed support for Chart.js 2

## 3.4.2 (2020-10-20)

- Updated Chart.js to 2.9.4

## 3.4.1 (2020-10-06)

- Relaxed validation for `width` and `height` options

## 3.4.0 (2020-08-04)

- Fixed CSS injection with `width` and `height` options - [more info](https://github.com/ankane/chartkick/issues/546)

## 3.3.2 (2020-07-23)

- Updated Chartkick.js to 3.2.1

## 3.3.1 (2019-12-26)

- Updated Chart.js to 2.9.3
- Fixed deprecation warnings in Ruby 2.7

## 3.3.0 (2019-11-09)

- Updated Chartkick.js to 3.2.0
- Rolled back Chart.js to 2.8.0 due to legend change

## 3.2.2 (2019-10-27)

- Updated Chartkick.js to 3.1.3
- Updated Chart.js to 2.9.1

## 3.2.1 (2019-07-15)

- Updated Chartkick.js to 3.1.1

## 3.2.0 (2019-06-04)

- Fixed XSS vulnerability - [more info](https://github.com/ankane/chartkick/issues/488)

## 3.1.0 (2019-05-26)

- Updated Chartkick.js to 3.1.0
- Updated Chart.js to 2.8.0

## 3.0.2 (2019-01-03)

- Fixed error with `nonce` option with Secure Headers and Rails < 5.2
- Updated Chartkick.js to 3.0.2
- Updated Chart.js to 2.7.3

## 3.0.1 (2018-08-13)

- Updated Chartkick.js to 3.0.1

## 3.0.0 (2018-08-08)

- Updated Chartkick.js to 3.0.0
- Added `code` option
- Added support for `nonce: true`

Breaking changes

- Removed support for Rails < 4.2
- Removed chartkick.js from asset precompile (no longer needed)
- Removed `xtype` option - numeric axes are automatically detected
- Removed `window.Chartkick = {...}` way to set config - use `Chartkick.configure` instead
- Removed support for the Google Charts jsapi loader - use loader.js instead

## 2.3.5 (2018-06-15)

- Updated Chartkick.js to 2.3.6

## 2.3.4 (2018-04-10)

- Updated Chartkick.js to 2.3.5
- Updated Chart.js to 2.7.2

## 2.3.3 (2018-03-25)

- Updated Chartkick.js to 2.3.4

## 2.3.2 (2018-02-26)

- Updated Chartkick.js to 2.3.3

## 2.3.1 (2018-02-23)

- Updated Chartkick.js to 2.3.1

## 2.3.0 (2018-02-21)

- Fixed deep merge error for non-Rails apps
- Updated Chartkick.js to 2.3.0

## 2.2.5 (2017-10-28)

- Updated Chart.js to 2.7.1

## 2.2.4 (2017-05-14)

- Added compatibility with Rails API
- Updated Chartkick.js to 2.2.4

## 2.2.3 (2017-02-22)

- Updated Chartkick.js to 2.2.3
- Updated Chart.js to 2.5.0

## 2.2.2 (2017-01-07)

- Updated Chartkick.js to 2.2.2

## 2.2.1 (2016-12-05)

- Updated Chartkick.js to 2.2.1

## 2.2.0 (2016-12-03)

- Updated Chartkick.js to 2.2.0
- Improved JavaScript API
- Added `download` option - *Chart.js only*
- Added `refresh` option
- Added `donut` option to pie chart

## 2.1.3 (2016-11-29)

- Updated Chartkick.js to 2.1.2 - fixes missing zero values for Chart.js

## 2.1.2 (2016-11-28)

- Added `defer` option
- Added `nonce` option
- Updated Chartkick.js to 2.1.1

## 2.1.1 (2016-09-11)

- Use custom version of Chart.js to fix label overlap

## 2.1.0 (2016-09-10)

- Added basic support for new Google Charts loader
- Added `configure` function
- Dropped jQuery and Zepto dependencies for AJAX
- Updated Chart.js to 2.2.2

## 2.0.2 (2016-08-11)

- Updated Chartkick.js to 2.0.1
- Updated Chart.js to 2.2.1

## 2.0.1 (2016-07-29)

- Small Chartkick.js fixes
- Updated Chart.js to 2.2.0

## 2.0.0 (2016-05-30)

- Chart.js is now the default adapter - yay open source!
- Axis types are automatically detected - no need for `discrete: true`
- Better date support
- New JavaScript API

## 1.5.2 (2016-05-05)

- Fixed Sprockets error

## 1.5.1 (2016-05-03)

- Updated chartkick.js to latest version
- Included `Chart.bundle.js`

## 1.5.0 (2016-05-01)

- Added Chart.js adapter **beta**
- Fixed line height on timeline charts

## 1.4.2 (2016-02-29)

- Added `width` option
- Added `label` option
- Added support for `stacked: false` for area charts
- Lazy load adapters
- Better tooltip for dates for Google Charts
- Fixed asset precompilation issue with Rails 5

## 1.4.1 (2015-09-07)

- Fixed regression with `min: nil`

## 1.4.0 (2015-08-31)

- Added scatter chart
- Added axis titles

## 1.3.2 (2014-07-04)

- Fixed `except` error when not using Rails

## 1.3.1 (2014-06-30)

- Fixed blank screen bug
- Fixed language support

## 1.3.0 (2014-06-28)

- Added timelines

## 1.2.5 (2014-06-12)

- Added support for multiple groups
- Added `html` option

## 1.2.4 (2014-03-24)

- Added global options
- Added `colors` option

## 1.2.3 (2014-03-23)

- Added geo chart
- Added `discrete` option

## 1.2.2 (2014-02-23)

- Added global `content_for` option
- Added `stacked` option

## 1.2.1 (2013-12-08)

- Added localization for Google Charts

## 1.2.0 (2013-07-27)

- Added bar chart and area chart
- Resize Google Charts on window resize

## 1.1.3 (2013-06-26)

- Added content_for option

## 1.1.2 (2013-06-11)

- Updated chartkick.js to v1.0.1

## 1.1.1 (2013-06-10)

- Added support for Sinatra

## 1.1.0 (2013-06-03)

- Added support for Padrino and Rails 2.3+

## 1.0.1 (2013-05-23)

- Updated chartkick.js to v1.0.1

## 1.0.0 (2013-05-15)

- Use semantic versioning (no changes)

## 0.0.5 (2013-05-14)

- Removed `:min => 0` default for charts with negative values
- Show legend when data given in `{:name => "", :data => {}}` format

## 0.0.4 (2013-05-13)

- Fix for `Uncaught ReferenceError: Chartkick is not defined` when chartkick.js is included in the `<head>`

## 0.0.3 (2013-05-12)

- Improved error messages

## 0.0.2 (2013-05-10)

- Added `min` and `max` options

## 0.0.1 (2013-05-07)

- First release

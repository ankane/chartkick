# Content Security Policy (CSP)

Chartkick tries to make CSP as easy as possible. Currently, `unsafe-inline` styles must be enabled for charts to work. There are open issues to resolve this with some of the charting libraries.

- [Chart.js](https://github.com/chartjs/Chart.js/issues/5208)
- [Highcharts](https://github.com/highcharts/highcharts/issues/6173)

Google Charts also requires `unsafe-eval` and as well as styles and scripts from the `https://www.gstatic.com` domain.

## Rails 5.2+

Rails 5.2+ has built-in support for CSP. Configure CSP and enable automatic nonce generation in `config/initializers/content_security_policy.rb` with:

```ruby
Rails.application.config.content_security_policy do |policy|
  policy.script_src  :self
  policy.style_src   :self
end

Rails.application.config.content_security_policy_nonce_generator = -> request { SecureRandom.base64(16) }
```

Enable unsafe inline styles on actions that have charts

```ruby
class ChartsController < ApplicationController
  content_security_policy only: :index do |policy|
    policy.style_src :self, :unsafe_inline
  end
end
```

And create an initializer with:

```rb
Chartkick.options[:nonce] = true
```

## Secure Headers

Configure CSP in `config/initializers/secure_headers.rb` with:

```ruby
SecureHeaders::Configuration.default do |config|
  config.csp = {
    default_src: %w('none'),
    script_src: %w('self'),
    style_src: %w('self')
  }
end

SecureHeaders::Configuration.named_append(:charts) do |request|
  {style_src: %w('unsafe-inline')}
end
```

Enable unsafe inline styles on actions that have charts

```ruby
class ChartsController < ApplicationController
  def index
    use_content_security_policy_named_append(:charts)
  end
end
```

And create an initializer with:

```rb
Chartkick.options[:nonce] = true
```

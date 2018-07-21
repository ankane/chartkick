# Content Security Policy (CSP)

Unfortunately, `unsafe-inline` styles must be enabled for charts to work.

There are open issues to resolve this with some of the charting libraries.

- [Chart.js](https://github.com/chartjs/Chart.js/issues/5208)
- [Highcharts](https://github.com/highcharts/highcharts/issues/6173)

Google Charts also requires `unsafe-eval` and as well as styles and scripts from the `https://www.gstatic.com` domain.

## Rails 5.2

Rails 5.2 has built-in support for CSP. Enable unsafe inline styles and automatic nonce generation in `config/initializers/content_security_policy.rb` with:

```ruby
Rails.application.config.content_security_policy do |policy|
  policy.script_src  :self
  policy.style_src   :self, :unsafe_inline
end

Rails.application.config.content_security_policy_nonce_generator = -> request { SecureRandom.base64(16) }
```

Use the nonce with:

```erb
<%= line_chart data, nonce: content_security_policy_nonce %>
```

## Secure Headers

Enable unsafe inline styles in `config/initializers/secure_headers.rb` with:

```ruby
SecureHeaders::Configuration.default do |config|
  config.csp = {
    script_src: %w('self'),
    style_src: %w('self' 'unsafe-inline')
  }
end
```

Use the nonce with:

```erb
<%= line_chart data, nonce: content_security_policy_script_nonce %>
```

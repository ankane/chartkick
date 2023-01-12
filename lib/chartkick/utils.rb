module Chartkick
  module Utils
    # https://github.com/rails/rails/blob/master/activesupport/lib/active_support/core_ext/hash/deep_merge.rb
    def self.deep_merge(hash_a, hash_b)
      hash_a = hash_a.dup
      hash_b.each_pair do |k, v|
        tv = hash_a[k]
        hash_a[k] = tv.is_a?(Hash) && v.is_a?(Hash) ? deep_merge(tv, v) : v
      end
      hash_a
    end

    # from https://github.com/rails/rails/blob/master/activesupport/lib/active_support/core_ext/string/output_safety.rb
    JSON_ESCAPE = { "&" => '\u0026', ">" => '\u003e', "<" => '\u003c', "\u2028" => '\u2028', "\u2029" => '\u2029' }
    JSON_ESCAPE_REGEXP = /[\u2028\u2029&><]/u
    def self.json_escape(s)
      if ERB::Util.respond_to?(:json_escape)
        ERB::Util.json_escape(s)
      else
        s.to_s.gsub(JSON_ESCAPE_REGEXP, JSON_ESCAPE)
      end
    end
  end
end

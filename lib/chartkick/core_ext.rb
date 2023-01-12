# for both multiple series and
# making sure hash order is preserved in JavaScript

class Array
  def chart_json
    map do |v|
      if v.is_a?(Hash) && v[:data].is_a?(Hash)
        v = v.dup
        v[:data] = v[:data].to_a
      end
      v
    end.to_json
  end
end

class Hash
  def chart_json
    if (key = keys.first) && key.is_a?(Array) && key.size == 2
      group_by { |k, _v| k[0] }.map do |name, data|
        {name: name, data: data.map { |k, v| [k[1], v] }}
      end
    else
      to_a
    end.to_json
  end
end

if Rails.version >= "3.1"
  require "chartkick/engine"
else
  ActionView::Base.send :include, Chartkick::Helper
end

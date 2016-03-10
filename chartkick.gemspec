# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "chartkick/version"

Gem::Specification.new do |spec|
  spec.name          = "chartkick"
  spec.version       = Chartkick::VERSION
  spec.authors       = ["Andrew Kane"]
  spec.email         = ["acekane1@gmail.com"]
  spec.description   = "Create beautiful JavaScript charts with one line of Ruby"
  spec.summary       = "Create beautiful JavaScript charts with one line of Ruby"
  spec.homepage      = "http://chartkick.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($INPUT_RECORD_SEPARATOR)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "minitest"
end

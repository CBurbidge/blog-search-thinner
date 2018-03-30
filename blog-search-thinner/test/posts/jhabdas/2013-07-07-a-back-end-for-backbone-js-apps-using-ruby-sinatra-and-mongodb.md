---
title: A back-end for Backbone.js apps using Ruby, Sinatra and MongoDB
author: Josh Habdas
date: 2013-07-07
categories:
  - tutorials
tags:
  - backbonejs
  - javascript
  - coffeescript
  - mongodb
  - ruby
  - sinatra
  - ubuntu
  - linux
  - vm
  - vagrant
  - ria
  - virtualization
---
After recently writing about [web app development using backbone and vagrant][1] I've started to spend time immersing myself in Ruby and Ruby Gems. Tonight while catching up on articles in my [Pocket][2] I ran across the following Addy Osmani article on creating a back-end for Backbone.js apps:

[Building Backbone.js Apps With Ruby, Sinatra, MongoDB and Haml](http://addyosmani.com/blog/building-backbone-js-apps-with-ruby-sinatra-mongodb-and-haml)

Sweet. In addition to Addy's very awesome and open-source book [Backbone Fundamentals][3], he's also writing some useful related articles. And though I'd likely ditch haml in favor of [emblem][4] with [swag][5], Addy's article ought to be a good starting point for the Ruby newbie.

<!--more-->

Building on my "you can do this on Windows too" [mantra as of late][1], I also want to point out that, to get the linked tutorial to work correctly on Ubuntu running in a virtual machine on Windows using Vagrant, you need to [configure Sinatra][6] to bind to the server on ip 0.0.0.0 ([not just 127.0.0.1][7]) so that Vagrant will be able to port-forward from Windows to WEBrick onto the Ubuntu guest machine, like:

``` ruby
require 'sinatra'

# Listen on all interfaces in the development environment
set :bind, '0.0.0.0'

get '/' do
   "Hello World! Is it " + settings.bind + " you're looking for?"
end
```

Here's a screen-shot of the port-forwarded response from WEBrick for Sinatra in Chrome for Windows, a back-end for Backbone apps using Ruby:

![Vagrant-forwarded response from WEBrick running in Ubuntu virtual machine on Windows](//s3.amazonaws.com/images.habdas.org/vagrant-sinatra.png)

 [1]: /developing-modern-web-applications-on-windows-vagrant/ "Developing modern web applications on Windows with Vagrant"
 [2]: http://getpocket.com/
 [3]: http://addyosmani.github.io/backbone-fundamentals/
 [4]: http://emblemjs.com/
 [5]: https://github.com/elving/swag
 [6]: http://www.sinatrarb.com/configuration.html#__server_hostname_or_ip_address
 [7]: http://stackoverflow.com/questions/5984217/vagrants-port-forwarding-not-working#answer-5999945

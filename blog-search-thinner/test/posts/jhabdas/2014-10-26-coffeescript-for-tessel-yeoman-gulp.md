---
title: "CoffeeScript for Tessel with Yeoman and Gulp"
author: Josh Habdas
date: 2014-10-26 23:17
excerpt: Learn how to transpile CoffeeScript to JavaScript using Yeoman and Gulp for use with the Tessel microcontroller
categories:
  - tutorials
tags:
  - microcontrollers
  - tessel
  - coffeescript
  - javascript
  - gulp
  - yeoman
---

A few years back Sauce Labs co-founder Jason Huggins ([@hugs](https://twitter.com/hugs)) was giving a talk at [js.chi()](http://www.meetup.com/js-chi/), showing us how to use an Arduino to change the color of an LED based on an input. During the talk Jason suggested those interested in microcontrollers check out [Pumping Station: One](http://pumpingstationone.org/) up on Clybourn. So I got some friends together and we went to PS1, and learned the basics of programming an Arduino. The event was a fun experience and, later that night, netted me a working Larson Scanner. Since then I've procured a [Raspberry PI](http://www.raspberrypi.org/), and started tinkering with [Google Coder](http://www.raspberrypi.org/google-coder/). And now it's time for Tessel.

> Learn how to transpile CoffeeScript to JavaScript using Yeoman and Gulp for use with the Tessel microcontroller

<!--more-->

At first I completely overlooked Tessel, even though they had a booth at [Fluent Conf](http://fluentconf.com/) this year, a crowd I'm likely to pop up in from time to time given the nature of my work. But several months later they got on my radar again and I purchased one instantly after realizing I could run JavaScript on it. Finally! No more weird IDEs (Arduino) or fickle hardware environments (Raspberry Pi). Just sweet JavaScript and Tessel...

But wait, I hate JavaScript, [JabbaScript](http://www.schnell.net/jabbascript.html), or whatever you call it. That may seem a little harsh, but after six years of writing the stuff I've gotten a healthy appreciation for not using it after I switched to CoffeeScript. And so after unboxing the Tessel and trying out a few sample scripts I got to the point where I wanted to write, but I wanted to write in CoffeeScript. And even though tessel [does not _currently_ support](https://forums.tessel.io/t/coffeescript-doesnt-work/440) CoffeeScript, and I'd argue it never should, that doesn't mean we can't write CoffeeScript for it.

Why Yeoman and Gulp? Set-up speed and simplicity primarily, though moving things to [Jake](jakejs.com) does [have its appeal](https://github.com/trunkclub/brunch-with-panache) and might scale better. But right now we're starting small.

This following instructions assumes both Node and NPM installed on the system.

## Scaffolding a new Coffee Module with Yeoman
Looking for a quick way to start scaffolding for Tessel took no longer than 10 minutes thanks to Yeoman Generators. A quick search for _coffee_ on the Yeoman site turned up a number of generators, and the best-looking one given we're starting small was [coffee-module](https://github.com/alexgorbatchev/generator-coffee-module), which provides a short list of dependencies as provides simple access to CoffeeScript transpiles using the `gulp` command. Yeoman and the generator can be installed like so:

```sh
$ npm install -g yo
$ npm install -g generator-coffee-module
```

Once Yeoman and the generator are installed, creating a new CoffeeScript module is as simple as [changing directories](/installing-using-rupaz/) and running:

```sh
$ yo coffee-module
$ npm install # if necessary
```

Once created, run `gulp` at the command line from within the module directory to compile the example CoffeeScript file to JavaScript. Easy right? Now try running it on the Tessel. Boom!

```
INFO Deploying bundle (30.88 MB)...
ERR! Bundle size is 30.88 MB and is above max limit of 30.00 MB
```

Wait, the script we ran was tiny. Why is the bundle so large? The answer is becase the new NPM module created came along with some baggage useful for transpiling CoffeeScript, but it seems even `devDependencies` are getting bundled with everything else unexpectedly. The easy solution here is to `rm -rf node_modules` and then do a `npm install --production` so unnecessary dependencies aren't installed. Another option would be to fiddle with the Gulpfile, creating new tasks to handle doing that work automatically as part of the build.

Another thing worth noting, is that while bundling Tessel runs some logic on `package.json` and omits directories specified under a `hardware` property. The [Tessel Machine Style Guide](https://github.com/tessel/style) shows an example of how to structure this property in the JSON file. (Note: Don't exclude the `node_modules` directory here if you plan on running your Tessel app with any NPM dependencies, required to use some of the Tessel add-on modules).

Now let's try it all out.

## Transpile from CoffeeScript and Run Output JS on Tessel

For this section you'll need to have the Tessel [Accelerometer module](http://start.tessel.io/modules/accelerometer) plugged into *Port A* on the Tessel. Then do the following steps to tie everyting together.

### Brew Some Coffee

1. Create a new file called `show-axes.coffee` in the `src` directory.
2. Copy the following [accelerometer example](https://github.com/tessel/accel-mma84/blob/master/examples/show-axes.js) I converted to CoffeeScript from JS into the new file:

```
# Any copyright is dedicated to the Public Domain.
# http://creativecommons.org/publicdomain/zero/1.0/

###
Demonstrates axes by turning on a different
LED per axis (x, y, z) only when that axis
has positive acceleration. Also prints +/-
per axis to the console.
###

tessel = require('tessel')
accel = require('accel-mma84').use(tessel.port['A'])

# Define vars
led1 = tessel.led[0].output()
led2 = tessel.led[1].output()
led3 = tessel.led[2].output()

textOut = ''

accel.on 'ready', ->
  accel.on 'data', (xyz) ->

    # Refresh variables
    x = xyz[0]
    y = xyz[1]
    z = xyz[2]

    textOut = ''

    # Print which axes are positive and turn on corresponding LEDs
    if(x > 0)
      led1.high()
      textOut += 'x: + | '
    else
      led1.low()
      textOut += 'x: - | '
    if(y > 0)
      led2.high()
      textOut += 'y: + | '
    else
      led2.low()
      textOut += 'y: - | '
    if(z > 0)
      led3.high()
      textOut += 'z: +'
    else
      led3.low()
      textOut += 'z: -'

    console.log(textOut)

accel.on 'error', (err) ->
  console.log('Error:', err)
```

Once copied, save the file and run `gulp` from the project directory to lint and transpile the code. (Note: If `gulp` is not in `$PATH`, you can `npm install -g gulp` point to the bin file in the project's `node_modules` directory.)

The result of the above should be a new file called `show-axes.js` in the `lib` directory. And that's all there is to transpiling from CoffeeScript to JavaScript.

*Tip:* As you start working with CoffeeScript be sure to install [EditorConfig](http://editorconfig.org/) for your editor to take advantage of the `.editorconfig` dot file produced by the Yeoman generator to help normalize coding style.

### Running the Transpiled Script on Tessel

Once the JS file is created by Gulp, and assuming the `devDependencies` are excluded from the bundler as described above, the transpiled CoffeeScript can be run on the Tessel:

```sh
$ tessel run lib/show-axes.js
```

If run before the [accelerometer drivers](accel-mma84) are installed (`npm install --save accel-mma84`) it'll blow up, so don't forget to pull down the drivers for a successful test.

And that's all there is to it. Unfancy JavaScript for Tessel.

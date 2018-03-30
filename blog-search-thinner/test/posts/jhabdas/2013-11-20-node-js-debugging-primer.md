---
title: "Node.js debugging primer"
author: Josh Habdas
date: 2013-11-20 23:00
modified: 2016-11-16
categories:
  - debugging
tags:
  - javascript
  - nodejs
  - jake
  - brunch
  - bower
  - npm
  - vagrant
  - chrome
---
{% include toc %}

So I'm putting together this killer new JS front-end development stack called [Brunch with Panache][1], which uses [Jake][2] tasks to kick off a custom set of commands for building and managing the app, and I hit a bug while code was running in [node.js](http://nodejs.org/). So what now?

> Follow along if you'd like to learn how to get started debugging Node.js applications using Jake.

<!--more-->

The problem is the stack I'm working with is complex enough a small backtrace would be about as effective as a probe into [Tesla's recent automobile fires](http://detroit.cbslocal.com/2013/11/23/us-safety-agency-opens-probe-into-tesla-fires/). Nevertheless, I want running Testlas *[sic]* so it's time to jump into some Node.js step debugging. Follow along if you'd like to learn how to get started debugging Node.js applications.

## Getting setup

Mac and Linux users, carry on.

Windows users looking to give this a try should be able to adapt these instructions after running through the steps to [Configuring the development environment](/developing-modern-web-applications-on-windows-vagrant/) to get your box ready for debugging inside a VM using Vagrant. (Tip: You do not need to follow the entire article, but you will need to download the required applications listed.)

## Find something to debug

Clone Brunch with Panache, but make sure you get v`0.7.1` to be able to recreate the error

    $ git clone https://github.com/trunkclub/brunch-with-panache/tree/0.7.1 panache && cd panache

From within the Panache directory, install the application dependencies detailed in the `package.json` (NPM) and `bower.json` (Bower) files:

    npm install && bower install

**Tip:** Windows users should use the `--no-bin-links` flag for the NPM command when using Vagrant with synced folders enabled to avoid the creation of symlinks (not supported by the NTFS filesystem).
{: .notice--info }

Then install [Jake][2] globally to allow use of the application's task library:

    npm install -g jake

Once installed, run `jake gen:codetest name=smoulder` followed by `jake test:code` to stub out a unit test and ignite the Karma test runner. The end result should be a crash and burn:

    INFO [karma]: Karma v0.10.4 server started at http://localhost:9876/
    INFO [launcher]: Starting browser PhantomJS
    INFO [PhantomJS 1.9.2 (Mac OS X)]: Connected on socket 2gRJXM0iyq5MQyNS0KM1
    PhantomJS 1.9.2 (Mac OS X): Executed 0 of 0 ERROR (0.086 secs / 0 secs)
    jake aborted.
    Error
        at api.fail (/usr/local/share/npm/lib/node_modules/jake/lib/api.js:340:13)
        at null._onTimeout (/usr/local/share/npm/lib/node_modules/jake/lib/task/task.js:213:19)
        at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)

Womp womp. What happened? Unless you're a psychic, you're not gonna be able to tell from that stack trace. So let's do some debugging.

## Install and start the Node Inspector

**Update 2016-11-16:** Paul Irish introduced Node debugging in Chrome Dev Tools at the Chrome Dev Summit 2016. So rather than using the Node Inspector you can no debug Node applications directly within the browser. To learn more, [watch the Node debugging intro video](https://youtu.be/HF1luRD4Qmk?t=21m4s) from Paul's talk.
{: .notice--info}

Thankfully due to a well placed question at a [Chicago Node.js meetup](http://www.meetup.com/Chicago-Nodejs/) meetup earlier this year I didn't have to spend any time figuring out how to get started with debugging Node. The Node.js gurus at Groupon suggested [node-inspector](https://github.com/node-inspector/node-inspector) for step debugging.

Install the node-inspector globally from NPM:

    npm install -g node-inspector

Then start the node-inspector and background the process (use `fg` to bring it back to the foreground and `kill %1` to stop it):

    node-inspector &

## Start and connect to the debugger

Once the inspector is installed, give it something useful to debug. From the application root directory, issue the following command to use the Jake <abbr title="Command Line Interface">CLI</abbr> to run and debug the failing task in Node:

    node --debug-brk node_modules/jake/bin/cli.js test:code

Then connect to the inspector from your local loopback by visiting http://127.0.0.1:8080/debug?port=5858 in your browser. If all goes well, you'll see some developer tools (pictured below) from which to begin debugging.

![Node Inspector sources panel running inside Google Chrome](//s3.amazonaws.com/images.habdas.org/node-inspector.png)

**Tip:** Checkout the [sources panel keyboard shortcuts](https://developers.google.com/chrome-developer-tools/docs/shortcuts#sources-panel) for a list if things you can do without touching your mouse or trackpad.

## Tracking down the error

The bug is being caused by `test:code`, so the place to start looking is `test.jake`, which isn't available immediately after the debugger starts. To get access to `test.jake` from the debugger and get us closer to the error set a conditional breakpoint on the first line of the `run` method in `task.js` with the following criteria:

    this.fullName === 'build:dev'

Once set, resume script execution to arrive at the conditional breakpoint. From here, set another breakpoint on the line which says `spawn` within the `execute` method of `jakelib/lib/index.js` and resume execution. Once arriving at the next breakpoint press `[Esc]` to pull up the console and type `command`. The result should be `"node_modules/.bin/karma"`. If it doesn't, resume execution and wait for the next call to `execute` and check again. Turns out that `node_modules/.bin/karma couldn't be opened, resulting in the error.

## Fixing the error

Now that we know which file can't be opened (`node_modules/.bin/karma`) let's take a look at the `.bin` directory. Exit the node inspector and run `ls -al node_modules/.bin/` from the terminal. Notice a number of symlinks are shown, but _karma_ isn't one of them. To fix that simply create a symlink from `node_modules/.bin/karma` to `node_modules/karma/bin/karma`. If done properly the `jake test:code` task will no longer fail, instead it'll just get stuck. It's getting stuck because `test.jake` is running karma without the expected config. To fix that simply pipe in another argument when executing karma, e.g.

``` js
jake.Task['build:dev'].addListener('complete', function() {
  args.push('test/karma.conf.coffee'); # add argument pointing to your config here
  args.push('--single-run');
  resolve(karma.execute(args));
}).execute();
```

The next run of `jake test:code` will not only not bomb, it'll run with the expected karma config and execute tests as expected. And there you have it, a little node debugging to solve a complex problem. The [npm-folders](https://www.npmjs.org/doc/files/npm-folders.html) doc suggests the contents of `node_modules/.bin` are created based off the `bin` property set in `package.json`, which was not set in the `node_modules/karma/package.json` file it turns out. I've submitted [karma/issues/1131](https://github.com/karma-runner/karma/pull/1131) to this end.

[1]: https://github.com/trunkclub/brunch-with-panache
[2]: https://github.com/mde/jake

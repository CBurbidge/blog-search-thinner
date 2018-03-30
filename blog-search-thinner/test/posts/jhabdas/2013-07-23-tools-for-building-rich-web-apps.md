---
title: Tools for building rich web apps
author: Josh Habdas
date: 2013-07-23
modified: 2017-04-09
categories:
  - reference
tags:
  - html
  - javascript
  - css
  - patterns
  - ui
  - ria
  - proxy
---

After recently planning to do a survey of tools for building rich web apps I stumbled across <https://github.com/codylindley/frontend-tools>, which claims to be an opinionated list of tools for building front-end applications. For those new to building modern web applications, it's certainly easier to take in than larger lists like <https://github.com/joyent/node/wiki/modules>. But lists aren't necessarily the best place to start for putting an application together. At least not where the rubber hits the road.

**Update: 2017-04-09:** This post is out of date. Lately Marko JS may become the new hotness following React and, for Web dev in general, look into [JAMstack](https://jamstack.org/). Cheers.
{: .notice--info}

## The Web has all the resources you need

Instead of staring down the barrel of a list, consider simply diving in and creating something once you've read some related articles. Perhaps one of the best producers of fat-client content and tutorials recently has been Addy Osmani. Check out his blog: [Articles for developers][1]. Here are two articles from Addy which, when put together, cover how to set up a full-stack Backbone app with separate front- and back-end components:

- [Developing Backbone.js Applications][2]
- [Building Backbone.js Apps With Ruby, Sinatra, MongoDB and Haml][3]

The decoupled nature of the above architecture makes it simple to use tools like [Brunch][4] to rapidly prototype HTML5 apps which can function in a stand-alone nature and tap directly into a REST API, similar to what I've done with [Hopstop][5]. Learn to create a rich web app using Brunch and Chaplin, a meta framework on top of Backbone, with my recent article: [Developing Modern Web Applications on Windows With Vagrant][6].

To help ease the challenge of choosing a rich web stack, Addy and others have come together and created [TodoMVC][7], which those building rich web apps are likely familiar.

## Full stack and event-driven frameworks

Looking for an opinionated full-stack? Take a peek at the MEAN (Mongo, Express, Angular and Node.js) stack, already being used by some start-ups like Chicago-based <a href="http://www.highground.com/" rel="nofollow">HighGround</a>. Not sure if you'd like [Angular][8]? [Learn how to set-up a MEAN stack][9] with a fantasy football app. Decide you don't like it? Then consider trying out the content-first, full-stack Node framework from Airbnb called [Rendr][12].

For an alternative approach check out [Meteor][10]. And if you're interested, you may also want to check out an event-driven system using a tool like [Flight][11] by Twitter.

## Summary

When building rich internet applications, lists can be daunting. Use lists to help discover new technologies and gain a better understanding of the components of rich web apps. But be sure to augment your understanding with some reading and, of course, an ample amount of tinkering. And if you feel you're getting overwhelmed, take a step back and look for a new ways to do things.

What's your ideal stack?

 [1]: http://addyosmani.com/
 [2]: http://addyosmani.github.io/backbone-fundamentals/
 [3]: http://addyosmani.com/blog/building-backbone-js-apps-with-ruby-sinatra-mongodb-and-haml/
 [4]: http://brunch.io/
 [5]: https://github.com/jhabdas/hopstop
 [6]: /developing-modern-web-applications-on-windows-vagrant/
 [7]: http://todomvc.com/
 [8]: http://angularjs.org/
 [9]: http://www.thinkster.io/pick/GUIDJbpIie/angularjs-tutorial-learn-to-build-modern-web-apps
 [10]: http://www.meteor.com/
 [11]: http://twitter.github.io/flight/
 [12]: https://github.com/airbnb/rendr

---
title: When fast isn't fast anymore
author: Josh Habdas
date: 2015-07-11T07:19:56-05:00
comments: false
excerpt: "Websites that load in 200ms using open source tools."
categories: [opinion]
tags: [react, javascript, performance, oss]
---

Back in <time datetime="2012-05-31">'12</time>, while I was seated at a developer conference gawking as Paul Irish was teaching us about the foamy rules of [rabid tools](/installing-using-rupaz/) I also learned about [building single-page apps](/developing-modern-web-applications-on-windows-vagrant/) with Backbone.js. [BrowserSync](http://www.browsersync.io/) wasn't a thing yet, and most engineers I knew had never even heard of [CoffeeScript and SublimeText](/amp-up-coffeescript-coding-sublime-text/). And hardly anyone I knew at the time in Chicago was using GitHub.

Fast-forward three years and my how things have changed. ES6 [became a standard](http://www.infoq.com/news/2015/06/ecmascript-2015-es6). Backbone got a bad rap for all the poorly designed fat-client apps. Frameworks such as Meteor, Sails, Angular and Ember were born. And Octocat became [the icon](http://slides.com/jhabdas/streaming-audio-react-native/#/2/4) for open source development. The Web got confusing, and the bar for entry became high. People I knew in tech started trying to generalize about front-end developer skill sets by awkwardly shoveling people into either the "framework developer" camp or those who built with small libraries and actually knew what they were doing. Perhaps this was to meet their own mental models of craftsmanship? Who knows. Either way, it wasn't pretty.

Shortly after building and [open sourcing](https://github.com/jhabdas/brunch-with-panache) my first <abbr title="Single-Page App">SPA</abbr> I came to learn about React.

Dismissive at first, even after meeting some of the React team at the Facebook campus in Palo Alto and hearing their elevator pitch, I wrote React off as another shiny object to contribute to the bewildering world of [YAFS](https://medium.com/@tastejs/yet-another-framework-syndrome-yafs-cf5f694ee070). What was wrong with my current two-second second page load anyway? Well, it wasn't fast enough. And boy was I wrong about React.

Most forward-thinking Web engineers have started using or at least playing around with React. It took some time, even for a youngish old dog like me, to warm up to React. For me it was when I finally had a chance to use React Native to build [my first iOS app](https://github.com/jhabdas/lumpen-radio). But that's not why I'm writing this. Where React really shines in my mind is not in its simple pattern (and all that boilerplate!) it's in the progressive ajax.

Having had used Chaplin, the isomorphic Backbone companion which [inspired the nerds at Airbnb](/holy-grail-full-stack-javascript-mvc-rendr/), to do server-side rendering (thanks to some great work by [Bob Paulin](http://bobpaulin.com/)) over two years ago I wasn't sure how to *properly* achieve <abbr title="Progressive Ajax">PJAX</abbr>. The main difficulties in doing so would probably bore you, so I'll just skip to the good stuff: the React Virtual DOM fixes the progressive rendering difficulties inherent in every isomorphic library I've used to date.

What does that even mean? It means you can leverage React's Virtual DOM to do progressive ajax easy. It also means, if done properly, you'll have the fastest, most search-friendly website on the planet.

**How fast?** *Very* fast. So fast traditional page speed measurement tools can't properly benchmark it. Yesterday I clocked an unoptimized page loading in ~200ms (we're talking perceived latency here folks) hitting a VPS in New York from Chicago over an LTE connection with a hop before the hotspot.

**Search friendly.** As far as I know Google and Bing have the only spiders on earth sophisticated enough to crawl a fat-client JS apps on the Web. But with the proper server-side rendering, React apps *will work without JS even enabled* in the browser.

Thanks to GitHub's open source community you don't even need to start from scratch to get these speed and SEO bonuses. There's a [React Starter Kit](https://github.com/kriasoft/react-starter-kit) boilerplate seed for that. It's pretty amaze. And it's the fastest thing I've seen to serve a Webpage since `0.0.0.0`. Just think, one day our browsers will be able to do this kind magic too.

---
title: The Holy Grail of Rich Internet Applications
author: Josh Habdas
date: 2013-02-26
modified: 2016-11-22
categories:
  - opinion
tags:
  - accessibility
  - amd
  - html
  - patterns
  - programming
  - javascript
  - ria
  - seo
  - progressive enhancement
---
One of the largest perceived drawbacks to creating a SPA or other Rich Internet Application is that they're not SEO friendly or very accessible. With the advent of technologies such as ARIA, HTML5 and Node.js, things are changing. Web apps are becoming more usable and accessible, though also making them crawlable and highly performant is a formidable challenge. To solve this problem I for one am behind [Derick Bailey's approach][1] for using HTML5 pushState and PE to achieve SEO and accessibility. After all, the hashbang method suggested by Google has a major problem: [the URLs are not semantic][2].

It seems as though I'm not alone in my belief that [Progressive Enhancement][3] is possible in a single-page application, and the following article by Airbnb points toward the fact that they were able to achieve PE in a RIA using a technique they're calling *The Holy Grail*. Under the approach, and per my understanding, content is rendered server-side first using both the same templating logic, routes and models, served up to the user agent, and then progressively enhanced afterwards with JavaScript.

A successful quest for The Holy Grail should yield a fully-crawlable Rich Internet Application with phenomenal "time to content" that doesn't tax crawlers with ajax and will function in most any browser, even with JavaScript disabled.

Check out the [Airbnb article][4] referenced, which depicts the Holy Grail in a linked image, and ask yourself if you're drinking from the right cup. You must choose, but choose wisely.

**Update 2016-11-22**: I've used two great React-based boiler plates for building Isomorphic apps. You can read about them on my list of [Awesome React Boilerplates](/awesome-react-boilerplates).
{: .notice--info}

 *[SPA]: Single-Page Application
 *[PE]: Progressive Enhancement

 [1]: http://lostechies.com/derickbailey/2011/09/26/seo-and-accessibility-with-html5-pushstate-part-2-progressive-enhancement-with-backbone-js/
 [2]: http://danwebb.net/2011/5/28/it-is-about-the-hashbangs
 [3]: http://alistapart.com/article/understandingprogressiveenhancement
 [4]: http://nerds.airbnb.com/weve-launched-our-first-nodejs-app-to-product

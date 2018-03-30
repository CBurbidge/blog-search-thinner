---
title: "Telltale Signs Your React App Isn't SEO Friendly"
date: 2016-12-28 12:17:00
modified:
excerpt: Is Your React App Invisible to Google?
categories:
  - reference
tags:
  - react
  - SEO
header:
  overlay_image: vgoiy1gzzyg-atlas-green_1280.jpg
  overlay_filter: 0.5
  teaser: vgoiy1gzzyg-atlas-green_512.jpg
---


As you may or may not be aware NPM and React have caused a Cambrian explosion in the number of [Awesome React Boilerplates](/awesome-react-boilerplates/) out there. But did you know many of those boilerplates and the web apps that build upon them aren't SEO friendly, and possibly even [invisible to Google](https://github.com/davezuko/react-redux-starter-kit/issues/819)? Sites experiencing SEO issues are more likely to be buried deeper in Search results and unlikely to see the Organic traffic they'd otherwise enjoy sans marketing efforts.

In this post we'll explore some of the telltale signs your React app isn't SEO friendly and what you can do about it.

## Identify SEO Issues

First off, identifying issues with site search indexability doesn't require an SEO expert. In fact, anyone can do it. Simply try any of the following methods to determine if your React site is experiencing potential issues with SEO.

### Fetch as Google

From Google Search Console run [Fetch as Google](https://www.google.com/webmasters/tools/googlebot-fetch) tool against a verified site and choose the *Fetch and Render* option. This will cause Googlebot to crawl the specified page and show you what it sees. Once finished, if you see a blank or partially rendered page your app website may be invisible to Google.

### Browse with Elinks

Another telltale sign your site is experiencing SEO issues is to simply browse it with [ELinks](http://elinks.or.cz/) or [LYNX](http://lynx.browser.org/). These browsers tend to block automatic cookies and shun JavaScript downloads. If your site **is SEO-friendly** like the *React Production Starter* featured on [Awesome React Boilerplates](/awesome-react-boilerplates/) you should see something like this:

![LYNX browser showing Isomorphic React App](/uploads/versions/lynx-12roads---x----1684-1132x---.png)

Otherwise your React site will take the form of a black hole as shown on slide 6 of my [Isomorphic Rendering with React](/talks/isomorphic-rendering-react/) talk.

### Disable JavaScript

Yet another way for testing for SEO issues in your React app is to disable JavaScript in the browser. To do so simply navigate to the page you'd like to test and disable JavaScript. If the page doesn't load at all with JavaScript disabled your site's SEO likely needs some fixing-up.

**Tip:** If you're using Chrome you can disable JavaScript for a single browser tab from the Settings pane in [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools/). Thanks to my friend Anton, creator of [Artsembler](https://artsembler.com/), for the reminder!
{: .notice--info }

## All Is Not Lost

Google and Bing both crawl Ajax pages. But when they crawl Ajax pages, they have to spend more time doing it, meaning your site will not be crawled as quickly. And that's pretty much where it ends. There are thousands of other crawlers out there which will not be able to access your site any longer, and that's not necessarily a good thing for your site or the Web.

Once you start building React apps without SEO friendliness it's **almost impossible** to go back without some extensive overhauling or creative workarounds.

If you'd like to understand your situation and options to address SEO issues with your React site or app please [contact me](/contact/) to schedule time to talk.

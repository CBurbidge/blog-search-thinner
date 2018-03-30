---
title: Awesome Hugo Boilerplates
date: 2017-10-07T15:09:01+08:00
modified: 2017-10-08T17:23:00+08:00
author: Josh Habdas
excerpt: Awesome Hugo starter kits to kick your site development into high gear.
categories: [reference]
tags: [programming, webdev, hugo, static site, starter kit, boilerplate]
featured: false
header:
  overlay_image: https://source.unsplash.com/v6uiP2MD6vs/1280x845
  overlay_filter: 0.5
  teaser: https://source.unsplash.com/v6uiP2MD6vs/512x338
---

Tired of reinventing the wheel? So am I. In the fashion of [Awesome React Boilerplates](/awesome-react-boilerplates) `habd.as` is comin' atcha with an all new *evergreen* list of awesome boilerplates—this time for the one and only [Hugo](https://gohugo.io/) static site generator.

Let us not waste any more time. Here they are in all their glory! And as always, feel free to drop your submissions in the comment section below to promote your FOSS product for the benefit of others.

**[Atlas](https://github.com/indigotree/atlas)**
<br>I learned about Atlas from a well-timed comment from [`@chrisgeary92`](https://github.com/chrisgeary92) while having a [short discussion](https://github.com/netlify/victor-hugo/issues/46) about pulling Gulp from Victor Hugo. Like Victor Atlas is heavily integrated with Netlify so it probably won't get you very far with a headless CMS like [Prismic](https://prismic.io/) or [Dato](https://www.datocms.com/). But what you lose in portability you gain in speed to market. Plus it comes with a slick logo, shown here:

[![Atlas logo](https://camo.githubusercontent.com/e204c18f8923f4b969620ef61f5e4f7d09adf259/68747470733a2f2f61746c61732e696e6469676f747265652e636f2e756b2f696d616765732f6769746875622d62616e6e65722e706e67)](https://github.com/indigotree/atlas)

**[Victor Hugo](https://github.com/netlify/victor-hugo)**
<br>Created by the team at Netlify, Victor Hugo is probably the most popular boilerplate for Hugo projects to date. It comes with a Gulp build pipeline and melds it together with Webpack. While I'm not sure Netlify is dogfooding this internally, I believe they created this when they took Smashing Magazine off WordPress—however a ridiculous choice that actually was. Just remember, sometimes you need to [take two steps back](/zero-to-http-2-aws-hugo/) to take a step forward. Cool logo not included.

**[Hugo Lambda](https://github.com/ryansb/hugo-lambda)**
<br>Whilst it isn't actively maintained, the concept behind this boilerplate is sensational—to leverage <abbr title="Function As A Service">FaaS</abbr> tech from Amazon to deploy Hugo under a serverless architecture. If and when I decide to automate deployments with Hugo this is probably the approach I will take. But for now I simply run a single task to [deploy from the CLI](/zero-to-http-2-aws-hugo/).

<aside class="notice--success">
  <h4>WTF is Serverless you ask?</h4>
  <p>Learn more about Serverless architectures in my <b>free</b> <a href="https://habd.as/serverless-email-forwards-ses-lambda-crash-course/">Serverless crash course</a>, where you'll learn just WTF Serverless is, why it's important and have a chance to use Serverless, Lambda and Node to create your own email forwarding service.</p>
</aside>

**[Hugulp](https://github.com/jbrodriguez/hugulp)**
<br>Hugo + Gulp starter kit. Includes BrowserSync, does image optimization stuff, asset fingerprinting (total overkill IMHO when you can simply [deploy from AWS](/zero-to-http-2-aws-hugo/)), your choice between Less and SASS, autoprefixer and more. What's really interesting about this kit is it's inclusion of Docker—probably [my favorite](/simple-websites-jekyll-docker/) DevOps tool ever next to [DevilBox](https://github.com/cytopia/devilbox) or [Helm](https://helm.sh).

**[Huggle](https://github.com/ktmud/huggle)**
<br>Huggle is a generator and a reduced boilerplate mixed into a single tool. Shown here, Huggle churning out a GitHub Pages-friendly Hugo site with a single command from the CLI:

![Huggle CLI running in terminal animation](http://ktmud.github.io/huggle/media/huggle-demo.gif)

Check out the [Huggle website](http://ktmud.github.io/huggle/) to learn more. Just remember… **[Don't forget the fabric softener](http://amzn.to/2yNJl8w)!**

**[Web Starter Hugo](https://github.com/adrinux/web-starter-hugo)**
<br>This engineering marvel has been around almost as long as Hugo itself but doesn't get much attention. Created by [`@adrinux`](https://github.com/adrinux) Web Starter Hugo bases itself off the one and only [HTML5 Boilerplate](https://html5boilerplate.com/) and includes goodies such as a Gulp build pipeline for responsive image generation, PostCSS and an extensible build of Modernizer. Holy moly that's awesome!!

**[Brunch With Hugo](https://github.com/Jayphen/brunch-with-hugo)**
<br>Are tools like Webpack [starting to feel](https://medium.com/@jhabdas/webpack-is-your-achilles-heel-d3cd80821a4f) like your Achilles’ heel? Then this is the boilerplate for you. Created by my man main [`@Jayphen`](https://github.com/Jayphen/) and leveraging the deceptively simple and ultra fast [Brunch by Paul Miller](http://brunch.io/) and friends, BWH provides BrowserSync and plugs right in with the entire Brunch ecosystem to help you get to where you're going without dealing with tooling trivialities.

**[After Dark](https://github.com/comfusion/after-dark)**
<br>No awesome list would be complete if I didn't selfishly promote some of of my own stuff amirite!? I built after Dark specifically to create my [Hack Cabin](https://hackcabin.com) website. It uses a design concept I call _Deceptive Simplicity_ and introduces cutting edge Web tech without going overboard on tooling. [Check out After Dark](https://comfusion.github.io/after-dark/) for a wild trip back in time, when Geocities and Angelfire reined supreme.

[![After Dark logo](https://raw.githubusercontent.com/comfusion/after-dark/master/images/minimal-mac.png)](https://comfusion.github.io/after-dark/)

**[Tranquil Peak](https://github.com/kakawait/hugo-tranquilpeak-theme)**
<br>Wait, can Hugo themes also be boilerplates??? You bet they can! And this one from first-time Java dev turned Web dude introduces a sophisticated and highly extensible theme and build toolkit all roped into one. Check out the [demo site](https://tranquilpeak.kakawait.com/) then click the title link above to dig into the source code.

---

Find or build something awesome and **wanna gush about it**? As well you should. And you can do so in the comment section just 👇🏼 below. And when you're all settled and looking for some inspiration on shiny toys to add to your site check out the full list of [JAMStack Frameworks, Tools and Tips](/jamstack-frameworks-tips-tools/).

---
title: JAMstack Frameworks, Tips and Tools
author: Josh Habdas
date: 2017-01-18T11:07:47+08:00
modified: 2018-03-22T19:05:00+08:00
excerpt: An assortment of shiny things for building your JAMstack sites.
categories: [reference]
tags: [jamstack, design tools, css frameworks, icons, animation]
header:
  overlay_image: circular-837510_1280.jpg
  overlay_filter: 0.5
  teaser: circular-837510_500x333.jpg
redirect_from:
  - /legit-css-frameworks/
  - /jamstack-css-framework-tool-library/
  - /jamstack-frameworks-tools-tips/
featured: false
---
{% include toc %}

Thinking about building the <a target="intro" href="https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/" rel="noreferrer nofollow noopener">Next Smashing Magazine</a>? Maybe you're just learning how to code? Or perhaps you've decided to taking a breather from building single-page apps to see what else is happening out there? If so, you're in the right place my friend.

Organized below is a list of some of the top frameworks, tips and tools for building search- and mobile-friendly [JAMstack sites](https://jamstack.org/) for the Web. This list is updated frequently as new tools and techniques are discovered, so please bookmark it for later reference and check back often.

## Website Frameworks

No magic tricks here. Unlike the apps you might see built with [Awesome React Boilerplates](/awesome-react-boilerplates), these Web frameworks all have a relatively small footprint, are search and mobile friendly and represent some of the best design accomplishments of the last ten years. Or the last two months, depending on when you visit.

### Full-featured

These frameworks pretty much have it all, and then some.

**[Foundation](http://foundation.zurb.com/)**
<br>Created and managed by Zurb, Foundation is a well established and thoughtfully designed framework. Notable aspects include a focus on Inclusive Design principles, proven UX methodologies, an extensive set of documentation, online training and community, and the flexibility to create some very powerful experiences on the Web. Hundreds of major brands rely upon Foundation every day, and, despite that fact, Foundation continues to push new releases and set the bar for what a framework should achieve.

Foundation is available with multiple prepackaged builds and also has the ability to pick what you want to create your own custom build. In addition to being the building block for many, Foundation also offers a complimentary set of tools for [building responsive email templates](http://foundation.zurb.com/emails.html) as well. And while it may not be as easy as some of the others, the thoughtful design constraints baked into Foundation will make you a better Web developer just by using it.

**[Bootstrap](http://getbootstrap.com/)**
<br>This framework needs little introduction. Born out of Twitter, Bootstrap is one of the most well-known and widely deployed starting points for building a website. Bootstrap is perfect for newcomers looking to build a rich Web experience without the steep learning curve. And though they have not released a new version in years, Bootstrap 4 is [already in alpha](https://v4-alpha.getbootstrap.com/) and just around the corner.

**[Semantic UI](http://semantic-ui.com/)**
<br>Though it hasn't gained the mindshare of the Foundations and Bootstraps of the world, Semantic UI is not something to be overlooked. Semantic UI takes a different approach to building interfaces, making it possible to mix and match many of their UI components to create truly custom layouts that can do a lot more than meets the eye until you start working with it. I once used the Semantic UI to build a SPA using the React-port when it was still called [Stardust](https://github.com/TechnologyAdvice/stardust) and was thoroughly impressed with the flexibility and power of the interfaces I could build with Semantic UI.

### Oldies but goodies

Like the full-featured frameworks, you can do a lot with these frameworks, all of which have amassed over 10,000 stargazers on GitHub. Visit their websites to learn more about them, and dig into their open source repositories to start getting involved. Just remember, more stars does not necessarily mean better. So make your selections carefully.

**[Materialize](http://materializecss.com/) (~26,000 stargazers)**
<br>Yet another Material Design framework, Materialize gives you the same Googly design feel as the others but also includes JavaScript widgets that don't require a complex single page application to function.

**[Material Design Lite](https://getmdl.io) (~27,000 stargazers)**
<br>Does a lot of what Materialize can do, but _doesn't rely on JavaScript_ to function. A great place to start for those who want to apply Material Design concepts their [favorite static site generator](/best-jamstack-site-generator/).

**[Material Design for Bootstrap](http://fezvrasta.github.io/bootstrap-material-design/) (~18,000 stargazers)**
<br Material Design Bootstrap is Material Design "theme" for Bootstrap 3 and is working towards support for Bootstrap 4. Like the name implies, this framework brings together the two worlds of Bootstrap and Material Design under a single umbrella, an incredibly unique experience.

### Rising stars

Shining bright, these libraries are composed of industry trend-setters and visionaries looking to make waves in the design and development world. There are all very much worth checking out in close detail.

**[mini.css](https://chalarangelo.github.io/mini.css/)**
<br>As the author points out [in the comments below](#comment-3138394169) mini.css isn't exactly a full-featured framework, but it's not a micro framework either. I took a look at the doc site and was surprised to see such comprehensive documentation and even quick a reference guide with code snippets and links to functional Pens. And that's something you don't see very often in the other frameworks. Mini lives up to its name with a pretty lightweight footprint -- clocking in at just 7kb gzipped. And if you're compressing your assets with [Brotli compression](http://google-opensource.blogspot.com/2015/09/introducing-brotli-new-compression.html), you can expect to do even more with less.

**[UIkit](https://getuikit.com/)**
<br>UIkit brands itself as <q>A lightweight and modular front-end framework
for developing fast and powerful web interfaces.</q> They've got through a number of iterations already, use semantic versioning to make upgrading a no-brainer and maintain a [CHANGELOG](https://getuikit.com/changelog) to help keep you abreast of what's happening.

**[Bulma](http://bulma.io/)**
<br>This one had completely escaped my radar until it [popped up in the comments](#comment-3148163230) thanks to Victor Bastos. It's CSS only, and supports a very simple method of building very beautiful and flexible layouts, with a reasonable level of opinion. Constraint with Bulma is a benefit, and they're carefully working towards building a one-of-a-kind framework that may take the world by storm.

**[Tachyons](http://tachyons.io/)**
<br>A designer favorite, Tachyons is designed for modular, clean and readable designs. It has a growing library of [open source components](http://tachyons.io/components/), [gallery for inspiration](http://tachyons.io/gallery/), a very fresh looking docs site and is gaining popularity quickly.

### Micro

For the minimalists in the crowd, these frameworks were built with strong opinion, kept it simple and are purpose-driven while allowing some level of customization.

**[Spectre](https://picturepan2.github.io/spectre/)**
<br>Spectre brands itself as a lightweight, responsive and modern CSS framework for faster and extensible development. The doc site is very nicely laid out and there's some pretty nifty-looking <abbr title="Chinese-Japanese-Korean">CJK</abbr> support baked-in. They're also planning on adding support for email templates, something I haven't seen anyone except for Foundation do. [Thanks to @roemhildtg](#comment-3106269595) for bringing it to my attention in the comment section below.

**[Milligram](https://milligram.github.io/)**
<br>A minimalist CSS framework for desktop and mobile development, Milligram provides the basics to get a site set-up without using a full-featured framework.

**[hack.css](http://hackcss.com/)**
<br>hack.css describes itself as a <q>dead simple css framework</q>, and it truly is. I used this little to build the [After Dark theme for Hugo](https://comfusion.github.io/after-dark/), and absolutely love how people are [finding ways](https://github.com/comfusion/after-dark/wiki) to make it their own. Per the author, hack.css pairs well with the [Bytesize](http://danklammer.com/bytesize-icons/) SVG icon set by Dan Klammer. And I use some of these icons on [Hack Cabin](https://hackcabin.com) to how you how l33t they can be.

### Dated but still relevant

**[Pure.css](http://purecss.io/)**
<br>Created by Yahoo, Pure CSS can be added piecemeal to accomplish simple layout and styling tasks on a site without going all-in on a framework -- perfect for building quick prototypes or when you don't want to add a lot of opinion to your site. Check out the docs to see what it can do.

**[Primer](http://primercss.io/)**
<br>The CSS toolkit and guidelines that power GitHub. Need I say more?

## Animation and Visualization

Libraries to help you really move your users. Some may depend on JavaScript, some may not. I shamelessly plucked some of these straight from Speckyboy, so you may also want to check out their article titled [CSS Animation Tools, Frameworks & Tutorials](https://speckyboy.com/css-animation/).

### Advanced

Complex frameworks typically use advanced HTML5 techniques to achieve interactive effects. Some of these require a license for use in commercial projects, so be sure to read licenses carefully.

**[GreenSock Animation Platform (a.k.a GSAP)](https://greensock.com/gsap)**
<br>Does things you'll _never_ achieve with CSS ([ever](https://css-tricks.com/myth-busting-css-animations-vs-javascript/)) and has a members site full of demos that'll literally blow you away. Just search the Web for "TweenMax" and get a glimpse of what animation on the Web can really do. If you want this kind of experience on your sites, you're going to have to pay for it.

**[Sequence](http://www.sequencejs.com/)**
<br>For creating sliders, presentations, banners, and other step-based applications. Sequence provides a number of free and premium themes to help you create an engaging app or wizard in no time at all.

**[Whitestorm](https://whsjs.io/)**
<br>A super gnarly physics library for interactive 3D physics animations. Checkout out [some of the examples](https://whs-dev.surge.sh/examples/).

**[three](https://threejs.org/)**
<br>A lightweight cross-browser JavaScript library/API used to create and display animated 3D computer graphics on a Web browser. Three.js scripts may be used in conjunction with the HTML5 canvas element, SVG or WebGL.

**[A-Frame](https://aframe.io/)**
<br>A web framework for building virtual reality experiences
Make WebVR with HTML and Entity-Component. Works on Vive, Rift, desktop, mobile platforms. For an example React boilerplate using A-Frame, check out [Awesome React Boilerplates](/awesome-react-boilerplates).

**[D3](https://d3js.org/)**
<br>JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS.

### Easier

**[animo](https://github.com/ThrivingKings/animo)**
<br>Animo is a powerful tool for managing transitions and animations with JavaScript. It's composed of a number of smaller plugins and is designed for maximum extensibility. Pair its animate plug-in with [Animate.css](#simple) to create simple yet graceful CSS transitions with ease.

**[Animatic](http://lvivski.com/animatic/)**
<br>Animatic gives you the ability to use delays and durations normally, even for pure CSS animations. It uses CSS transforms and 3d-transforms together with Javascript to create animation.

**[Animate Plus](https://github.com/bendc/animateplus)**
<br>Animate Plus is a CSS and SVG animation library for modern browsers. Animate Plus is performant and lightweight (2.8KB gzipped), making it particularly well-suited for mobile. I tried using this library to create a title rotation animation but got stuck in callback hell as it [doesn't support promises](https://github.com/bendc/animateplus/issues/19). Hopefully that changes in the future.

### Easiest

CSS-only frameworks for super-simple animation effects. Perfect for beginners looking to add a little movement to their pages.

**[Hover](https://github.com/IanLunn/Hover)**
<br>A collection of CSS3 powered hover effects to be applied to links, buttons, logos, SVG, featured images and so on. Easily apply to your own elements, modify or just use for inspiration. Available in CSS, Sass, and LESS.

**[Animate.css](https://daneden.github.io/animate.css/)**
<br>Just-add-water CSS animations. Handy for providing feedback to users, such as shaking a button when a form is invalid.

**[CSShake](https://elrumordelaluz.github.io/csshake/)**
<br>Some CSS classes to move your DOM. Drop it in, add a few classes to your markup and do your best to determine if the page is shaking, or you've simply had too much coffee. Just don't go overboard with this one, mmm-kay?

## Iconography

Icons and icon-related tools to help bring your site some flair. Use them to create social icons, export SVG images, do sprite things and all around just add value to help move eyeballs through your pages.

**[Material Design Icons](https://materialdesignicons.com/)**
<br>A bunch of Materialesque icons including SVG vectors for easily-embedded iconography piped down with the page HTML.

**[Material Icons](https://material.io/icons/)**
<br>Icon set for Material Design. Lots of them, and there's a _very_ handy toolbar for downloading these in SVG, PNG or Icon Font format. Let Ross Phillips show you how to use them to create some very [lightweight social share buttons](http://cloudcannon.com/tutorials/2017/02/01/lightweight-social-share-buttons/pretty).

**[Bytesize Icons](https://github.com/danklammer/bytesize-icons)**
<br>A "Tiny style-controlled SVG iconset". Like the name suggests, this icon set is fairly small. But the minimalist design makes these perfect for applications where you don't want draw too much attention away from your content. I use some of these icons in [After Dark](https://comfusion.github.io/after-dark/), my retro dark theme for Hugo.

**[Font Custom](https://github.com/FontCustom/fontcustom)**
<br>Generate custom icon webfonts from the comfort of the command line. Use only what you need, with Font Custom. I originally learned about this one while working with the [Feeling Responsive](https://github.com/Phlow/feeling-responsive) theme. It can be a little tricky to use at first, but the payoff is worth it.

**[Font Awesome](http://fontawesome.io/)**
<br>Everyone and their dog knows about Font Awesome. But did you know you can [download the entire set to your page asynchronously](https://github.com/jhabdas/fetch-inject#loading-css-asynchronously) using Fetch Inject? Here's how you would do it:

```js
fetchInject([
  'https://cdn.jsdelivr.net/fontawesome/4.7.0/css/font-awesome.min.css'
])
```

## Design Toolkits

**[Susy](http://susy.oddbird.net/)**
<br>Used to create Michael Rose's popular [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll theme, Susy is a responsive toolkit for use with Sass.

**[Breakpoint](http://breakpoint-sass.com/)**
<br>Really Simple, Organized, Media Queries with Sass. I've been using Breakpoint in my JAMstack projects since I saw it used by Michael Rose in [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). It's a super-simple way to organize your media queries and make sure they always do what you want. What's more, they're totally Keanu-approved (but probably not really).

**[Basscss](http://basscss.com/)**
<br>A low-level CSS toolkit. Basscss provides a base for desktop and mobile development, is composable and provides a number of community-supported add-ons.

**[Bourbon](http://bourbon.io/)**
<br>Man this thing has been around forever. But it provides some crutches for Sass many designers need to create good CSS animations such as [hamburger menu open/close animations](https://codepen.io/jonsuh/pen/bskzn) and is def worth mentioning.

## Noteworthy libraries

**[Fetch Inject](https://github.com/jhabdas/fetch-inject)**
<br>A fetching async loader and DOM injection sequencer for high-performance websites. Use Fetch Inject to dynamically import page resources such as JS and CSS in parallel (even across the network), and load them into your page in a desired sequence.

**[PhotoSwipe](http://photoswipe.com/)**
<br>A composite JavaScript gallery, no dependencies. Use it to create the most beautiful photo gallery you could imagine, replete with social sharing and full screen buttons. As the documentation states, you're going to need to know some JavaScript to get this thing working. But there are some code snippets and Pens to get you going, and the maintainer actively helps answer questions on the GitHub repo.

**[lazysizes](https://github.com/aFarkas/lazysizes)**
<br>Lazy load images and scripts into your page. Support for optimistic preloading of assets with lazy-queueing. Also does responsive images and supports LQIP (Low-Quality Image Placeholders) and more. I used this while building [a prototoype](https://hackernoon.com/putting-wordpress-into-hyperdrive-4705450dffc2) for the [WordCamp Ubud 2017](https://2017.ubud.wordcamp.org/) and it did wonders for page weight. I've also implemented on the [Hugo theme gallery](http://themes.gohugo.io/) to improve UX and page speed.

**[Waypoints](https://github.com/imakewebthings/waypoints/)**
<br>Achieve infinite scrolling on your static website, and trigger events as the user scrolls. Used to be a jQuery only thing back in the day. But not anymore.

**[Headroom.js](https://github.com/WickyNilliams/headroom.js)**
<br>Headroom.js is a lightweight, high-performance JS widget (with no dependencies!) that allows you to react to the user's scroll.

## Cloud CMS's

Cloud CMS's make it possible to edit the content for a static website without having to know how to squash commits. Quite literally, these services are opening the door to JAMstack development, and marry the best of developer experience working in GitHub with the ease of editing content using a visual editor online.

**[CloudCannon](http://cloudcannon.com/)**
<br>Build Jekyll or static websites, have your team and clients update inline. CloudCannon has a number of professionally designed, open source Jekyll themes you can begin using immediately with their service, has great documentation, maintains a learning website with [the missing cheat sheet](https://learn.cloudcannon.com/jekyll-cheat-sheet/) Liquid should have had but never did. They maintain a very simple set-up experience and focus on creating one of the best user experiences you could possibly imagine.

**[Siteleaf](https://www.siteleaf.com/)**
<br>Like CloudCannon, SiteLeaf is a Cloud CMS for Jekyll. I used them to build [a website](https://comfusion.io/clients/security7-networks/) for one of my clients and was surprised at how quickly they were able to provide support. Siteleaf has been around for over 7 years, and as one of their employees told me, they consider that and their API two of their key advantages in the Cloud CMS space.

**[Forestry.io](https://forestry.io/)**
<br>I haven't tried them yet. But support for Hugo is _very_ appealing to me. I'd love to hear any feedback you have to share about Forestry in the comments section below.

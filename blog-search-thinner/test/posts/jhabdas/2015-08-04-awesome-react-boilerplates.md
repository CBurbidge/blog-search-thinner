---
title: Awesome React Boilerplates
author: Josh Habdas
date: 2015-08-04T15:08:31-05:00
modified: 2018-03-18T17:10:00-6:00
excerpt: Awesome React starter kits to kick your app development into high gear.
categories: [reference]
tags: [programming, javascript, es2015, es6, react, react native, starter kit, boilerplate]
featured: false
header:
  overlay_image: circular-837510_1280.jpg
  overlay_filter: 0.5
  teaser: circular-837510_500x333.jpg
---
{% include toc %}

Not interested in reinventing the wheel? Neither am I. Here's a short list of awesome boilerplates -- sometimes known as starter kits or seeds -- for getting React applications off the ground in a hurry. These application templates were not taken from any list, however <a rel="nofollow" href="https://github.com/sindresorhus/awesome">awesome</a> that list might be. Rather, they've gained enough mindshare to find me outside [*The Stream*](https://medium.com/matter/the-web-we-have-to-save-2eb1fe15a426)[^1]. They're open source and waiting for you to generate, clone, fork and build upon in your next React project.

**Already settled on a boilerplate? Check out the list of [Awesome React Components](/awesome-react-components) and start building without all the experimentation and research.**

Contributions via comments welcome. The best React and React Native Boilerplates will be moved into the article body and the `nofollow`[^2] removed.

# React

Application boilerplates for creating React apps, many of which contain their own starter kit tutorials. And wow are there're a lot of good ones to choose from.

**[Razzle](https://github.com/jaredpalmer/react-production-starter)**
<br>Create universal React, Preact, Inferno, and Rax applications with no build configuration.

Here's an [example photo sharing application starter](https://github.com/jhabdas/12roads) I spiked on using an earlier version of this kit when it was still called **react-production-starter**.

And here's another app using Razzle with MUI, Express and more shared in the comment thread: [kireerik/razzle-material-ui-styled-example](https://github.com/kireerik/razzle-material-ui-styled-example).

**[react-pwa](https://github.com/Atyantik/react-pwa)**
<br>I've raised the red flag regarding the [lack of SEO](/telltale-signs-your-react-app-isnt-seo-friendly/) in React Apps, which is why I was super thrilled when Ajay submitted this Docker-ready React/Webpack PWA starter. Not only does it perform automatic image compression using the tools Addy Osmani [wrote about](https://images.guide/) only days ago, this puppy outputs responsive images by default. That's just something you don't see in most boilerplates where SEO only becomes a priority when it's all but too late.

**[gatsby](https://www.gatsbyjs.org/)**
<br>Another static site generator for React. Basically it aims to do all the things including image compression so it's fairly opinionated when it comes to boilerplates. But don't let that stop you from making a faster Web. Just remember user experience can only be measured by users.

**[react-boilerplate](https://github.com/mikechabot/react-boilerplate)**
<br>Brands itself as <q>A slightly opinionated yet dead simple boilerplate for ReactJS and Webpack 2</q> and was submitted by its author [in the comments](#comment-3296221301) section below. It's being lifted near the top of this list because it's fresh, it's young and it needs your attention to help it flourish.

<aside class="notice--success">
  <h4>Building a website, not an app?</h4>
  <p>Choose your own adventure. Learn to create a <a href="https://jamstack.org/" rel="noreferrer nofollow">JAMstack</a> site using Hugo in <a href="/zero-to-http-2-aws-hugo/">Zero to HTTP/2 with AWS and Hugo</a> or Jekyll in <a href="/simple-websites-jekyll-docker/">Simple Websites with Jekyll and Docker</a>. Here's a list of <a href="/jamstack-frameworks-tips-tools/">JAMstack development tools</a> to get you moving.</p>
</aside>

**[react-starter-kit](https://github.com/kriasoft/react-starter-kit)**
<br>Everything you need to build a front-end for a SEO-friendly React website. Supports text-only browsing and focuses heavily on Node.js and the surrounding ecosystem of NPM libraries. For an example isomporhpic application I've built using this kit check out [lumpenradio-com](https://github.com/jhabdas/lumpenradio-com) or my [Isomporhpic Rendering with React](/talks/isomorphic-rendering-react/) talk.

**[ARc](https://github.com/diegohaz/arc)**
<br>One of the common things I hear from individuals getting started with React is that the ecosystem is so complicated it's difficult to take everything in. That's why I'm please to see Diego Haz's ARc (Atomic React) project, which uses a _progressive_ design methodology intended to help individuals start small and work their way forward by incorporating new features one by one. Great job Diego!

**[simple-static-react-aframe](https://github.com/Jon-Biz/simple-static-react-aframe)**
<br>It's refreshing to see a new use case for a boilerplate. This boilerplate gets you set-up to build a VR website with React and Aframe. Check out the mobile demo and start building the next Pokémon Go. Be super slick to see something like this paired with [Whitestorm](https://github.com/WhitestormJS/whitestorm.js).

**[express-react-redux-starter](https://github.com/DimitriMikadze/express-react-redux-starter)**
<br>I wanted to spike on a simple game of [5x5 Tic-Tac-Toe](https://github.com/jhabdas/tictactoe/) recently and was able to use this kit to build out the game board using functional stateless components, and without having to yank out tons of boilerplate. It had just the things I needed to start building, and nothing more.

**[scalable-react-boilerplate](https://github.com/RyanCCollins/scalable-react-boilerplate)**
<br>Finally, a simple starter kit for scalable apps. Includes a Slush template generator, CLI code generators, a rig for use of CSS modules with SASS, and includes Airbnb linters and Mocha for testing (though I've been preferring [standard](http://standardjs.com) these days over ESLint as there's less to maintain). Also includes some GraphQL goodies, `re-select` for Redux state queries, server-side rendering, Webpack code chunking and lazy-loaded routes.

There's [a TS flavor of Ryan's work now](https://github.com/RyanCCollins/scalable-react-ts-boilerplate) as well, and the previous repo is no longer being maintained.

**[react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)**
<br>By former colleague (and one hell of a coder) this kit is designed to get you up and running with a bunch of awesome new front-end technologies. It can be a bit heavy for those new to React, and doesn't have the benefits of isomorphic rendering, but there's plenty of info to take away from studying David's coding wizardry.

**[react-boilerplate](https://github.com/mxstbr/react-boilerplate)**
<br>Very popular boilerplate from Max Stoiber considered by some to have [the best organizational pattern](https://medium.com/front-end-hacking/the-secret-to-organization-in-functional-programming-913484e85fc9). From the documentation, "A highly scalable, offline-first foundation with the best developer experience and a focus on performance and best practices." I haven't personally tried this seed yet but it's got enough umph behind it to make it worth bringing to your attention.

**[react-slingshot](https://github.com/coryhouse/react-slingshot)**
<br>React Slingshot is a comprehensive starter kit for rapid application development using React. Includes React + Redux starter kit with Babel, hot reloading, testing, linting and a working example app, all built in.

**[Este](https://github.com/este/este)**
<br>A React/Flux dev stack and starter kit for [Universal JavaScript apps](https://medium.com/@mjackson/universal-javascript-4761051b7ae9). Renders pages <abbr title="Single Page App">SPA</abbr> style (using `script` tags) and, therefore, is [not as SEO friendly](/telltale-signs-your-react-app-isnt-seo-friendly/) as isomorphic boilerplates.

**[re-base](https://github.com/tylermcginnis/re-base)**
<br>Inspired by Relay, combines the benefits of React and Firebase by allowing each component to specify its own data dependency. Forget about your data persistence and focus on what really matters, your application's state.

**[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)**
<br>Electron application boilerplate based on react, react-router, webpack, react-hot-loader for rapid application development

**[jspm-react](https://github.com/tinkertrain/jspm-react)**
<br>Configured starter repo to build web apps with React and ES6 modules using JSPM. Not actively maintained, though the author is still accepting pull requests.

# React Native

Application boilerplates for creating React Native applications. If you're just starting out, consider starting your app from scratch using `react-native init` and leveraging the following boilerplates for ideas until you get the hang of things. Otherwise, find your favorite and plunge right in!

**[ignite](https://github.com/infinitered/ignite)**
<br>The unfair starting CLI, Generator, and more for React Native cross-platform apps. I looked over this and, though I haven't used it yet for a project, it has one of my favorite developer affordances: Generators and is easy to set-up. It also takes a different approach from most boilerplates in that you do not have to fork the repo. Just generate it from the base! Also, GantMan is receptive to feedback and publishing docs to help on the Web. That's awesome.

**[pepperoni](http://getpepperoni.com/)**
<br>A well-constructed open source starter for React Native iOS and Android projects jam packed with lots of tasty ingredients, inspired by Snowflake. Uses ImmutableJS like Snowflake, Redux and leverages the semi-official [NavigationExperimental](https://facebook.github.io/react-native/docs/navigation.html#navigationexperimental) for routing. Also includes a bash script to help rename your application after your clone, fork or mirror.

**Update 2016-12-07**: Tab bar icons [now supported](https://github.com/futurice/pepperoni-app-kit/issues/40#issuecomment-265529553)!
{: .notice--info}

**[snowflake](https://github.com/bartonhammond/snowflake)**
<br>A React Native starter kit for iOS and Android given to us by the affable [Barton Hammond](https://github.com/bartonhammond). Includes all sorts of goodies, including Redux, Jest, Istanbul, Parse integration (planned to be replaced with [Serverless](serverless.com)) and more. Includes video tutorials for set-up with Bitrise and more. Uses [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) for routing.

**[f8app](https://github.com/fbsamples/f8app)**
<br>The official F8 app of 2016. Provides tutorials to help get started on [makeitopen.com](http://makeitopen.com) covering how they used React Native, Redux, Relay, GraphQL, and more. Also includes [Microsoft CodePush](https://github.com/Microsoft/react-native-code-push) for app updates without going through the app stores.

**[react-native-webpack-starter-kit](https://github.com/jhabdas/react-native-webpack-starter-kit)**
<br>Boilerplate I extracted from building the [Lumpen Radio](https://github.com/jhabdas/lumpen-radio) app early in the RN lifecycle, enabling RN development using bundles dynamically generated with Webpack.

[^1]: "The Stream" is a kind of slot machine used to [hijack your mind](https://medium.com/swlh/how-technology-hijacks-peoples-minds-from-a-magician-and-google-s-design-ethicist-56d62ef5edf3).

[^2]: `nofollow` links indicate the linked document is not endorsed by the author of the linking site. For example, if the author doesn't trust it, does not wish to pass authority, or if there is commercial relationship between the two, a link is more likely to be nofollowed. `nofollow` links play a role in the passage of authority and page rank in Search engine algorithms.

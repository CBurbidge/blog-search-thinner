---
title: Awesome React Components
date: 2016-10-28T22:23:08-05:00
modified: 2017-10-20T11:18:00+08:00
excerpt: Awesome React Components to help you build better, faster, stronger React and React Native apps.
categories: [reference]
tags: [react, react native, universal apps, programming, web platform]
header:
  overlay_image: circular-837510_1280.jpg
  overlay_filter: 0.5
  teaser: circular-837510_500x333.jpg
---
{% include toc %}

One of the best parts of building with React is discovering new and awesome open source components to use. Rather than throwing the <a target="intro" rel="nofollow noreferrer noopener" href="https://github.com/karl1992/awesome-react-components-all">kitchen</a> <a target="intro" rel="nofollow noreferrer noopener" href="https://github.com/enaqx/awesome-react#components">sink</a> at you, here's a curated list of React components and component libraries I think are truly awesome.

Looking for something more in-depth and hackable? Checkout the [OpusCapita Showroom](https://github.com/OpusCapitaBES/js-react-showroom-client).
{: .notice--info }

**Not sure where to start? Check out the list of [Awesome React Boilerplates](/awesome-react-boilerplates) for a solid footing for your React-based apps.**

Contributions via comments welcome. The best React and React Native Components will be moved into the article body and the `nofollow`[^1] removed.

# React

Awesome components for building React apps.

**[react-router-transition](https://github.com/maisano/react-router-transition)**
<br>Painless transitions built for `react-router`, powered by the popular [`react-motion`](https://github.com/chenglou/react-motion) spring animation library producing silky smooth page transition effects. Checkout [the demo](http://maisano.github.io/react-router-transition/) to see for yourself! Try using `Cmd` along with the arrow keys to navigate rapidly to trigger an avalanche of falling text.

**[redux-offline](https://github.com/redux-offline-team/redux-offline)**
<br>Persistent Redux store for Reasonaboutable™️ Offline-First applications, with first-class support for optimistic UI. Use with React, React Native, or as standalone state container for any web app.

**[PhotoSwipe](https://github.com/minhtranite/react-photoswipe)**
<br>Looking to create an engaging image gallery without going all-in on an [image gallery component](https://github.com/xiaolin/react-image-gallery)? Check out [PhotoSwipe](http://photoswipe.com) to see what it looks like, then install this gnarly react port for a superior image browsing UX for desktop and mobile.

**[Material UI](https://material-ui-next.com/)**
<br>If you're building a React App using Google's Google's [Design Guidelines](https://design.google/resources/) this MUI clone is a must-see. It reached the `1.0.0-beta` release after over 6000 commits. And while that may be against SemVer best practices the important take away is stability as the final coats of polish are added to this cornerstone React library.

**[React Flexbox Grid](https://github.com/roylee0704/react-flexbox-grid)**
<br>Though Material UI has a pretty stellar [Grid List component](http://www.material-ui.com/#/components/grid-list), it's not intended for layout. That's what Flexbox is for, bra. This component leverages CSS Modules, and pairs well with [Aphrodite](https://github.com/Khan/aphrodite) and Material UI for bulletproof responsive layouts.

**[Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React)**
<br>I had the pleasure of working with [Levi Thomason](https://github.com/levithomason) on this project when it was still called Stardust. Like Material UI, Semantic UI is a great way to get a project to MVP without a designer. It's now the official React port of Semantic UI and sure to continue gaining traction as time goes on. It's also jQuery-free and fully unit tested.

**[ANT DESIGN](https://github.com/ant-design/ant-design/)**
<br>A fresh take on a lot a React component library. Doesn't try to mimic any existing component library. It's obvious even the smaller design details were carefully considered while putting together ANT DESIGN.

**[React Waypoint](https://github.com/brigade/react-waypoint)**
<br>Based on the ever-so-useful [Waypoints](http://imakewebthings.com/waypoints/) library, leverage this component to trigger animations or capture events as users ogle their way down your pages.

# React Native

Awesome component libraries and native modules for building React Native apps.

**[Styled Components](https://styled-components.com/)**
<br>From Glen Maddern and Max Stoiber, styled components for the component age. Uses tagged template literals and enables you to write "actual CSS" to style your components. That's cool. Learned about this one from [a post by Jani Eväkallio](https://medium.com/react-native-development/react-native-app-stack-march-2017-f7605e02d46f).

**[Shoutem UI Toolkit](https://shoutem.github.io/ui/)**
<br>Shoutem UI toolkit enables you to build professionally looking React Native apps with ease. It includes quite a few components, provides an opinionated way to theme apps and perform common animations (e.g. parallax). Pretty slick.

<aside class="notice--success">
  <h4>Need a diversion?</h4>
  <p>Learn to create your own <a href="https://jamstack.org/" rel="noreferrer nofollow">JAMstack site</a> like Smashing Magazine in <a href="https://habd.as/zero-to-http-2-aws-hugo/">Zero to HTTP/2 with AWS and Hugo</a>.</p>
</aside>

**[React Native Web](https://github.com/necolas/react-native-web)**
<br>From Nicolas Gallagher, creator of [SUIT CSS](https://suitcss.github.io/), this project aims to bring the power of React Native building blocks and touch handling to the Web. Forrealzies!

**[React Native Elements](https://github.com/react-native-community/React-Native-Elements)**
<br>Ostensibly inspired by Material Design, React Native Elements is another UI kit for building React Native apps. It includes a drawer and tab bar, as well as some nice looking form-related components Shoutem lacks.

**[React Native UI Kitten](https://akveo.github.io/react-native-ui-kitten/)**
<br>Hold your jokes about the name, here's another UI framework for React Native. It's not necessarily awesome yet but I'm adding it here for tracking purposes as it's open source and could become awesome if enough people get behind it.

**[CodePush](https://microsoft.github.io/code-push/)**
<br>CodePush has been called "the most hipster thing" out of Microsoft in, well, quite some time. CodePush allows devs to make remote changes to installed apps without going through the App and Play stores. It does add a bit of complexity and planning, but the payoff will be worth it if you're making a breaking change to your back-end. Word to the weary, this is a single point of failure.

**[React Native Lock](https://auth0.com/lock)**
<br>From the team who brought us [Auth0](https://auth0.com/), the Lock component makes it simple to add authentication and password resets using email and social to your app. It even supports TouchID for iOS and can do Passwordless logins as well.

**[React Native Simple Auth](https://github.com/adamjmcgrath/react-native-simple-auth)**
<br>Looking for more control over how your users authenticate? Roll your own authentication setup for Google, Facebook, Twitter or Tumblr.

**[React Native Router Flux](https://github.com/aksonov/react-native-router-flux/)**
<br>Routing in RN is, ahem, a bit of suck. In fact, there are [several ways to do navigation](https://facebook.github.io/react-native/docs/navigation.html) in RN core. Instead of rolling your own, use React Native Router Flux -- which integrates easily with Redux -- to help you manage card-based scenes in your app.

**[React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)**
<br>No app is complete without some glamorous iconography. Install this module for access to over 3000 vector icons from several different icon sets, including [Material Icons](https://design.google.com/icons/).

**[React Native Video](https://github.com/react-native-community/react-native-video)**
<br>Looking to add a fullscreen video background to your RN app? Here's your ticket. From [Brent Vatne](https://github.com/brentvatne), creator of [Exponent](https://www.getexponent.com/), this native module--now a part of a collective group of components managed by the [React Native Community](https://github.com/react-native-community/)--makes it a cinch to enable stunning visual effects in your app.

**[React Swipeable Views](https://github.com/oliviertassinari/react-swipeable-views)**
<br>Does what it says on the tin. Swipeable views for your React Native app.

**[React Native Maps](https://github.com/airbnb/react-native-maps)**
<br>From the homies at Airbnb, do map stuff with React Native. The RN core team has [planned](https://github.com/facebook/react-native/wiki/Roadmap#stability) to remove their MapView (yeah, who knew?) in favor of this bad shooting star.

**[Lottie](https://github.com/airbnb/lottie-react-native)**
<br>Lottie is a mobile library for Android and iOS that parses Adobe After Effects animations exported as JSON with bodymovin and renders them natively on mobile! It's wrapper for React Native was open sourced in late January 2017.

# Universal

To be considered "Universal" for the purposes of this list components must not only be awesome, they must leverage the same codebase for both React and React Native and work on Android, iOS and Web.

**[Carbon UI](https://carbon-ui.com/)**
<br>Piggybacking on **React Native Web** Carbon UI is a <abbr title="Material UI">MUI</abbr> clone [being released](https://github.com/callemall/material-ui/issues/593#issuecomment-265753123) just in time for the 2016 holidays. That's arguably a better gift than [a years' worth of 24 Ways](https://24ways.org/). Giggity.

**[Animated](https://github.com/animatedjs/animated)**
<br>Declarative Animations Library for React and React Native. My favorite part is in the README and I quote "At some point, React Native will itself depend on this library." Whoa.

[^1]: `nofollow` links indicate the linked document is not endorsed by the author of the linking site. For example, if the author doesn't trust it, does not wish to pass authority, or if there is commercial relationship between the two, a link is more likely to be nofollowed. `nofollow` links play a role in the passage of authority and page rank in Search engine algorithms.

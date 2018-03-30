---
title: Slack Stack Attack
author: Josh Habdas
date: 2015-06-08T16:44:53-05:00
author_profile: false
comments: false
share: false
categories: [reference]
tags: [stacks, cross-platoform, native, web]
link: https://github.com/atom/electron
---

Since the day I started using Slack at my last company I marveled at the composition of the application and how it ran both on Web and native desktop environments using a native wrapper around Web. I spent a little time trying to reverse-engineer the stack to understand what it was building on top of, deducing only it wasn't using [NW.js](https://github.com/nwjs/nw.js/). So, what then? I queried colleagues and Twitterverse only to come up empty-handed. And then, as things sometimes are in the world of discovery, I stumbled across a repo starred by [@sindresorhus](https://github.com/sindresorhus) and there it was: [Electron](http://electron.atom.io/).

Of course the search would've been much easier had I know about StackShare at the time when Slack posted [their tech stack](http://stackshare.io/slack/slack/details).

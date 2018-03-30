---
title: Beta Testing React Native with Buddybuild
author: Josh Habdas
date: 2016-08-22T02:07:24-05:00
excerpt: First impressions of Buddybuild for React Native development.
categories:
  - opinion
tags:
  - programming
  - ci
  - testing
  - tools
header:
  overlay_image: children-862572_1280.jpg
  overlay_filter: 0.5
  teaser: children-862572_512.jpg
---

A year ago I built and open-sourced [Lumpen Radio for iOS](https://github.com/jhabdas/lumpen-radio) using React Native. A major takeaway during development was the importance of testing on actual devices. Not just my device. But, you know, like a responsible adult using a bunch of them.

At the time I was finishing development of the iOS app, Android support in RN was just getting its roots. I decided to let Android support bake a while longer, coordinated small group of people, [beta tested with TestFlight](/reflecting-on-react-native-development/#beta-testing-with-testflight) and released to the App Store with confidence.

20 releases of React Native have passed since then and there have been great innovations like [CodePush](http://codepush.tools) and [Lock](https://auth0.com/lock), and [awesome boilerplates](/awesome-react-boilerplates/#react-native) for React Native have continued to surface.

Given all the advancements, and after recent inspiration to create an [Android version](https://github.com/jhabdas/lumpen-radio/issues/7) of Lumpen Radio, I decided it was time to go cross-platform.

This time around, however, instead of beta testing with Test Flight, I'm using [Buddybuild](https://buddybuild.com/). I didn't just pick it because they had a great landing page. This tool and its dashboard feel solid.

After just two days of using Buddybuild I've been able to get it to recognize both my iOS and Android apps, build their different variants, manage the majority of the CI process and allow me to deploy product to the first test user. That's breakneck speed compared to TestFlight.

And, unlike with Test Flight, Buddybuild sports self-installing SDK which integrates at the click of a button and enables automated collection of user feedback along _with screenshots_. There's even a [Trello integration](http://blog.buddybuild.com/trello-integration/) to help manage and prioritize feedback. Pictured here an example of the instructions to users the SDK provides for sending feedback during beta testing:

![Buddybuild user feedback screenshot](/images/buddybuild-sdk-user-feedback.png){: .align-center}

So far I'm extremely impressed with Buddybuild and can't wait to see what else it can do.

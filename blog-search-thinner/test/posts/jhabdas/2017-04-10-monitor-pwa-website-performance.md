---
title: "Monitoring Progressive Webapp Performance"
date: 2017-04-10T21:58:37+08:00
modified: 2017-04-11T13:37:00+08:00
excerpt: Progressive Monitoring for your Progressive Web Apps with Speed Tracker.
author: Josh Habdas
categories:
  - reference
tags:
  - lighthouse
  - pwa
  - performance
  - monitoring
header:
  overlay_image: robert-wiedemann-177442_1280w.jpg
  overlay_filter: 0.5
  teaser: robert-wiedemann-177442_512w.jpg
featured: false
---

How do you monitor website performance? Is it monitored? How do you know if your website is getting faster? Or when it falls below critical performance thresholds? Are you receiving automated alerts? If not, you could be. And it won't cost you a dime to get started with SpeedTracker.

**SpeedTracker is a tool that allows you to monitor website performance over time**. Use it to visualize your page speed scores, track your <a target="_intro" rel="noopener nofollow noreferrer" href="https://developers.google.com/web/tools/lighthouse/">Lighthouse metrics</a>, receive alerts and even create a dashboard consisting of multiple websites for quick reference.

<blockquote cite="https://speedtracker.org/">
  <p>Companies like <a target="_blockquote" rel="noopener nofollow noreferrer" href="https://calibreapp.com/">Calibre</a> or <a target="_blockquote" rel="noopener nofollow noreferrer" href="https://speedcurve.com/">SpeedCurve</a> offer this as a professional (and far more comprehensive) service, but not everyone can afford them. Whether you’re part of a small company or run a non-profit/open-source project, SpeedTracker can help you keep an eye on the performance of your website for free.</p>
  <cite><a target="_blockquote" href="https://speedtracker.org/">SpeedTracker.org</a></cite>
</blockquote>

## Automate Website Performance Monitoring Free With SpeedTracker

In a previous life I used <a target="_blank" rel="noopener nofollow noreferrer" href="http://www.showslow.com/">ShowSlow</a> to monitor website performance. But, unfortunately, ShowSlow never lived up to my expectations in the long run. Struggling to find a better way to do website performance monitoring, I stumbled upon SpeedTracker.

Getting started with website speed tests was simple.

### Getting Started With SpeedTracker

Getting started with SpeedTracker was as easy as following their <a target="_speedtracker" rel="noopener" href="https://speedtracker.org/docs">Quick Start documentation</a>. They've even included a screencast to help you on your journey to page load speed perfection:

{% include video id="185952137" provider="vimeo" %}

You'll be up and running in no time.

Looking for something more advanced? Check out <a target="_blank" rel="noopener" href="https://www.sitespeed.io/">Sitespeed.io</a>. _Caveat emptor_. <abbr title="Bring Your Own Development Team">BYODT</abbr>.
{: .notice--info}

### SpeedTracker In Action

Screencasts are great. But what's even better? **Live demos!**

Head to **[speed.habd.as](http://speed.habd.as) to view dashboard** with websites I'm monitoring with SpeedTracker. Feel free to click around and experiment with the tool while you're in there.

And if you're curious how I set it up, my <a target="_speedtracker" href="https://github.com/jhabdas/speedtracker">implementation is open source</a> on GitHub thanks to SpeedTracker's handy <a target="_speedtracker" href="https://speedtracker.org/encrypt">web-based encryption tool</a>. You can even <a target="_speedtracker" href="https://github.com/speedtracker/speedtracker-api/pull/23">encrypt the website URLs</a> you're tracking if you want to be hush hush about it.

### Measuring Progressive Web Apps

In addition to providing basic website performance testing leveraging the power of <a target="_blank" href="https://www.webpagetest.org/">WebPageTest.org</a>, SpeedTracker <a target="_speedtracker" href="https://github.com/speedtracker/speedtracker-api/pull/27">also provides</a> PageSpeed and Lighthouse metrics.

Now you can _really_ find out if your <abbr title="Progressive Web App">PWA</abbr> cuts the mustard. And you won't need a Chrome extension or separate website checker to monitor your web performance.

### Digital Narcissism At Its Finest

It's true. Sometimes we just can't get enough vanity metrics. With SpeedTracker installed it's quite likely you're going to need a new <a rel="nofollow noreferrer" href="https://thecoffeelicious.com/this-is-the-antidote-for-digital-narcissism-998b424a1ba1">Antidote for Digital Narcissism</a>. But who could blame you? I know I won't.

[![Hack Cabin Rendering Metrics display chart](/images/speedtracker-hackcabin.png "Click to view metrics")](http://speed.habd.as/)

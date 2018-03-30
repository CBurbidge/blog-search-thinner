---
title: "Add Google Analytics to Ghost with CloudFlare"
author: Josh Habdas
date: 2013-12-06
excerpt: Learn how to add Google Analytics to Ghost for free, no coding required.
categories:
  - tutorials
tags:
  - blogging
  - ghost
  - ghostify
  - cloudflare
  - cdn
  - analytics
  - seo
  - hosting
---

[Ghost](https://ghost.org/) is the new hotness in blogging. It has more than 5,000 backers on Kickstarter and has raised more than USD $300,000 in funding. But given its relatively new on the block, there's not a lot in the way of tutorials or primers for getting started.

Looking at the world of analytics, there are a few tutorials on page one of Google which encourage users to customize Ghost themes. But customizing a theme is a hack and locks users into something I like to call a "customization corner". Customizing in the way suggested makes it more difficult for users to switch themes later and increases the risk of functionality breakage when one theme is swapped out for another. Don't do it.

Instead, consider adding analytics using a CDN like [CloudFlare](http://www.cloudflare.com/). Not only does adding analytics through a CDN prevent the need to customize Ghost, it'll also speed up your blog at the same time and can be done without any coding. And the best part is, it can be done for free.

> Learn how to add Google Analytics to Ghost for free, no coding required.

To add Google Analytics to Ghost with CloudFlare follow the steps in the sections below.

## Get Tracking ID from Google Analytics
First, get a Tracking ID from Google Analytics.

1. Create a [Google Analytics](http://www.google.com/analytics/) account if one does not already exist.
2. Follow Google's instructions to [set up a property](https://support.google.com/analytics/answer/1042508?hl=en).

Once a new property is set-up, a Tracking ID (e.g. UA-6273863-4) will become available as part of the code snippet provided to add anlaytics to a blog. Copy it somewhere or just come back for it once CloudFlare is set-up.

## Set tracking code in CloudFlare
Once the Tracking ID is generated from Google Analytics it can be used to start tracking data on a Ghost blog through an integration with CloudFlare. Follow the steps below to make it happen.

1. If one does not already exist, [sign-up for an account](https://www.cloudflare.com/sign-up) with CloudFlare.
2. Once logged into CloudFlare, add a new website from the [My websites](https://www.cloudflare.com/my-websites) page.

    __Tip:__ If you do not already have a domain, you can get one through [Ghostify](http://ghostify.io/) for a nominal monthly fee. [DigitalOcean](http://digitalocean.com/) is another option.
3. After the new website is added, [access the apps](https://www.cloudflare.com/cloudflare-apps) for the website.
4. From the _Apps_ page, find Google Analytics and enable it using the Tracking ID.

Once the tracking code is set in CloudFlare data should begin to flow through to Google Analytics automatically. Test it out in Google Analytics by accessing the real-time page tracking while navigating the Ghost blog.

When it's verified, don't forget to also hook the blog up to [Webmaster Tools](https://www.google.com/webmasters/tools/) using CloudFlare, and then submit the site to the search index.

## Summary
Without a lick of code or a penny spent this article has outlined the steps needed to add Google Analytics to a Ghost blog without customizing a Ghost theme. A good engineer will always do things the easy way that achieves multiple benefits and is future-proof, and this is that. Happy blogging!

---
title: How to create a Hotcast
author: Josh Habdas
date: 2015-05-28T10:21:47-05:00
author_profile: false
excerpt: "Learn how to stream HD video to your TV over your smartphone’s LTE network using Chromecast."
categories: [hacking]
tags: [chromecast, hotcast, networking, wireless]
---

When I got a Chromecast a couple of years ago I was a little miffed when I discovered I couldn’t cast video to it using my phone’s hotspot. So today we’re going to learn how to create a Hotcast. What is a Hotcast? It’s Chromecast running over your smartphone’s LTE network. And it’s easier than you might think.

> Follow along to learn how to stream HD video to your TV over your smartphone’s LTE network using Chromecast.

# An impetus for change

I’m what you might call, uh, a little thrifty. So thrifty in fact I haven’t paid for cable internet for over three years. How? Well, first I discovered a hole in T-Mobile’s LTE network restrictions on LTE data capping and leveraged that to boost ~80GB/month for about 6 months before they caught on. After that I went to Best Buy and picked up a cheapo Belkin WiFi range extender and started boosting signal from my neighbor until he moved out. And so it was time to hit the drawing board again.

# Looking for inspiration

Sleuthing around Reddit this morning turned up some ideas, but [nothing super useful](http://www.reddit.com/r/Chromecast/comments/1lackz/using_chromecast_in_a_routerless_household_where/). So I put on my thinking cap, grabbed the Belkin extender and started tooling around until I came up with Hotcast.

# How it works

Hotcast works by circumventing Chromecast’s understanding it’s on the same WiFi network as your phone, leaving you free to cast cast cast your heart away. Well, at least until you hit your data caps that is.

Here’s a pictorial representation of how it works:

![Hotcast system diagram](http://www.gliffy.com/go/publish/image/8221351/L.png)

# Less talk, more do

Okay, you’re eager to get started. Here’s how to make this work. You’ll need a few things to do this, most of which you probably have lying around the house. The others can be cheaply bought at the store or online.

## Requirements

- Chromecast and TV, obviously
- Smartphone with an 4G/LTE connection
- WiFi extender or router
- A temporary connection to another WiFi network

## Setup

Follow these steps in order. If you have any questions just let me know in the comments section below and I’ll see what I can do to help.

1. Connect WiFi extender/router to the temporary WiFi network (not your hotspot). Just ask your neighbor or use a hotspot on another phone.
2. Factory reset your Chromecast by holding down the little button near the micro-USB port for about 10-15 seconds. This will give us a clean slate for the setup.
3. Connect your smartphone to the WiFi network given off by the Chromecast. The SSID broadcast will be something like `Chromecast8675309`.
4. Use the Chromcast app on your phone (install from Play/App store if not already available) to configure your Chromecast to connect to the temporary network. Once complete your Chromecast will say it’s ready to cast.
5. Disconnect your phone from the Chromecast if still connected and open up a WiFi hotspot for which to tether.
6. Configure your router/extender to use your phone’s hotspot instead of the temporary network and thank your neighbor.
7. Connect your laptop, tablet, computer, whatever to the WiFi network now powered by the hotspot on your phone via the extender/router.
8. Fire up the Chrome browser, install the Google Cast extension if you don’t already have it and enjoy your new Hotcast.

# Slick, but not quite perfect

While your new Hotcast will allow you to leverage your existing cellular data network to stream video there are a few caveats worth mentioning. For my purposes these are totally doable. For you they may be nonstarters.

**Caveats**

- You will not be able to cast from the phone with the active hotspot. Though you *can* cast from another phone. And I must admit Netflix from a laptop running Chrome works quite supurbly.
- Uses phone’s tethering, thus data plan. If you’ve got a lame data cap you may not be able to make it through a full movie. But if you’re not you’ll be streaming HD goodness to your TV for hours of enjoyment.
- Some providers, like T-Mobile, offer “unlimited data” plans. That’s not totally true as at least a few data providers will use that as marketing jargon yet either throttle or completely limit your hotspot tethering caps.

# In conclusion

In this post we learned how to create a Hotcast, which leverages an intermediate device to circumvent the restrictions of the Chromecast to work with a hotspot. The more people we can get to do this the less people who’ll need cable internet and, eventually, the better the LTE networks will become. While you’re saving yourself thousands per year on outrageous cable internet packages do yourself a solid and save even more money by doing [Movies on the cheap with VUDU In Home Disc to Digital](/movies-on-the-cheap-with-vudu-in-home-disc-to-digital/).

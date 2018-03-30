---
title: FTP to Ghostify with Sublime Text
author: Josh Habdas
date: "2013-11-29 14:45"
categories:
  - tutorials
tags:
  - sublimetext
  - ghost
  - ghostify
  - ftp
  - nodejs
  - express
---

I've wanted to write about a non-technical subject for a while to help round out my writing skills and cater to a broader audience. The subject matter of which became clear after recently discovering that there's not a lot of information out there covering meals in the AM. So, with inspiration from my [food-blogging neighbor](http://www.hgjones.org/), but with an obvious lack of understanding for the intricacies of food composition and preparation, I have decided to create a new food blog which focuses on something I love -- Breakfast -- and introduce it in an approachable way -- with absurdity.

To get started, I decided to take advantage of the Thanksgiving Day message I received from [Ghostify](https://twitter.com/ghostifyio) letting me know their beta service was ready. Within 5 minutes of entering my credit card details on the Ghostify site, I had my first Ghost blog up and running.

For those not familiar, [Ghost](https://ghost.org/) is a new open-source blogging platform built on top of [Node.js](http://nodejs.org/) using [Express](http://expressjs.com/). Like [Wintersmith](https://github.com/jnordberg/wintersmith) it takes an all JS approach to site generation -- a novel shift from Ruby-based site generators like [Octopress](http://octopress.org/), as the need to learn any Ruby in order to customize it becomes irrelevant.

> With the new blog up on Ghostify I needed a quick way to create image assets for my new Ghost blog.

Not being a huge fan of CMS-based blogging platforms like [Drupal and WordPress](/drupal-7-for-wordpress-admins/), I figured I might be able to leverage some [Sublime Text SFTP research](/sftp-to-ubuntu-server-sublime-text/) I did to test an FTP connection to Ghostify for image uploads. And it worked like a charm! Follow along to learn how to FTP static assets to Ghostify with Sublime Text.

<!--more-->

## Requirements

To FTP to Ghostify with Sublime Text you will need the following:

- A [Ghostify](http://ghostify.io/) account and 1 active Ghost (USD $6.35 a month)
- The wonderful and personally recommended [Sublime Text](http://www.sublimetext.com/) editor (USD $70)
- [Sublime SFTP](http://wbond.net/sublime_packages/sftp) (USD $20)

## Enable FTP on Ghostify

Enabling FTP on Ghostify can be achieved from the _Details_ page for the Ghost created and can be accessed directly from the [Ghostify dashboard](https://my.ghostify.io/dashboard/). Once FTP is enabled, Ghostify will report the following pieces of information needed to connect:

- __FTP host:__ ghp02.hostghost.io
- __FTP username:__ 81065
- __FTP password:__ \*\*\*\*\*\*\*\*\*\*\*\*\*\*

## Configure a new server in Sublime Text

With the above _Requirements_ satisfied and FTP enabled thru the Ghostify dashboard, create a new SFTP server using the credentials provided by Ghostify. Here's a sample FTP server configuration:

```js
{
    // The tab key will cycle through the settings when first created
    // Visit http://wbond.net/sublime_packages/sftp/settings for help

    // sftp, ftp or ftps
    "type": "ftp",

    "sync_down_on_open": true,
    "sync_same_age": true,

    "host": "ghp02.hostghost.io",
    "user": "81065",
    "password": "**************",
    //"port": "22",

    "remote_path": "/",
    //"file_permissions": "664",
    //"dir_permissions": "775",

    //"extra_list_connections": 0,

    "connect_timeout": 30,
    //"keepalive": 120,
    //"ftp_passive_mode": true,
    //"ssh_key_file": "~/.ssh/id_rsa",
    //"sftp_flags": ["-F", "/path/to/ssh_config"],

    //"preserve_modification_times": false,
    //"remote_time_offset_in_hours": 0,
    //"remote_encoding": "utf-8",
    //"remote_locale": "C",
}
```

## Browse the server created

Once the new server is created, browse it using Sublime SFTP by pulling up the _Command Palette_, typing `browse server` and selecting the server created. If all goes well, you should see a connection string similar to the following:

    Connecting to FTP server "ghp02.hostghost.io" as "81065" ................... success
    Validating remote folder "/" ................ success

If there's an issue with the configuration you'll instead see a failure which looks more like this:

    Connecting to FTP server "ghp02.hostghost.io" as "81065" ................... failure (Reason)

## Create folder once connected

Once connected to the server, use it to create an `images` folder under assets:

    Creating folder "/casper/assets/images/" .. success

_Note:_ [Casper](https://github.com/TryGhost/Casper) is the name of the default theme for Ghost. Those born in the US in the early 80's may immediately regard this theme with a friendly disposition.

## Create a new image

With the images folder created, use Sublime SFTP to create a new file called `shortstack.svg` and drop in the following contents:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 15.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!-- Borrowed from http://www.alessioatzeni.com/meteocons/ -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
<g>
  <g>
    <path fill="#1D1D1B" d="M112,160h288c8.833,0,16-7.167,16-16s-7.167-16-16-16H112c-8.833,0-16,7.167-16,16S103.167,160,112,160z
       M400,192H112c-8.833,0-16,7.167-16,16s7.167,16,16,16h288c8.833,0,16-7.167,16-16S408.833,192,400,192z M400,256H112
      c-8.833,0-16,7.167-16,16s7.167,16,16,16h288c8.833,0,16-7.167,16-16S408.833,256,400,256z M400,320H112c-8.833,0-16,7.167-16,16
      s7.167,16,16,16h288c8.833,0,16-7.167,16-16S408.833,320,400,320z"/>
  </g>
</g>
</svg>
```

To learn more about using SVG, check out Chris Coyier's [Using SVG](http://css-tricks.com/using-svg/) article on CSS-Tricks.

## Display the image using markdown

With the new image created on the server, it can now be dropped into any post using the following markdown pattern:

    ![](/assets/images/shortstack.svg)

To try it, open the Ghost editor, press `Ctrl` + `Shift` + `L` (or platform equivalent) and specify the root-relative link. The end result should be a visible image, as pictured:

![Root-relative image link reference and resulting image in the Ghost editor](//s3.amazonaws.com/images.habdas.org/ghosteditor.png)

## Summary

That was relatively painless. Now SVG images can be created and referenced from new posts on a Ghost blog hosted on Ghostify, and they're organized near the other theme assets. And while it's not a great idea to customize Ghost themes, storing images in the way described using FTP fits the bill for now. Speaking of bills, time to go eat some breakfast so I can create some content for my new blog.

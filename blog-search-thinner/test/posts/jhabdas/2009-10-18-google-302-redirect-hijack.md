---
title: Anatomy of a Google 302 Redirect Hijack
author: Josh Habdas
date: 2009-10-18
categories: [reference]
tags:
  - scareware
  - rogueware
  - malware
  - hacking
  - proxies
---

Recently while Googling `Olla de Carne` (Costa Rican beef stew) my browser was [hijacked][1] after taking a search results link. Rather than receiving a list of ingredients, the link redirected the browser to a bogus antivirus site that mimicked Windows and faked an integrated Explorer virus scan. Let's examine how it happened.

<!--more-->

<iframe width="560" height="315" src="http://www.youtube.com/embed/gnZSOMdp9oI" frameborder="0" allowfullscreen></iframe>

After a few seconds on the page the following occurred:

- Result page successfully hijacked and a faux Windows Explorer interface loaded.
- A fake virus scan ran in the look-alike Explorer window, conveniently uncovering trojans and other malware.
- Alerts, dialogs and phony windows displayed in an attempt to execute a little [social engineering][2].

After attempting to interact with the document the following occurred:

- A potentially threatening program file download initiated if you clicked on anything in the page.
- Additional warning dialog and pop-up window displayed on attempting to unload the page (e.g. hit the back button).
- Intermittently, the Google Chrome 3.0 back-button and tab `x` icon stopped functioning as expected.

The last point was of particular interest at first, as it is not like modern browsers to allow websites to modify browser functionality. But after some additional research, it was clear the hijack was more complex than a page titled with search engine optimization in mind. This article will study the hijacking in some technical detail, discuss the black hat SEO techniques used to get the rogue application listed on Google and how the app was able modify the expected functionality of browser controls in Chrome 3.0.

# The bait and switch

How does activating a seemingly innocuous (and tasty) link from Google land someone on a potentially dangerous page? 302. [HTTP 302][3] that is.

After locating the offending link on Google, I used a client-side proxy to trap the HTTP headers for a play-by-play review:

    GET http://woodstockfolkmusic.com/bftwe/tiijy/carne.php HTTP/1.1
    HTTP/1.1 302 Found
    GET http://goodstats1.net/in.cgi?2 HTTP/1.1
    HTTP/1.1 302 Found
    GET http://sunstats1.net/in.cgi?default HTTP/1.1
    HTTP/1.1 302 Found
    GET http://sunstats1.net/redirect3/ HTTP/1.1
    HTTP/1.1 302 Found
    GET http://bookletantcars.cn/?pid=283s01&sid=2a15a0 HTTP/1.1
    HTTP/1.1 302 Found
    GET http://wwwantispyware10.com/scan1/?pid=283s1&engine=%3D3W59jDuNTIuMTUxLjE1MyZ0aW1lPTEyNTE2NYcMOAkN HTTP/1.1
    HTTP/1.1 200 OK

Stepping through the sequence we can see the initial GET request followed by a 302 redirect response. Several redirects later and the browser successfully arrives at destination malware, beef stew long forgotten.

# Black hat inside

The next thing I tried was to analyze the [source of the PHP file][4] cataloged by Google, which was not difficult for two reasons:

1. Directory listing was enabled on the web server, and
2. Navigating directly to the PHP file caused the page to load without redirect.

The PHP file was stowed away on [woodstockfolkmusic.com][5] (which appears to be a legitimate folk music site based out of Illinois) along with some 300 similar PHP files, covering a range of topics from Alba to Wisconsin. The files found contained mostly deprecated HTML markup (remember the `<marquee>` tag anyone?) and no PHP script or META tags. The files were [stuffed with hundreds of keywords][6], a form of [spamdexing][7] I thought was no longer practiced. Nevertheless the result still appeared on Google, possibly with a little help from [cloaking][8].

# Engage the cloaking device

Curious as to why the PHP files (with no PHP script or META tags, mind you) would redirect links coming from Google, but not when loaded directly, I again pulled up a client-side proxy for closer investigation. Below are the results of several slightly modified HTTP requests for the file initially requested by Google. Each request contains a modified Referer [request-header field][9].

## First request

Hacked the Referer field to point to the Google domain.

    GET http://woodstockfolkmusic.com/bftwe/tiijy/carne.php HTTP/1.1
    Host: www.google.com
    Proxy-Connection: keep-alive
    User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.195.27 Safari/532.0 Paros/3.2.13
    Referer: http://www.google.com/
    Accept: application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5
    Accept-Encoding: sdch
    Accept-Language: en-US,en;q=0.8
    Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3

## First response

Hijack successful; browser redirected to bogus antivirus page.

    HTTP/1.1 200 OK
    Date: Sun, 18 Oct 2009 22:33:31 GMT
    Server: Apache
    X-Powered-By: PHP/5.2.8
    Connection: close
    Content-Type: text/html

## Second request

Hacked the Referer field to a domain other than Google.

    GET http://woodstockfolkmusic.com/bftwe/tiijy/carne.php HTTP/1.1
    Host: woodstockfolkmusic.com
    Proxy-Connection: keep-alive
    User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.195.27 Safari/532.0 Paros/3.2.13
    Referer: http://www.habdas.org/
    Accept: application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5
    Accept-Encoding: sdch
    Accept-Language: en-US,en;q=0.8
    Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3

## Second response

No hijack; browser sent directly to indexed page.

    HTTP/1.1 200 OK
    Date: Sun, 18 Oct 2009 22:31:36 GMT
    Server: Apache/2.0.63 (Unix) mod_ssl/2.0.63 OpenSSL/0.9.8e-fips-rhel5 mod_auth_passthrough/2.1 mod_bwlimited/1.4 FrontPage/5.0.2.2635 PHP/5.2.6
    X-Powered-By: PHP/5.2.6
    Content-Type: text/html

## Additional testing

Additional testing revealed page redirection would occur only when the Referer field was included in the HTTP request header, and only when the field value contained certain phrases. Two phrases found to trigger the hijack include `google` and `yahoo` (case insensitive) while other likely phrases such as `bing`, `msn`, `aol` and `ask` did not.

**Note:** I am I not currently aware if Yahoo is susceptible this particular brand of page hijacking. If you've seen it on Yahoo or know of any examples, please comment and let us know.
{: .notice--info}

Testing for the presence of phrases `Googlebot`, `googlebot` or `google` and `bot` (separated) all resulted in the 302 redirects, which leaves some of the following possibilities:

- The 302 redirect (likely of the .htaccess kind found in the [Antivirus 2009 approach][10]) was turned on after the page was indexed.
- The web crawler that originally accessed the page did not pass the phrases `google` or `yahoo` in the Referer [*sic*] field in the HTTP request header.

Monitoring over a several day period landed the browser on some of the following domains, each with their own similar virus scan or some derivation:

- wwwantispyware10.com
- topantimalwarescan7.com
- top-antispyware-scan8.com
- computer-protection11.com
- webprosecurity.com
- guardpconline.com

# Additional examples

Here are additional examples of scareware sites I've run across in the wild:

- http://questions.baiduwiki.com/questions/30369361/how-to-manually-set-the-device-orientation-when-app-deployment-info-portrait-is

I'll try and keep a running list here in hopes of increasing visibility of affected sites. I've chosen not to hyperlink to these resources as a courtesy.

# The Chrome 3.0 Browser Button Issue

The Chrome button issues are happening on and off. Some of the changes in behavior I have witnessed using Chrome v3.0.195.27 (Win):

- Browser unable to navigate backwards in history;
- Navigation backwards in history only after several tries; and
- Tab hangs and cannot be closed, and Windows clocks, until the pop-up notification window is closed.

 [1]: http://en.wikipedia.org/wiki/Page_hijacking
 [2]: http://en.wikipedia.org/wiki/Social_engineering_(security)
 [3]: http://en.wikipedia.org/wiki/HTTP_302
 [4]: /assets/carne.php
 [5]: http://woodstockfolkmusic.com/
 [6]: http://en.wikipedia.org/wiki/Keyword_stuffing
 [7]: http://en.wikipedia.org/wiki/Spamdexing
 [8]: http://en.wikipedia.org/wiki/Cloaking
 [9]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
 [10]: http://blog.javacoolsoftware.com/2008/12/anti-virus-2009-search-engine-redirect-hacks/

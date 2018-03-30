---
title: Web Development and Debugging Tools
author: Josh Habdas
date: 2009-01-10
modified: 2016-09-16
categories:
  - reference
tags:
  - browser compatibility
  - css
  - debugging
  - html
  - http
  - javascript
  - proxies
---
Following is a  list of cross-browser/platform web development and debugging tools useful for client-side developers. Depending on the application, one or all of these tools can be valuable in completing work on a website front-end.

**Note 2016-09-16:** This information was originally compiled in 2009. While not all of it is still relevant some of it may still be useful. Proceed with caution until I have a chance to reboot this list. You may also be interested in my list of [Awesome React Boilerplates](/awesome-react-boilerplates).
{: .notice--info}

<!--more-->

## Tools for Firefox and Chrome

Build for standards.

*   [Chrome][2] includes a powerful set of development tools out of the box, including remote debugging.
*   [Firebug][3] integrates with Firefox to put a wealth of development tools at your fingertips while you browse.
*   [HTML Validator][4] is a Mozilla extension that adds HTML validation inside Firefox and Mozilla.
*   [Web Developer][5] adds a menu and a toolbar with various web developer tools.
*   [IE Tab][6], an extension from Taiwan, embeds Internet Explorer in a Mozilla/Firefox tab. Handy but doesn&#8217;t work on a Mac.
*   [ColorZilla][7] provides Advanced Eyedropper, Color Picker, Palette Viewer and other colorful goodies for your Firefox.
*   [YSlow][8] analyzes web pages and tells you why they&#8217;re slow.
*   [HttpFox][9] monitors and analyzes all incoming and outgoing HTTP traffic between the browser and the web servers.
*   [MultiFirefox ][10]is a small launcher utility that allows you to run multiple versions of Firefox side-by-side (Mac only).
*   [User Agent Switcher][11] to spoof user agent strings for browser support testing.
*   [Fangs][12] renders a text version of a web page similar to how a screen reader would read it.
*   [Google Toolbar][13] to visualize Page Rank.

## Tools for Internet Explorer

Ensure application compatibility.

*   [Internet Explorer Developer Toolbar][14] provides a variety of tools for quickly creating, understanding, and troubleshooting Web pages. It also allows for the inspection of the MSIE-specific CSS passed in through the use of [Conditional Comments][15].
*   A look-alike is just that, not the real thing. Here are the [Internet Explorer Application Compatibility VPC Images,][16] made available by Microsoft for use in testing browser compatibility with MSIE.
*   [HttpWatch][17] is a tool for monitoring HTTP traffic in IE.

## Performance & Testing

Polish it to a bright shine.

*   [JSLint][18] helps in checking how bad your script sucks. Just copy/paste and pray.
*   [WebPagetest][19] will help access how slow your site is once it&#8217;s built.
*   [Validator.nu (X)HTML5 Validator][23] validates HTML5.
*   [HTML5 outliner][20] provides an easy to use document outline.
*   [Selenium IDE][21] for automated testing, helping unlock the potential for test-driven development in the UI layer.
*   [Paros][22] is a simplistic proxy tool that allows you to trap raw HTTP request and response headers for analysis and testing.

 [1]: http://habdas.org/web-ui-engineering-resources/
 [2]: http://www.google.com/chrome/
 [3]: http://getfirebug.com/
 [4]: https://addons.mozilla.org/en-US/firefox/addon/html-validator/
 [5]: https://addons.mozilla.org/en-US/firefox/addon/web-developer/
 [6]: https://addons.mozilla.org/en-US/firefox/addon/1419
 [7]: http://www.colorzilla.com/
 [8]: http://developer.yahoo.com/yslow/
 [9]: https://addons.mozilla.org/en-US/firefox/addon/6647
 [10]: http://davemartorana.com/multifirefox/
 [11]: https://addons.mozilla.org/en-US/firefox/addon/59
 [12]: https://addons.mozilla.org/en-US/firefox/addon/fangs-screen-reader-emulator/
 [13]: http://www.google.com/toolbar/
 [14]: http://www.microsoft.com/downloads/en/details.aspx?FamilyID=95e06cbe-4940-4218-b75d-b8856fced535
 [15]: http://msdn.microsoft.com/en-us/library/ms537512.aspx
 [16]: http://www.microsoft.com/downloads/details.aspx?FamilyID=21eabb90-958f-4b64-b5f1-73d0a413c8ef&displaylang=en
 [17]: http://www.httpwatch.com/
 [18]: http://www.jslint.com/
 [19]: http://www.webpagetest.org/
 [20]: http://gsnedders.html5.org/outliner/
 [21]: http://seleniumhq.org/projects/ide/
 [22]: http://www.parosproxy.org/
 [23]: http://html5.validator.nu/

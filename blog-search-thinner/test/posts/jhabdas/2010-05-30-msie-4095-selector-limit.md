---
title: MSIE 4095 Selector Limit
author: Josh Habdas
date: 2010-05-30
categories:
  - reference
tags:
  - browser compatibility
  - CSS
  - debugging
---
Web applications concatenate CSS files to improve performance, which can result in large numbers of style rules in a single file. Enter the <a href="http://marc.baffl.co.uk/browser_bugs/css-selector-limit/" class="broken_link">4095 selector limitation for IE browsers</a>. An IE bug whereby the browser will only apply style for the first 4095 selectors declared per file. Impacted browsers include IE6, IE7, IE8 and IE9.  

<!--more-->

## Identification

Look for IE-only display issues (outside the norm) when CSS files contain many style rules. Rules near the bottom of the stylesheet will not be applied. The issue can be confirmed with the IE dev toolbar. To do so use dev toolbar to save off the CSS file downloaded from the web server, and then scroll to the bottom of the CSS tab in the toolbar (assumes IE8 dev tools). Compare the last style rule displayed in the tab with the last rule in the actual file itself. If they do not match, and the CSS is valid, the limit has been reached.

## Solution

Reduce the number of CSS selectors per file to a number less than 4096. Several approaches for doing so include:

*   Refactoring existing CSS
*   Splitting the CSS payload into multiple files
*   Reevaluating current browser support strategy (wink, wink)

If the stylesheet under scrutiny contains IE-only hacks interspersed with standards compliant CSS, consider moving the hacks into a separate file and using [Conditional Comments][1] to pull them in. Otherwise, the best option may be to split the CSS payload into multiple files–resulting in an extra HTTP request for all browsers, not just IE. Reevaluating browser support is another option, but probably not feasible for large-scale applications.

Regardless of which approach is taken, something will need to be done for IE once the per-file limit is reached. Though 4095 selectors ought to be enough for anybody…

 [1]: http://www.quirksmode.org/css/condcom.html

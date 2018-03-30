---
title: On touch events and mobile web app usability
author: Josh Habdas
date: 2012-04-14
categories:
  - opinion
tags:
  - mobile
  - progressive enhancement
  - javascript
  - responsive
  - usability
---
I recently heard a talk from Peter-Paul Koch of [QuirksMode][1] on the touch events in mobile. During the presentation PPK gave us a great sound bite to use when dealing with the *300ms delay* many touch devices use for capturing double-tap (zoom) events, which he called "stick with click". Under "stick with click" developers are discouraged from hijacking `ontouchstart` in an attempt to make click events occur without a noticeable delay. Though a good rule of thumb, I view it as more of a best practice rather than a hard-and-fast rule. And here's why…

<!--more-->

When considering perceived latency in a UI, it's logical to first think about the the long-standing guidelines on [Response Time Limits][2] by usability guru Jakob Nielsen, two of which are applicable with regard to two-tap zooming:

**0.1 second** is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.
<br><br>
**1.0 second** is about the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data.
{: .notice--success}

Three-hundred millis is three times greater than the ideal response time, which, in some user interfaces, could be too slow and cause frustration for users. The Google Voice mobile webapp ran into a similar challenge over a year ago and crafted a [Fast Button workaround][3] using some creative event handling a method they called "busting ghost clicks", which allows click handlers to be used in conjunction with touch events.

A caveat to rejigging the event handling, however, is that zooming should be disabled entirely. If it is not, double-taps on the so-called Fast Button would not behave as mobile web users have come to expect, leading to a less awesome user experience. And though the Google workaround compensates for buttons, working with more complex controls and widgets or multi-touch gestures is likely to dredge up some painful and time-devouring edge cases to handle.

Nevertheless, recent advocacy for [Mobile First][4] (thanks Luke W) and [Responsive Web Design][5] seem to play well with the Fast Button workaround by making it possible to build a mobile web application that with a display adjusts intelligently to the viewport and with which zooming a page is not required.

In summary, the 300ms delay used in mobile devices for double-tap detection is three times greater than the ideal 100ms (or shorter!) delay in a UI and, though Google has a nice workaround it should only be used with caution, and only in mobile web apps that do not allow page zooming. And when you find yourself doing a lot of event handling on your own and wonder if there's a better way, consider "stick with click".

 [1]: http://quirksmode.org/
 [2]: http://www.useit.com/papers/responsetime.html
 [3]: http://code.google.com/mobile/articles/fast_buttons.html
 [4]: http://www.abookapart.com/products/mobile-first
 [5]: http://www.alistapart.com/articles/responsive-web-design/

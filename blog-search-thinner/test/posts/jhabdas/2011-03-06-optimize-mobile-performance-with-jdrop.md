---
title: Optimize Mobile Performance with Jdrop
author: Josh Habdas
date: 2011-03-06
categories:
  - reference
tags:
  - mobile
  - webperf
  - debugging
  - programming
---
Last month [Steve Souders announced Jdrop][1], a JSON repository in the cloud. Using Jdrop and Souders' [Mobile Perf bookmarklet][2], developers can send mobile browser data to the cloud for more careful analysis on other devices.

<!--more-->

As a UI developer and fan of Souders' book _Even Faster Web Sites_ I couldn't resist giving Jdrop a try. After setting-up an account and installing the Mobile Perf bookmarklet on my Android 2.3 device I was up and running. During the process I learned two important things:

*   Bookmarklets are helping close the gap between desktop plug-ins and mobile device browsers.
*   Distributed JSON repositories provide a convenient way to visualize data from mobile devices on a remote server.

[Mobile Perf bookmarklet][2] provides a pop-up dialog (right) that provides easy access to other bookmarklets and performance tools, many of which have the ability to send data to [Jdrop][3] for subsequent analysis on another device.

Info that can be sent back to Jdrop include a listing of external page resources, page source and DOM Monster performance analysis. Other tools such as Firebug Lite provide limited features but can be handy for gaining access to the console or inspecting the DOM.

As mobile performance testing and debugging tools become more sophisticated, using bookmarklets to interface with a JSON cloud like Jdrop provides a great way to share mobile browser data between devices. Having these data available in the cloud enables developers to visualize information in more usable ways. But even with these advancements there is still room for improvement. Applications I would like to see developed in the future include remote script debugging, script error monitoring and client-side performance metric logging.

 [1]: http://www.stevesouders.com/blog/2011/02/16/jdrop-json-in-the-cloud/
 [2]: http://stevesouders.com/mobileperf/
 [3]: http://jdrop.org/

 *[JSON]: JavaScript Object Notation

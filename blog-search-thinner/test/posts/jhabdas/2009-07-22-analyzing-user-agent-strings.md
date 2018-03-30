---
title: Analyzing User Agent Strings
author: Josh Habdas
date: 2009-07-22
categories:
  - reference
tags:
  - dom
  - http
  - javascript
  - patterns
  - user agent
---
The user agent string, a piece of data transmitted in the HTTP header during a web request, contains information valuable in determining browser type and often basic system information.

Example user agent string sent from a web browser during an HTTP request:

    Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.89 Safari/532.5

The above example, for instance, provides information such as browser and browser version, user locale (language), OS, system architecture and the layout engine used. When authoring documents for the Web, information from the user agent string can be valuable in determining how best to mark-up documents.

Getting the information is easy.

<!--more-->

## Collecting user agent strings

Two methods for accessing the user agent string include:

1.  From the HTTP request header&#8217;s User-Agent field; and
2.  Using DOM and JavaScript.

#### Reading from the User-Agent field

A benefit of using the HTTP header to gather data is simplicity of design.

HTTP request header showing the User-Agent field (in bold):

    GET / HTTP/1.1
    Host: livehttpheaders.mozdev.org
    <strong>User-Agent:</strong> Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.89 Safari/532.5
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: en-us,en;q=0.5
    Accept-Encoding: gzip,deflate
    Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    Keep-Alive: 300
    Connection: keep-alive

Using the HTTP header the user agent is transmitted directly to the HTTP server on page request, making it possible for servers to output the user agent string to a log file for later analysis. The user agent string alone provides enough information to implement on websites valuable browser support strategies such as [graded browser support][1].

#### User agent retrieval using DOM and JavaScript

Using DOM and JavaScript, on the other hand, add additional development complexity, but provide more detailed and valuable analytic data, in addition to the user agent string alone. Tools like [Urchin][2] (now Google Analytics) utilize JavaScript and the DOM to gather analytic data about visitors.

Bookmark the following link to create a bookmarklet that will retrieve the user agent from a browser: <a onclick="alert(navigator.userAgent); return false;" href="#">javascript:alert(navigator.userAgent)</a>

Regardless of the collection approach used, methods for extracting data from the string remain similar.

## Data extraction methods

Once the user agent string(s) are collected, data extraction may take place. Two methods for reading and extracting information from the user agent string include brute force and pattern recognition:

*   Under the brute force approach the user agent string is compared programmatically to a database of known strings. Though it offers a relatively simple implementation, the brute force approach can be difficult to maintain and becomes increasingly inefficient as comparison data sets grow larger.
*   Thanks to [RFC 2616][3] and preceding RFCs, and de facto standards for formatting user agent strings, another method known as [pattern recognition][4] is possible. Using pattern recognition the user agent string is broken into its component pieces and heuristics applied to gather information. Though more complex to implement than the brute force approach, pattern recognition does not suffer from the same problems in efficiency and maintainability in the long-run.

Due to its drawbacks in the application of extracting data form user agent strings, the brute force approach will not be discussed further in this article.

### <a id="pattern-recognition"></a>Pattern recognition on the user agent string

Check out [Identify User Agent by string format recognition][5] for an example of user agent pattern recognition. Though a little outdated, the article provides additional depth, in addition to some useful programming techniques and lax copyright restrictions.

## User agent spoofing

Impersonating browsers and mobile devices is simple with Firefox. Just download [User Agent Switcher][6] plug-in and put it to the test at [useragentstring.com][7]. See [Web Development and Debugging Tools][8] for a list of tools useful for front end development.

 [1]: http://developer.yahoo.com/yui/articles/gbs/
 [2]: http://en.wikipedia.org/wiki/Urchin_(software)
 [3]: http://www.w3.org/Protocols/rfc2616/rfc2616.html
 [4]: #pattern-recognition
 [5]: http://www.texsoft.it/index.php?c=software&m=sw.php.useragent&l=it
 [6]: https://addons.mozilla.org/en-US/firefox/addon/59
 [7]: https://web.archive.org/web/20171026154543/http://www.useragentstring.com/
 [8]: /useful-web-development-and-debugging-tools/

---
title: "Tame Async JavaScript with ES6"
author: Josh Habdas
date: 2015-04-02 18:33
excerpt: "Tame async JavaScript with ES6 using Generators and Promises"
categories: [coding]
tags: [es6, javascript, patterns]
header:
  overlay_image: lion-515029_1280.jpg
  overlay_filter: 0.5
  caption: "Photo credit: [designerpoint](http://pixabay.com/en/lion-predator-big-cat-safari-515029/)"
---

One of the trickier parts of writing JS for the web is working with async code. Control flow abstractions for handling async JS exist but are commonly overlooked in engineering organizations, which can lead JS projects unknowingly into a labyrinth of [IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)s, through the [pyramid of doom](http://survivejs.com/common_problems/pyramid.html) and directly to [callback hell](http://callbackhell.com/) — making code brittle and prone to breakage.

> Tame async JavaScript with ES6 using Generators and Promises

<!--more-->

Take for example the following method:

```js
function buildLinkObject(url) {
  return async(function* () {
    let res = yield fetch(url);
    let title = /<title[^>]*>(.*?)<\/title>/.exec(res)[1];
    return {url, title}
  })();
}
```

A `function` is defined called `buildLinkObject`, which `return`s a _Promise_ via a call to `async` ([described in detail here](https://www.promisejs.org/generators/)). Notice how the two assignments within the generator function rely on both synchronyous and asynchronyous actions. Once the response of `fetch` is assigned to `res`, the Generator function will then assign `title` and return an object, no callbacks necessary.

Use of `async` also allows us to await the results of multiple simultaneous requests like so:

``` js
let links = [];
let deferreds = [];
let urls = ["http://www.habdas.org", "http://habd.as/"];
urls.forEach((url) => {
  deferreds.push(buildLinkObject(url));
});
deferreds.forEach((deferred, index) => {
  deferred.then((res) => {
    links[index] = res;
  }
}
Promise.all(deferreds).then(() => {
  console.log(JSON.stringify(links, null, 2));
}
```

Resulting in JSON like the following logged to the console:

``` json
[
  {
    "url": "http://www.habdas.org",
    "title": "habdas.org"
  },
  {
    "url": "http://habd.as",
    "title": "habd.as"
  }
]
```

The above leverages ES6 [Generators](http://wiki.ecmascript.org/doku.php?id=harmony:generators), [Promises](http://caniuse.com/#search=promises), [Destructuring assignments](http://wiki.ecmascript.org/doku.php?id=harmony:destructuring) and the [Fetch API](https://fetch.spec.whatwg.org/#fetch-api) to perform Ajax operations in a maintainable way without introducing too much complexity. Pretty pithy when compared with ES5. And though [async functions](http://wiki.ecmascript.org/doku.php?id=strawman:async_functions) should simplify things when ES7 lands, use the above to tame async JavaScript with ES6.

Need a working example? Check out the [chat parser](https://github.com/jhabdas/xanthippe/) I created using ES6 and Babel. Looking for more depth? Check out [Synchronous Asynchronous JavaScript with ES6 Generators](http://chrisbuttery.com/articles/synchronous-asynchronous-javascript-with-es6-generators/) by Chris Buttery.

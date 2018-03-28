const fs = require('fs');
import test from 'ava'
import * as lib from '../../lib/index'
import * as util from './testUtils'

test('removes code from posts', (t) => {
  var goodPaths = ["./test/posts/2016-12-22-powershell-error-handling.md"]
  var posts = goodPaths.map(x => {
    return {
      path: x,
      text: fs.readFileSync(x, "utf-8")
    }
  });

  var applyTestFuncs = util.applyTestFuncs([
    lib.transform.markdownToHtml,
    lib.remove.preTagsFromHtml,
    lib.transform.htmlToText
  ]
    //, true // printout loads
  );

  var results = posts.map(x => applyTestFuncs(x))

  results.forEach(x => {
    t.truthy(x.text.indexOf("Write-Error") === -1);
  })
});

test('removes javascript code from markdown', (t) => {
  //   var code = `
  // hello world code

  // ~~~javascript
  // var thing = 0;
  // var thing2 = 0;
  // console.log("something")
  // ~~~
  //   `
  //   var result = lib.fromMarkdown({ text: code });

  //   var doesntContainHighlight = result.text.indexOf("thing2") === -1;
  //   t.truthy(doesntContainHighlight);
});

test('removes unspecified code from markdown', (t) => {
  //   var code = `
  // hello world code

  // ~~~
  // var thing = 0;
  // var thing2 = 0;
  // console.log("something")
  // ~~~
  //   `
  //   var result = lib.fromMarkdown({ text: code });

  //   var doesntContainHighlight = result.text.indexOf("thing2") === -1;
  //   t.truthy(doesntContainHighlight);
});

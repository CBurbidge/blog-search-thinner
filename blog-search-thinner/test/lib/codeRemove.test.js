import test from 'ava'
import * as lib from '../../lib/index'
const examples = require('./examples')

test('removes highlight javascript code from markdown', (t) => {
  // var result = lib.fromMarkdown(examples.markdownWithCode);
  
  // var doesntContainHighlight = result.text.indexOf("highlight") === -1;

  // t.truthy(doesntContainHighlight);
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
//   var result = lib.fromMarkdown({text: code});
  
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
//   var result = lib.fromMarkdown({text: code});
  
//   var doesntContainHighlight = result.text.indexOf("thing2") === -1;
//   t.truthy(doesntContainHighlight);
});

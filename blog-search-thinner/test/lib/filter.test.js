import test from 'ava'
const libFunc = require('../../lib/index')
const testUtils = require('./testUtils')
var lib = libFunc();

var func = x => lib.filter.applyToSplitText(x, [lib.filter.outDuplicates, lib.filter.outStopWords])

test('removes duplicate words from markdown ignoring punctuation', (t) => {
  var filteredPost = func({
    text: `
  ### some title
  she sells sea. 
  shells on the sea, shore
  `});

  t.is(testUtils.occurrences(filteredPost.text, "sea"), 1);

});

test('removes duplicate words from markdown', (t) => {
  var filteredPost = func({
    text: `
  ### some title
  she sells sea shells on the sea shore
  `});

  t.is(testUtils.occurrences(filteredPost.text, "sea"), 1);

});

test('removes common stop words from markdown', (t) => {
  var filteredPost = func({
    text: `
----
title: some great title
----
  
### some title
she sells sea shells on the sea shore
a about aboard
  `});

  t.is(testUtils.occurrences(filteredPost.text, "about"), 0);
  t.is(testUtils.occurrences(filteredPost.text, "she"), 1);

});


import test from 'ava'
import * as lib from '../../lib/index'
const examples = require('./examples')
const testUtils = require('./testUtils')

test('removes duplicate words from markdown', (t) => {
  var filteredPost = lib.filter.text({
    text: `
  ### some title
  she sells sea shells on the sea shore
  `});

  t.is(testUtils.occurrences(filteredPost.text, "sea"), 1);

});

test('removes common stop words from markdown', (t) => {
  var filteredPost = lib.filter.text({
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


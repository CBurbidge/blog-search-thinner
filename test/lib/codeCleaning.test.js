import test from 'ava'
import * as lib from '../../lib/index'
const examples = require('./examples')
const testUtils = require('./testUtils')

test('removes duplicate mixed case words from markdown', (t) => {
  var result = lib.fromMarkdown(`
  ### some title
  she sells sea shells on the sea shore
  SURE She SElls shellS
  `);
  
  t.is(testUtils.occurrences(result.text, "sells"), 1);

});

test('removes common stop words from markdown', (t) => {
  var result = lib.fromMarkdown(`
----
title: some great title
----
  
### some title
she sells sea shells on the sea shore
a about aboard
  `);
  console.log(result.text)
  
  t.is(testUtils.occurrences(result.text, "about"), 0);
  t.is(testUtils.occurrences(result.text, "she"), 1);

});


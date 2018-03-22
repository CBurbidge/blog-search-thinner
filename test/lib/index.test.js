import test from 'ava'
import * as lib from '../../lib/index'
const examples = require('./examples')

test('removes highlight javascript code from markdown', (t) => {
  var result = lib.fromMarkdown(examples.markdownWithCode);
  
  var doesntContainHighlight = result.indexOf("{% highlight") === -1;

  t.truthy(doesntContainHighlight);
})

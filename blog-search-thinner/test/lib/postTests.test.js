const fs = require('fs');
import test from 'ava'
const libFunc = require('../../lib/index')
import * as util from './testUtils'
const path = require('path');

test('removes code from posts', t => {
  var lib = libFunc()
  var filePath = path.resolve(__dirname + "/../posts/2016-12-22-powershell-error-handling.md")
  var x = lib.fromMarkdownFile(filePath)
  

  t.truthy(x.text.indexOf("Write-Error") === -1);
  
  t.truthy(x.frontmatter.layout === "post");
  t.truthy(x.frontmatter.issue === 11);
  t.truthy(x.frontmatter.tags[0] === "powershell");
  
  t.truthy(util.occurrences(x.text, "powershell") === 1);
  
});


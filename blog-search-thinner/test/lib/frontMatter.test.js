import test from 'ava'
const libFunc = require('../../lib/index')
var lib = libFunc();

test('parses frontmatter for markdown', (t) => {
  var result = lib.transform.frontmatterToPostData({
    text: `---
title: some-title
tags:
- tag1
- tag2
blurb: great stuff
---

  some post words which are great
  `});

  t.truthy(result.frontmatter.title, "some-title");
  t.truthy(result.frontmatter.tags.length, 2);
  t.truthy(result.frontmatter.tags[0], "tag1");
  t.truthy(result.frontmatter.tags[1], "tag2");
});


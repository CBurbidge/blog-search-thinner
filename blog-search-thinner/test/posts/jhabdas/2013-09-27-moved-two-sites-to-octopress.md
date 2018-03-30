---
title: Moved two sites to Octopress
author: Josh Habdas
date: 2013-09-27
categories:
  - reference
tags:
  - jekyll
  - octopress
  - travis-ci
  - github
  - tumblr
  - metadata
  - blogging
---

## Learn how to migrate a site

A few weeks ago I was planning to undertake a survey of front-end tools but got sidetracked with an overwhelming desire to switch to a CMS-free blogging site at work and home, and so [techblog.trunkclub.com](http://techblog.trunkclub.com) and [habdas.org](http://www.habdas.org) have now been migrated to Octopress, a hackers blog, which, [when custom tailored](http://slid.es/jhabdas/trunkclub-techblog), allows for free hosting on [GitHub Pages](http://pages.github.com/), simple online editing with [Prose.io](http://prose.io) and continuous integration with [Travis-CI](https://travis-ci.org/jhabdas/jhabdas.github.io).

If you're having problems visualizing, just check out the [system diagram](http://www.gliffy.com/go/publish/4845414).

<!--more-->

## Handling taxonomy

Migrating to Octopress from sites where tags were used adds the need to carry over more than just categoric taxonomic data. Export tools like the [WordPress to Jekyll Exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) should include migrated `tags:` in the front matter section of the generated `md` or `markdown` files in `/source/_posts/`. But using them requires extra work.

> By default, Octopress 2.0 does not include the facilities to handle tags.

To add support for tags to an Octopress install, integrate the [octopress-tag-pages plugin](https://github.com/robbyedwards/octopress-tag-pages) including tag pages, tag feed, enhanced archives page and future support for tag clouds.

## Migration takeaways

Learning to use and moving to Octopress was a lot of fun, but there were some learnings along the way:

- When using a migration tool, verify markdown generation quality and consider adjusting complexity of source code to aid the markdown conversion process.
- Ensure the taxonomy you think you're getting is supported by your blog, and add support for tagging as necessary.

## What's next

Now that the two blogs are migrated it's time to get back to the front-end tech survey. That is, until another distraction surfaces.

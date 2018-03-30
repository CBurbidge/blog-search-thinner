---
title: "Hugo: The Best JAMstack Site Generator"
date: 2016-09-19T10:36:32-05:00
modified: 2017-04-09T14:42:00+08:00
author: Josh Habdas
excerpt: In a sea of choice, which static site generator will you choose?
categories:
  - opinion
tags:
  - hugo
  - static websites
  - static site generators
  - jamstack
  - jekyll
  - hexo
header:
    overlay_image: photo-1457203112846-f9f76625f7c4_1280.jpg
    overlay_filter: 0.5
    teaser: photo-1457203112846-f9f76625f7c4_512.jpg
redirect_from:
  - /choose-hugo-over-jekyll/
---

Many are familiar with the idea of static site generators like Jekyll and <a target="intro" href="https://learn.cloudcannon.com/jekyll/why-use-a-static-site-generator/">why they should use them</a>. But Jekyll isn't the only <abbr title="Static Site Generator">SSG</abbr> out there. In fact, there are literally <a target="intro" href="https://staticsitegenerators.net/" rel="nofollow">hundreds of SSGs</a> guaranteed to give you analysis paralysis. With so many to choose from it can be difficult to decide which to use.

After trying a number of static site generators myself over the years, **the one I'd bet the farm on is [Hugo](https://gohugo.io)**. Here're a few of the reasons why I feel Hugo rocks the socks off the competition:

- **It has no dependencies.** Once you get a hold of the Hugo binary you're ready to roll. Many other static site generators require a complex environment with dependencies to run. For Jekyll, that means Ruby and RubyGems. For Hexo, Node and NPM. For Hugo, all you need is Hugo.
- **It's easy to set-up.** If you're a macOS user, simply `brew install hugo` and you can instantly start building a new website with the `hugo new site` command. Hugo pre-built binaries are available for other platforms as well, including as FreeBSD, Windows and Linux.
- **It's _extremely_ fast.** Unlike Jekyll or Hexo, which [can](https://mademistakes.com/articles/using-jekyll-2016/#posts-for-all-the-things) [take](https://github.com/hexojs/hexo/pull/550) hours to compile a large site, Hugo can generate [5,000 webpages in under 10 seconds](https://youtu.be/CdiDYZ51a2o).

  **Update 10 Feb 2017:** As of Hugo <code>v0.17</code>, when multilingual sites were introduced, Hugo site generation speed has---wait for it---doubled!
  {: .notice--info}

- **It's very flexible.** Unlike Jekyll, which was blog-focused until [Collections](https://jekyllrb.com/docs/collections/) were bolted on version 3 (albeit, in a very well thought-out way), Hugo was built from the ground up with freedom of content structure in mind. Use it to create a personal blog or even <a target="_blank" rel="noreferrer nofollow noopener" href="https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/">the next Smashing Magazine.</a>
- **It's easy to get started.** To prove this last point I decided to create a theme for Hugo called [After Dark](https://comfusion.github.io/after-dark/) (pictured below). The initial theme creation process took about two days, and making it reminded me of the joys of coding for the Web circa 1995---back when flying toasters were all the rage.

![After Dark theme for Hugo screenshots](https://raw.githubusercontent.com/comfusion/after-dark/master/images/minimal-mac.png "After Dark running on a MacBook and iPhone")

There are **some downsides** to Hugo, don't get me wrong. For starters, Hugo, which is built using GoLang, hasn't been around as long and, as a result, doesn't not have as large of a community around it as more established SSGs like Jekyll. Additionally, you may find a few holes in Hugo's documentation--which is otherwise pretty great.

**Update 30 Mar 2017:** Hugo is currently under way of rolling out an entirely new documentation site. The last one was good. The next one will be even better.
{: .notice--info}

So what are you waiting for? **[Give Hugo a try](/zero-to-http-2-aws-hugo/)**. And, while you're at it, check out the [After Dark theme](https://comfusion.github.io/after-dark/) and for a [culture jamming](https://en.wikipedia.org/wiki/Vaporwave) take on content publishing in the new millennium.

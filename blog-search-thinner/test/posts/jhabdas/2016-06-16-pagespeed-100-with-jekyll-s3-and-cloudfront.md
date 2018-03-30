---
title: PageSpeed 100 with Jekyll, S3 and CloudFront
author: Josh Habdas
date: 2016-06-16T11:20:07-05:00
modified: 2016-10-24
excerpt: Perfect your Google PageSpeed with AWS S3 and CloudFront website hosting.
categories:
  - tutorials
tags:
  - mobile
  - performance
  - jekyll
  - blog
header:
  overlay_image: london-telephone-booth-6618_1024.jpg
  overlay_filter: 0.5
  teaser: london-telephone-booth-6618_512.jpg
---
{% include toc %}

After moving this website from WordPress to [Jekyll](http://jekyllrb.com/) in 2013 I've [written](/moved-two-sites-to-octopress/) [enthusiastically](/host-images-on-s3-with-octopress/) [about](/turbocharge-your-octopress-blog/) [Jekyll](/simple-websites-jekyll-docker/). But it wasn't until recently that I was able to hit the elusive [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) **score of 100** for both desktop and mobile performance. Here's how I got there using Jekyll with S3 and CloudFront, and how you can too.

## An Evolution of Speed

When I started blogging back in 2008 the top two content management platforms by mindshare were probably Movable Type and WordPress. I went with WordPress as it was clearly going somewhere and it served me well for a few years. But by 2012 I was getting frustrated with WordPress, managing hosting, making SQL database back-ups, constantly optimizing performance after some plug-in would invariably do something bad, not to mention having to stay on top of a bevy of seemingly never-ending WordPress plug-in updates.

In late 2011 Amazon CTO Werner Vogels was writing about [Jekyll & Amazon S3](http://www.allthingsdistributed.com/2011/08/Jekyll-amazon-s3.html), and CMS-free static websites like Jekyll started to rise in popularity and gain more widespread adoption.

After switching from WordPress to Jekyll here's roughly what my PageSpeed has looked like over time:

| Year | PageSpeed | Platform  | Hosting (CDN)             |
|------|-----------|-----------|---------------------------|
| 2009 | 72        | WordPress | BlueHost (None)           |
| 2013 | 85        | Jekyll    | GitHub Pages (None[^1])   |
| 2014 | 88        | Jekyll    | DigitalOcean (CloudFlare) |
| 2015 | 92        | Jekyll    | DigitalOcean (CloudFlare) |
| 2016 | 100       | Jekyll    | Amazon S3 (CloudFront)    |

As you can see Jekyll is holding its weight for my relatively small site, and page speed has been increasing over time (and understanding). And while build times [start to suffer](https://mademistakes.com/articles/using-jekyll-2016/) as sites reach 1000 pages, it's possible to BYO asset pipeline much like what some are [doing with Hugo](https://github.com/adrinux/web-starter-hugo) (which is super fast, by the way).

## Hitting PageSpeed 100

Okay, enough with the rambling. Want to hit a page speed of 100? Here's how using Jekyll with S3 and CloudFront.

### Install Jekyll

I'm going to assume you can figure out how to [install Jekyll](http://jekyllrb.com/docs/installation/). There are [hundreds of](http://jekyllthemes.org/) [free themes](http://jekyll.tips/templates/) available. But two I recommend are [Lanyon](http://lanyon.getpoole.com/) by Mark Otto and [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) by Michael Rose. If you're coming from WordPress or another blogging platform you can migrate your content to Jekyll using one of the [many available importers](https://import.jekyllrb.com/docs/home/).

### Add the Jekyll Assets gem

In order to get a perfect page speed we're going to use a plug-in maintained by the Jekyll core team called [Jekyll Assets](https://github.com/jekyll/jekyll-assets). Add it to your `Gemfile` easily with [`gemrat`](https://github.com/DruRly/gemrat). If you don't have a Gemfile yet, go ahead and `touch Gemfile` before installing.

While you're in there also install the following gems used by Jekyll Assets:

    gemrat jekyll uglifier sass autoprefixer-rails

**Note:** If you're using Less, ES2015, FontAwesome, Bootstrap or wanting to process images with Image Magick see Jekyll Assets plug-in docs for more info.
{: .notice--info}

Once installed update or add `jekyll-assets` to the list of `gems: [jekyll-assets, ...]` in your Jekyll site `_.config.yml` and, elsewhere in the config file, set it up like so:

``` yaml
# Jekyll Assets
# - https://jekyll.github.io/jekyll-assets/
assets:
  sources:
    - _assets/css
    - _assets/js
  autoprefixer:
    browsers: ["last 2 versions","> 5%","IE 9"]
```

**Note:** Configure the above sources to point to your files, or simply move your files into a [default source location](https://github.com/jekyll/jekyll-assets#configuration) so it's clearer they're being operated on by a plug-in.
{: .notice--info}

### Concatenate and output fingerprinted JS

For externally loaded files, Jekyll Assets will automatically handle filename digesting (a.k.a. fingerprinting), necessary to allow CDN cache-busting, and code uglification when built with the `JEKYLL_ENV=production` environment flag. But it needs to know a little about how your JS files are structured in order to be most effective.

Depending on your site structure you'll likely either want to create an `app.js` or both `app.js` and `vendor.js`. I tend to prefer the later as vendor code changes less often and, therefore, can be cached more aggressively in the browser (which we'll get to in a bit).

To concatenate files simply `require` them from a Jekyll Assets _source_ configured earlier:

```
//= require vendor/jquery/jquery-1.12.1.min.js
//= require plugins/jquery.fitvids.js
//= require plugins/jquery.greedy-navigation.js
//= require plugins/jquery.magnific-popup.js
//= require plugins/jquery.smooth-scroll.min.js
//= require plugins/stickyfill.min.js
//= require vendor/anchor.js
//= require vendor/particles.min.js
```

Assuming the above was the entire contents of `vendor.js`, when the build runs, the contents of the required files will be concatenated into a single file and can added to the generated page using the Jekyll Assets `js` or `javascript` tags.

Here's an example showing two tags, one of which is loaded asynchronously:

```liquid
{{ "{% js vendor " }}%}
{{ "{% js app async " }}%}
```

**Tip:** Include scripts directly above (or very near) the `BODY` closing tag. Ideally both of them would load `async`, but it's not strictly necessary for a perfect page speed and comes with a [set of complexities](http://www.stevesouders.com/blog/2008/12/27/coupling-async-scripts/) we can ignore for now by not coupling them (or simply using a single file like `app.js`).
{: .notice--info}

Besides that make sure you're not using any blocking `script` tags (those without `async` or `defer` attributes set) elsewhere in the document and you should be all set. Try it out with the following command:

    JEKYLL_ENV=production bundle exec jekyll serve --no-watch

**Tip:** Add frequently run commands to a `Rakefile` or other script so they can be executed more easily. For example, the above can be run simply by typing `rake serve:prod` using [my Rakefile](https://github.com/jhabdas/habd.as/blob/620a7252ba3faed613d6ab39c1297ac248318768/Rakefile.rb#L5-L20).
{: .notice--info}

If it worked you'll see fingerprinted files like the following in `_site/assets/` following the build:

    vendor-78aff70ee05fbca6ac66ad56fe36d0a13f5803a1427eb3b55e583efcfd1cd96b.js
    app-7f3d371e86e2669a4a7b472f06990b29551f3c2929d38b1bbf5f7f0e30e315ce.js

And the generated HTML to should link to the fingerprinted file(s).

Later, when we set-up S3 and CloudFront, these file names allow us to aggressively cache the files at the browser to prevent re-downloading unless the file contents change. But first we need to handle the CSS.

### Split out critical path CSS

CSS is generally included via a `<link>` in the document head, which is good for separation of content from style, but bad for site performance as it requires a blocking HTTP request which slows document time-to-interactive.

Critical Path CSS is commonly used to refer to the CSS responsible for rendering the visible content of a webpage when it first loads. Oftentimes what's required for first render is only a fraction of the CSS sent to a browser before a typical page load. As a result, there's a performance gain by inlining critical CSS into a `<style>` tag in the document `HEAD` and loading the rest asynchronously.

If you're using Sass or Less separation should be straight-forward. Create a `critical.scss|less` file and `@import` only the styles necessary to display what appears when page first renders.

With Jekyll Assets we can output our critical path CSS (or all of the it, if there's not too much) like so:

``` liquid
<style>
  {{ "{% asset_source critical.css " }}%}
</style>
```

**Note:** It's also possible to use the [`scssify`](cheat.jekyll.tips) liquid filter to [achieve a similar result](http://www.kevinsweet.com/inline-scss-jekyll-github-pages) but I found the technique to [cause issues](https://github.com/penibelst/jekyll-compress-html/issues/78) when used with the popular `jekyll-compress-html` and it feels wonky moving Sass files to the `_includes` directory.
{: .notice--info}

### Lazy-load remaining CSS

If you properly separated your critical path CSS you can load the rest asynchronously--which helps prevent scroll jank as the user scroll immediately after a page loads. To do so I recommend doing one or both of:

- Using [`rel="preload"` link type](https://w3c.github.io/preload/) (W3C draft at time of writing); and,
- Loading the CSS using a JS loader like [loadCSS](https://github.com/filamentgroup/loadCSS).

Here's how to use both at the same time for non-critical path CSS:

``` liquid
<script>
  {{ "{% asset_source vendor/loadCSS.js " }}%}
  loadCSS("{{ "{% asset_path noncritical.css " }}%}")
</script>
<noscript><link href="{{ "{% asset_path noncritical.css " }}%}" rel="preload" as="style"></noscript>
```

**Tip:** If you don't get your critical path CSS right you (and your users) may notice odd display behavior when the page loads non-critical styles, so be sure to test this carefully to ensure a good UX.
{: .notice--info}

### Optimize images

There are a lot of posts on this topic so I won't go in depth here. If your site is heavy on image content you're going to want responsive images. And if that's the case I agree with [Michael Rose](https://mademistakes.com/articles/using-jekyll-2016/) ([and others](http://blog.cloudfour.com/the-real-conflict-behind-picture-and-srcset/)) using `srcset` is the correct approach for creating responsive images unless you need to incorporate _art direction_, in which case you should use the HTML 5 `picture` element.

With Jekyll plug-ins, responsive images using `srcset` can be created by  [`jekyll-responsive-image`](https://github.com/wildlyinaccurate/jekyll-responsive-image) while `picture` elements can be created using [`jekyll-picture-tag`](https://github.com/robwierzbowski/jekyll-picture-tag).

Identify large images by navigating to the location where you're storing images in your project and then simply `ls -al` and look for large file sizes. Then use GiMP (`brew cask install gimp` if using [Homebrew](http://brew.sh/) on OS X) and [`imagemin`](https://github.com/imagemin/imagemin) to make adjustments as you see fit.

### Dealing with web fonts

This is a tricky topic as web fonts are commonly used to style content used on first page render and almost always require a separate HTTP request---which hurts page speed. However, you can apply a technique similar to inline CSS using data URIs with [Inline Web Fonts](/turbocharge-your-octopress-blog/#inline-web-fonts) if your your font stack requires use of a web font.

### Iterate on speed

Rather than looking for all the things you _think_ your site needs in perfecting pagespeed you're better of testing your way there--especially if you tend to get distracted by shiny things. You can do so from your local environment (read: you don't have to deploy to another environment) using Ngrok.

Install Ngrok (`brew cask install ngrok` for Homebrew users on OS X) and do the following to expose your website to web traffic to the outside world.

1. Start Jekyll with the production flag:

    `JEKYLL_ENV=production bundle exec jekyll serve --no-watch`

1. In a new tab, or with Jekyll in a background process, run:

    `ngrok http 4000`

Ngrok will give you a externally facing domain (e.g. [https://b1aa30c8.ngrok.io]) you can plug into [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) so you can test directly against your dev environment without having to wait for code deployments.

**Tip:** Here's an [example Gulp task](https://github.com/google/web-starter-kit/blob/20eb47852b3d1c2f301dc1fcb5083e992ab359a0/gulpfile.babel.js#L212-L221) that'll run PageSpeed from CLI and can be scripted depending on your needs.
{: .notice--info}

### Install the S3 Website gem

Once you've gotten your PageSpeed Insights down to things like server response time, gzip compression and browser caching you're ready to host the site on S3 with CloudFront and fix the remaining issues.

The [`s3_website`](https://github.com/laurilehmijoki/s3_website) gem makes it ridiculously easy to host your static websites on S3 with CloudFront. Add it to your `Gemfile` with:

    gemrat s3_website

Once installed following the [`s3_website` instructions](https://github.com/laurilehmijoki/s3_website) to create a config file, S3 bucket and connected CloudFront distribution---all from the command line. Here's the [config file I was using](https://github.com/jhabdas/habd.as/blob/e2c38a13c75ec33feb5fe93ee9be4f3003b96017/s3_website.yml) when I hit PageSpeed 100. Notice I'm using the config to specify file extensions to compress, cache control headers and <abbr title="Time to live">TTL</abbr> for the CloudFront distribution.

## Deploy with Travis

Although not necessary to hit lightning fast page speeds it's possible to deploy your website using a continuous integration tool like [Travis-CI](https://travis-ci.org/)---free for public repos. Here's how I build and deploy my site to S3 using `s3_website` and Travis.

First, create a `.travis.yml` file like:

``` yaml
language: ruby
rvm:
  - 2.2
install: bundle install
script: rake deploy
```

The above tells Travis to install dependencies from the `Gemfile` using Bundler, and then builds and deploys the site using the following tasks from the `Rakefile`:

``` ruby
# Usage: rake build
desc "Regenerate files for production"
task :build do
  puts "* Regenerating files for production..."
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

# Usage: rake s3_website
desc "push the contents of ./_site to S3"
task :s3_website do
  puts "* syncing the contents of ./_site to the server"
  system "s3_website push" # use --force with S3 config updates
end

# Usage: rake deploy
task :deploy => ["deploy:prod"]
namespace :deploy do
  desc "Regenerate and sync production files, and notify services of the update"
  task :prod => ["build", "s3_website"] do
  end
end
```

Pretty simple, right? There's really not that much to it.

## Extra credit: Add SSL to your CloudFront distribution

Let's say you want to look boss by using [the physical web](https://medium.com/@urish/exploring-the-physical-web-without-buying-beacons-efae51e36c2e) to broadcast a link to [a slide deck](https://slides.com/jhabdas) for a presentation you're about to give at a Meetup. What better way to impress than to push out a link to the deck over Bluetooth during the meeting.

This can be done with relative ease using Let's Encrypt following [set-up SSL for your CloudFront distribution](https://nparry.com/2015/11/14/letsencrypt-cloudfront-s3.html). Though, as [mentioned by Pat Hawks](https://github.com/laurilehmijoki/s3_website/issues/202#issuecomment-174847183) on the on `s3_website` gem, "It would probably be easier and more convienient to just use AWS Certificate Manager instead."
{: .notice--info}

**Update 2016-10-24:** It is indeed easier to use the Amazon Certificate Manager manager to issue and renew SSL certs. There are a [couple of caveats](https://github.com/laurilehmijoki/s3_website/issues/202#issuecomment-255569108), but overall the process is much more streamlined and natural when hosting your static site on AWS.
{: .notice--info}

## The end is the beginning is the end

In this post I covered the evolution of how I hit PageSpeed 100 and the techniques I used to get there so you can too. This post was inspired by the many Jekyll gods out there for sharing their tips on improving Jekyll performance, and a lot of personal trial and error. If you have any questions, or additional tips to share, please leave a note in the comments section below.

![Screenshot showing PageSpeed 100](/images/ps100_768.png)

[^1]: GitHub Pages CDN [didn't exist until 2014](https://github.com/blog/1715-faster-more-awesome-github-pages).

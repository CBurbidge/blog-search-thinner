---
author: Josh Habdas
title: "Turbocharge Your Octopress Blog"
date: 2015-04-13 21:00
modified: 2017-04-18
excerpt: "Speed up your Octopress or Jekyll blog and rank higher in search with a 92 or better page speed. Learn how to turbocharge your Octopress blog."
categories: [tutorials]
tags: [octopress, blogging, performance, optimization, s3, aws]
header:
  overlay_image: octopus-250101_1280.jpg
  overlay_filter: 0.5
  caption: "Photo credit: [cocoparisienne](http://pixabay.com/en/octopus-suction-cup-suction-cups-250101/)"
---

The need for speed is upon us. Out of the box the speed of an Octopress kinda drags. However, there are a number of things you can do to to speed it up without a complete overhaul.

> Learn how to turbocharge your Octopress blog

**Update 2016-11-22**: You can find the open source Octopress version of this blog circa 2015 [open sourced GitHub](https://github.com/jhabdas/jhabdas.github.io). Once you're ready to move on from GitHub try [hosting Jekyll on DigitalOcean using Docker](/simple-websites-jekyll-docker/). And, once you've nailed that approach, try going for [PageSpeed 100 with S3 and CloudFront](/pagespeed-100-with-jekyll-s3-and-cloudfront/).
{: .notice--info}

<!--more-->

If you followed along with the above and are using something like S3 or [CloudFlare](https://www.cloudflare.com/) to host your images you should be at or near a 90+ rating for both mobile and desktop on PageSpeed Insights.

![Screenshot of 92/100 Google PageSpeed score](//s3.amazonaws.com/images.habdas.org/pagespeed-92.png)

## Optimize JavaScript

The first speed offender on a stock Octopress install is the JavaScript. The stock Octopress configuration does not include an asset pipeline to concatenate and uglify JS files, resulting in a greater number of external script requests. But we can remedy that without too much effort.

After a little digging I found some Rake tasks on [Making Octopress Fast](http://www.eriwen.com/performance/make-octopress-fast/) to handle combining and minifying JS files into a file called `all.js`, eliminating the need to include individual JS files. Incorporate the JS-related tasks into your Rakefile. While you’re at it, add the CSS related tasks as well — we’ll be using them later.

**Note:** The Rake tasks in the above article make use of but don't mention a couple of NPM modules required to function. To get them working install Node or [io.js](https://iojs.org/) and NPM, then install the dependencies:

```sh
npm install -g clean-css
npm install -g uglifyjs
```

Once the Rake tasks are functional you’ll be able to remove a few of the `script` tags from `source/_includes/head.html` as well as any *asides* or *plug-ins* making external script requests.

**ProTip:** Use the `async` attribute on the `script` tag that loads `all.js` (move it to `head.html`) to mitigate script blocking and receive an instant bump in your [PageSpeed score](https://developers.google.com/speed/pagespeed/insights/).
{: .notice--info }

Now that we’ve combined JS files and squeezed down their size we’re ready to move on to the CSS. Bravo.

## Optimize CSS

Like the JS in the section above, we’ll want to leverage Rake tasks to optimize the CSS. Use the CSS tasks previously copied into the Rakefile from the last section.

Once the CSS-related Rake tasks are incorporated into the Rakefile tweak the `minify_css` task, changing the assignment to `output` as shown here:

```ruby
desc "Minify CSS"
task :minify_css do
  puts "## Minifying CSS"
  input = "#{source_dir}/stylesheets/all.css"
  output = "#{source_dir}/_includes/inline.css"
  system "cleancss -e -o #{output} #{input}"
end
```

This will create an *include* file called `inline.css` during the site generation process enabling us to inline the CSS inside the page’s `head` tag. Use the new include by updating `head.html`, replacing the `link` tag pointing at `screen.css` with the following:

    <style>{{ "{% include inline.css " }}%}</style>

If the Rakefile is configured correctly and the NPM dependencies installed, the result will be a generated page with the CSS embedded inline within a `style` tag in the document. Sweet.

**Note:** Though an anti-pattern to check-in generated files `inline.css` must be checked into source control for the CSS inlining to function correctly.

## Optimize images

To squeeze down your blog’s footprint even further, look at optimizing your images. Leverage [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) or an analytics tool to find the squeeky wheels.

For images which can be further compressed, leverage the following rake task (requires [imagemin](https://www.npmjs.com/package/imagemin), which can be installed with `npm install -g imagemin`):

```ruby
desc "Optimize Images"
task :optimize_images do
  puts "## Optimizing Images"
  Dir.glob("#{source_dir}/images/*.{jp,pn}g").each do |f|
    ext = File.extname(f)
    optimized_file = "#{File.basename(f, ext)}-optimized#{ext}"
    if test(?f, f) and not File.exists?(optimized_file)
      ok_failed system("imagemin #{f} > #{source_dir}/images/#{optimized_file}")
    end
  end
end
```

Alternatively you could optimize images manually with a GUI application like [ImageOptim](https://imageoptim.com/), though it's a much more manual process and I've found the application may choke while compressing certain files.

After images are optimized ensure they’re efficiently delivered to the browser with a CDN and properly cached by looking for the `Cache-Control` and `Expires` headers in the HTTP response headers during asset fetching. If you’d like to use Octopress with Amazon S3 for image hosting check out my post titled [Host Images on S3 With Octopress](http://www.habdas.org/host-images-on-s3-with-octopress/). Done and dusted.

## Inline Web Fonts

The last major piece is handling the Web Fonts installed. If you're using the Classic theme you should find two LINK tags in `source/_includes/custom/head.html`. Remove them both. It's okay if the file is empty afterwards. Then inline the two ts using Data URIs. Then use [this tutorial](http://sosweetcreative.com/2613/font-face-and-base64-data-uri) from SoSweet creative to produce base64-encoded fonts and drop them into `sass/custom/_styles.scss` like so:

```html
@font-face {
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: normal;
  src: local('PT Sans'), local('PTSans-Regular'),
    url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAHowABMAAAAA+OAA) format('woff');
}
@font-face {
  font-family: 'PT Serif';
  font-style: normal;
  font-weight: normal;
  src: local('PT Serif'), local('PTSerif-Regular'),
    url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAIQYABMAAAAA/MAA) format('woff');
}
```

This step should earn you around a 5 point bump in Page Speed. But it will actually slow down your website. Just so you know :)~ And that's all the big stuff.

## Performance flotsam

Here are some other ideas to eke out a just a little more speed from your Octopress blog:

- Still on GitHub Pages? Host [simple websites with Jekyll and Docker](/simple-websites-jekyll-docker) on DigitalOcean for improved performance.
- If you embed YouTube videos on your site the iFrames are slowing things down. Instead, generate video preview placeholder images using [Responsive YouTube frames](http://erossignon.github.io/blog/2012/11/25/improve-responsiveness-of-youtube-frames-in-jekyll-and-octopress-pages/).
- Reduce DNS look-up time for external requests using DNS prefetching. Leverage [WebPageTest](http://webpagetest.org/) and [ShowSlow](http://www.showslow.com/) to help pinpoint worst offenders.
- Look through the CSS and Sass used and work on discarding unnecessary style rules.
- Check out [all](http://danluu.com/octopress-speedup/) [these](http://www.eriwen.com/performance/make-octopress-fast/) [articles](http://blog.jphpsf.com/2012/06/12/squeezing-octopress-for-faster-load-times) as they help influenced this post in one way or another.

## In review

It’s likely much of this will no longer be necessary given the new [Octopress asset pipeline](https://github.com/octopress/asset-pipeline) for and Octopress 3 — which [is coming](http://octopress.org/2015/01/15/octopress-3.0-is-coming/). But until then enjoy these tips to turbocharge your Octopress blog.

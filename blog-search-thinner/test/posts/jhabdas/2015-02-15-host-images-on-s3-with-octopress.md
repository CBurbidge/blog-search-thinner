---
title: "Host images on S3 with Octopress"
author: Josh Habdas
date: 2015-02-15 23:39
modified: 2016-11-22
excerpt: Learn how to host Octopress (Jekyll) images on S3.
categories:
  - tutorials
tags:
  - jekyll
  - octopress
  - s3
  - aws
  - travis
  - rubygems
  - cloud
---

Glancing over the Octopress plug-ins list yesterday I noticed something I hadn’t seen before, an [Image tag & uploader for S3](https://github.com/TheAshwanik/aws_s3_imagetag/). Curious to tinker around with it I set-up an account for S3 and integrated it today to decrease my blog header background image size and serve it from the cloud with caching.

> Learn how to host images on S3 with Octopress.

**Update 2016-11-22**: You can find the open source Octopress version of this blog circa 2015 [open sourced GitHub](https://github.com/jhabdas/jhabdas.github.io). Once you're ready to move on from GitHub try [hosting Jekyll on DigitalOcean using Docker](/simple-websites-jekyll-docker/). And, once you've nailed that approach, try going for [PageSpeed 100 with S3 and CloudFront](/pagespeed-100-with-jekyll-s3-and-cloudfront/).
{: .notice--info}

<!--more-->

## Create S3 bucket

Before we get started, [create a bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) on S3. I recommend using an `images` subdomain so cookies from the `www` don’t bleed over and chew up bandwidth for image requests. That’d net a bucket with an ID such as `images.squidward.org`.

## Install plug-in script

To install the Octopress plug-in script `cd` to the root of your blog’s local git clone, ensure you’re on the `source` branch and do the following:

```
cd plugins
curl -O https://raw.githubusercontent.com/TheAshwanik/aws_s3_imagetag/master/aws_s3_imagetag.rb
```

The preceding commands will pull down the Ruby script we need to get everything working and save it to the Octopress _plugins_ directory.

## Update config

Once the plug-in script is installed some build-time configuration is needed. See the [plug-in `README.md`](https://github.com/TheAshwanik/aws_s3_imagetag/blob/master/README.md) for instructions on how to get that going. Or, if you’re using Travis-CI you can model from the following `.travis.yml` settings:

``` yaml
env:
  global:
    - AWS_BUCKET=images.squidward.org
    - AWS_CUSTOM_DOMAIN=images.squidward.org
    - S3_DIR=source/images/toS3
    - AWS_UPLOAD=true
    - secure: kMICJKIexxeIEaT0qUv4mTRpNeitiZYGNhXt6xwcki6hVsFNbKYIAddz4SHYNQ5VatC1Uat3Bv0GjJjDKC5rJdZn4b2NBRwwWmIzo+BOy6ejvZxrUPBAkqVNWnDD0Ht/q72buJtc6YVVXEdIdw/8CC5iWTBOgwqtcoE7Wsm7EdE=
    - secure: ONJOfICPkuk93jMl5402mX2FFmDx79iHIe5LHbs0bAAaBwVKzDe3ZWUI7JgiS9V21EQ8d3FtRnajRSLD/HMiQexjJbrMReRkohasLp4aoppf0Bd21lJDvZgN8lSYkUguYQTVq8vnE7mqeYmo8sx/X0IcEkXeUWgcr+EMVmX5YIw=
```

Notice the `secure` keys. Those hold key-value pairs for the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` requested by the plug-in script when the site is generated. They’ve been obscured using the [`travis` gem’s](https://rubygems.org/gems/travis) `encrypt` feature for security purposes.

To generate and save secure keys for Travis do the following from your blog’s root directory:

``` bash
sudo gem install travis
travis encrypt AWS_ACCESS_KEY_ID=8CC5iWTBOgw --add env.global
travis encrypt AWS_SECRET_ACCESS_KEY=3Bv0GjJjDKC5rJdZn4b2 --add env.global
```

If you’re not sure of your AWS access keys new ones can be generated using the [AWS Management Console](http://aws.amazon.com/console/).

## Update gemset

The plug-in script has a dependency we need to install before it will run successfully. We’ll install it using a convenience tool called [gemrat](https://github.com/DruRly/gemrat).

``` bash
sudo gem install gemrat # install gemrat utility
gemrat install aws-s3 # installs gem AND saves to Gemfile
```

## Bundle application

Once the `aws-s3` gem is added to the `Gemfile` run a `bundle exec bundle install` to create a new `Gemfile.lock`, installing the `bundler` gem as a prerequisite if necessary.

## Wrapping up

The specific implementation for each blog will differ depending on how it’s set-up. If you’re using Travis the information and examples here along with my [blog source](https://github.com/jhabdas/jhabdas.github.io/tree/source) and [migration instructions](/moved-two-sites-to-octopress/) should get you to the finish line. If your using [rsync](https://rsync.samba.org/) or some other method to get the plug-in working why not share how how it’s done? Good luck!

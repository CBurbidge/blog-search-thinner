---
title: Zero to HTTP/2 with AWS and Hugo
author: Josh Habdas
date: 2017-02-10T16:41:53+08:00
modified: 2017-04-14T17:50:00+08:00
excerpt: A step-by-step guide to creating your own JAMstack site using Amazon Web Services and the Hugo static site generator.
categories: [tutorials]
tags: [aws, hugo, http2, performance, ssl, https, jamstack]
header:
  overlay_image: 4fqamznaguo-reginar_1280.jpg
  overlay_filter: 0.5
  teaser: 4fqamznaguo-reginar_512.jpg
featured: false
---

So you learned how <a target="_intro" href="https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/" rel="noreferrer nofollow noopener">Smashing Magazine's website just got 10x faster</a> and want to create your own <a target="_intro" href="https://jamstack.org/" rel="noreferrer nofollow noopener">JAMstack site</a>. If so, you're in luck. And I'll show you how to do it using AWS, so you can get a **free year of hosting** and not have to worry about getting locked into tiered plan pricing thereafter.

**In this tutorial you will learn how to go from Zero to HTTP/2 with <abbr title="Amazon Web Services">AWS</abbr> and Hugo, the [fastest static site generator](/best-jamstack-site-generator/) in existence.**

<aside class="notice--success">
  <h4>Why spend time doing this?</h4>
  <p>Here are some carrots, assuming you even like vegetables. When finished you will have:</p>
  <ul>
    <li>Your own <abbr title="JavaScript, APIs and Markup">JAM</abbr>stack site built on <a target="_blank" href="https://go.habd.as/2n4mmjC">After Dark.</a></li>
    <li>Page content loads in a <b>single HTTP request</b>.</li>
    <li><b>Zero-downtime deployments</b> with instant cache invalidation.</li>
    <li>Ability to generate <b>~1000 pages per second</b>.</li>
    <li><b>HTTPS by default</b>, with automatic secure redirects.</li>
    <li>Domain <b>email forwarding</b> with cryptographic message authentication. (optional)</li>
    <li><b>Custom SSL/TLS</b> domain cert with <i>automatic</i> renewal.</li>
  </ul>
</aside>

Here's an example what your site might look like, save for customizations (click for preview):

[![After Dark theme for Hugo screenshots](https://raw.githubusercontent.com/comfusion/after-dark/master/images/minimal-mac.png "After Dark running on a MacBook and iPhone")](https://hackcabin.com)

When you're ready to get your hands dirty, continue on for the full set of step-by-step instructions on how to go from Zero to HTTP/2 with AWS and Hugo.

{% include toc %}

## Get started with AWS and Hugo

First, [create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/). If this is your first time using AWS you will benefit from a free year of service (after that it's on par with the [Vultr 20GB SSD plan](https://go.habd.as/2oiL54G)).

Next, install [After Dark](https://github.com/comfusion/after-dark), a free retro dark theme I created for Hugo. The instructions assume you're using macOS, though other platforms are supported as well.

## Install s3_website

[`s3_website`](https://github.com/laurilehmijoki/s3_website) is a RubyGem utilizing the AWS-CLI that can be used to automatically configure your website on AWS, and deploy it to CloudFront in a matter of seconds from your local machine. See [the README](https://github.com/laurilehmijoki/s3_website) for installation and usage instructions.

**Note:** Be sure you install version 3.0.0 or better to take advantage of the HTTP/2 configuration settings for CloudFront distributions.
{: .notice--info}

## Configure s3_website

If you followed the instructions, you should now have a S3 bucket for your website, automatically created or updated by `s3_website`, with your After Dark site deployed. If you _really_ followed the instructions you will also have a CloudFront distribution configured to use HTTP/2, all wired up to your S3 bucket and ready to go.

Here's what my current configuration looks like for [Hack Cabin](https://hackcabin.com), which also uses After Dark:

```yaml
s3_id: <%= ENV['S3_ACCESS_KEY_ID'] %>
s3_secret: <%= ENV['S3_SECRET_KEY'] %>
s3_bucket: hackcabin.com

site: public

index_document: index.html
error_document: 404.html

max_age:
  "videos/*": 2629000
  "js/*": 2629000
  "*": 300

gzip:
  - .html
  - .mp4
  - .xml

s3_reduced_redundancy: true

cloudfront_distribution_id: <%= ENV['CLOUDFRONT_DISTRIBUTION_ID'] %>

cloudfront_distribution_config:
  default_cache_behavior:
    min_ttl: <%= 60 * 60 * 24 %>
  http_version: http2
  aliases:
    quantity: 1
    items:
      - hackcabin.com

```

And here's an example `.env` file to accompany it:

```shell
S3_ACCESS_KEY_ID=IKEAJ56NKXWH7IRRHEBA
S3_SECRET_KEY=oVXNqOym4TaHOFQFj3lL4q/SWaeAJkI5Wzp2JjG5
CLOUDFRONT_DISTRIBUTION_ID=A17WRF71NFFL7K
```

## You're done! Well, almost...

Sites served over CloudFront allow HTTPS by default, meaning you do not have to do anything to enjoy SSL. However, if you're using a custom domain (which can be registered for as little as $0.88/year using [namecheap](http://go.habd.as/2nioaFH)) you need to do a little more work.

## Configure HTTPS on a custom domain

This part requires some manual work in the AWS Console, but nothing too extravagant. And while some [may encourage you](https://medium.com/@richardkall/setup-lets-encrypt-ssl-certificate-on-amazon-cloudfront-b217669987b2) to use Let's Encrypt, it has been my personal experience using the AWS Certificate Manager is **significantly easier** to manage over time.

To obtain a custom TLS/SSL certificate you **must be able to receive email** at your custom domain. If you can already receive email, skip the SES set-up and jump to [Request Certificate Using Certificate Manager](#request-security-certificate-using-certificate-manager). Otherwise you can set-up email forwarding on AWS for basically nothing in the next step.

### Configure SES to receive email

If you don't currently have a way to receive email at your custom domain, don't want to spend money on something like <a target="_blank" rel="noopener" href="https://gsuite.google.com/">G Suite</a>, I've linked to instructions on how to set-up email forwarding on AWS using Amazon SES in my post titled <a href="_blank" href="https://habd.as/serverless-email-forwards-ses-lambda-crash-course/#configure-ses-to-send-and-receive-email">Serverless Email with SES and Lambda</a>. Using this approach you can forward email at your custom domain to any location you like, and do it in a secure way with all of your email forwarding rules specified in version controlled source code.

**Timesaver:** Skip the majority of the instructions and _focus only on receiving email_ with SES. That's all you really need.
{: .notice--info}

Once finished you will have a new S3 bucket capable of receiving emails at your custom domain (and possibly email forwarding, depending on how far you took it) and can now request a security certificate using Certificate Manager.

### Request security certificate using Certificate Manager

First, access Certificate Manager from the AWS Console and choose **Request a certificate**. Then enter the domain name or names for which you'd like to request a certificate for, e.g.:

- hackcabin.com
- \*.hackcabin.com

Form there choose **Review and request** followed by **Confirm and request**. This will kick off several verification emails to SES, which will store them in the related S3 bucket set-up in the last step.

### Confirm Certificate Request

To confirm the request of the SSL Certificate open the S3 Bucket collecting emails, open one of the emails received at the time of the request, and look for the verification URL. Copy and paste the verification URL into a browser and navigate to the page to verify domain ownership.

You can watch the status of the verification from the Certificate Manager. If too much time elapses and the request is not verified the certificate request will become invalid and you will need to re-request.

### Configure CloudFront

Now that you've successfully obtained your SSL certificate it's time to hook it up to your CloudFront distribution. This is also a good time to enable HTTPS by default.

To use your custom cert do:

1. Navigate to CloudFront in the AWS Console and choose your distribution.
1. Choose **Edit** from the _General_ tab and select **Custom SSL certificate**.
1. **Select the certificate** you just created from the selection dropdown.
1. Scroll to the bottom of the page and choose **Yes, Edit**.

To enable HTTPS by default do:

1. Navigate to CloudFront in the AWS Console and choose your distribution.
1. Navigate to the _Behaviors_ tab, select the "Default" behavior and choose **Edit**.
1. Under _Viewer Protocol Policy_ choose **Redirect HTTP to HTTPS**
1. Scroll to the bottom of hte page and choose **Yes, Edit**.

## Appreciate your hard work

Navigate to your website's custom domain name and ensure it is being served over HTTPS. Verify the HTTP to HTTPS redirection is working as expected by entering a URL starting with HTTP (it should 301 to HTTPS). And, finally, use [HTTP/2 Test Tool](https://tools.keycdn.com/http2-test) to verify HTTP/2 is functioning as expected.

![HTTP/2 Test Proof](/images/hackcabin-http2-test.png)

**That's it. You're finished. This time for real.**

You've just gone from Zero to HTTP/2 with AWS and Hugo.

From here you can start [customizing the theme](https://comfusion.github.io/after-dark/#customizing), create some microservices for your site using [Serverless and Lambda](/serverless-email-forwards-ses-lambda-crash-course/), set-up your own [self-hosted Git service](https://gitea.io/) using Gitea. Or maybe you want to [start measuring the speed](/monitor-pwa-website-performance/) of your website with SpeedTracker, explore some of the other wonderful [Hugo themes available](http://themes.gohugo.io/) (there are lots of them), or even roll your own theme using some of my [JAMstack Frameworks, Tools and Tips](/jamstack-frameworks-tools-tips/). The possibilities are endless. Get creative, and have fun.

And, as always, please feel free to share your success stories or battle cries in the comments section below.

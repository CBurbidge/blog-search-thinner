---
title: Serverless Email Forwards with SES and Lambda
date: 2016-08-27T15:12:33-05:00
modified: 2017-03-11
author: Josh Habdas
excerpt: How to create your own email forwarding service using Serverless and AWS Lambda.
categories:
  - tutorial
tags:
  - programming
  - serverless
  - aws
  - cloud
  - nodejs
  - javascript
header:
  overlay_image: mathyas-kurmann-102977_1200w.jpg
  overlay_filter: 0.5
  teaser: mathyas-kurmann-102977_512w.jpg
---

In 2016 this website underwent a major overhaul. I took it off my [simple Docker set-up](/simple-websites-jekyll-docker/) and [moved it to S3 with CloudFront](/pagespeed-100-with-jekyll-s3-and-cloudfront/). The process of which enabled me to **reduce hosting costs by 80%** all while increasing reach and decreasing page load times globally.

But static websites have a perceived disadvantage: they're static. They have no inherent dynamic functionality. What will you do when you want to add some piece of interactivity---a contact form, or an email distribution list? Sure you could go with TypeForm or TinyLetter. But you could also create your own service using <abbr title="Function as a Service">FaaS</abbr> (a.k.a. Serverless). Afterall, Serverless isn't just a fad, and it's [not going away anytime soon](https://hackernoon.com/why-the-fuss-about-serverless-4370b1596da0).

To quickly grok the benefits of a "serverless" architecture, look at the following illustration:

<script async class="speakerdeck-embed" data-slide="13" data-id="478787189d06467b8ea4c4ecd4a4fbf6" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

What the illustration shows is that using virtual machines, often hosted on public and private clouds using technologies like [EC2](https://aws.amazon.com/ec2/), [Azure Virtual Machines](https://azure.microsoft.com/en-us/services/virtual-machines/) or [DigitalOcean](https://m.do.co/c/9d5c1c681fd0) is downright wasteful. Not only are VMs difficult to manage from a DevOps perspective, they're harder to scale and flat out cost more money.

Going serverless helps fix the wastefulness by skipping the VM management, only paying for the compute resources used and simplifies making things scale. And, consequently, serverless architectures plug-in very well with static websites by allowing them to layer on dynamic functionality without forcing a platform change.

Two competing technologies for providing serverless compute resources include [AWS Lambda](https://aws.amazon.com/lambda/) and [Auth0 Webtask](https://webtask.io/). There are others for sure, and finding them and choosing the one that fits your needs shall remain a task for the reader.

The remainder of this article is a crash course using a tool called [Serverless] to create and manage serverless infrastructure on AWS. More specifically, we'll look at how to use Serverless to set-up an email forwarding service to forward emails from Amazon's <abbr title="Simple Email Service">SES</abbr> to another email address, giving you a feel for how to utilize serverless to add dynamic functionality to static websites like [Hack Cabin](https://hackcabin.com).

**How much will this cost me?** If you're a first-time AWS user you will enjoy 12 months of free service from Amazon. After that, it's pay for play with some exceptions, but it's super cheap. Like _really_ cheap. See [AWS Free Tier](https://aws.amazon.com/free/#AWS_FREE_TIER) for more info on pricing.
{: .notice--info}

{% include toc %}

# Installing Serverless

Installing [Serverless] is easy. It prefers a global installation but that doesn't mean you can't also install and use it as a library within your application.

To install globally and make Serverless available as a CLI tool:

    npm i -g serverless

# Setting up AWS

Next, follow the [Serverless installation guide](https://serverless.com/framework/docs/providers/aws/guide/installation/) to set-up AWS and create your AWS Access Keys.

# Configuring Email Forwarding on AWS

Amazon Web Services provides a tool called <abbr title="Simple Email Service">SES</abbr> to send and receive email. And it needs to be set-up for the domain you wish you use for custom email forwards.

Jeremy Felt created an easy-to-follow set of instructions with screenshots for setting up SES in his post titled [Send and receive email for your domain with Postmark and Amazon’s SES, S3, and Lambda services](https://jeremyfelt.com/2016/05/22/send-receive-email-domain-postmark-amazons-ses-s3-lambda-services/). Follow the part of his instructions titled _Configuring SES to receive and forward email_ but **skip the rest**.

# Creating an Email Forwarding Service

Now for the fun part. You're going to use Serverless to create and upload a Lambda to AWS. This builds on the previous steps, so be sure you're ready before moving on.

## Creating an Example Service

Create a directory to place your SES forwarding service and navigate into it. I chose to place mine in under a `services` directory and created it like so:

    mkdir -p services/ses-forwarder && cd $_

**Note:** If you're using Jekyll you'll want to add `/services` to the `exclude` array in your site's `_config.yml` so it doesn't get copied to the built site. See the [Jekyll Configuration](http://jekyllrb.com/docs/configuration/) for info.
{: .notice--info}

Then use Serverless to create a new service template. Use the Node template as there's a dependency required for this which is written in JavaScript:

    sls create -t aws-nodejs

Executing the above command will create a sample "Hello World" Lambda service and output something similar to the following:

```
Serverless: Creating new Serverless service...
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.0.0-beta.2
 -------'

Serverless: Successfully created service in the current directory
Serverless: with template: "aws-nodejs"
```

Once created, follow any on-screen instructions and then confirm it can be deployed to AWS.

### Deploying the Example

To deploy Hellow World to AWS simply run the following command:

    sls deploy

If everything goes smoothly you see something like the following:

```
Serverless: Creating Stack...
Serverless: Checking stack creation progress...
......
Serverless: Stack successfully created.
Serverless: Zipping service...
Serverless: Uploading .zip file to S3...
Serverless: Updating Stack...
Serverless: Checking stack update progress...
.................
Serverless: Deployment successful!

Service Information
service: aws-nodejs
stage: dev
region: us-east-1
endpoints:
  None
functions:
  aws-nodejs-dev-hello: arn:aws:lambda:us-east-1:665550229666:function:aws-nodejs-dev-hello
```

If deployment doesn't work jump back to [Setting up AWS](#setting-up-aws) and make sure you follow all of the instructions.

### Invoking the Example

Once successfully deployed invoke the `hello` Lambda function:

    sls invoke -f hello

You should see output similar to the following:

    {
      "statusCode": 200,
      "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":{}}"
    }

### Removing the Example

Now that you've gotten the Hello World example running, remove it by running the following:

    sls remove

The above will remove the `hello` Lambda function from AWS so we can create a SES forwarding Lambda utilizing  [`aws-lambda-ses-forwarder`](https://github.com/arithmetric/aws-lambda-ses-forwarder).

## Creating the Forwarding Service

In this section we'll create a Lambda to forward emails from SES to another email address.

### Coding the Forwarding Service
Create the email forwarder by modeling from the following commit on my blog:

[99117d58](https://github.com/jhabdas/habd.as/commit/99117d58d156e05a920611b47efb59f080ca2b26)

While doing so ensure you set the expected SES region in `serverless.yml`. If you don't your Lambda won't be able to talk to the SES S3 bucket you created while [Configuring Email Forwarding on AWS](#configuring-email-forwarding-on-aws).
{: .notice--info}

Once coded do an `npm i` to install the NPM dependencies needed to run the Lambda. These get packaged into the ZIP file uploaded to AWS, but you don't need to commit them to source control.

### Deploying the Forwarding Service

Just like before, deploy the Lambda with `sls deploy`.

### Updating AWS Configuration

The email collected by SES is stored in an S3 bucket created with Jeremy's instructions. Take a look back at his instructions and configure the Lambda "Policy Document" and add the Lambda as an action to the email S3 bucket. Check out Jeremy's screenshots (bottom of his post) for visuals of some of these steps.

**Note:** Until you do this your email forwarding will not work. To debug the error open CloudWatch and access the logs.
{: .notice--info}

### Testing the Forwarding Service

Once deployed test the Lambda by sending an email at an address on the SES-configured domain. If everything worked you'll receive a forwarded email at the verified SES address. If not, [see your CloudWatch logs](https://us-west-2.console.aws.amazon.com/cloudwatch/home#logs:) for errors.

**Note:** As of v1.7, Serverless can also trigger Lambdas in response to CloudWatch events. This could be used to, for example, trigger a notification should your website go down.
{: .notice--info}

## Save Your Work

Once you're finished don't forget to commit your work. Be sure you don't commit any AWS secrets or other sensitive info. Secrets should be kept outside your application's source code for security reasons.

# In Review

In this crash course you learned the value of serverless technology for static websites and used it to create a practical email forwarding service with Serverless, SES and Lambda. If you finished, congratulations! Please feel free to share your feedback and questions in the comments section below.

[Serverless]: http://serverless.com/

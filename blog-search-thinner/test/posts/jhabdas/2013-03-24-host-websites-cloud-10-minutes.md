---
title: Host websites in the cloud in 10 minutes
author: Josh Habdas
date: 2013-03-24
modified: 2016-11-22
categories:
  - tutorials
tags:
  - cloud
  - hosting
  - web
  - webmaster
header:
  overlay_image: photo-1440407876336-62333a6f010f_1280.jpeg
  overlay_filter: 0.5
  teaser: photo-1440407876336-62333a6f010f_512.jpeg
---

Hosting companies [Bluehost](http://hackcabin.com/go/bluehost) and Dreamhost offer simple, one-click installation of popular blogging platforms like WordPress, Drupal and Joomla. The affordable hosting plans offered are low-cost, but you tend to get what you pay for: shoddy up-time and slow server responses.

What would our hero Mario do about this? I'm thinking he'd <a href="http://features.peta.org/mario-kills-tanooki/" rel="nofollow">Tanooki suit up</a>, make a mad dash and fly to the first cloud he found. And that's what this post is all about. Read on to learn how to host a website in the cloud in 10 minutes. It may not be as simple as 1-click hosting, but it'll almost certainly be faster. And you'll earn some geek cred for doing something complicated to do something simple.

<!--more-->

**Update 2016-11-22:** Instead of using EC2 as described within, consider going static and [hosting with S3 and CloudFront](/pagespeed-100-with-jekyll-s3-and-cloudfront/).
{: .notice--info}

## Getting started

To get started, [create an AWS account][1]. From there, you'll be able to create virtual machine instances from the [EC2 dashboard][2] – just **Launch Instance** and follow the wizard. For my instance, I used 64-bit Ubuntu Server 12.04.1 <abbr title="Long-Term Support">LTS</abbr>.

Once the instance is up, **configure the security group** to enable TCP traffic over port 22 (SSH) and port 80 (HTTP), and generate and share a SSH key pair for secure connections to the instance.

Windows users can use PuTTY to connect to the instance over SSH using the [guide provided by Amazon][3]. The method provided requires that PuTTYgen is used to convert the PEM private key format to the PPK format used by PuTTY.

## Host websites in the cloud

Once the instance is created and configured to accept SSH and HTTP traffic, it can be used to run a web server so that it can receive web traffic. Follow the steps here to shell into the instance using its public DNS, and install and run a scalable web server called Nginx:

    ssh -l ubuntu ec2-54-244-194-251.us-west-2.compute.amazonaws.com
    sudo apt-get update
    sudo apt-get install nginx
    sudo service nginx start

For Amazon AMI instances, login with the username `ec2-user` and not `ubuntu`. And use `yum` instead of `apt-get`. Additionally, the command needed to start Nginx may differ by environment.

If [using Windows with PuTTY][3] to shell in, the first command above will not be necessary–though connections will still be required to authenticate with a username, as shown here:

![Specifying the user to login as to PuTTY and authenticating using imported SSH key](//s3.amazonaws.com/images.habdas.org/aws-putty.png)

Once authenticated and the above commands executed, you can test that the web server service started successfully by curling the localhost from the bash prompt:

    curl localhost

If the web server is running, you'll receive a response similar to the following:

```html
<html>
<head>
<title>Welcome to nginx!</title>
</head>
<body bgcolor="white" text="black">
<center><h1>Welcome to nginx!</h1></center>
</body>
</html>
```

Assuming the security groups were configured correctly, this is the same content that would be sent back to a browser if it were to hit the public DNS on port 80 (the default port for HTTP requests). Confirm this now by running the following command using the instance's public DNS provided in the EC2 dashboard:

    curl -v ec2-54-244-194-251.us-west-2.compute.amazonaws.com

The verbose flag will show some additional diagnostic information and will include the HTTP headers–useful for debugging.

If the server doesn't respond, ensure the Ubuntu instance and Nginx are both running, and the security group has been configured to allow traffic on port 80. If you're not able to `curl` the url, you can also try navigating to the public DNS using a web browser, as pictured here:

![Page served by Nginx webserver running on the Amazon Web Services cloud](//s3.amazonaws.com/images.habdas.org/aws-nginx.png)

## Personalizing the content

Now that the website is hosted and functional, the content can be personalized. To personalize the content, **modify the `index.html` file** containing the HTML being served by Nginx to say something less boring.

**Note:** <a href="http://www.vim.org/" rel="nofollow">Vim</a> will be used for this exercise, though some users may find <a href="http://www.nano-editor.org/" rel="nofollow">nano</a> easier to wrap their heads around.
{: .notice--info}

    sudo vim /usr/share/nginx/www/index.html

Make some changes using the [Vim cheat sheet][4] for reference, and then save and exit Vim by pressing `Esc` followed by `:wq` and finally `Enter`.

So long as no caching is being done, Nginx will respond with the personalized content the next time the page is retrieved. And that's all there is to host websites in the cloud.

## Taking it to the next level

Assuming static pages are old hat, consider using Nginx to do something a tad more interesting, such as hosting a dynamic webapp using one of the [Brunch.io Skeletons][5]. Of course, to do that you'll need to install a few more packages—and that, unfortunately, is going to take [a little longer than 10 minutes][6].

## Keep your head in the clouds

If you are using an affordable hosting solution like BlueHost or DreamHost, and looking to beef up performance and improve up-time without getting too complicated or going through too much effort, consider enabling a CDN like [CloudFlare][7]. Integrations can be set-up manually, or, in some cases, set up with a hosting company integration script. And depending on the amount of site traffic and CDN used, the service may come for free.

 [1]: https://portal.aws.amazon.com/gp/aws/developer/registration/
 [2]: https://console.aws.amazon.com/ec2/
 [3]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html
 [4]: http://cheat.errtheblog.com/s/vim
 [5]: https://github.com/brunch/brunch/wiki/Skeletons
 [6]: /developing-modern-web-applications-on-windows-vagrant/
 [7]: https://www.cloudflare.com/

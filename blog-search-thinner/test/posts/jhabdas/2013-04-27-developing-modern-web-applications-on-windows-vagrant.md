---
title: Developing single-page apps on Windows with Vagrant
author: Josh Habdas
date: 2013-04-27
excerpt: How to set up rapid Web development workflow in Windows using a virtualized Linux box.
categories: [tutorials]
tags: [ajax, html, ria, javascript, coffeescript, virtualization, backbonejs, chaplinjs, bower, scaffolt, grunt, editors, nodejs, curl, brunch, nginx, virtualbox, windows, vagrant, ubuntu, bash, phantomjs, testem, web platform]
image:
  feature: cress-253799_1280.jpg
  credit: stux
  creditlink: http://pixabay.com/en/cress-seedling-plant-253799/
---
{% include toc %}

I earlier this month I spent way too much time writing an article on how to [SFTP to Ubuntu Server with Sublime Text][2]. The purpose of the SFTP effort was to set myself up for developing modern web applications on a new Windows 8 machine I bought to play SimCity 2013. And after getting everything working I realized the SFTP method had some gremlins and the file syncing reminded me of Dreamweaver—it simply wasn't fast enough.

Lately, unless you were running a Linux machine or had the pleasure of owning a Mac with OS X, developing modern web applications has been a bit of a kludge. Enter Vagrant.

> Vagrant is a tool for building complete development environments. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases development/production parity, and makes the "works on my machine" excuse a relic of the past.

In this article I'll explain how to set up a development environment in Windows using a virtualized Linux box, suitable for rapid prototyping. Then I'll take it a step further and explain how to integrate a Backbone-based application framework with Vagrant and Sublime Text, greatly increasing the speed for developing modern web applications on Windows.

<!--more-->

**Update <time datetime="2015-07-11">7 Jul 2015</time>:** Yo, this post was written in 2013. Before going any further, please read [When fast isn't fast anymore](/when-fast-isnt-fast-anymore).

## Applications used

The following core applications will be used to pull off this little stunt. The only one that costs money is Windows. **Download and install** all of these before moving forward:

* [Windows][3]. Where do you want to go today?
* [Git for Windows][4]. We'll be using this for the Git Shell that comes with it.
* [Vagrant][5]. Described above in marketing jargon. It does stuff with virtual machines.
* [VirtualBox][6]. Open Source virtualization software.
* [Sublime Text][7]. Wicked quick code editor. Nagware.
* [Google Chrome][8]. Make this your default browser.

This article will touch on or use a number of ancillary programs. These are free as well. Do *not* try and download these now; they will be installed and used at specific points during the article.

* [Ubuntu][9]. Currently the most popular flavor of Linux out there.
* [Bash][10]. A Unix shell. Will be used inside the Git Shell, which actually uses the Windows PowerShell by default. Result? Shellception.
* [Nginx][11]. A web server and reverse proxy. It does email too.
* [Node.js][12]. A server-side JS engine. Will be used for compiling application sources.
* [curl][13]. Allows us to test the web server for an HTTP response, and more.
* [Brunch][14]. An easy-to-use HTML5 application assembler.

Once the specified applications are installed it's time to start configuring the dev environment.

## Configure the development environment

Once the core applications are installed, start configuring the development environment.

First, open Git Shell from Windows and, at the command prompt, follow the simple [Vagrant Getting Started][15] instructions. This will download a Linux image for the <abbr title="Virtual Machine">VM</abbr>, install and start it.

**Note:** The following steps will assume Vagrant installs Ubuntu 12.04 <abbr title="Long-Term Support">LTS</abbr>, though other operating systems and versions are likely to be used in the future.

After the virtual machine starts, connect to it with [Vagrant SSH][16]. Once at the <abbr title="Bourne-again shell">bash</abbr> prompt, pictured below, type `pwd` to confirm the current directory is the vagrant home directory.

![Screenshot of Ubuntu SSH log-in with Vagrant using Git Shell](//s3.amazonaws.com/images.habdas.org/powershell-vagrant.png)

Then, from the prompt, run the following commands, in sequence, and accepting any intermediate prompts presented, to [install Node.js][35], Nginx and curl, set-up Vagrant [synced folders][34] and start the web server.

```sh
sudo apt-get update
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install nginx
sudo apt-get install curl
sudo mv /usr/share/nginx/www /vagrant
sudo ln -fs /vagrant/www /usr/share/nginx/www
sudo /usr/sbin/nginx
```


Once complete, execute `curl localhost` at the bash prompt to verify the web server started and is sending an expected HTTP response, as shown below.

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

If the response is successful, [network the VM][36] with Windows–the host machine–by editing the `Vagrantfile` (a text file created when the VM was created), uncommenting the following line and saving the file.

```ruby
# config.vm.network :forwarded_port, guest: 80, host: 8080
```

Next, run `vagrant reload` from Git Shell. (Note: Open a new Git Shell to do this, or `exit` the Ubuntu bash shell first.) Doing so will restart the VM with the updated config and begin forwarding traffic to it, from port 8080 on the host machine to port 80 on the VM.

Try it out by opening a browser and navigating to <a href="http://localhost:8080" target="_blank" rel="nofollow">localhost:8080</a>. If the port forwarding is working properly, the page will contain a Nginx welcome message.

![Screenshot of the port-forwarded response from Nginx running in the VM](//s3.amazonaws.com/images.habdas.org/vagrant-portforward.png)

Pretty cool, huh? Just wait…

In case it went unnoticed, the Vagrantfile parent directory now contains a _www_ folder. Drag that folder from Windows Explorer and drop it into an open Sublime Text window.

From Sublime, press `Ctrl+P` to open the _Goto Anything_ feature, type `ix` and press `Enter` to open `index.html`. Look familiar? That's because it's the same output from the curl statement issued earlier in bash.

Make some changes and save the file, then reload the browser window and watch the changes automagically appear.

![Screenshot of the port-forwarded response from Nginx running in the VM, showing changes](//s3.amazonaws.com/images.habdas.org/vagrant-portforward-zomg.png)

Now _that_ is cool! Vagrant is not only port forwarding to the guest VM, it's also syncing file systems. And with that confirmation, the configuration is complete. Time to do something interesting.

## Developing modern web applications

To create a modern web application, often times referred to as a Rich Internet Application, or RIA, this article will leverage an HTML5 application assembler called [Brunch.io][14] and one of the many available [application skeletons][32] called Brunch with Chaplin, which builds on Backbone and can be used to create a <abbr title="Single-Page Application">SPA</abbr>.

It's worth mentioning that Brunch has skeletons available for a number of other frameworks, including Ember, AngularJS and Spine. Not sure which one to pick? Check out [TodoMVC][33] for an understanding of the differences.

### Install and configure the application framework

Back in Ubuntu (you may need to SSH in again), from the bash prompt, `cd` to _/vagrant/www_ and enter the following at the prompt to install the Brunch application assembler, create a new application using the default Brunch skeleton, install dependencies and build the app:

```sh
sudo npm install -g brunch
brunch new todomvc && cd todomvc
sudo npm install --no-bin-links # Skip soft links to avoid symlink errors
brunch b
```


With the last command, a `public` directory will be created with the compiled source files. And because Vagrant sync is doing its thing, the application will immediately become available within Chrome at the following location: <a href="http://localhost:8080/todomvc/public/index.html" target="_blank" rel="nofollow">localhost:8080/todomvc/public/index.html</a>.

But opening the page shows nothing, and there are few errors on the page. Let's take a look at the page source and debug in the browser.

### View the source and debug the errors

At first when the page is pulled up, errors are preventing the content from loading. The errors can be confirmed by opening the console in Chrome using Chrome Dev Tools (`Ctrl+Shift+J`).

    Uncaught SyntaxError: Unexpected token < vendor.js:1
    Uncaught SyntaxError: Unexpected token < app.js:1
    Uncaught ReferenceError: require is not defined

Debugging will show that Nginx is responding with HTML for the external CSS and JS files, instead of the expected style and script resources. Why is that? Let's take a <a href="view-source:http://localhost:8080/todomvc/public/index.html" target="_blank" rel="nofollow">look at the `index.html` page source</a> and find out. It should look something like the following:

```html
<!doctype html>
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Brunch example application</title>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="/stylesheets/app.css">
  <script src="/javascripts/vendor.js"></script>
  <script src="/javascripts/app.js"></script>
  <script>require('initialize');</script>
</head>
<body>
</body>
</html>
```

It’s a fairly vanilla HTML5 document with some conditional comments for IE, Unicode character encoding, a couple of other [`meta`][25] [tags][26], an empty [`body` element][27] and three _root-relative_ external resources.

The errors themselves are occurring because the external resources cannot be located relative to the web root and so Nginx has decided instead to return the default <i>index.html</i> file–the one modified earlier. There are a few ways to fix this:

- Change the paths of the external resources to be document- rather than root-relative;
- Change the web root to point to the application's public directory; and
- Configure Brunch to deploy files to the web root.

Though any of these options would work, we're going to go with configuring brunch to deploy files to the web root. And, in the process, we're going to _move the web root back to its original location outside the reach of Vagrant synced folders_. (Note: Storing generated files under synced folders is not recommended, and may lead to errors in the browser after running multiple builds.)

### Move the web root outside of Vagrant synced folders

Earlier, the web root was modified by moving the Nginx <i>www</i> folder to <i>/vagrant/www</i> and creating a symlink pointing to the new location. Remove that symlink and create a new <i>www</i> folder in its place, so generated application files can be deployed to a location outside of Vagrant synced folders.

```sh
sudo rm /usr/share/nginx/www && sudo mkdir /usr/share/nginx/www
```

### Configure app to deploy files to the web root

To configure the Brunch app to deploy files to the new location, modify the [configuration file][24] in the application root directory, add the following paths directive, save the file, and rebuild the application with sudo privileges:

```coffee
paths:
  public: '/usr/share/nginx/www'
```
```sh
cd /vagrant/www/todomvc && sudo brunch b
```

If done correctly, the Brunch app will now be available at the web root, or <a href="http://localhost:8080" target="_blank">localhost:8080</a>, free of errors and displaying an example application (as pictured below).

![Screenshot of Brunch sample application running in Google Chrome](//s3.amazonaws.com/images.habdas.org/vagrant-brunch.png)

Looking at the <a href="view-source:http://localhost:8080/" target="_blank">page source</a> again will show that the markup has not changed. That's because the Brunch application is updating the <abbr title="Document Object Model">DOM</abbr> using JavaScript. To get a look at the actual DOM, open the Elements panel in Chrome Dev Tools or view the generated source using a [bookmarklet][23].

Before going any further, now is a good time to get acquainted with the application stack.

### Get aquainted with the application stack

Once you have the sample app up-and-running, pull up the `index.html` page source once more and notice the following two external scripts:

```html
<script src="/javascripts/vendor.js"></script>
<script src="/javascripts/app.js"></script>
```

These files contain script generated via Node.js, by way of the Brunch build system. To see where their contents come from, expand the _app_ and _vendor_ folders under _todomvc_ in Sublime Text as shown.

![Screenshot of the application's app and vendor folders expanded in Sublime Text](//s3.amazonaws.com/images.habdas.org/todomvc-app-vendor.png)

Each of the two JS files in the page source represent all of the individual script files in each of the two directories, concatenated together as specified in `config.coffee`. Of the items under _vendor_, notice that [Backbone][21] and [Underscore][22] are included: two libraries that work well alongside jQuery (or Zepto, depending on when you read this) to produce the application structure necessary for developing modern web applications.

The stylesheets for the application are created in a similar manner, except that, unlike the script files, both the vendor and app stylesheets are combined into a single file. The behavior for CSS is determined by the following [files][18] statement in `config.coffee`:

```coffeescript
'stylesheets/app.css': /^(app|vendor)/
```

Glance over the Brunch documentation for a better understanding of the application [structure][19] and file [concatenation][17] before making any file modifications if none of this looks familiar.

### Modify an application asset: the index.html

Modern web applications aren't all dynamic. Just like the webpages developed with Dreamweaver back in the early 2000's, RIAs are made of the same great stuff: HTML, CSS, JS and media like images.

To add some content to the document, start Sublime's <i>Goto Anything</i> feature (`Ctrl+P`), type `ix` and select the `index.html` file under the _assets_ directory, as pictured, to open the file.

![Screenshot of the Sublime Text Goto Anything search for the index.html asset](//s3.amazonaws.com/images.habdas.org/todomvc-goto-app-assets-indexhtml.png)

The contents of this file are the exact same as the corresponding file in the `public` directory (now deployed to the web root). But because this file is a _pre-generated_, static asset, it will actually overwrite the the same file in the `public` directory whenever a change is saved and the application is compiled.

Go ahead and change the [`title` element][20] of `index.html`, and then save the file. Then tell brunch to compile the application again using `sudo brunch b` from the application root.

Once rebuilt, <a href="http://localhost:8080/" target="_blank" rel="nofollow">reload the page on the localhost</a> and notice _the page title has changed._

To summarize what happened here:

- Vagrant synced the `index.html` from Windows with the corresponding file on the VM
- Utilizing Node.js, Brunch noticed the change to the filesystem, and compiled the application
- The generated source was deployed to the web root directory Nginx uses
- The page was reloaded in the Windows browser, and Vagrant port-forwarded the request to Nginx running on the virtual machine
- Nginx served up the index.html file and generated application resources

And that's just the beginning.

### The more you know

There's a lot more to learn about Vagrant, [Backbone][42], [Chaplin][29] and [Brunch][14], not to mention the libraries they rely on and plug-ins available for them. As an exercise, consider reviewing the Brunch documentation and learn how to build the application sources with file minification enabled. Simple, right? Now try installing Bootstrap… (Hint: Take a look at [how Chapless Brunch does it][28].) What about once [Bower][30] is used for dependency management, [scaffolt generators][37] for rapid prototyping and build processes and unit testing are streamlined with tools like [Grunt][38], [Travis-CI][39], [PhantomJS][40] and [testem][41]? What then. How might the application grow?

Knowing what an application framework is capable of, and how to use it properly, can easily save many hours reinventing the wheel or digging out of [coding anti-patterns][31], and can prove to be an enjoyable learning experience. In my personal experience, difficult problems can often be simplified by expanding one's knowledge and finding a better way to do things. And I encourage others to do the same.

## Summary

This article covered a series of steps which can be used for developing modern web applications on Windows. It started with a development environment configuration using Vagrant, progressed thru the steps needed for developing modern applications, and ended with some learning exercises and personal suggestions. Developing modern web applications no longer requires a Linux box or Mac OS X. So boot up that Windows machine, go forth and code.

 [2]: /sftp-to-ubuntu-server-sublime-text
 [3]: http://windows.microsoft.com/
 [4]: http://windows.github.com/
 [5]: http://www.vagrantup.com/
 [6]: https://www.virtualbox.org/
 [7]: http://www.sublimetext.com/
 [8]: http://www.google.com/chrome/
 [9]: http://www.ubuntu.com/
 [10]: http://www.gnu.org/software/bash/manual/bashref.html#What-is-Bash_003f
 [11]: http://wiki.nginx.org/
 [12]: http://nodejs.org/
 [13]: http://curl.haxx.se/
 [14]: http://brunch.io/
 [15]: http://docs.vagrantup.com/v2/getting-started/
 [16]: http://docs.vagrantup.com/v2/getting-started/up.html
 [17]: https://github.com/brunch/brunch/blob/master/docs/README.md#concatenation
 [18]: https://github.com/brunch/brunch/blob/master/docs/config.md#files
 [19]: https://github.com/brunch/brunch/blob/master/docs/README.md#basics
 [20]: http://www.w3.org/html/wg/drafts/html/master/document-metadata.html#the-title-element
 [21]: http://backbonejs.org/
 [22]: http://underscorejs.org/
 [23]: https://www.squarefree.com/bookmarklets/webdevel.html
 [24]: https://github.com/brunch/brunch/blob/master/docs/config.md
 [25]: http://alistapart.com/article/beyonddoctype
 [26]: http://alistapart.com/article/vexing-viewports
 [27]: http://www.w3.org/html/wg/drafts/html/master/sections.html#the-body-element
 [28]: https://github.com/jupl/chapless-brunch#addbootstrap--rembootstrap
 [29]: https://github.com/chaplinjs/chaplin/blob/master/docs/overview.md
 [30]: https://github.com/bower/bower
 [31]: http://sourcemaking.com/antipatterns/software-development-antipatterns
 [32]: https://github.com/brunch/brunch/wiki/Skeletons
 [33]: http://todomvc.com/
 [34]: http://docs.vagrantup.com/v2/getting-started/synced_folders.html
 [35]: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
 [36]: http://docs.vagrantup.com/v2/getting-started/networking.html
 [37]: https://github.com/paulmillr/scaffolt
 [38]: http://gruntjs.com/
 [39]: https://travis-ci.org/
 [40]: http://phantomjs.org/
 [41]: https://github.com/airportyh/testem
 [42]: http://arturadib.com/hello-backbonejs/docs/1.html

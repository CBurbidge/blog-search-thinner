---
title: Automating iOS App Icon Creation
author: Josh Habdas
date: 2015-06-03T10:41:16-05:00
modified: 2015-11-11
excerpt: Automate creation of iOS App Icons using SVG multi-rasterization to PNG with Inkscape and shell scripting.
categories: [tutorials]
tags: [iOS, native, docker, shell]
header:
  overlay_image: wheels-784865_1280.jpg
  overlay_filter: 0.5
  caption: "Photo credit: [Efraimstochter](https://pixabay.com/en/wheels-machine-installation-art-784865/)"
---
While working on a React Native app for [Lumpen Radio](http://lumpen.fm) I got to the point where I was ready to enter beta - and I needed an App Icon for my app. I hit up a few peeps with apps already in the App Store to understand how they created their app icons. Much to my chagrin I found out each of them had created their app icons manually using an image editing tool of some sort. Not wanting to work through the process of manual image creation using a GUI editor I stumbled upon an [Inkscape template and accompanying script](https://github.com/theherk/App-Icon-Template) that’ll do it for you. Giggity!

**Update 11 Nov 15:** Thanks to a well placed tip from [SubProto](https://disqus.com/by/subproto/) it's possible to get the script running on OS X. To do so look at the `resize.sh` code from the commit [`bd335fd`](https://github.com/theherk/App-Icon-Template/tree/bd335fd38eae9782bd75317de9c751daa9344a35) and adapt accordingly. I tested this on OS X 10.11.1 (El Capitan) using the provided icon template with success.
{: .notice--info}

**Update 24 Jul 15:** For those with a Sketch license, app icon and launch screen images can be produced along with asset catalogs using the [sketch-to-xcode-assets-catalog](https://github.com/GeertWille/sketch-to-xcode-assets-catalog), though the approach used in this article allows for creation of assets without an additional penny spent. Thanks to [Diego Durli](https://br.linkedin.com/in/diegodurli) for the information.
{: .notice--info}

> Automate creation of iOS App Icons using SVG multi-rasterization to PNG with Inkscape and shell scripting

# Why everything I have is broken

With blissful excitement I cloned the [App-Icon-Template](https://github.com/theherk/App-Icon-Template) and ran the script on my machine. [It failed to output any images](https://github.com/theherk/App-Icon-Template/issues/3). So I slept on it.

![Why everything I have is broken](http://imgs.xkcd.com/comics/hard_reboot.png)

After scanning a few posts on the Inkscape Forums I deduced that Inkscape, which only runs under X11 on Yosemite, simply doesn’t play well with OS X. So why not use Linux!

# Approaches

Two approaches I thought of immediately given [previous](/developing-modern-web-applications-on-windows-vagrant/) [virtualization](/simple-websites-jekyll-docker/) work I’ve done included:

- Spin up an Ubuntu machine on DigitalOcean and run the script there.
- Leverage Docker and use Ubuntu to do it locally.

# The Docker way

Given I already had Docker installed I simply went ahead and used that. Following are the steps I followed. Please adapt these to meet your needs. The approach will work for both Windows and Mac users and requires a total of zero dollars to do.

## Run an Ubuntu container

With Docker installed and running ([install instructions for Mac](/simple-websites-jekyll-docker/#install-docker)) go ahead and **start an Ubuntu shell using a terminal**:

```sh
docker run -it ubuntu:14.04 /bin/bash
```

Once the shell is up install Inkscape, Git and Vim; and download the App Icon Template repo with the following:

```sh
apt-get update # update # re-sync package index from source
apt-get install git vim inkscape -y # install git, vim and inkscape
git clone https://github.com/theherk/App-Icon-Template
cd App-Icon-Template
```

This will create a new folder called `App-Icon-Template` under the root users home directory with the contents of the Git repo and enter the directory. Additionally, it'll install a few utilities we'll need to run later.

You’re almost ready to start converting, but first you’ll need to get your SVG into the Docker container.

## Copy SVG image into Docker container

With the App Icon Template and Vim now installed inside the container, leave your shell open and, in a text editor on your operating system, **open the SVG file and copy its contents to your clipboard** by selecting all of the file contents and `Ctrl+C` (Windows) or `Cmd+C` (Mac).

With your SVG goodness now copied to your clipboard go back to the Ubuntu shell and do the following:

```sh
vim appicon.svg
```

Next press `i` to enter insertion mode in Vim.

Then paste the contents of the clipboard into the file with `Ctrl+V` (Windows) or `Cmd+V` (Mac). You’ll see the file fill up. Wait until it finishes and then save and exit the file by pressing `Esc` followed by `:wq` and finally `Enter`.

Verify the file exists and has a size greater than `0` by typing `ll` at the command line after exiting Vim.

You’re now ready to run the script to create the iOS assets.

## Run the resize script to create asset images

To run the resize script simply type the following from the command line in the directory where your new image resides:

```sh
./resize.sh appicon.svg
```

You’ll see some verbose output as the script goes to work rasterizing your SVG into PNG bitmap images of various sizes for iOS. Wait for it to finish and then type `ll` again. You should see something like this:

```
root@63041193137f:/App-Icon-Template# ll
total 236
drwxr-xr-x  3 root root  4096 Jun  3 15:05 ./
drwxr-xr-x 40 root root  4096 Jun  3 15:02 ../
drwxr-xr-x  8 root root  4096 Jun  3 14:45 .git/
-rw-r--r--  1 root root 35188 Jun  3 14:45 AppIconTemplate.svg
-rw-r--r--  1 root root  1550 Jun  3 14:45 README.md
-rw-r--r--  1 root root 24446 Jun  3 15:05 appicon-1024.png
-rw-r--r--  1 root root   825 Jun  3 15:05 appicon-29.png
-rw-r--r--  1 root root  1426 Jun  3 15:05 appicon-29@2x.png
-rw-r--r--  1 root root  2026 Jun  3 15:05 appicon-29@3x.png
-rw-r--r--  1 root root  1065 Jun  3 15:05 appicon-40.png
-rw-r--r--  1 root root  1962 Jun  3 15:05 appicon-40@2x.png
-rw-r--r--  1 root root  2850 Jun  3 15:05 appicon-40@3x.png
-rw-r--r--  1 root root  1244 Jun  3 15:05 appicon-50.png
-rw-r--r--  1 root root  2174 Jun  3 15:05 appicon-50@2x.png
-rw-r--r--  1 root root 11019 Jun  3 15:05 appicon-512.png
-rw-r--r--  1 root root  1501 Jun  3 15:05 appicon-57.png
-rw-r--r--  1 root root  2540 Jun  3 15:05 appicon-57@2x.png
-rw-r--r--  1 root root  2850 Jun  3 15:05 appicon-60@2x.png
-rw-r--r--  1 root root  3817 Jun  3 15:05 appicon-60@3x.png
-rw-r--r--  1 root root  1830 Jun  3 15:05 appicon-72.png
-rw-r--r--  1 root root  3323 Jun  3 15:05 appicon-72@2x.png
-rw-r--r--  1 root root  1874 Jun  3 15:05 appicon-76.png
-rw-r--r--  1 root root  3475 Jun  3 15:05 appicon-76@2x.png
-rw-r--r--  1 root root 41998 Jun  3 15:05 appicon.svg
-rw-r--r--  1 root root 11019 Jun  3 15:05 iTunesArtwork.png
-rw-r--r--  1 root root 24446 Jun  3 15:05 iTunesArtwork@2x.png
-rwxr-xr-x  1 root root  1445 Jun  3 14:45 resize.sh*
```

If you see that, it worked. Now go ahead and create an archive of those files so we can pull them out of the container in a later step.

## Create an archive of the image assets

With our assets created we’ll need an easy way to extract them from the Docker container and back onto the host machine (your machine). To do this back out one directory and use the tar utility, like so:

```
cd ..
tar czf appicons.gz.tar App-Icon-Template
```

Verify it worked by typing `ll`. You should see a sizable gzipped tar file named `appicons.tar.gz` in the working directory.

And that’s that. Now type `exit` to exit the Docker container, saving your changes automatically. You’re now ready to copy the archive out of the container.

## Copy the archive out of the container

With the archive created and the container `exit`ed you’re ready to copy the archive out of the container. To do this run the following, which’ll pull the file from the latest docker image created (which happened automatically when you exited):

```sh
docker cp $(docker ps -alq):appicons.tar.gz .
```

You can then extract the archive containing the images and get back to doing what you love most.

# Wrapping up

In this post we learned how to run a script to automatically generate icons for iOS apps using an existing SVG image. Currently [the script](https://github.com/theherk/App-Icon-Template/blob/master/resize.sh) supports up to iOS 8, so please help keep it updated in the future.

For additional information on creating App Icons, including file naming conventions, please refer to Apple's *iOS Human Interface Guidelines*.

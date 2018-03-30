---
title: "Simple websites with Jekyll and Docker"
author: Josh Habdas
date: 2015-05-03T01:01:56-05:00
modified: 2017-05-16T11:48:00+08:00
excerpt: "Learn how to host your own simple websites with Jekyll and Docker."
permalink: /simple-websites-jekyll-docker/
tags: [blogging, devops, jekyll, docker, server, webmaster, vm, virtualization, hosting]
categories: [tutorials]
header:
  overlay_image: sailing-boat-679833_1280.jpg
  overlay_filter: 0.5
  caption: "Photo credit: [Counselling](http://pixabay.com/en/sailing-boat-sea-ocean-679833/)"
---
{% include toc %}

Looking to create a simple website but don’t want to pay through the nose for hosting? Get started for free with Jekyll and Docker.

> Learn how to create and host your own static website using Jekyll and Docker

<!--more-->

**Primary Objective:** Create and host simple websites with [Jekyll][2] and Docker using Mark Otto’s beautiful and minimalistic [Lanyon][1] theme.
{: .notice--success}

**Secondary Objective:** Earn some geek cred by learning how to use Jekyll, Docker and Passenger; and learning how to deploy your website from the command line.
{: .notice--success}

# Create Docker image

Alright, now onto the fun stuff! In this section we’re going to clone a seed for our Jekyll site and use it to create a Docker image we can run the same site both locally and on a server.

**Tip:** Never used Docker before? No worries! Just head over to the [Docker Jumpstart](http://odewahn.github.io/docker-jumpstart/) by Andrew Odewahn to start learning.
{: .notice--info}

## Install Docker

Docker is designed to run on a variety of platforms including macOS, Windows and several varieties of Linux. To get Docker head to [Install Docker](https://docs.docker.com/engine/installation/) on the docker docs website. Please install Docker before proceeding.

## Clone Jekyll seed

In order to build a Docker image to run our Jekyll site we need an actual site to start with. Rather than creating one from scratch we’re going to use an open-source seed called [Lanyon][1] by Mark Otto. Go ahead and **clone it now**:

    git clone https://github.com/poole/lanyon.git lanyon && cd $_

**Tip:** Looking for something more complex than Lanyon? Check out some [wonderful themes](https://mademistakes.com/work/jekyll-themes/) by Michael Rose.
{: .notice--info}

## Configure Docker host container

Next we’ll configure a Docker container to host a Docker image we can use to run our site on DigitalOcean. Start by creating a `Dockerfile`, `Gemfile` and `nginx.conf` file in the root folder of the cloned Jekyll seed, modeling from the following:

{% gist jhabdas/e0d5e3bed0316f1a5783 %}

What this will do is build a container image based off a container called [passenger-docker](https://github.com/phusion/passenger-docker), exposes traffic on 80 for port-forwarding, copies the site into the container, builds the site using Jekyll, configures Nginx to use it and then serves the whole thing up using [Passenger](https://www.phusionpassenger.com).

## Install Ruby dependencies

The dockerfile wants a file you don't have yet called `Gemfile.lock`. To create it [use Bundler](http://bundler.io/) from the *same directory* as the `Gemfile`:

    bundle install

Once the lock file is created you're ready to build the container image.

## Build and run container image locally

Once the container is configured go ahead and **build the container** image like so:

    docker build --rm .

The above builds the Docker image, removing intermediate containers after a successful build. It may take a moment while Docker *pulls* dependent layers. Once completed, however, dependent layers will be cached during subsequent builds.

After the build completes, get a listing of images:

    docker images

Look at the top of the resulting list and **copy the Image ID** of the most recent entry.

**Run the image** in the background, publishing port 80 on the container to port 80 to the host:

    docker run -d -p 80:80 b64bea84255a

Verify the container is running with:

    docker ps

In this list look for an active container, meaning the image is up-and-running on port 80.

## Connect to Jekyll site

With the container image still running, confirm it’s serving up our Jekyll site:

`curl $(boot2docker ip)` on Windows or Mac; or,
`curl localhost` on Linux.

You can even connect to the above IP using a web browser. If everything’s working correctly you should see something like this:

[![Jekyll site running in a browser](/images/docker-passenger-lanyon.png)](/images/docker-passenger-lanyon.png)

That wasn't so tough now, was it? Now that we’ve got a simple Jekyll website running under Docker let’s go ahead and deploy it to DigitalOcean.

# Configure Server for Docker deployments

With the Docker image created we're ready to host our site. For simplicity we’ll use DigitalOcean and take advantage of their 1-click Docker installation.

If you don’t already have a DigitalOcean account you may [use my referral code](https://m.do.co/c/9d5c1c681fd0){: .btn .btn--inverse} for 2 months FREE. After that it's only five bucks a month for your own <abbr title="Virtual Private Server">VPS</abbr>.

If you’re not planning to use DigitalOcean the steps below can be adapted for other IaaS providers (e.g. AWS).
{: .notice}

## Create Docker Droplet

Login to [DigitalOcean Control Panel](https://cloud.digitalocean.com/droplets/) and choose **Create Droplet**. Complete the subsequent form, selecting the $5/mo. size option and, in the *Select Image* section, click *Applications* and choose **Docker** as shown below.

![DigitalOcean Droplet creation with Docker App selected](/images/digitalocean-docker-app.png "Select Docker in the DigitalOcean Control Panel during Droplet creation.")

Then **Add SSH Key** and create your Droplet. Provisioning should finish in a matter of seconds all thanks to your handy clickwork.

## Create new user

Once the new Droplet is active we should create a new user so we’re not always executing commands as root[^1].

First, **open a console** such as [iTerm 2](http://iterm2.com/) or [cmder](http://gooseberrycreative.com/cmder/) and SSH as root using the IP of the Droplet you created, e.g.

    ssh root@45.55.234.56

**Note**: If this is the first time connecting you’ll be prompted regarding host authenticity. Enter `yes` to continue connecting.

(Assuming you added SSH keys when creating the droplet you should now be connected to the droplet and logged in as *root*. Otherwise, enter the password to continue.)

Next, **create a new user** called `deployer` and give them super user privileges as described in [How To Add and Delete Users on an Ubuntu 14.04 VPS](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-an-ubuntu-14-04-vps). Once complete `exit` SSH to end the remote connection. Next we’ll give the new user password-free access to the Droplet.

## Add SSH key for deployer

With the new user created we can **add an SSH key** for them with the following command:

    cat ~/.ssh/id_rsa.pub | ssh deployer@HOST "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

Where `HOST` is the IP of the Droplet.

You will be prompted for the password — go ahead and enter it. From now on you will no longer have to enter the password for this user while connecting from this machine.

# Run the site on DigitalOcean

To run our Jekyll site on our Droplet we’ll first create an archive of the site source. Then we'll upload the site source to DigitalOcean, build and run it.

## Upload site

Now that we’ve got a functional container image let’s go ahead and use it on DigitalOcean Droplet with Docker pre-installed.

First commit any changes you’ve made and **create a gzipped tarball** of the source code in `master`:

```
git add -A && git commit -m "All the things"
git archive -o app.tar.gz --prefix=app/ master
```

**Tip:** At this point you'll want to push your changes to your own repo on GitHub. There are several ways of accomplishing this. Check out [Fork a Repo](https://help.github.com/articles/fork-a-repo/) for more information.
{: .notice--info}

Next use Secure copy to **transfer the site’s source files** from the current host to the Droplet and rebuild the container image there:

    scp app.tar.gz deployer@HOST:

Where `HOST` is the IP of the Droplet created earlier. This will copy the site archive to the server where it can be built and run.

**Note:** Be sure you copy the source files and not the Docker image as the built image will be approximately 400 times larger than the gzipped tarball.
{: .notice--warning}

## Build and run container image remotely

With the app source uploaded to the server we’re ready to build and run the container image remotely. To do this first login to the remote server:

    ssh deployer@HOST

Where `HOST` is the IP of the Droplet.

Once logged in to the remote, unarchive and build the site, tagging it `webapp` to give it a more friendly name:

    tar zxvf app.tar.gz && docker build -t webapp app/

Once the container image is built, run it on port 80 for both host and container:

    docker run --rm -p 80:80 webapp

*Note:* Run the above with the `-d` flag once you’ve confirmed the site is up to keep it running.

## Confirm Docker web server is up

Now that the site’s up and running you can test it by browsing to `http://HOST/` where `HOST` is the IP of your Droplet. If everything worked you should be staring at the same Jekyll site you saw on your local machine earlier.

## Stopping the site

When we're ready to bring your site down you can do so doing the following on the remote server:

    docker stop $(docker ps -lq)

# Wrapping up

In this tutorial we learned how to create simple websites with Jekyll and Docker. Additionally we learned a simple workflow to deploy them to DigitalOcean via the command line, using Passenger to serve them with minimal required configuration.

# Extra credit

Here are some ideas for things try next once you’re happy with the look-and-feel of your new Jekyll site:

- Host your Docker container on [DockerHub](https://registry.hub.docker.com/u/jhabdas/habd.as/). They'll even automatically build images for you when you commit to GitHub or BitBucket.
- Install [Octopress 3](https://github.com/octopress/octopress) and learn how it can be used to simplify the process of managing pages and posts.
- Automate the deployment process using [drone](https://github.com/drone/drone) or [Octopress](https://github.com/octopress/deploy) and let us know how you did it in the comments section below.
- Learn about and set-up zero-downtime deployments using a proxy and tools such as [flocker](https://github.com/ClusterHQ/flocker) or [Ansible](http://www.ansible.com/).
- [Sign-up for a free CloudFlare](https://www.cloudflare.com/sign-up) account and use the CDN to boost site performance.
- Purchase a vanity domain name and use it to route DNS traffic to CloudFlare or directly to the app running on the Droplet.

---

[^1]: It’s all fun and games until someone jails the root user.
[1]: http://lanyon.getpoole.com/ "Example of Lanyon theme by Mark Otto"
[2]: http://jekyllrb.com/ "Transform your plain text into static websites and blogs."

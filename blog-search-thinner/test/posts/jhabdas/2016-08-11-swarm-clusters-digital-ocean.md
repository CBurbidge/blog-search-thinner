---
title: Swarm Clusters on Digital Ocean
author: Josh Habdas
date: 2016-08-11T00:08:32-05:00
excerpt: Learn to use Docker Swarm with Digital Ocean in under 10 minutes.
categories:
  - tutorials
tags:
  - devops
  - docker
  - cloud
  - architecture
header:
  overlay_image: quadcopter-1452119_1280.jpg
  overlay_filter: 0.5
  teaser: quadcopter-1452119_640.jpg
---

## Introduction

Lately I've been learning more about cloud architecture, [Lambda](https://aws.amazon.com/lambda/), [Serverless](http://serverless.com/) [AWS CLI](https://aws.amazon.com/cli/) and---now that [it's a part of Docker Machine](https://skillsmatter.com/skillscasts/8377-docker-london-meetup)---CLI-based Docker administration using [Docker Swarm](https://docs.docker.com/swarm/overview/). One thing I'm particularly geeked about is the [Docker Private Beta](https://beta.docker.com/), so I can begin experimenting with the new Docker Swarm and AWS.

But until I get into the beta group the best I can do is begin experimenting with Docker Swarm using one of my favorite prototyping tools (besides the Raspberry Pi): Digital Ocean. And you can too.

> In this post you will learn how to use the command line to create a Docker Swarm cluster with Machine on Digital Ocean, and use it to create a Swarm service runing 6 nginx containers spread across two different nodes in the cloud.

Sound good? Let's get started!

## Getting started

A few administrative things before we get going.

### Prerequisites

Before we start you'll need an account with Digital Ocean. If you don’t already have an account you may [use my referral code](https://m.do.co/c/9d5c1c681fd0){: .btn .btn--inverse} for $10 in free credits.

Once your account is created use Digital Ocean to [generate a Personal Access Token](https://cloud.digitalocean.com/settings/api/tokens) for use with Docker Swarm and save the token in your [password manager of choice](/managing-passwords-on-android/) for later retrieval.

Also, be sure you install [Docker for OS X](https://docs.docker.com/engine/installation/mac/), or [Docker for Windows](https://docs.docker.com/engine/installation/windows/) if that's your thing. This will give you the most up-to-date version of Docker and Docker Machine.

**Note:** If you're already running Docker be sure you're updated to `v1.12` or better for use of Swarm from the Docker Machine CLI tool. Use `docker -v` from the command line to check your current Docker version.
{: .notice--info}

Last thing is to ensure you've generated SSH keys on your machine. To do so, or verify you've already done so, head over to [Generating an SSH key](https://help.github.com/articles/generating-an-ssh-key/) and get 'er done.

## Generate a Swarm token

Once the administrative stuff is taken care of, we need to generate a Swarm token to allow our two Digital Ocean droplets to communicate with one another. And we'll want to export it as an environment variable to be used in later steps.

    docker run swarm create
    export SWARM_CLUSTER_TOKEN=b0e892bd81e0381cce93e5a1e1600b64

Run these commands in sequence. The first command will generate and output the Swarm token. The second command will export it as an environment variable.

**Tip:** If you run into any friction here see [Provision a host to generate a Swarm token](https://docs.docker.com/swarm/provision-with-machine/#/provision-a-host-to-generate-a-swarm-token).
{: .notice--info}

## Provision Swarm nodes on Digital Ocean

Next we'll use the command line to create and cluster two Swarm nodes on Digital Ocean.

**Heads Up:** These steps will automatically create two $5/mo. droplets. I'll remind you to destroy these droplets later in the article so you're not charged more than a handful of pennies to run this experiment.
{: .notice--warning}

Start by exporting the Digital Ocean API token created earlier as an environment variable on your machine:

    export DIGITAL_OCEAN_TOKEN=51d1e4532d3943dfd033a053a506bf15489569db035b3374e87d80fc4cc01505

Then run the following to provision the first Swarm node, which will become the master device (or leader):

    docker-machine create \
    --driver digitalocean \
    --digitalocean-access-token ${DIGITAL_OCEAN_TOKEN} \
    --digitalocean-region nyc3 \
    --digitalocean-size 512mb \
    --swarm --swarm-master \
    --swarm-discovery token://${SWARM_CLUSTER_TOKEN} \
    swarm-manager

Next, create a second, slave node:

    docker-machine create \
    --driver digitalocean \
    --digitalocean-access-token=${DIGITAL_OCEAN_TOKEN} \
    --digitalocean-region=nyc3 \
    --digitalocean-size=512mb \
    --swarm \
    --swarm-discovery token://${SWARM_CLUSTER_TOKEN} \
    swarm-agent

## Verify nodes created

To verify the host nodes were created as expected run the following from the command line:

    docker-machine ls

You should see output like the following:

    NAME            ACTIVE   DRIVER         STATE     URL                          SWARM                    DOCKER    ERRORS
    swarm-agent     -        digitalocean   Running   tcp://104.131.163.130:2376   swarm-manager            v1.12.0   
    swarm-manager   -        digitalocean   Running   tcp://104.236.207.117:2376   swarm-manager (master)   v1.12.0

If you do, you're golden. If not, you can `docker-machine rm <NAME>` to backtrack here and in the coming steps.

**Note:** Removing a machine using the `digitalocean` driver will also destroy the associated droplet and, therefore, whatever is removed will need to be recreated in order to continue.
{: .notice--info}

## Connect node environments with Machine

Connect to manager node and initialize swarm on it with the following:

    eval $(docker-machine env swarm-manager) && \
    docker swarm init --advertise-addr $(docker-machine ip swarm-manager)

This will attach the shell to the manager node, initialize Swarm and advertise the IP. Once run, you should see output similar to the following:

```
Swarm initialized: current node (8uaq2r536t4mgs6ci95yqmf5m) is now a manager.

To add a worker to this swarm, run the following command:
    docker swarm join \
    --token SWMTKN-1-1zm9fvpvk03vwxasrxjk6y7lueor77789ip2xfo0czmny3tvui-evnoe2a0x0ygex88vl3io9n1f \
    104.236.207.117:2377
```

Now, switch your shell to the slave machine

    eval $(docker-machine env swarm-agent)

Then run the `join` command output earlier to add a worker slave to the swarm:

    docker swarm join \
    --token SWMTKN-1-1zm9fvpvk03vwxasrxjk6y7lueor77789ip2xfo0czmny3tvui-evnoe2a0x0ygex88vl3io9n1f \
    104.236.207.117:2377

If all goes well you should see the following message:

    This node joined a swarm as a worker.

Verify everything worked as expected by switching to the manager swarm node (using the `--swarm` flag) and get info about the swarm:

    eval $(docker-machine env --swarm swarm-manager) && \
    docker info

```
...
Nodes: 2
 swarm-agent: 104.131.163.130:2376
  └ ID: DKKE:XMMP:Y274:4N5H:CW6T:Z5CD:5I3H:KI35:RL77:DY3J:3D3F:ALDX
  └ Status: Healthy
  └ Containers: 1 (1 Running, 0 Paused, 0 Stopped)
  └ Reserved CPUs: 0 / 1
  └ Reserved Memory: 0 B / 512.9 MiB
  └ Labels: kernelversion=4.4.0-31-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=digitalocean, storagedriver=aufs
  └ UpdatedAt: 2016-08-11T01:49:27Z
  └ ServerVersion: 1.12.0
 swarm-manager: 104.236.207.117:2376
  └ ID: CLGE:ZQ5P:QI5P:2JYD:K53Z:2M2M:AQ4S:24DQ:PKOP:MNVG:JGNB:QVNV
  └ Status: Healthy
  └ Containers: 2 (2 Running, 0 Paused, 0 Stopped)
  └ Reserved CPUs: 0 / 1
  └ Reserved Memory: 0 B / 512.9 MiB
  └ Labels: kernelversion=4.4.0-31-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=digitalocean, storagedriver=aufs
  └ UpdatedAt: 2016-08-11T01:49:28Z
  └ ServerVersion: 1.12.0
...
```

You should see 2 nodes among the output. If you do everything is working as expected.

## Run Nginx replicated across nodes

Now for the fun part. We're going to create a Docker Swarm service that consists of six running Nginx containers, spread equally across the nodes of our Swarm cluster.

**ProTip:** To gain more control over how the clustering is done check out the posts in the [Acknowledgements](#Acknowledgements) section below.
{: .notice--info}

First switch to the manager node (notice how `--swarm` is omitted, unlike in previous steps):

    eval $(docker-machine env swarm-manager)

Then create the service:

    docker service create --name webserver -p 8000:80 --replicas 6 kitematic/hello-world-nginx

Seeing is believing so let's check that the services have been created by using the `docker service ps` sub sub command:

    docker service ps webserver

If everything worked correctly you should see something similar to the following:

    ID                         NAME         IMAGE                        NODE           DESIRED STATE  CURRENT STATE               ERROR
    c9m65b4efoz1026o6e3k8yvpv  webserver.1  kitematic/hello-world-nginx  swarm-agent    Running        Running about a minute ago  
    66y7fwei2i3k863lyvdf2e202  webserver.2  kitematic/hello-world-nginx  swarm-manager  Running        Running about a minute ago  
    4hqsepx7cgkdlgby7wtjrntx8  webserver.3  kitematic/hello-world-nginx  swarm-manager  Running        Running about a minute ago  
    3inowh5wxm5zymqva4kv7ksf9  webserver.4  kitematic/hello-world-nginx  swarm-agent    Running        Running about a minute ago  
    72mkdmm0l36702m9g24xnkaa7  webserver.5  kitematic/hello-world-nginx  swarm-manager  Running        Running about a minute ago  
    2dz8zmaf9ijqmhcnwq9c3mtfm  webserver.6  kitematic/hello-world-nginx  swarm-agent    Running        Running about a minute ago  

Wow! Isn't that amazing!? Open either of two nodes in a web browser with:

    open http://$(docker-machine ip swarm-agent):8000
    open http://$(docker-machine ip swarm-manager):8000

Voilà! Your Nginx container is running!

![Screenshot of nginx running from a swarm orchestrated container.](/images/docker-swarm-nginx-viola.png)

## Wrapping up

In this post you learned how to use the command line to create a Docker Swarm cluster with Machine on Digital Ocean, and use it to create a Swarm service running 6 nginx containers spread across two different nodes in the cloud.

Before you move on with your day **be sure to destroy the Swarm nodes created** so you don't get charged more than the handful of pennies it took to run this experiment:

    docker-machine rm swarm-manager
    docker-machine rm swarm-agent

Confirm all nodes were removed by [inspecting your droplets](https://cloud.digitalocean.com/droplets) on Digital Ocean.

Thanks for joining the swarm. If you have any questions or comments please let me know in the discussion section below.

## Acknowledgements

This post wouldn't have be possible without inspiration and guidance from following sources:

- [Swarm Machines or Having fun with Docker Machine and the new Docker Swarm orchestration](http://blog.hypriot.com/post/swarm-machines-or-having-fun-with-docker-machine-and-the-new-docker-swarm-orchestration/)
- [Running Docker Machine on Digital Ocean](http://networkstatic.net/running-docker-machine-on-digital-ocean/)
- [Create a Docker Swarm](https://blog.cloudandheat.com/index.php/en/2016/04/25/create-a-docker-swarm/)

---
title: Chat Applications With Redis, Docker and Go
author: Josh Habdas
date: 2016-03-20T16:31:10-05:00
excerpt: Create your own web-based chat app using Docker and Go.
categories: [tutorials]
tags: [redis, golang, docker]
header:
  overlay_image: phone-735062_1280.jpg
  overlay_filter: 0.5
  teaser: phone-735062_500x309.jpg
---
For several weeks I've been thinking about how to go about creating a chat application. After a knowledge drop from [Kent Safranski](http://fluidbyte.net/) I was inspired to stand-up the chat app using Redis. For the experiment I decided to use Go given the [concurrency affordances][2] baked into the language. So I took [A Tour of Go] and hit the blogs to see what I could find in the open source community.

Reading [Redis, Go, & How to Build a Chat Application] made me aware of [Redigo], a Go client for Redis, and helped demystify use of Redis' [PubSub][1] with Go. The article was a solid introduction and did a great job breaking things down, but ultimately left me wanting a prototype to try things out on the Web. After some more sleuthing on [DuckDuckGo] I discovered an open source demo app meeting my requirements and providing a great sandbox for experimentation.

> In this article I'll cover how to create a chat application which uses Redis and Go by leveraging open source software and Docker, and use Ngrok to expose the app to the Web over HTTPS.

## Getting started

Before continuing you will need to install Docker on your machine. Instructions are available for [Mac OS X](https://docs.docker.com/mac/), [Windows](https://docs.docker.com/windows/) and [Linux](https://docs.docker.com/linux/).

## Clone and build demo chat app

Once Docker is installed and functional, clone the application and build it with the following:

```
git clone git@github.com:heroku-examples/go-websocket-chat-demo.git chat-demo && cd $_
docker-compose build web
```

The above build target will pull dependent Docker layers on first run and may take some time depending on your system, connection speed and size of layers. However, once downloaded, dependent layers will be cached and the app can be rebuilt in a matter of seconds.

You'll know the build finished successfully when you see a message like the following:

    Successfully built 6f907287650a

## Run chat application

Once the application is successfully built run it with the following:

    docker-compose up web

The above step will start the app, connect to Redis running locally inside the Docker container and expose port `8080` from the virtual machine to the host, allowing us to expose traffic to the web.

Before we do, however, let's verity the app is serving HTTP requests with:

    curl $(docker-machine ip default):8080

If you get a response back you may proceed to the next section. If not, and you're running Docker under OS X or Windows, try restarting the virtual machine and rebuilding.

## Expose traffic to WWW

Once the application is running, let's go ahead and expose traffic to the Web and allow users to join the chat over a secure HTTPS connection from anywhere in the world. To do so we'll use a tool called [Ngrok] running in another terminal window/tab.

Go ahead and [download Ngrok](https://ngrok.com/download) if you haven't already.

**Tip:** Homebrew users on OS X can install Ngrok from the command line using `brew install ngrok`.
{: .notice--info }

Once installed, run it to open a tunnel to the application running in Docker with the following command, which should look somewhat familiar now:

    ngrok $(docker-machine ip default):8080

When run Ngrok will provide a forwarding URL you can share with others to test chat with multiple users over the Web. Here's an example URL provided by Ngrok which is sharable with others:

    https://1fdc391e.ngrok.com

An HTTP URL is also provided by Ngrok, though HTTPS is preferable for increased privacy during chat.

## In Summary

In this tutorial I've covered how to run and serve a chat application to the Web in a secure way using open source technology for the purposes of experimenting with Redis and Go. Now that we've got an app running locally it we can apply the theoretics learned online with concrete experimentation in our new chat sandbox application. Go ahead and try modifying some of the code and rebuilding the app to see what happens. And please share your experiences and learnings with the rest of us using the comment section below.

[1]: http://redis.io/topics/pubsub
[2]: https://golang.org/doc/faq#csp
[A Tour of Go]: https://tour.golang.org/
[DuckDuckGo]: https://duckduckgo.com
[Go Websocket Chat Demo]: https://github.com/heroku-examples/go-websocket-chat-demo
[Redigo]: https://github.com/garyburd/redigo
[Redis]: http://redis.io/
[Redis, Go, & How to Build a Chat Application]: https://www.compose.io/articles/redis-go-and-how-to-build-a-chat-application/
[Ngrok]: https://ngrok.com/

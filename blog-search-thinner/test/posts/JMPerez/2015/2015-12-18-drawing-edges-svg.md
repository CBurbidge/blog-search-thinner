---
layout: post
title: Drawing images using edge detection and SVG animation
date: 2015-12-18 10:42:00+01:00
description: Using SVGs to achieve a cool drawing effect
image:
  url: /assets/images/posts/contour.gif
  width: 345
  height: 380
tags:
  - images
  - ux
permalink: drawing-edges-svg
---

Back in the days SVG was barely used and supported. Some time after we started using them as an alternative to classic bitmaps for some icons, and finally we discovered it was the holy grail for providing responsive graphics. The flat and clean design trends have also make SVG as a very useful image format.

But SVG allows for even cooler features, thanks to the ability of modifying it using CSS and JS. And with some clever techniques we can make fun things, like _drawing_ the borders of an image.

<!-- more -->
If you are like me and like to see the final result before going through a wall of text, here is a video that shows the result of applying this effect to a couple of images:

<video controls style="max-width:100%" width="718" height="756">
  <source src="/assets/images/posts/contour.mp4" type="video/mp4">
</video>

## Animate SVGs to achieve a _drawing_ effect

One of the applications I like is path animation. This draws slowly the lines that compose the SVG. If you don't know what this is about, please check [Polygon's reviews for PS4](http://www.polygon.com/a/ps4-review) and [Xbox One](http://www.polygon.com/a/xbox-one-review). The effect is achieved by applying transitions to the `stroke-dashoffset` of SVG polylines.

Some time ago I played with [this technique and the vector version of the Spotify logo](https://github.com/JMPerez/spotify-logo-svg-drawing-animation):

{% codepen jmperez rxxRRg 0 result 403 %}

This was based on [the SVG Animation (Polygon.com PS4 Review) pen by Derek Palladino](http://codepen.io/derekjp/pen/KIGFe/), who reproduced Polygon's drawings.

## Applying the technique to bitmap images

Then one day I started thinking of drawing the contours of bitmap images. I would detect the contours of an image using canvas, and then I would create segments of adjacent points. As expected, some smart people have already worked on these things before, and I pretty much just had to put it together.

That's how I created Contour. The project is [on GitHub](https://github.com/JMPerez/contour), so feel free to clone it and tweak it. And if you want to try it out right now, I have embedded it right here:

<iframe src="https://jmperezperez.com/contour/" width="100%" height="500"></iframe>

You can drag and drop any image. It will work better with images with areas with high contrast.

You may wonder how this works, who doesn't?

### Canvas

First, the image that you drop is drawn into a canvas that has a maximum size. If the image exceeds that size, it is downscaled. This allows us to process larger images without making the browser become super slow. The smallest the canvas, the fastest, but also the less accurate would be the SVG lines.

Then, there is the core process: detecting edges and creating SVG lines out of them.

### Canny edge detector

I read about the [Canny edge detector](https://en.wikipedia.org/wiki/Canny_edge_detector) trying to find an algorithm that detected the edges from an image, and then found a JS implementation. [Canny JS](https://github.com/yuta1984/CannyJS) is one of them, and performs well. However, in the end I chose [Jade Misenas's project](https://github.com/cmisenas/canny-edge-detection) because I could visualise better the steps of the algorithm and it resulted in longer lines with fewer gaps. This is important, since we need to be able to generate SVG lines by following the pixels that are part of the edge.

By the way, if you want to learn more about edge detection, I recommend you to have a look at [the video Finding the Edges (Sobel Operator)](https://www.youtube.com/watch?v=uihBwtPIBxM), that explains one of the operators that can be used when performing edge detection.

### Tracing the edge

To obtain the SVG lines I used [Doodle3D's Contour finding experiment](https://github.com/Doodle3D/Contour-finding-experiment), which I eventually simplified a bit. The idea is to traverse the canvas and, once we find a white pixel (edge), we follow the nearby pixels to compose the line.

One we have a set of lines, we create one SVG polyline per contour, using the pixels as points. There are some improvements we can do here:

- Simplify polyline to remove points that don't contribute to the line, that is, they can fall behind a longer segment. An example is having a horizontal line spanning through several pixels, that can be defined by 2 points instead of a line with 1 point per pixel. Doing this saves potentially lots of points, especially if there are lots of vertical or horizontal lines.

- Smooth the polyline to match better arcs or diagonal lines that produce a stairstep-like line. In the project this is achieved by using half of the points to draw the image. The result is not that close to the border, but helps reducing those stairstep-like lines.

- Use web workers to do the detection of the contour. This would prevent the browser from freezing for a few milliseconds.

## Applications

The effect is cool by itself and doesn't take long to compute. The browser needs the image to create the SVG lines, but this could be stored somewhere and be served as inlined SVG or a standalone SVG file. And doing this we suddenly have found a way to start _rendering_ an image without having downloaded it yet. Also, note that SVG is highly compressible and we have full control of how many lines and points we want to use to represent the image.

If you have been following this blog, I have been talking lately about techniques to load images in a progressive way, with the [_blur up_ technique used by Medium](/medium-image-progressive-loading-placeholder/) and the use of [WebP as placeholders](/webp-placeholder-images/).

So I see this drawing effect as not only a fun thing to do with images, but also a way to provide a _placeholder_ while the final image is downloaded.

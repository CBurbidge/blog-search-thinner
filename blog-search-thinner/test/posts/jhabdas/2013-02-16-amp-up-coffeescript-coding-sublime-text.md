---
title: Amp up CoffeeScript coding with Sublime Text
author: Josh Habdas
date: 2013-02-16
categories:
  - tutorials
tags:
  - css
  - debugging
  - git
  - github
  - ide
  - javascript
  - coffeescript
  - programming
  - version control
  - editors
---
Sublime Text with [CoffeeScript][1] is a JavaScript developer's dream, but one that doesn't evaporate in the fog of sleep shortly after waking. After learning about Sublime Text at Fluent Conf 2012 during a [plenary talk by Paul Irish][2], I immediately began looking for ways to incorporate it into my workflow. And now, after having used it for over 8 months in my day-to-day work, I wanted to share a quick primer for those who want to amp up CoffeeScript coding with Sublime Text too.

<!--more-->

But first thing's first, go and [download Sublime Text][3]. The app is nagware until you purchase a license and register it, which I ended up doing after a couple of months of periodic and persistant annoyance (and, of course, once I realized how utterly awesome Sublime Text was). The licences are per-user, and not per-machine, meaning that users can purchase the app once and enjoy it on multiple machines using the same license. It almost feel's like [pirating][4]--but it's not.

![Registered version of Sublime Text 2 running under Windows 8](//s3.amazonaws.com/images.habdas.org/st2.png)

In the above image we have a CoffeeScript file open, but all the code visible in the editor appears in a chilling bone white. How is that going to amp up coding speed? Simple: it's not. So next step is to install some syntax highlighters and, while at it, some other useful packages as well.

> By default, Sublime Text does not come with support for CoffeeScript.

To install the CoffeeScript syntax highlighter and other packages in Sublime Text with ease, we're gonna need a package manager. Fortunately, there's already one available, appropriately named <a href="http://wbond.net/sublime_packages/package_control">Sublime Package Control</a>. Go ahead and install that now.

With the package manager installed, use it to install the <a href="https://github.com/Xavura/CoffeeScript-Sublime-Plugin">CoffeeScript</a> package if using ST2 or [Sublime Better CoffeeScript](https://github.com/aponxi/sublime-better-coffeescript) for ST3. Once installed successfully, CoffeeScript files (those ending in the `.coffee` extension) opened after the package is installed will begin appearing with syntax highlighting, like magic.

![Sublime Text 2 showing CoffeeScript syntax highlighting](//s3.amazonaws.com/images.habdas.org/st2-coffee_hilight.png)

Syntax highlighting isn't the only thing the CoffeeScript package does. It also provides a number of convenience code snippets and other facilities to help make working with CoffeeScript easy peasy. But one thing the CoffeeScript add-on for Sublime Text doesn't do is static code analysis such as linting. However, with Sublime Package Control, adding linting capabilities for CoffeeScript, as well as many other popular languages, is as easy as a few keystrokes and the installation of the <a href="https://github.com/SublimeLinter/SublimeLinter">SublimeLinter</a>. And presto! Now all you have to worry about for the most part are logic errors and workflow snafus. Unfortunately, the only known method for coping with those that I'm aware of are experience, a curious mind and constant experimentation to find what works best for you.

In summary, this primer has shown how to use a combination of tools to amp up CoffeeScript coding with Sublime Text for a better, faster and easier coding experience. The article covered installation of Sublime Text and Sublime Package Control, as well as two packages to help streamline CoffeeScript coding. Now, when the JS developer wakes up, they'll be dreaming up the next innovative web application rather than the tools needed to build it.

## Related Sublime packages to try

- [js2coffee](https://github.com/rstacruz/js2coffee) can be used to convert existing JavaScript files
- [CoffeeCompile](https://github.com/surjikal/sublime-coffee-compile) allows you to compile some or all of your CoffeeScript

## Other Sublime bundles worth checking out

- [Git](https://github.com/kemayo/sublime-text-2-git) enables easy code management using the Git DCVS
- [Stack Overflow](https://github.com/ericmartel/Sublime-Text-2-Stackoverflow-Plugin) allows quick knowledge base searches from within the editor
- [Stylus](https://github.com/billymoon/Stylus), [LESS](https://github.com/danro/LESS-sublime) and [Sass](https://github.com/nathos/sass-textmate-bundle) provide CSS preprocessor support as needed
- [Handlebars](https://github.com/daaain/Handlebars) adds syntax highlighting and tab triggers for commonly used block helpers
- [Tag](https://github.com/SublimeText/Tag) helps facilitate writing HTML

 [1]: http://coffeescript.org/
 [2]: http://www.youtube.com/watch?v=f7AU2Ozu8eo
 [3]: http://www.sublimetext.com/download
 [4]: http://xkcd.com/553/

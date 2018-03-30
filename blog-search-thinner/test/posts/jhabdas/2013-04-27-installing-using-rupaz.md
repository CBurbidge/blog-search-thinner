---
title: Installing and using rupa/z
author: Josh Habdas
date: 2013-04-27
categories:
  - tutorials
tags:
  - linux
  - productivity
  - shell
---
[rupa/z][1] is an amazing shell script that allows users to traverse a filesystem in no time flat. Use it if you spend any time at all changing directories in a *nix environment. It will improve productivity and spare fat fingers quite a bit of backpedaling.

z can be installed by curling the script, making it available in path and sourcing it, e.g.

```
cd /usr/local/bin
curl -O https://raw.githubusercontent.com/rupa/z/master/z.sh
chmod 775 z.sh
. /usr/local/bin/z.sh
```

**Note:** Add the `source` command (the last one) to your $HOME/.bashrc or $HOME/.zshrc to ensure z is available after each time the terminal emulator is opened.

Try it out by changing to a few of your most commonly used directories and then issuing the z command, e.g.

```
cd /usr/share/nginx/www
cd ~
z ww # or simply 'z w'
```

While you're at it, checkout the shorthand `ls` feature in **zsh**. It enables typing fuzzy `ls` path parts like `ls /u/l/dtra`, and pressing `TAB` twice to arrive at `/usr/lib/dtrace`. Use `chsh -s /bin/zsh` set **zsh** as your default shell to try it out. You can try it out along with `z` using [my dotfiles](https://github.com/jhabdas/dotfiles).

Speed up your workflow with `rupa/z` and other time-saving affordances to benefit from less repetition and more time doing the stuff you love.

Thanks to Paul Irish, who [demoed rupa/z](http://youtu.be/f7AU2Ozu8eo?t=2m23s) at Fluent 2012. Skip to **2m23s** for the z part of his talk.

<iframe width="560" height="315" src="http://www.youtube.com/embed/f7AU2Ozu8eo" frameborder="0" allowfullscreen></iframe>

 [1]: https://github.com/rupa/z

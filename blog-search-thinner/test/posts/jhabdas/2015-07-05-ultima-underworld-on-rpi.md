---
title: Ultima Underworld Stygian Abyss on RPi 2
author: Josh Habdas
date: 2015-07-05T23:40:50-05:00
excerpt: "Transport your mind back to 1992 with one of the best RPGs of all time."
tags: [rpi, microcomputers, gaming, retro, dos]
categories: [tutorials]
header:
  overlay_image: uw-rpi2_1280.jpg
  overlay_filter: 0.5
  caption: "Ultima Underworld running off my Raspberry Pi"
---

I installed <abbr title="DOSBox is an emulator program that emulates an IBM PC compatible computer running a DOS operating system.">DOSBox</abbr> on my Raspberry Pi today so I could play one of my favorite childhood games: **Ultima Underworld - The Stygian Abyss.** You can [learn more about](http://www.abandonia.com/en/games/193/Ultima+Underworld+-+The+Stygian+Abyss.html) this game on Abandonia. If you like what you see, follow this guide to set it up on your RPi and be instantly transported back in time with this 1992 retro classic.

# Requirements

- Raspberry Pi with Raspbian or similar installed
- Connected to a monitor, mouse, keyboard and speakers
- With network connectivity

# Experience

So far I've been able to get a pretty clean game intro video sequence. Actual gameplay is a bit choppy still, which should improve on the Raspberry Pi 2 with its quad-core 900MHz processor.

**Update 17 Jul 2015:** The game runs great on the RPi 2 Model B running DOSBox from [RetroPie](http://blog.petrockblock.com/retropie/) with [EmulationStation](http://www.emulationstation.org/). Unlike RPi 1 Model B+ there's no chop in the audio, and the video is smooth like butter. You may or may not want to set the *Memory Split* setting under Raspberry Pi *Advanced Options* to 512.
{: .notice--info}

# Getting started

To play first you’ll need to install DOSBox on your Pi. To do so open a terminal emulator and **use apt-get** to install.

```sh
sudo apt-get update && sudo apt-get install dosbox
```

Once complete, test it out by executing `startx` in the terminal and then running the DOSBox Emulator from Menu > Games in the GUI. If it opens and you see a dos prompt your in business.

*Note:* Attempting to run `dosbox` from the console before starting the GUI may cause your Pi to freeze. If it does, disconnect and reconnect the power and complete the above step before continuing.

# Get the game

Abandonia didn't have a downloadable copy of Ultima Underworld 1 so I did a quick Google search and found a working copy of the game on an abandonware site called My Abandonware. Here's the [game download link](http://www.myabandonware.com/game/ultima-underworld-the-stygian-abyss-1l1#download). Go ahead and pull down a copy using the stock browser that came with your Pi's GUI interface. Then unarchive it to the "dosprogs" directory created earlier.

# Set a directory

You'll want a place to store your DOS programs. DOSBox defaults to a directory called "dosprogs", so let's use that. Go ahead and **create the folder** to house your program archive.

```sh
mkdir ~/dosprogs # change to meet your needs
```

The result will be a folder called "dosprogs" in the home directory of the current user. If you're logged in as *Pi* the folder will land under `/home/pi`. This is where you'll store your programs.

# Overclock the device

The days of hardware turbo buttons are long gone. But that doesn't mean you can't get a little extra oomph out of your Pi micro computer anyway. Log-off the current GUI session and **enable Turbo mode** from the Overclocking section after running `sudo RPi-config` from the terminal. You will be prompted to restart your machine if the settings took.

# Configure DOSBox

Once overclocked to *Turbo* mode (1000mhz on a RPi 1 Model B) you're ready tweak the DOSBox configuration. It takes a little time to get right, expecially if you're not used to it, so just be patient. The result will improve your gaming experience and is time well spent.

Upon installation of DOSBox my config was located at `/home/pi/.dosbox/dosbox-0.74.conf`. I went ahead and made a back-up copy of the file before I started tweaking.

After looking over [Raspberry Pi: Retro Gaming Mania Part 2](http://www.codingepiphany.com/2013/03/30/raspberry-pi-retro-gaming-mania-part-2-dosbox/) and using the [DOSBox config](http://www.dosbox.com/wiki/Dosbox.conf) as reference I landed on [a specific configuration](https://gist.github.com/jhabdas/35c76f0fdd5e5b0a10f9) that worked well for me.

[The config I used](https://gist.github.com/jhabdas/35c76f0fdd5e5b0a10f9) is designed to go fullscreen on start and maximize display real estate, as well as balance the amount of processing needs with video framerate and UI responsiveness without lagging the audio.

*Tip:* If you get stuck in full screen mode just press `Alt` + `Enter` to toggle out.

If copying from [my config](https://gist.github.com/jhabdas/35c76f0fdd5e5b0a10f9), be sure to **modify your monitor resolution** (near the top) and **`[autoexec]` instructions** (near the bottom) to set the correct folder containing the game downloaded earlier. Here's a [resolution cheet sheet](https://upload.wikimedia.org/wikipedia/commons/0/0c/Vector_Video_Standards8.svg) to get you started. Refer back to the <a href="#download-ultima-underworld">Download section above</a> for the mount point if necessary.

Here's an example `[autoexec]` for the game you can drop into your config:

```
mount c /home/pi/dosprogs/ultima-underworld-the-stygian-abyss
C:
UW.EXE
```

# Enable audio playback

If you're using HDMI for video out from the Pi you may need to adjust your speaker settings to achieve audio. Run `sudo raspi-config` from a terminal emulator and adjust the setting for audio from under *Advanced settings*. Then ensure you select `SoundBlaster` or `SoundBlaster Pro` from the `INSTALL.EXE` included with the game before running the main executable.

# Customizing experience

To arrive at the best setup for your config, once you have the video settings set the way you like them and the audio enabled, use the [performance shortcuts](http://www.dosbox.com/wiki/Basic_Setup_and_Installation_of_DosBox#Performance) to fine-tune the experience:

`Ctrl` + `F7` decreases frameskip
`Ctrl` + `F8` increases frameskip
`Ctrl` + `F11` decreases cycle speed
`Ctrl` + `F12` increases cycle speed

The value of each of the settings can be seen while DOSBox is in windowed mode. If launched from terminal within X the settings will be output back to the terminal window as they're updated.

Once you find the settings which work best for you, set them in the configuration file. See the [Special Keys](http://www.dosbox.com/wiki/Special_Keys) on the DOSBox Wiki for additional keyboard shortcuts, including `Ctrl` + `F9` which is useful for quitting a game if it freezes during game play.

# That's a wrap

In the article we learned how to set-up the Raspberry Pi to play Ultima Underworld - The Stygian Abyss, one of my favorite games as a kid. And probably one of the best games ever made. As you look into the Orb you know it leads to Britannia...

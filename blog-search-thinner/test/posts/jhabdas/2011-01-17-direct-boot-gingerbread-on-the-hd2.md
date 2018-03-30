---
title: Direct Boot Gingerbread on the HD2
author: Josh Habdas
date: 2011-01-17
categories:
  - phreaking
tags:
  - android
  - mobile
  - modding
---
Since the [release of a direct-boot utility for the HD2][1] there has been a flurry of activity on the XDA forums to get Android 2.3 (Gingerbread) working on the HTC HD2 smartphone. I recently switched from [dual-booting Android and WinMo][2] to a Gingerbread direct boot method and am pleased with the improvement in boot speed and battery life. But as with the dual-boot method, there are still a few hiccups here and there. Read on to learn how to replace WinMo with a Nandroid version of Android Gingerbread on the HTC HD2.

![HTC HD2 running Android Gingerbread](//s3.amazonaws.com/images.habdas.org/DSC00963-2.jpg)

<!--more-->

**Forget Gingerbread!** Learn how to <a href="/running-ice-cream-sandwich-on-the-htc-hd2">run Ice Cream Sandwich on the HD2</a>.
{: .notice--info}

<strong id="install-hard-spl">Install Hard SPL</strong> (HSPL). HSPL3 is a custom bootloader [available for download][3] on XDA. HSPL is required to update the radio and flash custom ROMs to the phone. It is safe to install and can be uninstalled by rerunning the program setup file.

Next <strong id="upgrade-to-a-new-radio">update to a new radio</strong>. [Radios and installation instructions][4] can be found on the forums at XDA. Be sure to use a compatible version. See my [current set-up][5] for what I’m using.

After the radio is updated <strong id="install-magldr">install MAGLDR bootloader</strong>. MAGLDR serves as a second bootloader, which runs after HSPL, and can be used to Flash Nandroid ROMs to the HD2 or even play a game of Tetris. [Download MAGLDR][6] from the forums at XDA or start Googling.

To <strong id="install-gingerbread">install Gingerbread on the HD2</strong> first download any of the recent Gingerbread Nandroid ROMs from the [HD2 Android NAND Development forum][7] to a PC and extract it. Then perform a soft reset while holding down the power off button until the MAGLDR boot menu appears. Select the `USB Flasher` option and connect the HD2 to a PC using a USB cable. Once the USB connection is established run the Android installer EXE file that came with the NAND ROM to complete the installation. Alternatively, you can install a ROM straight from a zip file using <abbr title="ClockworkMod">CWM</abbr> Recovery.

Since upgrading to Gingerbread and Nandroid the biggest advantages I've noticed over [dual-booting form the SD card][2] have been:

- Faster boot time;
- Improved battery life; and
- Easier setup and maintenance.

If things seem buggy, try out a different [NAND ROM from the XDA forums][8]. Different builds will have different features working so plan to spend some time trying out different ROMs to find the best one. To get set-up more quickly on a new Android installation check out my advice on [Managing Passwords on Android][9]. Not sure which to install? Try copying my [current set-up][5] to get started.

<a id="current-setup"></a>Current set-up (last updated 09-Nov-11):

- <b>Device:</b> TMOUS HTC HD2
- <b>HSPL:</b> [CotullaHSPL3 (SPL-2.08-HSPL)][2]
- <b>Radio:</b> [2.15.50.14][4]
- <b>Boot Loader:</b> [MAGLDR v1.13][10]
- <b>Android ROM:</b> [NexusHD2-Gingerbread_V3.2a_NAND_(Android-2.3.7)][11]

 [1]: http://www.xda-developers.com/android/breaking-magldr-for-the-hd2-boot-directly-to-android/
 [2]: //running-android-on-htc-hd2-leo/
 [3]: http://forum.xda-developers.com/showpost.php?p=6891358&postcount=1893
 [4]: http://forum.xda-developers.com/showthread.php?t=611787
 [5]: #current-setup
 [6]: http://forum.xda-developers.com/showthread.php?p=10197474#post10197474
 [7]: http://forum.xda-developers.com/forumdisplay.php?f=928
 [8]: http://forum.xda-developers.com/forumdisplay.php?f=743
 [9]: //managing-passwords-on-android/
 [10]: http://forum.xda-developers.com/showpost.php?p=10197474&postcount=1
 [11]: http://forum.xda-developers.com/showthread.php?t=905060 "[27.MAR][CWM] NexusHD2-Gingerbread V2.5 [Android2.3.3][Kernel: tytung_r8.3]"

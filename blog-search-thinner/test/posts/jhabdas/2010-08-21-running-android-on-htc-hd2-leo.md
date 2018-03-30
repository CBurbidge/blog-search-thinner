---
title: Running Android on the HTC HD2
author: Josh Habdas
date: 2010-08-21
categories:
  - phreaking
tags:
  - android
  - mobile
  - modding
---

After spending a few weeks on the [HD2 Android Development forums][1] at XDA I learned how to coerce my T-Mobile HTC HD2 into dual-booting Android and WinMo. As of today I've got Android Froyo running with few issues and reasonable battery life. In this post I'll explain how how you can dual-boot Android and WinMo on your HD2 as well.

![HD2 running Android Froyo](//s3.amazonaws.com/images.habdas.org/100_1698-e1293925103508.jpg)

**Forget dual-booting!** Learn <a href="/direct-boot-gingerbread-on-the-hd2">how to direct boot Android</a> on the HD2 for faster booting, better battery life and frequent updates.
{: .notice--info}

<!--more-->

**First, flash the boot loader.** Doing so will allow you to replace windows mobile with custom roms better suited for running Android. I've flashed three HD2s with Cotulla's [HSPL3][2] boot loader and haven't had any issues.

**Warning:** Flashing the boot loader may void your warranty, though you can uninstall HSPL3 by rerunning the HSPL3 setup and choosing the standard `SPL 2.08.0000` option.

With the new boot loader installed, **flash the windows rom**. Find a good replacement rom that will load Android quickly and run it stably. Roms I've found worked well with the HD2 Android builds are Miri and Chucky ROMs. Check [XDA][3] and [htcpedia][4] for custom roms.

Back-up your data and **reformat the SD card**.

<a id="install-android"></a>To **install Android on the HD2** download and install any of the recent HD2 Android builds from [the forums on XDA][1]. My favorite builds right now are the near-stock Froyo builds created by darkstone. (Note: See my [current set-up][5] for what I'm using now.)

Once you've got Android installed, **make running it easier**. [Exceller Multiple Build Loader][6] provides a nice interface for booting into Windows or Android automatically after the phone powers on. There is also support for booting into Ubuntu, if you're into that sort of thing.

**Govern Android battery consumption.** SetCPU can be used to manage clock speeds, making it easy to reduce battery drain. It can be downloaded from the Market at a cost, or [here for free][7]. (Note: Free version requires [adb][8] to install.) Try setting a `Screen Off` profile that limits the CPU usage to 245 max with an `Up Threshold` of `30`, set on boot, to prevent much of the battery drain associated with sleep mode.

**Tip:** To install the free version of SetCPU, download it, install adb, connect the Android phone to USB, open a command line, cd to the location of the APK file and type `adb install setcpu.apk`.
{: .notice--info}

If you experience issues in the Android OS, **try upgrading the radio**. Though something I overlooked at first, upgrading the radio helped me prevent SoD and robotic voices. Grab a new radio from the [HDC HT2 Radio Rom Thread at XDA][9].

**Warning:** Flashing an incorrect radio may cause issues with your device. Ensure the radio used is compatible before updating.
{: .notice--warning}

With enough tweaking your phone should be running Android issue-free all day with acceptable battery life. If not, keep messing with it. Try turning off the auto-rotate option in settings, downloading a different Android build or even swapping in a newer [Linux kernel image][10] (zImage) to find what works best for you. Don't have time? Learn from experience by checking out others' reply signatures on the [forums on XDA][1] and [htcpedia][11] to look for their set-ups.

<a id="current-configuration"></a>Here's mine (last updated 18-Dec-10):

- **Device:** TMOUS HTC HD2
- **Boot Loader:** [CotullaHSPL3 (SPL-2.08-HSPL)][12]
- **WinMo Rom:** [ChuckyROM-23139-Lite.Oct.09][13]
- **Radio:** [2.15.50.14][9]
- **Android build:** [darkstone SuperRAM FroYo v1.5][14]
- **Launcher:** [EBL2.0d_PlusUbuntu][6]

Check the [direct boot Gingerbread to HD2 post][15] for most up-to-date status using NAND.

Happy modding!

 [1]: http://forum.xda-developers.com/forumdisplay.php?f=735
 [2]: http://www.xda-developers.com/windows-mobile/hspl3-released-for-hd2/
 [3]: http://forum.xda-developers.com/forumdisplay.php?f=534
 [4]: http://htcpedia.com/
 [5]: #current-configuration
 [6]: http://forum.xda-developers.com/showthread.php?t=737001
 [7]: http://forum.xda-developers.com/showthread.php?t=505419
 [8]: http://developer.android.com/guide/developing/tools/adb.html
 [9]: http://forum.xda-developers.com/showthread.php?t=611787
 [10]: http://oe.netripper.com/files/htcleo_autobuild/
 [11]: http://htcpedia.com/forum/forumdisplay.php?f=141
 [12]: http://forum.xda-developers.com/showpost.php?p=6891358&postcount=1893
 [13]: http://forum.xda-developers.com/showthread.php?t=618787
 [14]: http://forum.xda-developers.com/showthread.php?t=870518
 [15]: /direct-boot-gingerbread-on-the-hd2/#current-setup

 *[SoD]: Sleep of Death

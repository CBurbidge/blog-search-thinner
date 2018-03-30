---
title: Running Ice Cream Sandwich on the HTC HD2
author: Josh Habdas
date: 2011-12-05
categories:
  - phreaking
tags:
  - android
  - hd2
  - htc
  - mobile
---
The HD2 proves yet again to have been a great purchase. Just as soon as Android evolved to version 4.0 with ICS so too did [ICS AOSP Hit the HD2][1]. Continue reading to learn how to direct-boot Ice Cream Sandwich using Nandroid on the HTC HD2.

<!--more-->

To get started, **complete my existing instructions** to [install HSPL][2], [upgrade to a new radio][3] and [install MAGLDR][4]. These updates are needed to flash custom ROMs on the HD2. (Note: [cLK][5] can be as an alternative to MAGLDR in some cases, but both require HSPL be installed first.) Installation times vary widely by skill level. Once installed, return here to finish the rest.

As a debugging tool for beta ROM installations **download and store a functional copy of Android Gingerbread** on the SD card, in case there is a need to revert from ICS to an earlier, bug-free version of Android. The [Gingerbread ROM I used to use][6] worked for me.

**Download and install Ice Cream Sandwich** from the [XDA forums][7]. With MAGLDR it is easiest to upgrade using the [ClockworkMod Recovery][9] utility, accessible via the MAGLDR main menu once installed. To access ClockworkMod Recovery, enter MAGLDR (reset phone with `shut down` key depressed) and choose `AD Recovery` from the main menu. The resulting menu system provides methods for installing and restoring ROMs from ZIP archives stored on the SD card. (Note: If upgrading from an existing Android NAND ROM, the system partition size may need to be increased before installation as per the ROM instructions.)

<iframe width="560" height="315" src="http://www.youtube.com/embed/LChoaaLBTDQ" frameborder="0" allowfullscreen></iframe>

If installation problems occur please be sure to follow **all** of the instructions provided with the ROM. Once installed, if things seem buggy, consider [direct-booting Gingerbread][10], or, if using the old [dual-booting Android and WinMo][11], switch over to a direct-boot method such as this one. Or simply try simply copying the set-up below. Those with an [Android password management system][12] will revel knowing how much time their careful planning has saved them once again.

HD2 set-up (last updated <time datetime="2012-08-30">30-Aug-12</time>):

**Device:** TMoUS HTC HD2
**HSPL:** [CotullaHSPL3 (SPL-2.08-HSPL)][13]
**Radio:** [2.15.50.14][14]
**Boot Loader: **[MAGLDR v1.13][15]
**Android ROM:** [NexusHD2-ICS-CM9-HWA_V2.6][16]
**Recovery:** [ClockworkMod Recovery v1.3][9]

 *[ICS]: Ice Cream Sandwich

 [1]: http://www.xda-developers.com/android/ics-aosp-hits-the-hd2/
 [2]: /direct-boot-gingerbread-on-the-hd2#install-hard-spl
 [3]: /direct-boot-gingerbread-on-the-hd2#upgrade-to-a-new-radio
 [4]: /direct-boot-gingerbread-on-the-hd2#install-magldr
 [5]: http://forum.xda-developers.com/showthread.php?t=901305
 [6]: /direct-boot-gingerbread-on-the-hd2/#current-setup
 [7]: http://forum.xda-developers.com/forumdisplay.php?f=928
 [9]: http://forum.xda-developers.com/showthread.php?t=898913
 [10]: /direct-boot-gingerbread-on-the-hd2/
 [11]: /running-android-on-htc-hd2-leo/
 [12]: /managing-passwords-on-android/
 [13]: http://forum.xda-developers.com/showpost.php?p=6891358&postcount=1893
 [14]: http://forum.xda-developers.com/showthread.php?t=611787
 [15]: http://forum.xda-developers.com/showpost.php?p=10197474&postcount=1
 [16]: http://forum.xda-developers.com/showthread.php?t=1434860

---
title: Managing Passwords Across Devices
author: Josh Habdas
date: 2010-10-10
modified: 2016-11-16
categories:
  - security
tags:
  - android
  - iOS
  - privacy
  - encryption
  - mobile
  - passwords
---
After [hacking Android onto my HD2][1] I quickly became challenged with the task of recalling passwords for frequently used applications like Last.fm, Mint, Facebook, Twitter, Gmail, Foursquare, et cetera. While recalling passwords for all of these apps might be painful for some, it's a cinch for those managing their passwords using one of the many available ports of the open-source [KeePass Password Safe][2]. For Android, the KeePass port I'm using is [KeePassDroid][3].

> KeePassDroid makes recalling passwords as easy as copy/paste and also includes a password generator for creating strong passwords.

**Update 10 Aug 16**: Though I still use the password management methods described herein, I've switched from KeePass to [KeePassX](https://www.keepassx.org/) on OS X, and use [MiniKeePass for iOS](https://itunes.apple.com/us/app/minikeepass-secure-password/id451661808?ls=1&mt=8).
{: .notice--info}

<!--more-->

KeePass ports like KeePassDroid store passwords in an encrypted file that can be easily shared between devices. That's where [Dropbox][4] (or similar) comes in. When paired with DropBox, encrypted password stores can be synced between operating systems and across devices.

To use KeePass and Dropbox together to manage passwords that easily sync between devices:

1.  Install DropBox on your PC/Mac and Android/iOS device
2.  Put a KeePass port on each of the same devices
3.  Move the KeePass KDB database files to the Dropbox cloud

That's it! Those concerned about storing their passwords in a cloud can rest easy knowing the KeePass databases are stored encrypted using some of the [most secure][6] ciphers in existence. So unless you're protecting the kind of info that might one day end up on [WikiLeaks][5] or government email servers, you've got little to worry about in storing your KeePass data online.

*One final thought...* Because you're using a master password don't assume the easiest way to get it will be over the wire. If you've ever been outdoors and typed your master password into your phone, it's quite possible you've already given away your secrets to the eye in the sky.

 [1]: /running-android-on-htc-hd2-leo/
 [2]: http://keepass.info/
 [3]: http://www.keepassdroid.com/
 [4]: https://www.dropbox.com/
 [5]: http://wikileaks.org/
 [6]: http://keepass.info/help/base/security.html#secencrypt

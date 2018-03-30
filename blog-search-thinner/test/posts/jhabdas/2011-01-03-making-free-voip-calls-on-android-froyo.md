---
title: Making Free Calls on Android
author: Josh Habdas
date: 2011-01-03
categories:
  - phreaking
tags:
  - android
  - mobile
  - thrifty
  - phreaking
---
During two recent trips to Central and South America I needed a way to call back to the States without spending a lot of money. After a little research I found a competitive rate: **free**. Using an Android-powered smartphone it's possible to make and receive calls free of charge from any Wi-Fi hotspot worldwide. In this post I'll explain how to do this for US-based mobile devices.

> Using an Android-powered smartphone it's possible to make and receive calls free of charge from any Wi-Fi hotspot worldwide.

<!--more-->

First, sign-up for a free account at [sipgate.com][1] (or similar service) and choose to create a US-based telephone number. The account and phone number provide a method for connecting Internet calls with existing phone networks using a SIP client on the Android mobile device.

![Download Sipdroid](http://qrcode.kaywa.com/img.php?s=3&d=http%3A%2F%2Fmarket.android.com%2Fsearch%3Fq%3Dpname%3Aorg.sipdroid.sipuapure)

The SIP client I've used to is sipdroid. Download it from the Android Market. There may be multiple versions. The base version is all that is needed.

Once the SIP client is installed it can be connected with Sipgate for Internet calling. To do this enter the SIP credentials from your Sipgate softphone (see Settings on Sipgate website) into Sipdroid. Make sure this is done in an area with Wi-Fi connectivity to verify the service registered correctly.

After the SIP account is registered with Sipdroid the mobile device can begin receiving calls at the new phone number created. Outbound calls *would* cost money, but can be made for free using the Google Voice service and a little more work.

To begin making outbound calls first register the SIP number as a new phone on Google Voice (via Settings in the web interface) and set it as use it as a forwarding device for calls to the Google Voice number.

![Download Google Voice Callback](http://qrcode.kaywa.com/img.php?s=3&d=http%3A%2F%2Fmarket.android.com%2Fsearch%3Fq%3Dpname%3Acom.xinlu.gvdial)

Once the number is added to Google Voice download and install Google Voice Callback from the Market. When enabled, this nifty app will use your Google account to connect two US-based telephone numbers using the Google Voice service. Be sure Google Voice is set-up to forward to your SIP number.

Now give it a try! Jump on a Wi-Fi hotspot, make sure Sipdroid registers correctly and dial a number using the dialer as usual. Once dialed, Google Voice Callback will intercept the call and command Google Voice to do it instead. Google Voice will dial the SIP number first, which will ring the Android device via the SIP client. Once picked up, ringing can be heard on the line as Google Voice calls the initial number dialed. Ta-da!

 [1]: http://www.sipgate.com

 *[SIP]: Session Initiation Protocol

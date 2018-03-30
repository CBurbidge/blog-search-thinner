---
title: Emulating IE with VirtualBox
author: Josh Habdas
date: 2012-08-13
comments: true
categories:
  - debugging
tags:
  - browser compatibility
  - emulators
  - testing
  - virtualbox
  - vm
  - windows
---
Looking for a new solution to the old IE compatibility testing conundrum today and chanced across this nifty solution for VirtualBox: <http://xdissent.github.com/ievms/>.

<!--more-->

**Update <time datetime="2014-02-01">1 Feb 2014</time>:** The IEVMs script now supports IE 10 and 11, and newer versions no longer require a password is entered to boot into the guest OS.
{: .notice--info}

Using cURL and a few simple commands you can download, extract *and* install Internet Explorer 6-9 VMs in one shot. But you must be patient as the downloads can take a while. Depending on the version of IE installed, VMs range from around 2GB to 5GB or more. The cURL script handles all of the downloading, as shown:

![Patience tested as bits of the IE virtual image archive are assimilated.](//s3.amazonaws.com/images.habdas.org/curlin-ievms-e1345009175500.png)

Once a VM is downloaded and extracted by the script, it is installed in VirtualBox automatically. Start the virtual machine to begin booting into Windows, as shown:

![Not quite there yet… Patience young grasshopper.](//s3.amazonaws.com/images.habdas.org/ie6-loading-e1345009231635.png)

Once Windows boots, login to the provided user account with the password **Password1**. Once logged into the user account, install the Guest Additions and then reboot to ensure the VM is working top shape. (Note: Some browsers, like IE6 require additional installation steps. See the [ievms script doc][1] for more detailed instructions.) Once finished, you can get reacquainted with an old friend, as shown:

![Success. Where do you want to go today?](//s3.amazonaws.com/images.habdas.org/ie6-emulated-e1345009017851.png)

 [1]: http://xdissent.github.com/ievms/

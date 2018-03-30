---
title: Push Upstream with EGit and Eclipse Indigo
author: Josh Habdas
date: 2011-11-21
categories:
  - debugging
tags:
  - eclipse
  - egit
  - github
  - putty
  - ssh
---
While working through the [EGit User Guide][1] I ran into difficulty pushing files upstream using Eclipse Indigo SR1 (build 20110916-0149). The difficulties manifested themselves at first with an `auth failed` error, which was quickly resolved with a [visit to Stack Overflow][2]. But after fixing that problem I began seeing the following error while trying to push to a remote repo:

    Cannot get remote repository refs.

    Reason:
    ssh://git@github.com:22: Passphrase for C:\Users\...\.ssh\id_rsa

<!--more-->

Initial research indicated that Eclipse/EGit SSH authentication [has][3] <a href="http://egit.eclipse.org/r/#change,3796" class="broken_link">problems</a>. So I just kept messing around until I was able to get things working. After a little Googling and even more fiddling I found two solutions:

*   [A simple fix that skips the passphrase altogether](#simple-fix); and
*   [A more robust fix that uses PuTTY for file transfers over SSH](#using-putty).

## <a id="simple-fix"></a>Simple fix that skips the passphrase and uses only Eclipse

1.  Use ssh-keygen from Git Bash, [or Eclipse][6], to generate an RSA key, but do so *without* setting a passphrase.**  
    **
2.  Open and copy the public key from ~/.ssh/id_rsa.pub and add it to GitHub via the SSH Public Keys section in [Account Settings][7].
3.  Restart Eclipse. (Note: Not doing this was tripping me up for a while.)
4.  Try the [Push Upstream steps][8] again from the EGit User Guide.

The obvious pitfall here is that a passphrase cannot be associated with the RSA key. If skipping the passphrase is out of the question the following solution may be a little more up your alley.

## <a id="using-putty"></a>Use PuTTY for file transfers over SSH from within Eclipse

1.  Download the following [PuTTY][9] binaries: Plink, Pageant and PuTTYgen.
2.  Use PuTTYgen to generate a new public/private key pair *with* a passphrase. Open and copy the public key from `~/.ssh/id_rsa.pub` and add it to GitHub via the SSH Public Keys section in [Account Settings][7]. Save the private key file in your `~/.ssh` directory for later.
3.  Run Pageant and add the key created during the last step, entering the passhprase when prompted. Leave this utility running.
4.  Cache the server's host key in the registry by:
1.  From a bash prompt like Git Bash execute the following command (assumes Plink binary is accessible from the current path): `plink git@github.com`
2.  Verify the RSA key fingerprint matches GitHub's and, if they match, choose to store the key in the registry.

5.  Add a new environment variable called GIT_SSH and point it to the downloaded Plink binary (e.g. `C:\Windows\system32\plink.exe`). EGit will attempt to use this binary for SSH, if configured.
6.  Restart Eclipse, ensuring Pageant is still running with the private key available.
7.  Try the [Push Upstream steps][8] again from the EGit User Guide.

If done correctly, Eclipse should allow pushes to the remote repo without any further configuration, though Pageant must be running with the private key configured for it to work correctly. If problems continue see the [SSH issues][10] in the GitHub help documentation for additional information. Good luck!

 [1]: http://wiki.eclipse.org/EGit/User_Guide
 [2]: http://stackoverflow.com/questions/3601805/auth-problem-with-egit-and-github
 [3]: https://bugs.eclipse.org/bugs/show_bug.cgi?id=326526
 [6]: http://stackoverflow.com/questions/3601805/auth-problem-with-egit-and-github/5965118#5965118
 [7]: https://github.com/account/
 [8]: http://wiki.eclipse.org/EGit/User_Guide#Push_Upstream
 [9]: http://www.putty.org/
 [10]: http://help.github.com/ssh-issues/

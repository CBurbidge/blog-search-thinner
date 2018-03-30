---
title: SFTP to Ubuntu with Sublime Text
author: Josh Habdas
date: 2013-04-01
excerpt: Learn how to use Sublime Text to SFTP to an Ubuntu server for simple remote website administration.
categories: [tutorials]
tags: [cloud, coding, ssh, ftp, ftps, sftp, linux, ubuntu]
header:
  overlay_image: binary-1377017_1280.jpg
  overlay_filter: 0.5
  teaser: binary-1377017_512.jpg
---
{% include toc %}

About a year ago I explained how to set-up a [remote project in Eclipse][1]. Since then I've ditched Eclipse in favor of Sublime Text. But, even with the cat's pajamas of modern code editors (that's Sublime), getting source files from development to production meant carrying around some extra baggage:

* A deployment process, often manual, or, if automated, tightly coupled with the application sources (zomg! oh n0s!!), must be created and followed.
* At least two environments, likely not running on the same platform, must be stood-up and carried: development and production.
* Windows users, who may not have a good method for developing for today's Linux-based hosting environments, are pretty much snowed from the get-go.

I'm deliberately oversimplifying here for the sake of TL;DR, so let me get the point. If you're running a small site, are capable of failing fast and failing often, don't have a lot of code contributors or are for some reason stuck working on an IBM Aptiva with 16MB RAM upgrade, you can pretty much skip the pain points in the list above and just manage code directly on the web server remotely. How is that possible? Simple. SFTP to Ubuntu server with Sublime Text as explained in this article.

<!--more-->

# Gather your forces

To <abbr title="SSH File Transfer Protocol">SFTP</abbr> to Ubuntu server with Sublime Text the following needed is:

* Sublime Text, of course. Google it, or or simply follow my [Sublime Text amp up tutorial][2].
* An Ubuntu micro instance with shared SSH key and Nginx running, all of which can be [set-up in about 10 minutes][3] using Amazon Web Services.
* [Sublime SFTP][4] package for Sublime Text.
* If you're running Windows \*sigh\*, you're also going to need [PuTTy][5].

Please note that this article assumes use of Ubuntu Server 12.04.01 LTS and Sublime Text 2. Obviously these steps may differ slightly for alternate configurations and may not hold steady as the ground moves beneath them over time.

# Choose a file transfer method

For secure file transfers we're going to use SFTP (not to be confused with FTPS, which uses FTP over TLS/SSL), although the Sublime SFTP package supports both. FTP is not a good option in general as it sends passwords unencrypted over the wire. The choice to use SFTP over FTPS was based on the following factors:

* Using SFTP allows us to authenticate on the remote host using the same SSH key pair used for existing SSH connections, wereas FTPS requires passwords–though potentially encrypted over the wire–are stored unsecured in a plain text config file for use with the Sublime SFTP package.
* SFTP utilizes the existing OpenSSH server pre-installed on the Ubuntu Server micro instance on <abbr title="Amazon Web Services">AWS</abbr>, whereas FTPS requires a separate tool such as [vsftpd][6].
* Based on my research FTPS is becoming antiquated and has a number of other drawbacks when compared with SFTP. So there!

# Configure the server

In this section, we'll configure the Ubuntu server by adding a new user account and allowing it to receive SSH connections, and then modify the server's SSH configuration so that it'll accept SFTP connections over port 22.

## Create new user account for SFTP connections

While it may be possible to use an existing user account to perform SFTP, we'll be creating a new user account specifically for SFTP connections.

Shell into the Ubuntu server using SSH as [explained previously][7] and issue the following commands in sequence, following any intermediary prompts presented, to create the new user account and add the authorized key for SSH logins:

```sh
sudo adduser sftpuser
sudo mkdir /home/sftpuser/.ssh
sudo chown sftpuser:sftpuser /home/sftpuser/.ssh
sudo cp /home/ubuntu/.ssh/authorized_keys /home/sftpuser/.ssh
sudo chown sftpuser:sftpuser /home/sftpuser/.ssh/authorized_keys
```

The above assumes the existing SSH-authorized user has the username **ubuntu**, from which we will borrow the authorized_keys file.

## Confirm user account setup successful

To verify the new user account was set-up successfully, simply try shelling into it with the new username. If it works, you can skip the user account confirmations and just go <a href="http://kotaku.com/latest-japanese-schoolgirl-trend-fake-dragon-ball-atta-460482170" rel="nofollow">hadoukening</a> or something.

Otherwise, use the following commands to confirm things went as planned and debug common issues in creating the user account. Each command will be *followed* by an explanation of what it does and how to verify it worked.

    ll /home/sftpuser

**Lists directory contents with permissions, like `ls -al`.** Use it to confirm the new user's home directory has been created and that the .ssh subdirectory has the same ownership as other subdirectories within, e.g.

`drwxr-xr-x 2 sftpuser sftpuser 4096 Mar 31 23:26 .ssh/`

    ll /home/sftpuser/.ssh/

**Lists directory contents with permissions, like `ls -al`.** Use it to confirm the new user's .ssh subdirectory contains a file called authorized\_keys, the authorized\_keys file is contains the same ownership as the .ssh directory and the permissions are set properly, e.g.

`-rw----- 1 sftpuser sftpuser  385 Mar 31 23:26 authorized_keys`

    sudo cat /home/sftpuser/.ssh/authorized_keys /home/ubuntu/.ssh/authorized_keys

**Concatenates and outputs the contents of two files.** Use it to confirm the authorzed_keys file under the sftpuser home directory contains the same data as the file by the same name under the ubuntu directory (based on configuration assumption, above).

    sudo grep -i "sftpuser" /etc/shadow | awk -F':' '{ print $2 }'

**Outputs the hash of the password for a specified user.** Use it to confirm the password is set (i.e. longer than a single character) as SSH and SFTP authentication may not work without it.

## Modify the SSH server configuration

I'm going to borrow some of these instructions from <a href="http://about.me/bengarrett" rel="nofollow">Ben Garrett</a>, who admittedly borrowed them from [Mark Van den Borre][8]. I have chosen not to link the specific articles here so as not to let my readers meander into the unknown, because neither of those articles worked for this use case without further experimentation.

Backup and modify the SSH server configuration file, setting the cursor to line 76 of the file:

    sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
    sudo nano +76 /etc/ssh/sshd_config

Comment out the line shown below, and add the specified line below it:

```sh
#Subsystem sftp /usr/lib/openssh/sftp-server
Subsystem sftp internal-sftp
```

Add the following to the bottom of the file, save and exit:

```sh
# Custom for SFTP connections
Match group sftpuser
    ChrootDirectory /usr/share/nginx/www
    X11Forwarding no
    AllowTcpForwarding no
    ForceCommand internal-sftp
```

The above will set-up some basic security. It creates a match group set to the name of the group that was created earlier when the user account was added. It also jails users in the group to a specific `ChrootDirectory` directory–in this case to the web root for Nginx, which can vary by system.

Once complete, restart the SSH server service to apply the configuration changes:

    sudo service ssh restart

## Set group permissions on the Nginx web root

The last step of the server configuration is to give the sftpuser group permissions to read, write and execute stuff *within* the Nginx web root directory:

    sudo chgrp -R sftpuser /usr/share/nginx/www/*
    sudo chmod -R 775 /usr/share/nginx/www/*

Give yourself a pat on the back if you didn't botch this step because you weren't reading. If the web root itself is given group write permissions, chrooted SFTP connections by users in this group will likely begin failing with the following fatal error:

`Network error: Software caused connection abort`

# Configure Sublime SFTP

In this section, we'll cover the Sublime SFTP configuration and integration with Sublime Text. This section assumes the server configuration above has been completed and is fully functional, and that the Sublime SFTP package has been installed in Sublime Text.

From the **File** drop-down menu choose **SFTP/FTP > Setup Server…** to open a boilerplate `sftp-config.json` file and make the following changes:

Set the host to your Ubuntu server's public DNS, e.g.
`"host": "ec2-54-245-25-94.us-west-2.compute.amazonaws.com"`

Set the user to the user account created in the server configuration section, e.g.
`"user": "sftpuser"`

Set the remote path to the web root, e.g.
`"remote_path": "/"`

Uncomment and specify the value for the existing SSH key file, e.g.
`"ssh_key_file": "C:\\Users\\Josh\\.ssh\\aws.ppk"`

Once complete, save the `sftp-config.json` and **Browse Server…**  to connect to and start managing your website from within Sublime Text, as pictured below.

![Command Palette for SFTP in Sublime Text, with Browse Server… highlighted](//s3.amazonaws.com/images.habdas.org/sublime-sftp.png)

If things seem to be not working correctly with the SFTP package, please visit the <a href="http://wbond.net/sublime_packages/sftp/support">SFTP support page</a> for helpful debugging information, including a flag to log debugging information.

# SFTP Workflows

Once connected to the remote server using SFTP there are a number of ways to accomplish things. To learn how to sync files and folders, and upload and download from the server, check out the <a href="http://wbond.net/sublime_packages/sftp/workflows">Sublime SFTP Workflows</a> page.

 [1]: /remote-project-in-eclipse/ "Remote projects in Eclipse"
 [2]: /amp-up-coffeescript-coding-sublime-text/ "Amp up CoffeeScript coding with Sublime Text"
 [3]: /host-websites-cloud-10-minutes/ "Host a website in the cloud in 10 minutes"
 [4]: http://wbond.net/sublime_packages/sftp
 [5]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
 [6]: https://security.appspot.com/vsftpd.html
 [7]: http://habdas.org/host-websites-cloud-10-minutes/ "Host a website in the cloud in 10 minutes"
 [8]: http://blog.markvdb.be/

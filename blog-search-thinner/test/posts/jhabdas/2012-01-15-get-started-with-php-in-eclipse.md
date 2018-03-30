---
title: Get started with PHP in Eclipse
author: Josh Habdas
date: 2012-01-15
categories:
  - tutorials
tags:
  - eclipse
  - php
  - zend
  - programming
---
Eclipse is a powerful IDE supporting many different languages, including PHP. Unfortunately, many Eclipse installations do not provide PHP language support right out of the box—some assembly required. This article will focus on getting Eclipse set-up for PHP development and local debugging.

<!--more-->

To get started, first download and install the <abbr title="PHP Development Tools">PDT</abbr> plug-in for Eclipse. [PDT installation instructions][1] are available on Eclipsepedia. Once installed, a PHP perspective will become available, providing PHP syntax highlighting and code completion, as well as the ability to create PHP project types. The basics are now in place for developing PHP applications, save for local debugging.

Debugging PHP apps locally requires users to install a separate debugging tool. Two currently available PHP debugging solutions include XDebug and Zend. We will focus on getting set-up using Zend as it is relatively easy to install and use. We will not discuss XDebug because, at the time of writing, attempts to get XDebug up-and-running ended in nothing but frustration.

To use Zend for PHP debugging first [download and install PHP][2], if not already available, which is required for Zend to work properly. With PHP installed, [download and install Zend Server CE][3], the free community edition. When the server is running return to Eclipse to configure it to use Zend:

1.  Start or restart the Eclipse IDE.
2.  Create a new PHP Project in Eclipse.  

    **Note:** Eclipse may default the project contents to the local Zend server. This can be changed if desired so that projects are consolidated in a single workspace.
    {: .notice--info}

3.  Open project Properties dialog and enable project specific settings from the PHP Debug panel.
4.  If not already selected, choose Zend Debugger as the PHP Debugger and set the Base Path to `/`, the local root.

    **Note:** Zend CE restricts users from hosting multiple PHP projects simultaneously.
    {: .notice--info}

5.  Choose OK to save settings and close the Properties dialog.

With Zend installed and Eclipse configured it should now possible to debug PHP on the localhost. To do so create a simple PHP file of the hello world variety, select it in the PHP Explorer (visible from the PHP Perspective), press **F11** or choose **Debug As…** and select **PHP Web Page** from the Debug As dialog. The Launch URL should be something like `http://localhost/index.php`. If the Launch URL includes the project name, Zend debugging may not function as expected.

Once debugging is started the browser will open as well as the Debug perspective in Eclipse. The Eclipse Debug perspective will be stopped on the first PHP instruction encountered and ready for debugging. Press **F8** to resume processing and then switch back to the PHP Perspective. Local PHP debugging is now available.

 [1]: http://wiki.eclipse.org/PDT/Installation
 [2]: http://us.php.net/downloads
 [3]: http://www.zend.com/en/products/server-ce/downloads

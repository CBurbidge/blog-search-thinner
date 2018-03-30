---
title: Remote projects in Eclipse
author: Josh Habdas
date: 2012-03-10
excerpt: Create a Remote Project in Eclipse using Remote Systems Explorer
categories:
  - tutorials
tags:
  - eclipse
  - editors
---
Remote projects in Eclipse can be a great way of managing websites from thin clients, as well as sites with existing backup processes in place.

To create a remote project use <abbr title="Remote Systems Explorer">RSE</abbr> to establish a new connection using one of the available connection types (such as SSH).

**Note:** SSH may need to be explicitly enabled via the site's web hosting control panel to function correctly with Eclipse.
{: .notice--info}

Once a remote connection is established successfully, open up the Remote Systems view and drill down into the site via the tree view control. Find the the folder containing your desired project starting point, open its context menu and choose the Create Remote Project option to create a new remote project in Eclipse.

Once the remote project is finished syncing, it will appear in the Project and Package Explorer views. Opening the context menu for a remote project from one of the Explorer views will bring up additional options, such as project type configuration. The same menu also provides easy access to the Remote Systems view, helpful for file transfers.

Visit the [Target Management][1] page at [Eclipse.org][2] to learn more.

[1]: http://www.eclipse.org/tm/
[2]: http://www.eclipse.org/

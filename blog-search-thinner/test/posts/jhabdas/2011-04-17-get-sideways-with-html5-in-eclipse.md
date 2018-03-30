---
title: Get sideways with HTML5 in Eclipse
author: Josh Habdas
date: 2011-04-17
categories:
  - tutorials
tags:
  - eclipse
  - html
  - ide
  - editors
---
There are few front-end web developers I know who actually use the Eclipse editor for development. Whether it's the complexity of the IDE or simply resistance to change I cannot say. Working with Eclipse on enterprise apps has some serious advantages when it comes to working in multidisciplinary teams. And wrenching on a UI is no exception.

As of late HTML5 is beginning to bear the shine of a recently waxed [Tesla Roadster][1]. It's hard not to want to jump right in and hit the gas. But wait, the [HTML5 spec][2] is still in draft. Is it safe to turn over the ignition? Well, [it depends][3]. But here are [5 reasons to start using HTML5 now][4].

Last year when Eclipse Helios was released HTML5 didn't validate within the IDE. But somewhere between that release and the latest Helios service release, support was added for [actual native* *HTML5][5] elements in Eclipse, no plugin required! And you don't need to be running Aptana either. Awesomesauce!

The following instructions will help Eclipse newcomers and experienced client-side developers alike get started, kinda like a big smokey burnout.

<!--more-->

## To get going

1.  Download and isntall the latest Eclipse IDE for Java EE Developers package. Until Indigo GA packages are released in June you can use [Helios Service Release 2][6]. The package comes with WTP components like [JavaScript Development Tools][7] conveniently pre-installed.
2.  Fire up the IDE.
3.  Select a workspace and create or import a project. If you're just starting off, try creating a new Static Web Project named `HTML5` with the default values (`File` > `New` > `Static Web Project`, then click `Finish`).
4.  Create a new HTML File (`File` > `New` > `HTML File`) using the HTML5 Template, available by selecting `Next` after naming the new file and choosing `New HTML File (5)`, and choosing `Finish`.

If prompted during the process, choose to switch to the Web perspective. Once complete, you should should see something similar to the following:  

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
</body>
</html>
```

If you're not satisfied with the limited characters displayable by the Latin-1 character set you can change the default encoding type for new template-based files from the Eclipse preferences by going to `Window` > `Preferences` > `Web`, clicking `HTML Files` and choosing something else (psst, go for the `UTF-8`).

Save the new file and run it by choosing `Run` > `Run As` > `Run on Server`. By default the internal Eclipse browser will be used. To change the default browser select `Window` > `Web Browser`, and select a different browser from the list.

Your battery should now be fully charged and ready to lay some rubber as you race into the future with HTML5 in Eclipse. Now go [take a HTML5 test drive][8] and see if you can get sideways.

 [1]: http://www.xkcd.com/766/
 [2]: http://dev.w3.org/html5/spec/
 [3]: http://caniuse.com/#cats=HTML5
 [4]: http://blogs.sitepoint.com/5-reasons-why-you-can-use-html5-today/
 [5]: http://my.opera.com/haavard/blog/2011/04/13/native-html5
 [6]: http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/heliossr2
 [7]: http://www.eclipse.org/webtools/jsdt/
 [8]: http://introducinghtml5.com/

 *[GA]: General Acceptance
 *[WTP]: Web Tools Platform

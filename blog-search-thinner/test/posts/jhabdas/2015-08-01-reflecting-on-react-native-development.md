---
title: Reflecting on React Native development
author: Josh Habdas
date: 2015-08-01T12:57:51-05:00
modified: 2016-09-22
excerpt: Tips to get your app delivered faster.
categories: [reference]
tags: [react, react native, native, programming, web platform]
header:
  overlay_image: macro-319237_1280.jpg
  overlay_filter: 0.5
  caption: "Photo credit: [ibangfotografi](https://pixabay.com/en/macro-nature-reflection-beautiful-319237/)"
---
{% include toc %}

I’d originally planned to make this a tutorial on how to build a React Native app. But to give it justice I'm doing [a Webcast](http://www.oreilly.com/pub/e/3483). Instead, what I’ll share with you here are some of my top takeaways from building my first iOS app with React Native. These are coming from the viewpoint of an experienced Web developer building a native app for the first time. Things I wish I'd known earlier kinda stuff. So without further ado…

# App development
Tips to save you time developing an app with React Native.

## Getting started
To get started quickly with app development consider your basic needs. You could start building your app using the React Native CLI but you may quickly run into friction scaling. If that's a concern check out this list of awesome [React Native Boilerplates](/awesome-react-boilerplates/#react-native).

## Incorporating Swift
Swift feels a lot more like JavaScript, which is great for programmers coming from Web. I chose to start my app with Objective-C and then start using Swift once I became more comfortable with the creation process. At the time of writing creating Custom Native modules with Swift requires some [extra care](https://facebook.github.io/react-native/docs/native-modules-ios.html#exporting-swift) to work properly, though [hacks are starting](https://gist.github.com/robertjpayne/855fdb15d5ceca12f6c5) which may ease development in the future.

- Create a Swift file and chose to allow Xcode to automatically create the bridge for a mixed project.
- Xcode will automatically create a bridging header between languages called `MyApp-Bridging-Header.h`.
- Update *Build Settings* to set “Defines Module” setting to `YES`.
- Import to Objective-C like so: `ModuleName-Swift.h` (where `ModuleName` is your *Product Module Name* and `-Swift` is a fixed suffix.
  **Tip**: Confirm your *Product Module Name* by searching for "Product Module Name" in Build Settings for the main project target.
- Import the `.h` file into your existing Obj-C classes to use Swift from existing Obj-C classes
- Review the [Mix and Match](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html) page on the Apple Developer Portal.

## Create a Launch Screen from a Xib
A new feature in Xcode 6 and iOS 8+ allows app developers the ability to create launch screens using vector graphics. It's fast to set-up and requires less image assets to manage.

- Create a new *Image Set* and set it to *Single Vector* using the Xcode *Attributes inspector*.
- Create a PDF of an SVG free online so it can be used as a Single Vector *Universal* asset for the *Image Set* created.<br>

  **Note:** SVG should be saved at a specific size depending on target resolution, e.g. (320 * 480) for iPhone and (768 * 1024) iPad.
  {: .notice}

- Create a new Xib file by doing `File` > `New` > `File…` in Xcode and then selecting *Launch Screen* under `iOS` > `User Interface`.
- If you’re doing a Universal Layout for tablet support you’ll need to adjust the names of your Xib files like so:
  - `LaunchScreen~ipad.xib`
  - `LaunchScreen~iphone.xib`
- Add an *Image View* to the launch screen as [explained by Jarid Davidson](https://youtu.be/mS3CH_bKabw?t=3m30s).
- Select the *Background Image* to be using the *Attributes inspector*.
- Use *Auto Layout* to add vertical and horizontal layout constraints to center the image as explained in [Start Developing iOS Apps Today: Designing a User Interface](https://developer.apple.com/library/ios/referencelibrary/GettingStarted/RoadMapiOS/DesigningaUserInterface.html#//apple_ref/doc/uid/TP40011343-CH6-SW1).

## Creating an App Icon
Your app is going to need an icon. They can be [created for free](/automating-ios-app-icon-creation/) without much design skill whatsoever.

## Making a device preview image
A picture's worth a thousand words. Show people what your app will look like on their actual device with [iPhone Screenshot Maker](http://iphone-screenshot.com/). The application will frame an app screenshot inside the iOS device of your choosing and even put a slick gloss on the screen for you. Best of all, it's free.

## Incorporating a custom font
Avoid <abbr title="Flash of Unstyled Content">FOUC</abbr> by bundling your font in the application binary rather than pulling pulling the font from the Web. Font flickers could be avoided by base-64 encoding the font and embedding it in an inline style declaration, but it's easier to slip the font into the app itself. To do so review the [Common Mistakes With Adding Custom Fonts to Your iOS App](http://codewithchris.com/common-mistakes-with-adding-custom-fonts-to-your-ios-app/) and follow the instructions provided to add your font.

## Enabling Push Notifications

If your app is running a version of `react-native` before `0.13.0` you're going to have a little friction getting started here due to an evolving RN codebase. Here's how it'll initially manifest itself:

**RCTPushNotificationManager.h not found**
{: .notice--warning}

When this happens it's because your app cannot find the `.h` file in its Header Search Paths (in Build Settings). To fix this follow the [sage advice in #1979](https://github.com/facebook/react-native/pull/1979#issue-94795697). And don't forget to [link your library](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)!

# App submission
Getting your app in the App Store for real.

## Beta testing with TestFlight
Getting your app onto the hands of others early is a good idea. There are many different devices of various form-factors, all potentially running different versions of iOS. Don’t make the assumption your app will “just work” for others if it worked for you. Use beta builds to squish bugs before your formal App Store submission. [TestFlight](https://developer.apple.com/testflight/) can help.

- New builds require a change in the build number in the project settings in Xcode.
- You can leverage iTunes Connect with TestFlight to manage users and distribute your app for prerelease testing.
- Unlike the old UDID request method all you need is the full name and iOS-linked email address of your beta tester to invite people to the beta group.
- You can submit app store review requests against beta builds to get a feel for what’s left before official submission. Use the submission links next to the individual builds in *iTunes Connect* to make it happen.
- When submitting new builds, ensure you create your Archive as iOS Device (i.e. unplug your actual device). If you don’t you’ll receive a “failed to code sign” error in Xcode.
- You may be rejected for improper advertising identifier IDFA via Program License Agreement PLA 3.3.12 if you’re not serving ads and include `RCTAdSupport` Library (you’ll be notified during submission).

**Update 9 Sep 2016:** After a recent [talk given](https://habd.as/talks/streaming-audio-react-native/) on building Lumpen Radio at Stridekick I learned [Buddybuild](https://buddybuild.com) was considered a good way to simplify and manage the beta testing and deployment process of RN apps. I wrote a post about [Beta Testing React Native with Buddybuild](/beta-testing-react-native-buddybuild/).
{: .notice--info}

## Submitting to App Store
This could be a beta build or it could be your 1.0. The up-front part of the process starts in Xcode and requires you to upload an archive of your app to the App Store.

- In your app [turn off developer mode and enable performance optimizations](http://herman.asia/building-a-flashcard-app-with-react-native) (see *Submitting the app* section for details).

  **Note:** *developer.apple.com* and *iTunes Connect* are all you need here.
  {: .notice--info}

- Hit the *Archive* button in Xcode after finishing the setup.
- Getting screenshots can be a little tricky. There are a number of ways to go about it. You can even create custom frame borders of your app if you want to go all out. What worked best for me was the simplest solution of messing with the simulators to capture the images. But if you localize text in our app you may want to look at something like [Snapshot](https://github.com/KrauseFx/snapshot) and learn how to automate screen grabs.

**Update 10 Aug 2016:** I received an email from Apple today indicating screenshots have been made even easier. Just submit one set of screenshots and one optional app preview for the largest device size within a device family, and they will be used across all localizations and display sizes. If your app’s UI or behavior changes based on device size, or if you would like to include localized screenshots, you can use the new Media Manager to add custom screenshots.
{: .notice--info}

**Update 16 Aug 2016:** See also instructions for re-enabling App Transport Security for iOS 9 on the RN [Running on Device](https://facebook.github.io/react-native/docs/running-on-device-ios.html) page.

## If and when you run into issues uploading to App Store
I ran into a lot of friction here at first and once after changing something, so this gets its own section.

- Ensure you create your archive as iOS Device (i.e. unplug your actual device, otherwise receive a “failed to code sign” error)
- If issues persist try some of the following:
  - Access the Provisioning Portal and generate new certificates
  - From Xcode Preferences, access Account and choose View Details to review your Signing Identities and Provisioning Profiles
  - Review your Keychain and what’s configured there as well
- In the end what worked for me was to close the main Xcode window *with the archive Organizer window still open*, which I tried in desperation after 2 hours of a whole lotta no such luck otherwise. Weird, right?

## Upgrading an existing app for Xcode 7 and iOS 9

If you're using Webpack Dev Server to host your application you'll need to update your `Info.plist` to ease security restrictions. Meteor was anticipated to [have this problem](https://github.com/meteor/meteor/issues/4560) way back in June. Here's more info and a [workaround for HTTP connections](https://forums.developer.apple.com/thread/4017) not supporting TLS 1.2.

Here's the error I saw before updating [Lumpen Radio](https://github.com/jhabdas/lumpen-radio), which uses Webpack Dev Server to dynamically generate `index.ios.js` over HTTP:

**The resource could not be loaded because the App Transport Security policy requires the use of a secure connection.**
{: .notice--warning}

After updating `Info.plist` file using the workaround the issue was fixed.

While updating I bumped Lumpen Radio to React Native `0.11.0` and CocoaPods `0.39.0.beta.4` while updating to Xcode `7` and started getting generic archives instead of iOS Archives while trying to release. After several hours of debugging I found [an answer](https://github.com/CocoaPods/CocoaPods/issues/4119#issuecomment-137169818). If you're using CocoaPods and start seeing the same problem it could be a number of things, but what I encountered differed from most.

# That's all folks
If this was helpful and you like music please [try out the free Lumpen Radio app](https://appsto.re/us/NdeV7.i) or check out the [full source code](https://github.com/jhabdas/lumpen-radio) available on GitHub.

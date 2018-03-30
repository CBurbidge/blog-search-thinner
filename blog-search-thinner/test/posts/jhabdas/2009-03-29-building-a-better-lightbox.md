---
title: Building a Better Lightbox
author: Josh Habdas
date: 2009-03-29
categories:
  - opinion
tags:
  - accessibility
  - focus
  - javascript
  - modal
  - dialog
  - popover
  - patterns
  - ui
  - usability
  - ux
---
Though modal dialogs are not a new concept in UI design, the number of homegrown [Lightbox clones][1] appearing on the Web since major JavaScript libraries like Prototype and jQuery hit the scene has been staggering. Unfortunately, many of the clones developed leave some key usability considerations unaddressed, and struggle with common problems in accessibility. Some key usability features that should be considered during creation of a Web-based modal dialog include (1) manage focus and allow tab navigation (2) disable elements outside the modal dialog (3) give users an out and (4) provide graceful error recovery.

![Screenshot of a Lightview modal dialog](//s3.amazonaws.com/images.habdas.org/lightview1.png)

<!--more-->

## Manage focus and allow tab navigation

Guide the user experience by managing focusable page elements using JavaScript.

*   Tabbing should allow the user to navigate back to the browser's location bar and other tabbable toolbars.
*   When the modal dialog is shown, the user should not be able to tab to document content outside the dialog content area.
*   When the dialog is hidden, focus should be restored to the initial element used to activate the modal dialog, the original tab ordering should be restored and the user should no longer be able to tab to content inside the modal dialog.

## Disable elements outside the dialog

Guide user interaction with page elements outside of the modal dialog and keep focus in the lightbox window.

*   Display a translucent overlay above the page while the dialog is shown, giving the perception of modality while maintaining frame of reference to existing page content.
*   Prevent interaction with elements outside the modal dialog using script to do the following:
    *   Save and then temporarily set a new tab order for all applicable elements;
    *   Save and then temporarily set the disabled flag on all applicable elements; and
    *   Save and then temporarily update applicable hyperlink click handlers to return false.

## Give users an easy way out

Give users the ability to exit unwanted modal dialogs without thinking much about it.

*   Use a graphical `x` link the user can click to initiate the hide method. In addition, consider using the graphic as a background image for a text-based link (e.g. `Close`) to help improve comprehensibility slightly for both sighted and non-sighted users while maintaining application scalability with a single link implementation.
*   While the dialog is displayed, listen for the `Esc` key. If it is pressed, exit the modal dialog and restore the previous display state.
*   If the Lightbox was activated by the user, make the close link the next focusable element in the tab order.

## Provide graceful error recovery

Script display methods (e.g. hide/show) should listen for script errors and, upon error, close the modal dialog and restore previous settings–including any previously focused element. Utilize the `try`/`catch` block to make it happen, but beware that suppressed errors increases debugging complexity.

## Related articles

See also Roger Johansson's [Lightboxes and keyboard accessibility][2] for additional considerations in improving Lightbox usability, with a focus on keyboard accessibility.

## Recommended scripts

* [FancyBox][5] -- A tool for displaying images, html content and multi-media in a Mac-style "lightbox" that floats overtop of web page
* [ColorBox][3] -- A light-weight, customizable lightbox plugin for jQuery
* [Lightview][4] -- Lightview was built to change the way you overlay content on a website

 [1]: http://planetozh.com/projects/lightbox-clones/
 [2]: http://www.456bereastreet.com/archive/200910/lightboxes_and_keyboard_accessibility/
 [3]: http://colorpowered.com/colorbox/
 [4]: http://www.nickstakenburg.com/projects/lightview/
 [5]: http://fancybox.net/

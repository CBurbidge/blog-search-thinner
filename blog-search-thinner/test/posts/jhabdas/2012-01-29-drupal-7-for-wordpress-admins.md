---
title: Drupal 7 for WordPress Admins
author: Josh Habdas
date: 2012-01-29
modified: 2017-03-27
categories:
  - tutorials
tags:
  - web development
  - cms
  - drupal
  - webmaster
  - wordpress
---
WordPress continues to become more and more sophisticated as time draws on, with a constantly improving admin dashboard and easy-to-use plugin architecture. And themes like [Twenty Eleven][1] give both bloggers and web developers something to appreciate. But while WordPress is a great CMS for personal blogs, it's not well suited for more complex applications such as e-commerce, discussion forums, or collaborative wikis. [Drupal][2], on the other hand, and by design, excels at all of the above and more. This article will look at some of the similarities and differences between WordPress and Drupal 7, explain how to accomplish some of the less intuitive administration procedures in Drupal, share some newbie gotchas and timesavers, and provide a list of modules useful to get a new Drupal site off the ground. It is assumed readers are new to Drupal but have a familiarity with using the [WordPress][3] blogging platform.

<!--more-->

**Still using a CMS?** Modern static site generators have advanced to the point you may no longer need a CMS. Learn more about the [JAMstack](https://jamstack.org/) and check out cloud CMS's like [CloudCannon](http://cloudcannon.com/) and [Siteleaf](https://siteleaf.com/).
{: .notice--success}

## Similarities between WordPress and Drupal

Drupal and WordPress aren't all that dissimilar at first glance. For instance, both of them are CMSs. Both run using PHP. Both allow users to install different themes and plug-ins/modules. And both can be used to create a blog. Even when moving between the CMS dashboards not a lot changes. Listed here are a number of comparable features and the different terms used for them between the two apps:

WordPress 3 | Drupal 7
--- | ---
Users | People
Settings | Configuration
Plugins | Modules
Posts, Pages & Media | Content
Widgets | Blocks
Menu | Menus
Tags & Categories | Taxonomy
Themes | Themes

As you can see both Drupal and WordPress contain a number of similar features, even with similar names. But regardless of the name, not all of the features are exactly alike. For example, due to its modular nature and dependency management capabilities, Drupal users will find themselves installing and managing a greater number of modules. Some modules must be installed on top of the Drupal core simply to achieve the same level of functionality provided by WordPress out of the box, such as with Drupal's [URL aliases][4] and [Pathauto][5]. However, the flexibility and extensive configuration options typically built into Drupal modules often outweigh the additional effort involved in setting them up correctly. This is one area where WordPress and Drupal begin to diverge.

## Differences in content management underpinnings

WordPress and Drupal content types draw clear comparisons, mainly due to the limited set of types available in WordPress. Notice how Drupal can contain a number of content types whereas WordPress uses only two. In Drupal, not everything is a page or a post as with WordPress:

WordPress 3 | Drupal 7
--- | ---
Post | Article
Page | Basic page
– | Blog entry
– | Book page
– | Poll
– | Webform
– | And more…

Another area where Drupal stands apart from WordPress is in its extensible, open-source architecture. Based on the concept of building with [nodes][6] and [views][7], Drupal gives a number of ways to customize the site. However, the in-depth customization capabilities also present a small learning curve for users more familiar with WordPress.

## Tricky site administration concepts in Drupal

The following administration concepts are not immediately obvious when coming from WordPress to Drupal:

* Creating PHP snippets
* Injecting custom CSS into a theme

PHP snippets provide a method for executing PHP code from an arbitrary block of content sitting in one of the theme's block regions. Snippet blocks can supplement existing modules or function as self-contained module replacement. To create one first enable the *PHP filter module*, pre-installed as a part of Drupal 7 core. Once enabled, add a new content block and choose the *PHP code* content format. Enter PHP code into the block body, name the code snippet (consider prefixing with "Snippet:") and save and position in one of a theme's block regions to activate.

Cosmetic tweaks can be made to the site using [CSS Injector][8]. For example, [DISQUS][9] users viewing the comment system using the Drupal 7 Garland theme may notice alignment issues in the DISQUS UI as a result of cascading bullet styles. To resolve this issue add a CSS injector rule titled "Garland-Disqus List Style Fix" and enter the following code:  

```css
#dsq-content li,
#dsq-recentcomments li {
  list-style: none;
}
```

Save any changes and reload the page, or, if CSS caching is enabled, clear the cache from the *Performance* section of the site's Configuration.

## Drupal newb gotchas and timesavers

A few tips that just may save a frustrating amount of time digging:

* If a timeout error occurs during module installation of or while saving configuration, [increase the memory limit][10] in PHP.ini. It is possible for timeout errors to cause partial module installations which, if left unaddressed, can lead to confusion later on.
* When installing libraries for the [Wysiwyg][11] module buttons may not be visible by default, true for *all* libraries in Drupal 7. Individual buttons can be enabled, however, via the Buttons and Plugins dialog accessible from the Wysisyg profiles list (look for the Edit link). If no buttons are enabled for the library installed it may appear as if Wysiwyg or its libraries are not functioning properly, so don't be fooled.

## Modules to get Drupal up and running quickly

The following list of Drupal 7 modules was compiled as <a href="http://www.canthespam.org/" class="broken_link">canthespam.org</a> was pieced together and represents a list of some of the modules used to create one of the world's first and only spam microblogs:

* Start with the [Drupal 7 top ten contributed modules][12] which includes must-have modules such as [Google Analytics][13] and [Webform][14] as well as other modules likely to be rolled into the core for the Drupal 8 release.
* [DISQUS][9] is a comments platform that helps you build an active community from your website's audience.
* [Fivestar][15] adds a clean, attractive voting widget to nodes in Drupal 5, node and comments in Drupal 6, and any entity in Drupal 7.
* [Form Builder][16] allows users to build entire Form API structures through a graphical, AJAX-like interface.
* [Mollom][17] is an “intelligent” content moderation web service. By monitoring content activity on all sites in the Mollom network, Mollom is in a unique position to determine if a post is potentially spam; not only based on the posted content, but also on the past activity and reputation of the poster.
* [Gravatar][18] integrates Drupal user pictures with the service provided by Gravatar, a globally recognized avatar.
* [Colorbox][19] is a light-weight, customizable lightbox plugin for jQuery 1.3 through 1.6. This module allows for integration of Colorbox into Drupal.
* [CSS Injector][8] Allows administrators to inject CSS into the page output based on configurable rules. It's useful for adding simple CSS tweaks without modifying a site's official theme. There's also a [JS Injector][20] based off CSS Injector currently in development.
* [Twitter][21] provides API integration with the Twitter microblogging service and (theoretically) API-compatible alternatives like Identi.ca.
* [Global redirect][22] is a module that performs 301 redirects and helps prevent crawlers from indexing a single page from multiple paths.
* [XML Sitemap][23] creates a sitemap that conforms to the sitemaps.org specification.
* [Shortcode][24] provides a shortcode API and basic shortcodes through Drupal filters.
* [AdSense][25] provides web content providers with the means to earn revenue from visitors by displaying ads from Google AdSense™ advertising service on their sites.
* [Location][26] allows real-world geographic locations to be associated with Drupal nodes, including people, places, and other content.
* [Backup and Migrate][27] simplifies the task of backing up and restoring your Drupal database or copying your database from one Drupal site to another.

## Summing things up

As explained in this article, WordPress and Drupal share a number of similarities and differences. At surface level both share a lot of features in common. But both CMSs have some significant differences in their use content types, and management and display of data. The article explored similarities and differences between WordPress and Drupal, explained some of the less intuitive site administration concepts, shared a number of gotchas and provided a listing of useful modules for starting a new site. Drupal is a significant departure from the polish WordPress site administrators may have grown used to, but it also offers many additional capabilities WordPress does not.

<div class="wp_plus_one_button">
  <g:plusone size="medium" href="http://www.habdas.org/drupal-7-for-wordpress-admins/" callback="wp_plus_one_handler"></g:plusone>
</div>

 [1]: http://wordpress.org/extend/themes/twentyeleven
 [2]: http://drupal.org/
 [3]: http://wordpress.com/
 [4]: http://drupal.org/node/120631
 [5]: http://drupal.org/project/pathauto
 [6]: http://drupal.org/documentation/modules/node
 [7]: http://drupal.org/project/views
 [8]: http://drupal.org/project/css_injector
 [9]: http://drupal.org/project/disqus
 [10]: http://drupal.org/node/207036
 [11]: http://drupal.org/project/wysiwyg
 [12]: http://drupal.org/node/1182798
 [13]: http://drupal.org/project/google_analytics
 [14]: http://drupal.org/project/webform
 [15]: http://drupal.org/project/fivestar
 [16]: http://drupal.org/project/form_builder
 [17]: http://drupal.org/project/mollom
 [18]: http://drupal.org/project/gravatar
 [19]: http://drupal.org/project/colorbox
 [20]: http://drupal.org/project/js_injector
 [21]: http://drupal.org/project/twitter
 [22]: http://drupal.org/project/globalredirect
 [23]: http://drupal.org/project/xmlsitemap
 [24]: http://drupal.org/project/shortcode
 [25]: http://drupal.org/project/adsense
 [26]: http://drupal.org/project/location
 [27]: http://drupal.org/project/backup_migrate

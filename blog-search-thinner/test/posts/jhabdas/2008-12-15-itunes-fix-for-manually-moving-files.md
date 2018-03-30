---
title: Relocate Missing Files in iTunes
author: Josh Habdas
date: 2008-12-15
excerpt: iTunes Library disappear? Find your files in bulk and save time restoring your media.
categories: [debugging]
tags: [itunes, backup, restore, debugging]
---
{% include toc %}

iTunes users opting not to allow the program to automatically keep their folders organized (the default setting) may be well aware that iTunes does not respond well after changing locations of or renaming files. In fact, any change in the file name or path renders the item inaccessible from within iTunes, almost as if your iTunes library disappeared. To make matters worse, there's no easy way to have iTunes relocate files moved. iTunes prompts the user to relocate missing files but only one at a time with a dialog that says:

> The `type` `name` could not be used because the original file could not be found. Would you like to locate it?

Not so useful when a lot of files are moved at once. But if a directory containing hundreds of files needs to be moved, to a larger hard drive for example, locating files individually becomes too much work.

<!--more-->

Of course, there's always the "fresh start" approach. Just delete everything and start over… A good idea if iTunes ratings, playlists and play counts are not considered important keepsake. But to users who spend a good deal of time carefully tweaking song ratings and organizing playlists, scrapping their information and starting fresh may not be a desirable approach.

Thankfully there's an easy workaround for the problem. A sane alternative to relocating files one at a time (like when you move hundreds or thousands of files). The workaround is straightforward and reversible. And useful whenever moving many files together.

Applying it will allow users to move files around in bulk, while still hanging onto most of the iTunes metadata they have likely grown fond of.

**Note:** Some less significant meta information, such as `Last Played` time, is lost during the process.
{: .notice--info}

## Addressing the problem

Provided below are step-by-step instructions for updating the Library XML  to recreate the iTunes Library, enabling bulk file relocation when iTunes files are manually organized.

### Backup iTunes Music Library

Before you move your files, do the following:

1.  Close iTunes for now.
2.  Create copies of the following:
    *   (2x) **Library XML** (`iTunes Music Library.xml`)
    *   (1x) **Library ITL** (`iTunes Library.itl`)
        Windows users can find the Library XML at `C:\Users\Username\Music\iTunes`
        Mac users can find the Library XML at `/Users/Username/Music/iTunes`

### Relocate iTunes files as necessary

Before moving files note the following two necessary pieces of information:

1.  The path where the files were previously stored (e.g. `D:\Downloads\Music`)
2.  The path where the files will end up (e.g. `E:\Music\Archive`)

### Hack the Library XML and delete the Library ITL

After your files are moved, complete the following steps to implement the fix.

**Warning:** Do not open iTunes during this process.
{: .notice--warning}

1.  Open one of the Library XML copies created.
2.  Perform a Find/Replace using the following inputs:

    **Find:** Path where files were moved from<br>
    **Replace:** Path where files were moved to
    {: .notice--info}

3.  Save and close the document, noting which file contains the modifications.
4.  Delete the existing Library ITL.

### Restart iTunes

Once the Library ITL has been deleted, restart iTunes. The application will open with a blank library; custom playlists, music and other items will be gone. To recover the data do the following:

1.  Import the modified copy of the Library XML.
    In iTunes 8 and 9, choose `File` > `Library` > `Import Playlist…`
2.  Navigate to and **Open** the modified Library XML.
3.  iTunes will then import the file contents into the blank library.
4.  Wait for the import to complete.

iTunes may display a dialog if any files cannot be located during the import process. The dialog can occur as a result of improper changes to the Library XML, or because the Library XML already contained references to files previously moved or renamed.

## Wrapping up

Once the updated playlist is imported into iTunes lost songs and other media should be restored though there will be some duplicate playlists. Before deleting the extra playlists confirm the changes are working as expected. Once satisfied, delete the duplicates in the Library and enjoy your hard work. You've earned it.

### If something goes wrong

If something goes wrong during the process, or if the results are not as expected, the original Library can be restored from the backup files created. To do so, close iTunes and copy the backup Library ITL and XML back to their original locations (overwrite existing files, if prompted) and restart iTunes to restore the previous Library.

### Additional resources

[Apple Support KB Article HT1451: How to re-create your iTunes library][1]

 [1]: http://support.apple.com/kb/HT1451

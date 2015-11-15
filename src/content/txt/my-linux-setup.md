```techstack
xubuntu,compiz,docky,numix,guake,zsh
```
# My Linux Setup

By popular demand (at least once a week I get a question about my setup)

I decided to write an article that will guide you throught the process of installing, setting up and customizing the linux experience based on my preference (hence the name of the article).

I will be updating this article as I am changing my setup.

Here is the current tech checklist:
- **xubuntu** linux base
- **compiz** - I use mostly for workspace transitions, like it is in unity
- **docky**, **numix circle** theme - for the OSX like doc and icons
- **zsh** shell and **guake** terminal

Let's get started then.
## Step 1: Download and install xubuntu
I am currently using general ubuntu with xubuntu-desktop installed afterwards. 

I managed to set up 14.04 in a virtual box which I might do next time I need to setup linux on my machine.

Just get the .iso from http://xubuntu.org/ burn it to disk and follow the installation process.

## Step 2: Install dependencies
Let's start of by installing initial dependencies:
```sh
  sudo apt-get install synaptic docky compiz compizconfig-settings-manager guake
```

If you are installing it in a virtualbox you need to install the virtualbox guest additions as well.

## Step 3: Customize the appearance
1. Set up docky
 - Start up docky by using the applications (Whisker) menu top left
 - Open Docky Settings (First Icon) -> Theme Transparent, 3D Background
2. Set up the top panel
 - Right click on the panel -> Panel -> Panel preferences
 - Appearance Tab -> Alpha -> 0
 - Items Tab -> remove Window Buttons, add Action Buttons after Clock
3. Change the applications (Whisker) menu icon
 - Right click on applications icon -> Properties -> Change Icon -> ubuntu-logo
4. Set up the icon theme (numix-icon-theme-circle)
 - Add the repo and install the theme
 - Change it via: Settings -> Appearance -> Icons

```sh
  sudo add-apt-repository ppa:numix/ppa
  sudo apt-get update
  sudo apt-get install numix-icon-theme-circle
```

## Step 4: Set up compiz for smooth desktop/workspaces interaction
**Caution!** It can be a pain to set it up properly. 

I only use this for smooth workspace transitions. You can achieve similar interaction (without the smootheness) with Settings -> Window Manager & Window Manager Tweaks. 

1. Open Settings -> CompizConfig Settings Manager
2. Here are the base plugins you need to select:
 - General: Composite, Gnome Compatibility, OpenGL, Copy to texture
 - Desktop: Desktop Wall, Expo, Viewport Switcher ()
 - Effects: Window Decoration
 - Utitlity: Compiz Library Toolbox, Notification, Regex Matching
 - Window Management: Grid, Move Window, Place Windows, Resize Window
3. Replace the window manager with compiz
```sh
  compiz --replace
```
4. Restart

## TODO
- [ ] zsh (+import color scheme), guake
- [ ] dev environment
- [ ] gimp and creative apps
- [ ] i18n

## Notes
 - someone pointed out that you can use the built in xfce4-terminal instead of guake

```sh
  xfce4-terminal --drop-down
```

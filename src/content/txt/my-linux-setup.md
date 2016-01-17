```meta
{
  "author": "Alex Milanov",
  "avatar": "http://1.gravatar.com/avatar/0edabe98dd46b7ca4b69476a6be41736",
  "createDate": "2015-11-15",
  "lastUpdate": "2016-01-16",
  "techStack": ["xubuntu","docky","numix","zsh","nodejs"]
}
```
# My Linux Setup

By popular demand (at least once a week I get a question about my setup)

I decided to write an article that will guide you through the process of installing, setting up and customizing the linux experience based on my preference (hence the name of the article).

I will be updating this article as I am changing my setup.

![my-linux-setup-1](/assets/txt/my-linux-setup-1.png)

Here is the current tech checklist:
- **xubuntu** linux base
- **docky**, **numix circle** theme - for the OSX like doc and icons
- quake style drop-down console with custom pimped up **zsh** shell

Let's get started then.

## Step 1: Download and install xubuntu

Just get the .iso from http://xubuntu.org/ burn it to disk, usb ... and follow the installation process.

## Step 2: Install dependencies

Let's start of by installing initial dependencies:
```sh
  sudo apt-get install synaptic docky vlc git gedit gedit-plugins curl
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

## Step 4: Additional Setup - Workspaces, Shortcut keys, i18n

 **Note!** In the previous setup I used **compiz** for smooth workspace transitions. The support of that project seems to be lacking recently.

 So in my latest setup I am using the built in Settings (Workspaces, Window Manager & Window Manager Tweaks) to be able to have the same interaction (without the smoothness).

## Step 5: Console Setup

1. Console as drop-down
 - Open Settings Manager -> Keyboard -> Application Shortcuts
 - Click on the Add button and enter the following: `xfce4-terminal --drop-down`
 - Hit OK and press **F12** to set the shortcut key.
 - Afterwards right click the console indicator icon in the panel and select Preferences
 - Be sure to set up the width to 100% and tweak the opacity

2. Pimp my Console (with zsh and custom theme)
```sh
  # Install zsh via
  sudo apt-get install zsh

  # Install oh-my-zsh
  wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

  # Set it as default:
  chsh -s $(which zsh)

  # then log out and log in and it should work
```

3. I am currently using `ranger` as in console file manager
```sh
  sudo apt-get install ranger
```

## Step 6: Basic Dev Environment

I happen to be a Full-Stack JavaScript developer (with some additions) so nodejs is super important.
And there is one correct way to install it (on linux):

1. Install and setup node via nvm (node version manager)
```sh
  # first download and install nvm
  curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | zsh

  # to check if the installation was successful open new tab and list remote versions
  nvm ls-remote

  # install the latest version (currently 5)
  nvm install v5.*

  # set it as default  
  nvm alias default v5.*

  # finally install some global dependencies via nvm   
  npm install -g nodemon bower gulp-cli
```

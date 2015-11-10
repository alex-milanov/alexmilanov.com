# Gulp Automation Guide (in progress)
In this article I will go through all the steps to create your own gulp automation setup that will help you:
- compile and minify sass
- pick and compile bower dependencies
- compile js and jade
- add livereload support

## I. Prerequisites
First you need to have node installed. In most cases you should follow the info at https://nodejs.org

There is also a good tutorial to set up node via nvm so that you can support different versions on the same machine:
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps

After you have node setup, you should also have npm by default.
You will use it to install the backend/node dependecies.

Our first being gulp itself:
```sh
  npm install -g gulp-cli
```

While we are here we should also install bower. Which in a similar fashion as npm will take care of the front-end dependencies:
```sh
  npm install -g bower
```

Further on we will be installing global and local dependencies based on the task on hand.

## II. Initial Project Setup 
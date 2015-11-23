```meta
{
  "author": "Alex Milanov",
  "avatar": "http://1.gravatar.com/avatar/0edabe98dd46b7ca4b69476a6be41736",
  "createDate": "2015-11-11",
  "lastUpdate": "2015-11-16",
  "techStack": ["gulp","nodejs","bower","sass","Jade","LiveReload"]
}
```
# Gulp Automation Guide

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

In 80% of the cases the initial directory structure for a new project I start would look like this:
```sh
  .
  ├── .gitignore
  ├── .bowerrc
  ├── gulpfile.js
  ├── bower.json
  ├── package.json
  ├── node_modules
  └── src
      ├── assets
      ├── content
      ├── jade
      ├── js
      ├── lib
      └── sass
```

**.gitignore** is to specify which files/directories should be ignored on git commits. The base directories to ignore are the **node_modules**, **src/lib** and the **dist** where we will be automating stuff into.

```sh
  node_modules
  src/lib
  dist
```

**.bowerrc** is in json format basicly specifies the directory for the front-end/bower managed dependencies. Usualy I set it to:

```js
  {
    "directory": "src/lib"
  }
```

**bower.json** & **package.json** are used to specify the project configuration in regards to fron-end/bower and backend/npm. They automaticly generated. And we will go into details later but first you can just start by initing them:

```sh
  npm init
  bower init
```

I usualy create the initial directory strcture via:
```sh
  mkdir -p src/{js,jade,sass,assets,lib}
```

so after we created our initial project structure it's time to do some 

## III. Basic Gulp Automation



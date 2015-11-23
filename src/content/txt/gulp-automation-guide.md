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

After you have node setup, you should also have **npm** by default.
You will use it to install the backend/node dependecies.

Our first being gulp itself:
```bash
npm install -g gulp-cli
```

While we are here we should also install bower. Which in a similar fashion as npm will take care of the front-end dependencies:
```bash
npm install -g bower
```

Further on we will be installing global and local dependencies based on the task on hand.

## II. Initial Project Setup 

In 80% of the cases the initial directory structure for a new project I start would look like this:
```bash
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

```bash
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

```bash
npm init
bower init
```

I usualy create the initial directory strcture via:
```bash
mkdir -p src/{js,jade,sass,assets,lib}
```

So, after we created our initial project structure it's time to create our ...

## III. First Gulp Task

Let's install some "dev" dependencies (we will be using them in the development environment - where most of the automation would be triggered) In this case gulp itself.

```bash
npm install --save-dev gulp
```

This will install the **gulp** library/module in the **node_modules** directory and add **gulp** as a devDependency in **package.json**.

Afterwards open up/create **gulpfile.js** and paste:
```js
// loads up the gulp module and assigns it to the gulp variable
var gulp = require('gulp');

// defines the task js
gulp.task('js', function(done) {
  // initializes the gulp stream by specifying the source dir
  gulp.src('./src/js/**/*.js')
    // copies all the files from the folder to the destination folder, in our case ./dist/js/
    .pipe( gulp.dest('./dist/js/'))
    // when we are done trigger the callback
    .on('end',done);
});
```

Before we trigger the **js** task, we need something to be copied. Create **./src/js/init.js** with the following content:

```js
console.log("Hello World!");
```

Now lets trigger our first task:

```bash
gulp js
```

Which should produce **./dist/js/init.js** with the same content.

So we are copying files around. Alright, but I can do this with cp you say. 

True, we are just beginning. Let's take the js task up a notch.

## IV. Minifying and hinting/linting






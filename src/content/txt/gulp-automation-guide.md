```meta
{
  "author": "Alex Milanov",
  "avatar": "http://1.gravatar.com/avatar/0edabe98dd46b7ca4b69476a6be41736",
  "createDate": "2015-11-11",
  "lastUpdate": "2015-11-30",
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
```sh
$ npm install -g gulp-cli
```

While we are here we should also install bower. Which in a similar fashion as npm will take care of the front-end dependencies:
```sh
$ npm install -g bower
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
$ npm init
$ bower init
```

I usualy create the initial directory strcture via:
```sh
$ mkdir -p src/{js,jade,sass,assets,lib}
```

So, after we created our initial project structure it's time to create our ...

## III. First Gulp Task

Let's install some "dev" dependencies (we will be using them in the development environment - where most of the automation would be triggered) In this case gulp itself.

```sh
$ npm install --save-dev gulp
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
$ console.log("Hello World!");
```

Now lets trigger our first task:

```sh
$ gulp js
```

Which should produce **./dist/js/init.js** with the same content.

So we are copying files around. Alright, but I can do this with cp you say. 

True, we are just beginning. Let's take the js task up a notch.

## IV. Advanced JS Task - Minifying and Hinting/Linting
I am currently not using this functionality. Though when some of my libraries are production ready there is going to be the need to minify them in order to save space and also they should be consistent with a styleguide where jshint/jslint would help.

Let's break it down in two parts. First let's do the

### IV. Part 1 - Minifying or concating and uglifying

Let's install the dependencies:
```sh
$ npm install --save-dev del gulp-concat gulp-rename gulp-uglify gulp-sourcemaps
```

Where:
- **del** for cleaning up the directory before deploying to it
- **gulp-concat** will be using to paste together all the js files into one
- **gulp-rename** for renaming the file
- **gulp-uglify** would be used to shorted the code
- and **gulp-sourcemaps** would create a sourcemap which links together the minified code to it's original (useful for debugging.)

Then we need to modify gulpfile.js by adding the new modules:
```js
// loads up the gulp module and assigns it to the gulp variable
var gulp = require('gulp');
var del = require('del');
// minifying
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
...
```

Afterwards we need to modify the js task itself:
```js
...
// define the task js
gulp.task('js', function(done) {
  // clean up the dist/js folder before deploying
  del([
    'dist/js/**/*'
  ],
    // get the js files
    gulp.src('src/js/**/*.js')
      // init the sourcemaps
      .pipe( sourcemaps.init() )
      .pipe( concat('app.js'))
      // send the concated file to the dist directory
      .pipe( gulp.dest('dist/js'))
      // next up the .min.js file
      .pipe( rename('app.min.js') )
      .pipe( uglify() )
      // write the sourcemaps
      .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
      // again send the files to the same directory
      .pipe( gulp.dest('dist/js'))
      // when we are done trigger the callback
      .on('end',done)
  )
});
```

When you run **gulp js** it will create the following structure:
```sh
dist
└── js
    ├── app.js
    └── app.min.js
```

The problem is there is no minification visible yet.

Let's also change the **src/js/init.js** file 
```js
// put the console log into function
function printHelloWorld(){
  var someLongVarName = "Hello World!";
  console.log(someLongVarName);
}

// listen to when the dom content is loaded - equivalent to $(document).ready()
document.addEventListener("DOMContentLoaded", function(event) { 
  printHelloWorld();  
});
```

Now **gulp js** again and we should be able to see the difference between **app.js** and **app.min.js**

Next up. Let's talk about ...

### IV. Part 2 - Coding Style, Hinting and Linting


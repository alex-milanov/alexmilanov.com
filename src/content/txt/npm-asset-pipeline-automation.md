
# A purely npm based asset pipeline and task automation

2016 has been a very fruitful year. One of the small but significant advancements I mentioned in my talk at jstalks this November was the move from bower and gulp based to purely npm based asset pipeline and task automation.

The significance in this change is in that instead of several separate and long config files, specific plugins (for gulp) you just utilize the package.json config (that you already use to manage node dependencies) the way it was meant to be used and just use the basic cli of the library instead of the gulp plugin. For eg. node-sass instead of gulp-sass (which depends on node-sass)

Another move inspired by hipster frameworks like React and transpiling to JavaScript languages and supersets... is to replace bower as front-end dependencies manager with npm with the help of libs like webpack and browserify.

Enough background? Good.

## The scope of this article

1. Set up a new full-stack project step by step using just what npm provides plus some bash/cli syntax and some custom node scripts where the npm and bash can't help.
2. Give you enough directions and threads so that you can sort out the cases that are not handled here.

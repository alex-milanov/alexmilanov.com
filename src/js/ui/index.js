'use strict';

const {section} = require('iblokz-snabbdom-helpers');
const {obj, fn} = require('iblokz-data');

const panel = require('./panel');
const pages = {
	default: require('./pages/home'),
	about: require('./pages/about'),
	projects: require('./pages/projects'),
	articles: require('./pages/articles'),
	calendar: require('./pages/calendar')
};

module.exports = ({state, actions}) => section('#ui', [
	section('.am-layout', [
		panel({state, actions}),
		section('.am-content', fn.switch(state.router.path, pages)({state, actions}))
	])
]);

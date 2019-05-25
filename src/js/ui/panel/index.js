'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a, span,
	table, thead, tbody, tr, td, th, form, input, button, label
} = require('iblokz-snabbdom-helpers');

const pages = [
	{
		page: 'home',
		icon: {
			class: '.am-font-graphic.am-font-medium',
			content: '>_'
		},
		title: 'Index'
	},
	{
		page: 'about',
		icon: {
			class: '.am-font-graphic.am-font-medium',
			content: '[@]'
		},
		title: 'About Me'
	},
	{
		page: 'projects',
		icon: {
			class: '.am-font-graphic.am-font-medium',
			content: '<git>'
		},
		title: 'Projects'
	},
	{
		page: 'articles',
		icon: {
			class: '.am-font-graphic.am-font-medium',
			content: '.md'
		},
		title: 'Articles'
	}
];

module.exports = ({state, actions}) => section('.am-panel', {
	class: {
		opened: !state.panelHidden
	}
}, [
	a('.am-panel-toggle.am-font-graphic.am-font-big', {
		on: {
			click: () => actions.toggle('panelHidden')
		},
		class: {
			opened: !state.panelHidden
		}
	}, '='),
	section('.am-brand', 'AlexMilanov.com'),
	ul('.am-nav', pages.map(page =>
		li({
			class: {
				active: (state.router.page === page.page)
			}
		}, a(`[href="#/${page.page}"]`, [
			i(`${page.icon.class}`, page.icon.content),
			span(page.title)
		]))
	))
]);

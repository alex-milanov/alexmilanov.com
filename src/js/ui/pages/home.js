'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a, span, img,
	table, thead, tbody, tr, td, th, form, input, button, label
} = require('iblokz-snabbdom-helpers');

module.exports = ({state, actions}) => section('.am-home', [
	h1([
		i('.am-font-graphic.am-font-medium', '>_'),
		span(`Hi! I'm Alex. Check out some of the things I am involved in:`)
	]),
	section('.deck',
		section('.am-grid-10-7', a('[href="http://livecoding.tv/alex_milanov/"]', section('.card.hoverable.am-funstuffjs', [
			h1('Fun Stuff With JavaScript'),
			h2('Live Coding Stream'),
			h3("Sundays 18:00 EET"),
			section('.am-card-stack', [
				section('.am-grid-4', span('THREE.js')),
				section('.am-grid-4', img('[src="/assets/stack/webgl130p.png"]')),
				section('.am-grid-4', span('SASS')),
				section('.am-grid-4', img('[src="/assets/stack/gulp128p.png"]'))
			])
		])))
	)
]);

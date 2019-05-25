'use strict';

const request = require('superagent');
const $ = require('rx').Observable;

$.fromPromise(
	request.get('https://api.github.com/users/alex-milanov/gists')
)
	.map(r => r.body)
	.map(gists => gists
		.filter(g => g.files['article.md'] && g.files['meta.json'])
		.map(g => ({
			author: g.owner.login,
			title: g.description,
			createdAt: g.created_at,
			updatedAt: g.updated_at,
			text: g.files['article.md'].raw
		}))
	)
	.subscribe(gists => console.log(gists));

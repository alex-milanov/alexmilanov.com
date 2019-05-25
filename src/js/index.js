'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

require('moment/locale/bg');

// util
const vdom = require('iblokz-snabbdom-helpers');
const {obj} = require('iblokz-data');

// config
const config = {
	routes: [
		'admin/:page/:pageId',
		':page/:pageId'
	]
};
// app
const app = require('./util/app');
let actions = require('./actions');
let ui = require('./ui');

// services
// router
const router = require('./services/router');
actions.router = router.actions;

// prep actions
let actions$;
actions = app.adapt(actions);

// hot reloading
if (module.hot) {
	// actions
	actions$ = $.fromEventPattern(
    h => module.hot.accept("./actions", h)
	)
		.flatMap(() => {
			actions = app.adapt(Object.assign(
				{},
				require('./actions'),
				{router: router.actions}
			));
			return actions.stream.startWith(state => state);
		}).merge(actions.stream);
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
} else {
	actions$ = actions.stream;
}

// actions -> state
const state$ = actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

// state change hooks
router.hook({state$, actions});

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));

// patch stream to dom
vdom.patchStream(ui$, '#ui');

window.actions = actions;

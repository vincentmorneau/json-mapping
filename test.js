'use strict';

import test from 'ava';
import _app from '.';

const _ = require('lodash');

test('noop', t => {
	const mapped = _app.map();
	const expected = {};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

test('nomap', t => {
	const mapped = _app.map({
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	});
	const expected = {
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

test('simple', t => {
	const mapped = _app.map({
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	}, [{
		oldKey: 'appURL',
		newKey: 'url'
	}]);
	const expected = {
		url: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

test('deep-simple', t => {
	const mapped = _app.map({
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	}, [{
		oldKey: 'object1.bool',
		newKey: 'object1.enabled'
	}]);
	const expected = {
		appURL: 'localhost',
		object1: {
			enabled: true,
			name: 'app'
		}
	};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

test('multiple', t => {
	const mapped = _app.map({
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	}, [{
		oldKey: 'appURL',
		newKey: 'url'
	}, {
		oldKey: 'object1.bool',
		newKey: 'object1.enabled'
	}]);
	const expected = {
		url: 'localhost',
		object1: {
			enabled: true,
			name: 'app'
		}
	};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

test('change-value', t => {
	const mapped = _app.map({
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	}, [{
		oldKey: 'object1.bool',
		newKey: 'object1.enabled',
		values: [{
			oldValue: true,
			newValue: 'Y'
		}]
	}]);
	const expected = {
		appURL: 'localhost',
		object1: {
			enabled: 'Y',
			name: 'app'
		}
	};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

test('remove', t => {
	const mapped = _app.map({
		appURL: 'localhost',
		object1: {
			bool: true,
			name: 'app'
		}
	}, [{
		oldKey: 'appURL'
	}, {
		oldKey: 'object1.bool'
	}]);
	const expected = {
		object1: {
			name: 'app'
		}
	};

	if (_.isEqual(mapped, expected)) {
		t.pass();
	} else {
		console.error('mapped', mapped);
		console.error('expected', expected);
		t.fail();
	}
});

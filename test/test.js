"use strict";

const test = require("ava");
const _app = require("..");

const isEqual = require("lodash.isequal");

test("noop", (t) => {
	const mapped = _app.map();
	const expected = {};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("nomap", (t) => {
	const mapped = _app.map({
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app",
		},
	});
	const expected = {
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("simple", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				oldKey: "appURL",
				newKey: "url",
			},
		]
	);
	const expected = {
		url: "localhost",
		object1: {
			bool: true,
			name: "app",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("deep-simple", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				oldKey: "object1.bool",
				newKey: "object1.enabled",
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			enabled: true,
			name: "app",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("multiple", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				oldKey: "appURL",
				newKey: "url",
			},
			{
				oldKey: "object1.bool",
				newKey: "object1.enabled",
			},
		]
	);
	const expected = {
		url: "localhost",
		object1: {
			enabled: true,
			name: "app",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("change-value", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				oldKey: "object1.bool",
				newKey: "object1.enabled",
				values: [
					{
						oldValue: true,
						newValue: "Y",
					},
				],
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			enabled: "Y",
			name: "app",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("remove", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				oldKey: "appURL",
			},
			{
				oldKey: "object1.bool",
			},
		]
	);
	const expected = {
		object1: {
			name: "app",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("dependsOn", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				newKey: "object2",
				dependsOn: {
					key: "object1.bool",
					if: true,
					ifValue: "something",
					elseValue: "something else",
				},
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app",
		},
		object2: "something",
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("newVal", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				newKey: "object1.test",
				dependsOn: {
					key: "object1.test",
					if: undefined,
					ifValue: true,
				},
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app",
			test: true,
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("newValExist", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
				test: true,
			},
		},
		[
			{
				newKey: "object1.test",
				dependsOn: {
					key: "object1.test",
					if: undefined,
					ifValue: true,
				},
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app",
			test: true,
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("newValExist2", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
				test: false,
			},
		},
		[
			{
				newKey: "object1.test",
				dependsOn: {
					key: "object1.test",
					if: undefined,
					ifValue: true,
				},
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app",
			test: false,
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

test("oldEqualNew", (t) => {
	const mapped = _app.map(
		{
			appURL: "localhost",
			object1: {
				bool: true,
				name: "app",
			},
		},
		[
			{
				oldKey: "object1.name",
				newKey: "object1.name",
				values: [
					{
						oldValue: "app",
						newValue: "app2",
					},
				],
			},
		]
	);
	const expected = {
		appURL: "localhost",
		object1: {
			bool: true,
			name: "app2",
		},
	};

	if (isEqual(mapped, expected)) {
		t.pass();
	} else {
		t.log("expected:");
		t.log(JSON.stringify(expected, null, "\t"));
		t.log("got:");
		t.log(JSON.stringify(mapped, null, "\t"));
		t.fail();
	}
});

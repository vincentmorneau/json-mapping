"use strict";

const test = require("ava");
const _app = require("..");

// This test suite is based on a real use case
// https://github.com/OraOpenSource/apex-nitro/

const isEqual = require("lodash.isequal");

const mapping1 = [
	{
		oldKey: "jsConcat.enabled",
		newKey: "js.concat",
	},
	{
		oldKey: "jsConcat.finalName",
		newKey: "js.concatFilename",
	},
	{
		oldKey: "cssConcat.enabled",
		newKey: "css.concat",
	},
	{
		oldKey: "cssConcat.finalName",
		newKey: "css.concatFilename",
	},
	{
		oldKey: "sass.includePath",
		newKey: "css.sassIncludePath",
	},
	{
		oldKey: "less.includePath",
		newKey: "css.lessIncludePath",
	},
	{
		oldKey: "sass.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "sass",
			},
		],
	},
	{
		oldKey: "less.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "less",
			},
		],
	},
	{
		oldKey: "jsConcat",
	},
	{
		oldKey: "cssConcat",
	},
	{
		oldKey: "sass",
	},
	{
		oldKey: "less",
	},
];

const mapping2 = [
	{
		oldKey: "jsConcat.enabled",
		newKey: "js.concat",
	},
	{
		oldKey: "jsConcat.finalName",
		newKey: "js.concatFilename",
	},
	{
		oldKey: "cssConcat.enabled",
		newKey: "css.concat",
	},
	{
		oldKey: "cssConcat.finalName",
		newKey: "css.concatFilename",
	},
	{
		oldKey: "sass.includePath",
		newKey: "css.sassIncludePath",
	},
	{
		oldKey: "less.includePath",
		newKey: "css.lessIncludePath",
	},
	{
		oldKey: "sass.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "sass",
			},
		],
	},
	{
		oldKey: "less.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "less",
			},
		],
	},
	{
		oldKey: "jsConcat",
	},
	{
		oldKey: "cssConcat",
	},
	{
		oldKey: "sass",
	},
	{
		oldKey: "less",
	},
	{
		newKey: "mode",
		dependsOn: {
			key: "distFolder",
			if: undefined,
			ifValue: "basic",
			elseValue: "advanced",
		},
	},
];

const mapping3 = [
	{
		oldKey: "jsConcat.enabled",
		newKey: "js.concat",
	},
	{
		oldKey: "jsConcat.finalName",
		newKey: "js.concatFilename",
	},
	{
		oldKey: "cssConcat.enabled",
		newKey: "css.concat",
	},
	{
		oldKey: "cssConcat.finalName",
		newKey: "css.concatFilename",
	},
	{
		oldKey: "sass.includePath",
		newKey: "css.sassIncludePath",
	},
	{
		oldKey: "less.includePath",
		newKey: "css.lessIncludePath",
	},
	{
		oldKey: "sass.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "sass",
			},
		],
	},
	{
		oldKey: "less.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "less",
			},
		],
	},
	{
		oldKey: "jsConcat",
	},
	{
		oldKey: "cssConcat",
	},
	{
		oldKey: "sass",
	},
	{
		oldKey: "less",
	},
	{
		newKey: "mode",
		dependsOn: {
			key: "distFolder",
			if: undefined,
			ifValue: "basic",
			elseValue: "advanced",
		},
	},
	{
		oldKey: "apex.apexDestination",
		newKey: "sqlcl.destination",
	},
	{
		oldKey: "sqlcl",
		newKey: "publish",
	},
	{
		oldKey: "publish.apexDestination",
		newKey: "publish.destination",
	},
];

const mapping4 = [
	{
		oldKey: "jsConcat.enabled",
		newKey: "js.concat",
	},
	{
		oldKey: "jsConcat.finalName",
		newKey: "js.concatFilename",
	},
	{
		oldKey: "cssConcat.enabled",
		newKey: "css.concat",
	},
	{
		oldKey: "cssConcat.finalName",
		newKey: "css.concatFilename",
	},
	{
		oldKey: "sass.includePath",
		newKey: "css.sassIncludePath",
	},
	{
		oldKey: "less.includePath",
		newKey: "css.lessIncludePath",
	},
	{
		oldKey: "sass.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "sass",
			},
		],
	},
	{
		oldKey: "less.enabled",
		newKey: "css.language",
		values: [
			{
				oldValue: true,
				newValue: "less",
			},
		],
	},
	{
		oldKey: "jsConcat",
	},
	{
		oldKey: "cssConcat",
	},
	{
		oldKey: "sass",
	},
	{
		oldKey: "less",
	},
	{
		newKey: "mode",
		dependsOn: {
			key: "distFolder",
			if: undefined,
			ifValue: "basic",
			elseValue: "advanced",
		},
	},
	{
		oldKey: "apex.apexDestination",
		newKey: "sqlcl.destination",
	},
	{
		oldKey: "sqlcl",
		newKey: "publish",
	},
	{
		oldKey: "publish.apexDestination",
		newKey: "publish.destination",
	},
	{
		newKey: "browsersync.realTime",
		values: [
			{
				newValue: true,
			},
		],
	},
];

const object1 = {
	appURL: "http://localhost:32513/ords/f?p=430:1",
	srcFolder: "/Users/vmorneau/Documents/project/src",
	distFolder: "/Users/vmorneau/Documents/project/dist",
	js: {
		processor: "default",
		concat: false,
	},
	cssConcat: {
		enabled: true,
		finalName: "app",
	},
	sass: {
		enabled: true,
		includePath: "/Users/vmorneau/Documents/bootstrap/sass",
	},
	browsersync: {
		notify: true,
		ghostMode: false,
	},
	header: {
		enabled: true,
		packageJsonPath: "/Users/vmorneau/Documents/project/package.json",
	},
	apex: {
		openBuilder: true,
		apexDestination: "application",
	},
	sqlcl: {
		path: "sql",
	},
};

const object2 = {
	appURL: "http://localhost:32513/ords/f?p=430:1",
	srcFolder: "/Users/vmorneau/Documents/project/src",
	distFolder: "/Users/vmorneau/Documents/project/dist",
	js: {
		processor: "default",
		concat: false,
	},
	css: {
		language: "sass",
		sassIncludePath: "/Users/vmorneau/Documents/bootstrap/sass",
		concat: true,
		concatFilename: "app",
	},
	browsersync: {
		notify: true,
		ghostMode: false,
	},
	header: {
		enabled: true,
		packageJsonPath: "/Users/vmorneau/Documents/project/package.json",
	},
	apex: {
		openBuilder: true,
		apexDestination: "application",
	},
	sqlcl: {
		path: "sql",
	},
};

const object3 = {
	mode: "advanced",
	appURL: "http://localhost:32513/ords/f?p=430:1",
	srcFolder: "/Users/vmorneau/Documents/project/src",
	distFolder: "/Users/vmorneau/Documents/project/dist",
	js: {
		processor: "default",
		concat: false,
	},
	css: {
		language: "sass",
		sassIncludePath: "/Users/vmorneau/Documents/bootstrap/sass",
		concat: true,
		concatFilename: "app",
	},
	browsersync: {
		notify: true,
		ghostMode: false,
	},
	header: {
		enabled: true,
		packageJsonPath: "/Users/vmorneau/Documents/project/package.json",
	},
	apex: {
		openBuilder: true,
		apexDestination: "application",
	},
	sqlcl: {
		path: "sql",
	},
};

const object4 = {
	mode: "advanced",
	appURL: "http://localhost:32513/ords/f?p=430:1",
	srcFolder: "/Users/vmorneau/Documents/project/src",
	distFolder: "/Users/vmorneau/Documents/project/dist",
	js: {
		processor: "default",
		concat: false,
	},
	css: {
		language: "sass",
		sassIncludePath: "/Users/vmorneau/Documents/bootstrap/sass",
		concat: true,
		concatFilename: "app",
	},
	browsersync: {
		notify: true,
		ghostMode: false,
	},
	header: {
		enabled: true,
		packageJsonPath: "/Users/vmorneau/Documents/project/package.json",
	},
	apex: {
		openBuilder: true,
	},
	publish: {
		destination: "application",
		path: "sql",
	},
};

const object5 = {
	mode: "advanced",
	appURL: "http://localhost:32513/ords/f?p=430:1",
	srcFolder: "/Users/vmorneau/Documents/project/src",
	distFolder: "/Users/vmorneau/Documents/project/dist",
	js: {
		processor: "default",
		concat: false,
	},
	css: {
		language: "sass",
		sassIncludePath: "/Users/vmorneau/Documents/bootstrap/sass",
		concat: true,
		concatFilename: "app",
	},
	browsersync: {
		notify: true,
		ghostMode: false,
		realTime: true,
	},
	header: {
		enabled: true,
		packageJsonPath: "/Users/vmorneau/Documents/project/package.json",
	},
	apex: {
		openBuilder: true,
	},
	publish: {
		destination: "application",
		path: "sql",
	},
};

test("apex-nitro-1.1", (t) => {
	const object = JSON.parse(JSON.stringify(object1));
	const mapping = JSON.parse(JSON.stringify(mapping1));
	const expected = JSON.parse(JSON.stringify(object2));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-1.2", (t) => {
	const object = JSON.parse(JSON.stringify(object1));
	const mapping = JSON.parse(JSON.stringify(mapping2));
	const expected = JSON.parse(JSON.stringify(object3));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-1.3", (t) => {
	const object = JSON.parse(JSON.stringify(object1));
	const mapping = JSON.parse(JSON.stringify(mapping3));
	const expected = JSON.parse(JSON.stringify(object4));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-1.4", (t) => {
	const object = JSON.parse(JSON.stringify(object1));
	const mapping = JSON.parse(JSON.stringify(mapping4));
	const expected = JSON.parse(JSON.stringify(object5));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-2.1", (t) => {
	const object = JSON.parse(JSON.stringify(object2));
	const mapping = JSON.parse(JSON.stringify(mapping2));
	const expected = JSON.parse(JSON.stringify(object3));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-2.2", (t) => {
	const object = JSON.parse(JSON.stringify(object2));
	const mapping = JSON.parse(JSON.stringify(mapping3));
	const expected = JSON.parse(JSON.stringify(object4));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-2.3", (t) => {
	const object = JSON.parse(JSON.stringify(object2));
	const mapping = JSON.parse(JSON.stringify(mapping4));
	const expected = JSON.parse(JSON.stringify(object5));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-3.1", (t) => {
	const object = JSON.parse(JSON.stringify(object3));
	const mapping = JSON.parse(JSON.stringify(mapping3));
	const expected = JSON.parse(JSON.stringify(object4));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-3.2", (t) => {
	const object = JSON.parse(JSON.stringify(object3));
	const mapping = JSON.parse(JSON.stringify(mapping4));
	const expected = JSON.parse(JSON.stringify(object5));
	const mapped = _app.map(object, mapping);

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

test("apex-nitro-4.1", (t) => {
	const object = JSON.parse(JSON.stringify(object4));
	const mapping = JSON.parse(JSON.stringify(mapping4));
	const expected = JSON.parse(JSON.stringify(object5));
	const mapped = _app.map(object, mapping);

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

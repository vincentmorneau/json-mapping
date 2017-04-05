# JSON Schema Local Configurator

[![Build Status](https://travis-ci.org/vincentmorneau/json-mapping.svg?branch=master)](https://travis-ci.org/vincentmorneau/json-mapping) [![Dependency Status](https://david-dm.org/vincentmorneau/json-mapping.svg)](https://david-dm.org/vincentmorneau/json-mapping) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Change the structure of an existing JSON object with this mapping module.

## Install
```
npm install json-mapping
```

## Usage
```javascript
const mapping = require('json-mapping');

let json = {
	"appURL": "localhost",
	"object1": {
		"bool": true,
		"name": "app"
	}
};

json = mapping.init(json, [
	{
	    oldKey: "appURL",
	    newKey: "url"
	},
	{
	    oldKey: "object1.bool",
	    newKey: "object1.enabled"
	}
]);

console.log(json);
/*
{
	"url": "localhost",
	"object1": {
		"enabled": true,
		"name": "app"
	}
}
*/
```

## Arguments
Name | Type | Description
--- | --- | ---
json | object | TODO
mapping* | array | TODO

###### \*Mapping *
Name | Type | Description
--- | --- | ---
oldKey | string | TODO
newKey | string | TODO
values** | array | TODO

###### \*\*values
Name | Type | Description
--- | --- | ---
oldValue | any | TODO
newValue | any | TODO

## Methods
Name | Type | Return | Description
--- | --- | --- | ---
init | function | object | TODO

## Changelog
[See changelog.](changelog.md)

## License
MIT © [Vincent Morneau](http://vmorneau.me)

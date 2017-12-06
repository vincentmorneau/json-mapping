# JSON Mapping

[![npm](https://img.shields.io/npm/v/json-mapping.svg)]() [![Build Status](https://travis-ci.org/vincentmorneau/json-mapping.svg?branch=master)](https://travis-ci.org/vincentmorneau/json-mapping) [![Dependency Status](https://david-dm.org/vincentmorneau/json-mapping.svg)](https://david-dm.org/vincentmorneau/json-mapping) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Transform a JSON object structure.

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

json = mapping.map(json, [
	{
	    oldKey: "appURL",
	    newKey: "url"
	},
	{
	    oldKey: "object1.bool",
	    newKey: "object1.enabled"
	}
]);
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
json | object | The initial JSON object to be mapped
mapping* | array | An array containing the mapping options

###### \*mapping
Name | Type | Description
--- | --- | ---
oldKey | string | The old property name to be mapped
newKey | string | The new property name to be mapped
values** | array | An array of mapped values for this property mapping
dependsOn** | object | Determines the value for the newKey based on a condition

###### \*\*values
Name | Type | Description
--- | --- | ---
oldValue | any | The old value of the property to be mapped
newValue | any | The new value of the property to be mapped

###### \*\*dependsOn
Name | Type | Description
--- | --- | ---
key | string | The key to look for
if | any | The value to evaluate for the key
ifValue | any | When key === if, this will be the value of the newKey
elseValue | any | When key !== if, this will be the value of the newKey

## Methods
Name | Type | Return | Description
--- | --- | --- | ---
map | function | object | Maps a JSON object using mapping options

## Changelog
[See changelog.](changelog.md)

## License
MIT © [Vincent Morneau](http://vmorneau.me)

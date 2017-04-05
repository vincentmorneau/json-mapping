'use strict';

const _ = require('lodash');

module.exports = {
	map(json, mapping) {
		// Copy the argument
		const jsonMapped = Object.assign({}, json);
		const maps = Object.assign([], mapping);

		Object.keys(maps).forEach(key => {
			const oldKeyValue = _.get(jsonMapped, maps[key].oldKey);
			let newKeyValue = oldKeyValue;
			const mappingValues = maps[key].values;

			if (mappingValues) {
				Object.keys(mappingValues).forEach(value => {
					if (oldKeyValue === mappingValues[value].oldValue) {
						newKeyValue = mappingValues[value].newValue;
					} else {
						newKeyValue = undefined;
					}
				});
			}

			if (newKeyValue !== undefined &&
				maps[key].newKey !== null &&
				maps[key].newKey !== undefined &&
				maps[key].newKey !== '') {
				_.set(jsonMapped, maps[key].newKey, newKeyValue);
			}

			_.unset(jsonMapped, maps[key].oldKey);
		});

		return jsonMapped;
	}
};

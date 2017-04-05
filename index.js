'use strict';

const _ = require('lodash');

module.exports = {
	map(json, mapping) {
		// Copy the json argument
		const jsonMapped = Object.assign({}, json);

		this.mapping = mapping || [];

		Object.keys(mapping).forEach(key => {
			const oldKeyValue = _.get(jsonMapped, mapping[key].oldKey);
			let newKeyValue = oldKeyValue;
			const mappingValues = mapping[key].values;

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
				mapping[key].newKey !== null &&
				mapping[key].newKey !== undefined &&
				mapping[key].newKey !== '') {
				_.set(jsonMapped, mapping[key].newKey, newKeyValue);
			}

			_.unset(jsonMapped, mapping[key].oldKey);
		});

		return jsonMapped;
	}
};

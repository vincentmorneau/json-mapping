'use strict';

const _ = require('lodash');

module.exports = {
	map(json, mapping) {
		// Copy the arguments
		const jsonMapped = Object.assign({}, json);
		const maps = Object.assign([], mapping);

		// Loop through the mapping parameters
		// Each iteration represent a structural change to argument "json"
		Object.keys(maps).forEach(key => {
			const oldKeyValue = _.get(jsonMapped, maps[key].oldKey);
			let newKeyValue = oldKeyValue;
			const mappingValues = maps[key].values;
			const dependsOn = maps[key].dependsOn;

			// Add the new values
			if (mappingValues) {
				Object.keys(mappingValues).forEach(value => {
					if (oldKeyValue === mappingValues[value].oldValue) {
						newKeyValue = mappingValues[value].newValue;
					} else {
						newKeyValue = undefined;
					}
				});
			}

			// Add dependencies
			if (dependsOn) {
				const dependsOnKey = _.get(jsonMapped, dependsOn.key);

				if (dependsOnKey === dependsOn.if && dependsOn.ifValue) {
					_.set(jsonMapped, maps[key].newKey, dependsOn.ifValue);
				} else if (dependsOn.elseValue) {
					_.set(jsonMapped, maps[key].newKey, dependsOn.elseValue);
				}
			}

			// Set the new object in the new json structure
			if (newKeyValue !== undefined &&
				maps[key].newKey !== null &&
				maps[key].newKey !== undefined &&
				maps[key].newKey !== '') {
				_.set(jsonMapped, maps[key].newKey, newKeyValue);
			}

			// Removes the old key if the name has changed
			if (maps[key].oldKey !== maps[key].newKey) {
				_.unset(jsonMapped, maps[key].oldKey);
			}
		});

		return jsonMapped;
	}
};

'use strict';

const get = require('lodash.get');
const set = require('lodash.set');
const unset = require('lodash.unset');

module.exports = {
	map(json, mapping) {
		// Copy the arguments
		const jsonMapped = Object.assign({}, json);
		const maps = Object.assign([], mapping);

		// Loop through the mapping parameters
		// Each iteration represent a structural change to argument "json"
		Object.keys(maps).forEach(key => {
			const oldKeyValue = get(jsonMapped, maps[key].oldKey);
			let newKeyValue = oldKeyValue;
			const {values} = maps[key];
			const {dependsOn} = maps[key];

			// Add the new values
			if (values) {
				for (const value_ of values) {
					if (oldKeyValue === value_.oldValue) {
						newKeyValue = value_.newValue;
						break;
					} else {
						newKeyValue = undefined;
					}
				}
			}

			// Add dependencies
			if (dependsOn) {
				const dependsOnKey = get(jsonMapped, dependsOn.key);

				if (dependsOnKey === dependsOn.if && dependsOn.ifValue) {
					set(jsonMapped, maps[key].newKey, dependsOn.ifValue);
				} else if (dependsOn.elseValue) {
					set(jsonMapped, maps[key].newKey, dependsOn.elseValue);
				}
			}

			// Set the new object in the new json structure
			if (newKeyValue !== undefined &&
				maps[key].newKey !== null &&
				maps[key].newKey !== undefined &&
				maps[key].newKey !== '') {
				set(jsonMapped, maps[key].newKey, newKeyValue);
			}

			// Removes the old key if the name has changed
			if (maps[key].oldKey !== maps[key].newKey) {
				unset(jsonMapped, maps[key].oldKey);
			}
		});

		return jsonMapped;
	}
};

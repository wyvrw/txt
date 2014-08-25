//! txt.js
//! v1.0.0

(function () {

	var defaults = {
		truncateChars: { append: '...', delimiter: ' ' },
		truncateItems: { append: '...', delimiter: ' ' }
	};

	var isString = function (variable) {
		return typeof variable == 'string' || variable instanceof String;
	};

	var isNumber = function (variable) {
		return (typeof variable == 'number' || variable instanceof Number) && !isNaN(variable);
	};

	txt = {

		version: '1.0.0',

		eachMatch: function (text  , pattern   , callback                         ) {
			// txt.eachMatch('text', 'pattern' , function (match, details) { ... })
			// txt.eachMatch('text', /pattern/g, function (match, details) { ... })

			if (!isString(text) || !(pattern instanceof RegExp || isString(pattern)) || typeof callback != 'function')
				throw new TypeError('Invalid parameter');

			if (isString(pattern))
				pattern = new RegExp(this.escapeRegExp(pattern), 'g');
			else if (!pattern.global)
				pattern = new RegExp(pattern.source, pattern.toString().replace(/^.*\//, 'g'));

			var matches = text.match(pattern);
			var matchesIndex = 0;

			return text.replace(pattern, function (match) {
				var result = callback(match, {
					string: arguments[arguments.length - 1],
					stringIndex: arguments[arguments.length - 2],
					array: matches,
					arrayIndex: matchesIndex++,
					pattern: pattern
				});

				return isString(result) ? result : match;
			});
		},

		eachDelimiter: function (text  , delimiter   , callback                         ) {
			// txt.eachDelimiter('text', 'delimiter' , function (match, details) { ... })
			// txt.eachDelimiter('text', /delimiter/g, function (match, details) { ... })

			if (!isString(text) || !(delimiter instanceof RegExp || isString(delimiter)) || typeof callback != 'function')
				throw new TypeError('Invalid parameter');

			var joins = [];
			var delimiters = text.split(delimiter);
			var delimitersIndex = 0;
			var newText = '';

			if (delimiter instanceof RegExp) {
				if (!delimiter.global)
					delimiter = new RegExp(delimiter.source, delimiter.toString().replace(/.*\//, 'g'));

				joins = text.match(delimiter) || joins;
			}

			while (delimitersIndex < delimiters.length) {
				var result = callback(delimiters[delimitersIndex], {
					string: text,
					stringIndex: newText.length,
					array: delimiters,
					arrayIndex: delimitersIndex++,
					delimiter: delimiter
				});

				newText += (isString(result) ? result : delimiters[delimitersIndex - 1]) + (delimitersIndex < delimiters.length ? joins.shift() || delimiter : '');
			}

			return newText;
		},

		truncateChars: function (text  , number, options                          ) {
			// txt.truncateChars('text', 0     , { append: '...', delimiter: ' ' })
			// txt.truncateChars('text', 0                                        )

			if (!isString(text) || !isNumber(number))
				throw new TypeError('Invalid parameter');

			if (number < 0)
				throw new RangeError('Invalid number');

			if (number >= text.length)
				return text;

			options = options || {};

			var append = (isString(options.append) ? options.append : defaults.truncateChars.append).slice(0, number);

			text = text.slice(0, number - append.length);

			return text.slice(0, text.lastIndexOf(isString(options.delimiter) ? options.delimiter : defaults.truncateChars.delimiter) + 1 || text.length) + append;
		},

		truncateItems: function (text  , number, options                          ) {
			// txt.truncateItems('text', 0     , { append: '...', delimiter: ' ' })
			// txt.truncateItems('text', 0                                        )

			if (!isString(text) || !isNumber(number))
				throw new TypeError('Invalid parameter');

			if (number < 0)
				throw new RangeError('Invalid number');

			options = options || {};

			var delimiter = isString(options.delimiter) ? options.delimiter : defaults.truncateItems.delimiter;

			text = text.split(delimiter);

			return (number < text.length ? text.slice(0, number).concat(isString(options.append) ? options.append : defaults.truncateItems.append) : text).join(delimiter);
		},

		escapeHTML: function (text  ) {
			// txt.escapeHTML('text')

			if (isString(text))
				return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

			throw new TypeError('Invalid parameter');
		},

		unescapeHTML: function (text  ) {
			// txt.unescapeHTML('text')

			if (isString(text))
				return text.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');

			throw new TypeError('Invalid parameter');
		},

		escapeRegExp: function (text  ) {
			// txt.escapeRegExp('text')

			if (isString(text))
				return text.replace(/[\^\$\(\)\[\]\{\}\*\+\?\|\.\-\/\\]/g, '\\$&');

			throw new TypeError('Invalid parameter');
		},

		unescapeRegExp: function (text  ) {
			// txt.unescapeRegExp('text')

			if (isString(text))
				return text.replace(/\\([\^\$\(\)\[\]\{\}\*\+\?\|\.\-\/\\])/g, '$1');

			throw new TypeError('Invalid parameter');
		},

		pluralize: function (rule, rules                       ) {
			// txt.pluralize(0   , { singular: '', plural: '' })

			if (!isNumber(rule))
				throw new TypeError('Invalid parameter');

			rule = rule == 1 ? 'singular' : 'plural';

			return rules && isString(rules[rule]) ? rules[rule] : '';
		},

		capitalize: function (text  ) {
			// txt.capitalize('text')

			if (isString(text))
				return (text[0] || '').toUpperCase() + text.slice(1);

			throw new TypeError('Invalid parameter');
		},

		defaults: function (newDefaults) {
			// txt.defaults({ ... }    )
			// txt.defaults(           )

			if (typeof newDefaults == 'object') {
				for (var funcName in newDefaults) {
					var newFuncDefaults = newDefaults[funcName];

					if (defaults.hasOwnProperty(funcName) && typeof newFuncDefaults == 'object') {
						var funcDefaults = defaults[funcName];

						for (var defaultName in newFuncDefaults) {
							if (funcDefaults.hasOwnProperty(defaultName) && isString(newFuncDefaults[defaultName]))
								funcDefaults[defaultName] = newFuncDefaults[defaultName];
						}
					}
				}
			}

			return defaults;
		}

	};

	if (typeof module != 'undefined' && module.exports)
		module.exports = txt;

})();

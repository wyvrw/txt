# txt

A lightweight javascript library with versatile functions for working with text.

1 KB (minified and gzipped) and dependency free, txt.js features advanced matching and delimiting, smart truncation, HTML and RegExp escaping, simple pluralization, and more.

It runs in both the browser and Node.js.

## contents
- [Start](#start)
- [Documentation](#documentation)
- [License](#license)

## start

### browser

Do one of the following to download txt:

- Use [Bower](http://bower.io): `bower install txt --save`
- Use [npm](https://www.npmjs.org): `npm install txt --save`
- Clone the repo: `git clone https://github.com/wyvrw/txt.git`
- [Download the repo as a zip](https://github.com/wyvrw/txt/archive/master.zip)

Then in your HTML add:

```html
<script src="txt.js"></script>
```

### node.js

Use npm to download txt: `npm install txt --save`

Then in your javascript add:

```javascript
var txt = require('txt');
```

## documentation

### `eachMatch()`

Calls a function for each match in the text, giving detailed information about it. If the function returns a string then that match is replaced. Returns the modified text.

```javascript
txt.eachMatch('You can learn about #js or #html.', '#', function(match, details) {
	return '';
});
// 'You can learn about js or html.'

txt.eachMatch('You can learn about #js or #html.', /#\w+/g, function (match, details) {
    return '<a href="' + match + '" title="option ' + (details.arrayIndex + 1) + ' of ' + details.array.length + '">' + match + '</a>';
});
// 'You can learn about <a href="#js" title="option 1 of 2">#js</a> or <a href="#html" title="option 2 of 2">#html</a>.'
```

The callback function should have 2 parameters:

1. The match
2. An object containing:
	- The `string` of the text
	- The `stringIndex` of the current match
	- The `array` of all the matches
	- The `arrayIndex` of the current match
	- The `pattern` used for the matches

Performance tip: Use a RegExp with the global flag as the pattern - strings have to be escaped and then converted into RegExps and RegExps without the global flag have to be created again.

### `eachDelimiter()`

Calls a function for each delimiter in the text, giving detailed information about it. If the function returns a string then that match is replaced. Returns the modified text.

```javascript
txt.eachDelimiter('An example...\n...is an example.', '\n', function (match, details) {
	return 'Line ' + (details.arrayIndex + 1) + ': ' + match;
});
// 'Line 1: An example...Line 2: ...is an example.'

txt.eachDelimiter('An example...\n...is an example.', /\n/g, function (match, details) {
	return match + ' (' + (details.stringIndex + match.length) + ' characters so far)';
});
// 'An example... (13 characters so far)\n...is an example. (54 characters so far)'
```

The callback function should have 2 parameters:

1. The match
2. An object containing:
	- The `string` of the text
	- The `stringIndex` of the current match
	- The `array` of all the matches
	- The `arrayIndex` of the current match
	- The `delimiter` used for the matches

Performance tip: When using a RegExp as the delimiter, make sure to set the global flag - RegExps without the global flag have to be created again.

### `truncateChars()`

Returns text truncated to the nearest delimiter within a specified number of characters.

```javascript
txt.truncateChars('A bat, a cat, a dog, and a rat.', 25);
// 'A bat, a cat, a dog, and a ...'

txt.truncateChars('A bat, a cat, a dog, and a rat.', 25, {
	delimiter: ',', // default ' '
	append: ' and others.' // default '...'
});
// 'A bat, a cat, and others.'
```

### `truncateItems()`

Returns the text truncated to the specified number of items according to a delimiter.

```javascript
txt.truncateItems('A bat, a cat, a dog, and a rat.', 3);
// 'A bat, a ...'

txt.truncateItems('A bat, a cat, a dog, and a rat.', 3, {
	delimiter: ',', // default ' '
	append: ' and others.' // default '...'
});
// 'A bat, a cat, a dog, and others.'
```

### `escapeHTML()` & `unescapeHTML()`

Returns escaped/unescaped HTML.

```javascript
txt.escapeHTML('An example...<br>...is an example.');
// 'An example...&lt;br&gt;...is an example.

txt.unescapeHTML('An example...&lt;br&gt;...is an example.');
// 'An example...<br>...is an example.'
```

### `escapeRegExp()` & `unescapeRegExp()`

Returns escaped/unescaped Regular Expression.

```javascript
txt.escapeRegExp('[123]');
// '\[123\]'

txt.unescapeRegExp('\[123\]');
// '[123]'
```

### `pluralize()`

Returns the singular or plural version of a word, depending on a number.

```javascript
txt.pluralize(0, {
	singular: 'person',
	plural: 'people'
});
// 'people'

txt.pluralize(1, {
	singular: 'person',
	plural: 'people'
});
// 'person'
```

### `capitalize()`

Returns text with the first character capitalized.

```javascript
txt.capitalize('capital');
// 'Capital'
```

### `defaults()`

Overides the defaults. Returns the new defaults.

```javascript
txt.defaults({ ... });
// { ... }
```

The defaults are:

```javascript
{
	truncateChars: { append: '...', delimiter: ' ' },
	truncateItems: { append: '...', delimiter: ' ' }
}
```

### `version`

The version of txt.js.

```javascript
txt.version;
// '1.0.0'
```

## license

txt.js is released under the [MIT license](LICENSE).

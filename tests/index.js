if (typeof global == 'object') {
	var chai = require('chai');
	var txt = require('../src/txt');
}

var expect = chai.expect;

describe('eachMatch', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.eachMatch.bind(txt, undefined, ''       , function () {})).to.throw('Invalid parameter');
		expect(txt.eachMatch.bind(txt, 1        , ''       , function () {})).to.throw('Invalid parameter');
		expect(txt.eachMatch.bind(txt, ''       , undefined, function () {})).to.throw('Invalid parameter');
		expect(txt.eachMatch.bind(txt, ''       , 1        , function () {})).to.throw('Invalid parameter');
		expect(txt.eachMatch.bind(txt, ''       , ''       , undefined     )).to.throw('Invalid parameter');
		expect(txt.eachMatch.bind(txt, ''       , ''       , 1             )).to.throw('Invalid parameter');
	});

	it('calls callback with correct parameters', function () {
		txt.eachMatch('How are you?', 'a', function (match, details) {
			expect(match).to.equal('a');
			expect(details).to.deep.equal({
				string: 'How are you?',
				stringIndex: 4,
				array: ['a'],
				arrayIndex: 0,
				pattern: /a/g
			});
		});

		txt.eachMatch('How are you?', /h/i, function (match, details) {
			expect(match).to.equal('H');
			expect(details).to.deep.equal({
				string: 'How are you?',
				stringIndex: 0,
				array: ['H'],
				arrayIndex: 0,
				pattern: /h/gi
			});
		});
	});

	it('returns string with correct replacements', function () {
		expect(txt.eachMatch('How are you?', 'a', function () {
			return;
		})).to.equal('How are you?');

		expect(txt.eachMatch('How are you?', 'a', function () {
			return '';
		})).to.equal('How re you?');

		expect(txt.eachMatch('How are you?', /h/i, function () {
			return true;
		})).to.equal('How are you?');

		expect(txt.eachMatch('How are you?', /h/i, function () {
			return 'h';
		})).to.equal('how are you?');
	});

});

describe('eachDelimiter', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.eachDelimiter.bind(txt, undefined, ''       , function () {})).to.throw('Invalid parameter');
		expect(txt.eachDelimiter.bind(txt, 1        , ''       , function () {})).to.throw('Invalid parameter');
		expect(txt.eachDelimiter.bind(txt, ''       , undefined, function () {})).to.throw('Invalid parameter');
		expect(txt.eachDelimiter.bind(txt, ''       , 1        , function () {})).to.throw('Invalid parameter');
		expect(txt.eachDelimiter.bind(txt, ''       , ''       , undefined     )).to.throw('Invalid parameter');
		expect(txt.eachDelimiter.bind(txt, ''       , ''       , ''            )).to.throw('Invalid parameter');
	});

	it('calls callback with correct parameters', function () {
		txt.eachDelimiter('How are you?', '1', function (match, details) {
			expect(match).to.equal('How are you?');
			expect(details).to.deep.equal({
				string: 'How are you?',
				stringIndex: 0,
				array: ['How are you?'],
				arrayIndex: 0,
				delimiter: '1'
			});
		});

		txt.eachDelimiter('How are you?', / are /i, function (match, details) {
			if (details.arrayIndex === 0) {
				expect(match).to.equal('How');
				expect(details).to.deep.equal({
					string: 'How are you?',
					stringIndex: 0,
					array: ['How', 'you?'],
					arrayIndex: 0,
					delimiter: / are /gi
				});
			} else {
				expect(match).to.equal('you?');
				expect(details).to.deep.equal({
					string: 'How are you?',
					stringIndex: 8,
					array: ['How', 'you?'],
					arrayIndex: 1,
					delimiter: / are /gi
				});
			}
		});
	});

	it('returns string with correct replacements', function () {
		expect(txt.eachDelimiter('How are you?', '1', function () {
			return;
		})).to.equal('How are you?');

		expect(txt.eachDelimiter('How are you?', '1', function () {
			return '';
		})).to.equal('');

		expect(txt.eachDelimiter('How are you?', / are /i, function () {
			return true;
		})).to.equal('How are you?');

		expect(txt.eachDelimiter('How are you?', / are /i, function () {
			return 'you';
		})).to.equal('you are you');
	});

});

describe('truncateChars', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.truncateChars.bind(txt, undefined, 1        )).to.throw('Invalid parameter');
		expect(txt.truncateChars.bind(txt, 1        , 1        )).to.throw('Invalid parameter');
		expect(txt.truncateChars.bind(txt, ''       , undefined)).to.throw('Invalid parameter');
		expect(txt.truncateChars.bind(txt, ''       , '1'      )).to.throw('Invalid parameter');
	});

	it('throws number error with invalid number', function () {
		expect(txt.truncateChars.bind(txt, '', -1)).to.throw('Invalid number');
	});

	it('returns string truncated to expected number of characters', function () {
		expect(txt.truncateChars(''                               ,  1      )).to.have.length( 0);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  0      )).to.have.length( 0);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  1      )).to.have.length( 1);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  2      )).to.have.length( 2);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  3      )).to.have.length( 3);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  4      )).to.have.length( 4);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  5      )).to.have.length( 5);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  9      )).to.have.length( 5);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 10      )).to.have.length(10);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 11      )).to.have.length(10);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 12      )).to.have.length(12);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 16      )).to.have.length(12);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 17      )).to.have.length(17);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 18      )).to.have.length(17);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 19      )).to.have.length(19);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 23      )).to.have.length(19);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 24      )).to.have.length(24);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 27      )).to.have.length(24);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 28      )).to.have.length(28);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 29      )).to.have.length(28);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 30      )).to.have.length(30);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 31      )).to.have.length(31);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 32      )).to.have.length(31);
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  1.5, '')).to.have.length( 1);
	});

	it('overrides default options only with valid new options', function () {
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  3, { append: '', delimiter: ',' })).to.equal('A b'      );
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 10, { append: '', delimiter: ',' })).to.equal('A bat,'   );
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.',  3, { append: 1 , delimiter: ',' })).to.equal('...'      );
		expect(txt.truncateChars('A bat, a cat, a dog, and a rat.', 10, { append: '', delimiter: 1   })).to.equal('A bat, a ');
	});

});

describe('truncateItems', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.truncateItems.bind(txt, undefined, 1        )).to.throw('Invalid parameter');
		expect(txt.truncateItems.bind(txt, 1        , 1        )).to.throw('Invalid parameter');
		expect(txt.truncateItems.bind(txt, ''       , undefined)).to.throw('Invalid parameter');
		expect(txt.truncateItems.bind(txt, ''       , '1'      )).to.throw('Invalid parameter');
	});

	it('throws number error with invalid number', function () {
		expect(txt.truncateItems.bind(txt, '', -1)).to.throw('Invalid number');
	});

	it('returns string truncated to expected number of characters', function () {
		expect(txt.truncateItems(''                               ,  1      )).to.have.length( 0);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  0      )).to.have.length( 3);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  1      )).to.have.length( 5);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  2      )).to.have.length(10);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  3      )).to.have.length(12);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  4      )).to.have.length(17);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  5      )).to.have.length(19);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  6      )).to.have.length(24);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  7      )).to.have.length(28);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  8      )).to.have.length(30);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  9      )).to.have.length(31);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.', 10      )).to.have.length(31);
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  1.5, '')).to.have.length( 5);
	});

	it('overrides default options only with valid new options', function () {
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  1, { append: '', delimiter: ',' })).to.equal('A bat,'                         );
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  3, { append: '', delimiter: ',' })).to.equal('A bat, a cat, a dog,'           );
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.',  3, { append: 1,  delimiter: ',' })).to.equal('A bat, a cat, a dog,...'        );
		expect(txt.truncateItems('A bat, a cat, a dog, and a rat.', 10, { append: '', delimiter: 1   })).to.equal('A bat, a cat, a dog, and a rat.');
	});

});

describe('escapeHTML', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.escapeHTML.bind(txt   )).to.throw('Invalid parameter');
		expect(txt.escapeHTML.bind(txt, 0)).to.throw('Invalid parameter');
	});

	it('returns correctly escaped html', function () {
		expect(txt.escapeHTML(''                )).to.equal(''                                );
		expect(txt.escapeHTML('<p>A &amp; B</p>')).to.equal('&lt;p&gt;A &amp;amp; B&lt;/p&gt;');
	});

});

describe('unescapeHTML', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.unescapeHTML.bind(txt   )).to.throw('Invalid parameter');
		expect(txt.unescapeHTML.bind(txt, 0)).to.throw('Invalid parameter');
	});

	it('returns correctly unescaped html', function () {
		expect(txt.unescapeHTML(''                                )).to.equal(''                );
		expect(txt.unescapeHTML('&lt;p&gt;A &amp;amp; B&lt;/p&gt;')).to.equal('<p>A &amp; B</p>');
	});

});

describe('escapeRegExp', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.escapeRegExp.bind(txt     )).to.throw('Invalid parameter');
		expect(txt.escapeRegExp.bind(txt, 0  )).to.throw('Invalid parameter');
		expect(txt.escapeRegExp.bind(txt, / /)).to.throw('Invalid parameter');
	});

	it('returns correctly escaped regexp', function () {
		expect(txt.escapeRegExp(''                    )).to.equal(''                                                    );
		expect(txt.escapeRegExp('^([a-z/\\]*|.+?){1}$')).to.equal('\\^\\(\\[a\\-z\\/\\\\\\]\\*\\|\\.\\+\\?\\)\\{1\\}\\$');
	});

});

describe('unescapeRegExp', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.unescapeRegExp.bind(txt     )).to.throw('Invalid parameter');
		expect(txt.unescapeRegExp.bind(txt, 0  )).to.throw('Invalid parameter');
		expect(txt.unescapeRegExp.bind(txt, / /)).to.throw('Invalid parameter');
	});

	it('returns correctly unescaped regexp', function () {
		expect(txt.unescapeRegExp(''                                                  )).to.equal(''                    );
		expect(txt.unescapeRegExp('\\^\\(\\[a\\-z\\/\\\\]\\*\\|\\.\\+\\?\\)\\{1\\}\\$')).to.equal('^([a-z/\\]*|.+?){1}$');
	});

});

describe('pluralize', function () {

	it('throws parameter error with invalid variable type', function () {
		expect(txt.pluralize.bind(txt     )).to.throw('Invalid parameter');
		expect(txt.pluralize.bind(txt, '0')).to.throw('Invalid parameter');
	});

	it('returns singular text or "" only when number is 1', function () {
		expect(txt.pluralize(1                                      )).to.equal(''    );
		expect(txt.pluralize(1, { singular: 'test', plural: ''     })).to.equal('test');
		expect(txt.pluralize(1, {                   plural: 'test' })).to.equal(''    );
	});

});

describe('capitalize', function () {

	it('throws parameter error only with invalid variable type', function () {
		expect(txt.capitalize.bind(txt   )).to.throw('Invalid parameter');
		expect(txt.capitalize.bind(txt, 0)).to.throw('Invalid parameter');
	});

	it('returns string with first character capitalized', function () {
		expect(txt.capitalize(''    )).to.equal(''    );
		expect(txt.capitalize('test')).to.equal('Test');
	});

});

describe('defaults', function () {

	it('returns correct defaults', function () {
		expect(txt.defaults()).to.deep.equal({
			truncateChars: { append: '...', delimiter: ' ' },
			truncateItems: { append: '...', delimiter: ' ' }
		});
	});

	it('overrides defaults only with valid new defaults', function () {
		expect(txt.defaults({
			truncateChars: { append: 1, delimiter: '' },
			truncateItems: { append: false, delim: '' },
			eachDelimiter: { append: 1, delimiter: '' }
		})).to.deep.equal({
			truncateChars: { append: '...', delimiter: '' },
			truncateItems: { append: '...', delimiter: ' ' }
		});
	});

});

describe('version', function () {

	it('is correct', function () {
		expect(txt.version).to.equal('1.0.0');
	});

});

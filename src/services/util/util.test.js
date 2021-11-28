const { isValue } = require('./index');

test('that isValue returns true for a non-null, non-empty value', () => {
	const testString = 'red';
	const testNumber = 22;
	const testArray = [testString, testNumber];
	const testObject = { testString, testNumber };
	expect(isValue(testString)).toBe(true);
	expect(isValue(testNumber)).toBe(true);
	expect(isValue(testArray)).toBe(true);
	expect(isValue(testObject)).toBe(true);
});

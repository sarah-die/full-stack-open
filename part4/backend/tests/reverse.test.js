// import the function that should be tested
const reverse = require('../utils/for_testing').reverse;

// "test" defined individual test cases
// test("description of my test", () => {functionality of the test})
test('reverse of a', () => {
  const result = reverse('a');

  // except wraps the result into an object that offers a collection of matcherfunctions
  // matcherfunctions can be used to verify the correctness of the result
  // tobe -> compare strings
  expect(result).toBe('a');
});

test('reverse of react', () => {
  const result = reverse('react');

  expect(result).toBe('tcaer');
});

test('reverse of releveler', () => {
  const result = reverse('releveler');

  expect(result).toBe('releveler');
});

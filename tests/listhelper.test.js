/* Jari Hartikainen, 5.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Apufunktioita ja yksikkötestejä 4.3*/

const utils_list_helper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = utils_list_helper.dummy(blogs)
  expect(result).toBe(1)
})
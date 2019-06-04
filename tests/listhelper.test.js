const utils_list_helper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = utils_list_helper.dummy(blogs)
  expect(result).toBe(1)
})
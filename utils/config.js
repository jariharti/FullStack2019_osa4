if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
console.log("process.env.MONGODB_URI",process.env.MONGODB_URI)
let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let TEST_TOKEN_Edsger = ''
let TEST_TOKEN_Robert = ''

if (process.env.NODE_ENV === 'test') {
  PORT = process.env.TEST_PORT
  MONGODB_URI = process.env.TEST_MONGODB_URI
  TEST_TOKEN_Edsger = process.env.TEST_TOKEN_Edsger
  TEST_TOKEN_Robert = process.env.TEST_TOKEN_Robert
}

module.exports = {
  MONGODB_URI,
  PORT,
  TEST_TOKEN_Edsger,
  TEST_TOKEN_Robert
}
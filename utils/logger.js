const info = (...params) => {
    console.log(...params)
    if (process.env.NODE_ENV !== 'test') {
      console.log(...params)
    }
  }
  
const error = (...params) => {
    console.log(...params)
console.error(...params)
}
  
  module.exports = {
    info, error
  }
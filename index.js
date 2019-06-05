/* Jari Hartikainen, 5.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Blogilista 4.1 ... 4.2*/

// Sovelluksen käynnistystiedosto index.js //

const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

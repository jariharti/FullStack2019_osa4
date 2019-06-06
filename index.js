/* Jari Hartikainen, 5.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Sovellusrungosta toimiva npm projekti 4.1 4.2 */

const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
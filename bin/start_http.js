const prompt = require('../lib/LAN_IPs').prompt
const proxy  = require('../proxy')
const http   = require('http')

const start_server = function(host, port) {
  if (!port || isNaN(port)) port = 80

  new Promise((resolve, reject) => {
    if (host) return resolve(host)

    prompt((host) => resolve(host))
  })
  .then((host) => {
    if (host === false) {
      host = 'localhost'
    }

    const server = http.createServer()
    proxy(server, host, port, false)
    server.listen(port, function () {
      console.log(`HTTP server is listening at: ${host}:${port}`)
    })
  })
}

if (require.main === module) {
  start_server(process.argv[2], Number(process.argv[3]))
} else {
  module.exports = start_server
}

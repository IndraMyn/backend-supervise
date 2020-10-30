const http = require('http')
const cluster = require('cluster')
const cpu = require('os').cpus().length
const app = require('./app')

if (cluster.isMaster) {
    console.log('Master running proccesson pid: ' + process.pid)
    for (let i = 0; i < cpu; i++) {
        cluster.fork()
    }
} else {
    const port = process.env.PORT || 2408
    const server = http.createServer(app)
    console.log('Worker running process on pid: ' + process.pid)
    server.listen(port)
}
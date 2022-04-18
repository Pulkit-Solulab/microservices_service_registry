const dotenv = require('dotenv');
dotenv.config();
const http = require('http');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const service = require('./service')(config);

const server = http.createServer(service);

// Important - a service should not have a fixed port but should randomly choose one
server.listen(process.env.PORT || 3000);

server.on('listening', () => {
    log.info(
        `Service Registry up on port ${server.address().port} in ${service.get('env')} mode.`,
    );
});
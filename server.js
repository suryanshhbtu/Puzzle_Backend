const http = require('http');           // importing http
const app = require('./app');

const port = process.env.PORT || 3030;  // defining port or by environment variables

const server = http.createServer(app);     
server.listen(port);
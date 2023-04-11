const http = require('http');           // importing http
const app = require('./app');

const port = process.env.PORT || 3030;  // defining port or by environment variables

const server = http.createServer(app);     
server.listen(port);
/*
Node.js http.createServer(requestListener)
    1) turns you pc into HTTP server,
    2) creates an HTTP Server Object,
    3) can listen to Ports on your computer 
        and execute a function, a requestListner(PARAMETER), 
        each time when request is made.
*/
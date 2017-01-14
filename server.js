const http = require('http');
const aliases = require('./aliases.json');
const port = process.env.PORT || 80

const server = http.createServer((request, response) => {
    console.log("Got request: '%s'", request.url);
    const url = request.url.toLowerCase()
                           .replace(/^\//, "")
                           .replace(/\?.*/, "")
                           .replace(/\/$/, "");

    if (aliases[url]) {
        console.log("Redirecting: '%s' to '%s'", url, aliases[url]);
        response.writeHead(301, { Location: aliases[url] });
    } else {
        console.log("Alias not found: '%s'", url);
        response.statusCode = 404;
    }
    response.end();
});

server.listen(port, function(){
    console.log("Server listening on port: %s", port);
});

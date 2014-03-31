var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;
var server = http.createServer(function(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    fs.stat(path, function(err, stat) {
        if(err) {
            if(err.code == 'ENOENT') notFound(req, res);
            else serverError(req, res);
        } else {
            sendFile(req, res, stat, path);
        }
    });
});

function sendFile(req, res, stat, path) {
    res.setHeader('Content-Length', stat.size);
    var stream = fs.createReadStream(path);
    stream.pipe(res);
    stream.on('error', function(err) {
        serverError(req, res);
    });
}

function helloWorld(req, res) {
    var body = 'Hello World';
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end(body);
}

function serverError(req, res) {
    res.statusCode = 500;
    res.end("Internal Server Error");
}

function notFound(req, res) {
    res.statusCode = 404;
    res.end('Not Found!');
}

server.listen(3001);
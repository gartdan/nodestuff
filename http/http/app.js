var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var qs = require('querystring');

var items = [];
var root = __dirname;
var server = http.createServer(function(req, res) {
    var url = parse(req.url);
    if(url.path == '/todo') {
        todo(req, res);
    } else {
        var path = join(root, url.pathname);
        fs.stat(path, function(err, stat) {
            if(err) {
                if(err.code == 'ENOENT') notFound(req, res);
                else serverError(req, res);
            } else {
                sendFile(req, res, stat, path);
            }
        });
    }
});

function sendFile(req, res, stat, path) {
    res.setHeader('Content-Length', stat.size);
    var stream = fs.createReadStream(path);
    stream.pipe(res);
    stream.on('error', function(err) {
        serverError(req, res);
    });
}

function todo(req, res) {
    if(req.method == 'GET')
        todoGet(req, res);
    else if (req.method == 'POST')
        todoPost(req, res);
}

function todoGet(req, res) {
    var html = '<html><head><title>Todo</title></head>'
    + '<body><h1>Todo List</h1><div>'
    + '<ul>'
    + items.map(function(item) { return '<li>'+item+'</l1>'; }).join(' ')
    + '</ul>'
    + '<form method="post" action="/todo">'
    + '<p><input type="text" name="item" /></p>'
    + '<p><input type="submit" value="Add" /></p>'
    + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function todoPost(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { body += chunk; });
    req.on('end', function() {
        var obj = qs.parse(body);
        items.push(obj.item);
        todoGet(req, res);
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
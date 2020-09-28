const http = require("http");
const fs = require("fs");
const Router = require("./Router");

const port = 3000;
const host = "0.0.0.0";
const messages = [];
const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};
const htmlHeaders = {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*"
};

let errorPage;
let indexPage;

fs.readFile("404.html", function(err, data){
    if (err) throw err;
    errorPage = data;
});

fs.readFile("index.html", function(err, data){
    if (err) throw err;
    indexPage = data;
});

const router = new Router();

router.addRoute("/", "GET", (request, response) => {
    response.writeHead(200, htmlHeaders);
    response.end(indexPage);
});

router.addRoute("*.js", "GET", (request, response) => {
    response.writeHead(200, {});

});

router.addRoute("/messages", "GET", (request, response) => {
    response.writeHead(200, jsonHeaders);
    response.end(JSON.stringify(messages));
});

router.addRoute("/messages", "POST", (request, response) => {
    request.on("data", function(data) {
        const newMessage = JSON.parse(data.toString());
        newMessage.id = Math.random().toString(36).substring(2);
        messages.push(newMessage);
    });

    request.on("end", function() {
        response.writeHead(200, jsonHeaders);
        const message = messages[messages.length - 1];
        response.end(JSON.stringify(message));
    });
});

const server = http.createServer((request, response) => {
    const callback = router.findCallback(request.url, request.method);

    if (typeof callback === 'function') {
        callback(request, response);
        return;
    }

    let contentType = router.matchRegex(request.url);

    try {
        if (!contentType)
            throw "Unknown Content-Type";

        fs.readFile(`${__dirname}${request.url}`, function(err, data){
            if (err) throw err;
            response.writeHead(200, {
                "Content-Type": contentType
            });
            response.end(data);
        });
    } catch (err) {
        response.writeHead(404, htmlHeaders);
        response.end(errorPage);
    }
});

server.listen(port, host);
console.log(`Server listening at http://${host}:${port}`);
"use strict";

var path = require("path");
var http = require("http");
var nodeStaticAlias = require("node-static-alias");

const PORT = 8049;
const WEB_DIR = path.join(__dirname,"web");

var httpServer = http.createServer(handleRequest);

var staticServer = new nodeStaticAlias.Server(WEB_DIR,{
	serverInfo: "Web Workers",
	cache: 1
});


httpServer.listen(PORT);
console.log(`Server started on http://localhost:${PORT}...`);


// *******************************

async function handleRequest(req,res) {
	// handle static file requests
	if (["GET","HEAD"].includes(req.method)) {
		// special handling for empty favicon
		if (req.url == "/favicon.ico") {
			res.writeHead(204,{
				"Content-Type": "image/x-icon",
				"Cache-Control": "public, max-age: 604800"
			});
			res.end();
			return;
		}

		// handle other static files
		staticServer.serve(req,res,function onStaticComplete(err){
			if (err) {
				res.writeHead(404);
				res.end();
			}
		});
	}
	// Oops, invalid/unrecognized request
	else {
		res.writeHead(404);
		res.end();
	}
}

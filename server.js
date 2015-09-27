// var http = require('http');
// http.createServer(
// 	function(req, res) {
// 		res.writeHead(200, {'Content-Type':'text/plain'});
// 		res.end('Hello');
// 	}
// ).listen(1337, '127.0.0.1');

// Console.log("Server running on localhost:1337");

// var http = require('http');
// var fs = require('fs');
// http.createServer(
//   function(req, res){
//     fs.readFile('../index.html',
//     function (err, data){
//       res.writeHead(200,{'Content-Type':'text/html','Content-Length':data.length});
//       res.write(data);
//       res.end();

//     });

//   }).listen(1337,'127.0.0.1');

var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.listen(1337);

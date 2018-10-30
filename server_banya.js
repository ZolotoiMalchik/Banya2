var gulp = require('gulp'),
bs = require('browser-sync').create(),
express = require('express'),
spawn = require('child_process').spawn,
app = express(),
server = require('http').createServer(app);

app.use(express.static(__dirname + '/Banya'));
app.use('/lib', express.static("lib"));
app.use('/node_modules', express.static("node_modules"));
//app.use(express.static('/sap/', __dirname + 'http://sbt-oopp-007:8050/sap/'));

server.listen(3131, () => {
	console.log("Listen port 3131");
});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var route = require('./prove01-routes')(app);
http.listen(3000);
﻿var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/'));

server.listen(process.env.PORT || 80);


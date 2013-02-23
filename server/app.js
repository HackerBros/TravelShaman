/**
 * Nodis
 */
var express            = require('express');
var app                = express();
var http               = require('http');

var Routing            = require("./routing");
var Redis              = require("./redis");

var redis              = new Redis();
var routing            = new Routing(redis, http);

app.use(express.bodyParser());
app.use(express.static('../' + __dirname + '/webapp/dist'));
//app.get('/', routing.index);
app.get('/get/:key', routing.getKey);
app.post('/set', routing.setKey);
app.get('/_get/:key', routing._getKey);
app.get('/_set/:key/value/:value', routing._setKey);

var PORT1 = process.argv[2];
app.listen(PORT1 || 8080); //this is for App Fog

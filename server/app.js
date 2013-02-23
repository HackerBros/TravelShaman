/**
 * Nodis
 */
var express            = require('express');
var app                = express();
var https              = require('https');
var http               = require('http');
var fs                 = require("fs");

var Routing            = require("./routing");
var HashRing           = require("./hashring");
var Redis              = require("./redis");

var hashring           = new HashRing().newRing(4);
var redis              = new Redis();
var routing            = new Routing(redis, hashring, http);

app.use(express.bodyParser());
console.log(hashring.getNode("hotdog"));
console.log(hashring.getNode("hamburger"));

app.get('/', routing.index);
app.get('/get/:key', routing.getKey);
app.post('/set', routing.setKey);
app.get('/_get/:key', routing._getKey);
app.get('/_set/:key/value/:value', routing._setKey);

var PORT1 = process.argv[2];
var PORT2 = process.argv[3];
//app.listen(process.env.VCAP_APP_PORT || 8080); //this is for App Fog
http.createServer(app).listen(PORT1, function () {
	console.log("HTTP Server listening on " + PORT1);
});


https.createServer({
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem')
}, app).listen(PORT2, function () {
	console.log("HTTPS Server listening on " + PORT2);
});
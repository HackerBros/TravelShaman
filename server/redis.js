/**
 * Redis
 */
var redis = require("redis");

module.exports             = function Redis () {

	var _self = this;
	
	/*
		if you'd like to select database 3, instead of 0 (default),
		call client.select(3, function() { ... });
	 */
	
	/**
	 * set
	 * @param {string}   key
	 * @param {string}   value
	 * @param {Function} callback
	 */
	_self.set = function set(key, value, callback) {
		var client = redis.createClient();
		client.on("error", function (err) {
			console.log("Error " + err);
		});
		client.set(key, value, callback);
		client.quit();
	};

	/**
	 * get
	 * @param  {string}   key
	 * @param  {Function} callback
	 */
	_self.get = function get(key, callback) {
		var client = redis.createClient();
		client.on("error", function (err) {
			console.log("Error " + err);
		});
		client.get(key, callback);
		client.quit();
	};

	//function migrate()
};
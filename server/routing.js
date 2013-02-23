/**
 * Routing
 */

module.exports = function Routing (redis, hashring, http) {

	var _self = this;
	/**
	 * index route
	 * @param  {request} req
	 * @param  {response} res
	 */
	_self.index = function(req, res) {
		res.render('index.ejs', {layout:false,
			locals: { errorMessage:"Error: password wrong." }
		});
	};

	/**
	 * getKey route for internal server access
	 * @param  {request} req
	 * @param  {response} res
	 */
	_self.getKey = function (req, res) {
		redis.get(req.param("key"), function (err, data) {
			if (err) return err;
			console.log(data);
			res.send(data);
		});
	};

	/**
	 * setKey route for internal server access
	 * @param  {request} req
	 * @param  {response} res
	 */
	_self.setKey = function (req, res) {
		console.log(req.param("key"), req.param("value"));
		redis.set(req.param("key"), req.param("value"), function (err, data) {
				if (err) return err;
				res.send(data);
		});
	};

	/**
	 * _getKey route for external server access, sorts out hashring location for input before sending it to the appropriate server ip.
	 * @param  {request} req
	 * @param  {response} res
	 */
	_self._getKey = function (req, res) {
		var ip = hashring.getIp(req.param("key"));
		var port = hashring.getPort(req.param("key"));
		var path = '/get/' + req.param("key");
		var options = {
			hostname: ip,
			port: port,
			path: path,
			method: 'GET'
		};

		callback = function(response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so we just print it out here
			response.on('end', function () {
				//console.log(str);
				res.send(str);
			});
		};
		
		http.request(options, callback).end();
		//res.send("done");
	};

	/**
	 * _setKey route for external server access, sorts out hashring location for input before sending it to the appropriate server ip.
	 * @param  {request} req
	 * @param  {response} res
	 */
	_self._setKey = function (req, res) {
		var ip = hashring.getIp(req.param("key"));
		var port = hashring.getPort(req.param("key"));
		var options = {
			hostname: ip,
			port: port,
			path: '/set',
			method: 'POST',
			headers: {'Content-Type': 'application/json'}
		};
		var body = {
			key: req.param("key"),
			value: req.param("value")
		};

		callback = function(response) {
			var str = '';
			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				console.log(str);
			});
		};

		req = http.request(options, callback);
		console.log(JSON.stringify(body));
		req.write(JSON.stringify(body));
		req.end();
		res.send("done");
	};

};
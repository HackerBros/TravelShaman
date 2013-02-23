require.config({
  shim: {
  },
  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});


require(['app'], function(app) {
  // use app here
	window.webapp = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		init: function() {
			console.log('Hello from Backbone!');
		}	
	};
  console.log(app);
});
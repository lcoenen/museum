const HttpSimpleProxy = require('http-simple-proxy');
const httpSimpleProxy = new HttpSimpleProxy();

httpSimpleProxy.init(
	{
		ports: {
			4000	: {
				router: {
					'localhost:4000/': 3000,
					'localhost:4000/graphql': 2999,
				},
			},
		},
	},
	function(err) {
		if (err) console.error('Proxy error:', err);
		console.info('http-simple-proxy started');
	},
);

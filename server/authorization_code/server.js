require('./properties.js')
require('./passport.js')
require('./spotify.js')

var http = require('http'),
url = require('url'),
request = require('request'); // "Request" library


/*
Creates and starts the server
*/
var server = http.createServer(
	function(request, response ){
		var origin = (request.headers.origin || "*");
		if (request.method.toUpperCase() === "OPTIONS"){
			response.writeHead(
				"204",
				"No Content",
				{
					"access-control-allow-origin": origin,
					"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
					"access-control-allow-headers": "content-type, accept",
					"access-control-max-age": 10, // Seconds.
					"content-length": 0
				});
			return( response.end() );
		}
		var requestBodyBuffer = [];
		request.on(
			"data",
			function( chunk ){
				requestBodyBuffer.push( chunk );
			});
		request.on(
			"end",
			function(){
				var url_parts = url.parse(request.url, true);
				var query = url_parts.query;
				var funcstr = query.function;
				spotify[funcstr](query.song_id,function(msg){
					var requestBody = requestBodyBuffer.join( "" );
					var responseBody = (
						msg+"\n\n" +
						requestBody);
					response.writeHead(
						"200",
						"OK",
						{
							"access-control-allow-origin": origin,
							"content-type": "text/plain",
							"content-length": responseBody.length
						});
					return( response.end( responseBody ) );

				});
			});
	});
// Bind the server to port 8080.
server.listen(9999, "127.0.0.1");
// Debugging:
console.log( "Node.js listening on port 8080" );
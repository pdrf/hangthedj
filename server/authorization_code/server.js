require('./properties.js')
require('./passport.js')
require('./spotify.js')

var http = require('http'),
	url = require('url'),
	request = require('request'); // "Request" library


/*
Creates and starts the server
*/
http.createServer(function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var funcstr = query.function;
	spotify[funcstr](query.song_id);

  res.end();

}).listen(9999, "127.0.0.1");
console.log('Listening on 9999');
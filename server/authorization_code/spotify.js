var http = require('http'),
	url = require('url'),
	request = require('request'); // "Request" library
http.createServer(function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var funcstr = query.function;
	spotify[funcstr](query.song_id);

}).listen(9999, "192.168.1.2");
console.log('Listening on 9999');

var spotify = {};

spotify.addMusic = function(song_id){
	var authOptions = {
    	url: 'https://api.spotify.com/v1/users/' + card.user_id + '/playlists/'+card.playlist+'/tracks?uris='+song_id,
    	headers: { 'Authorization': 'Bearer ' + card.access },
    	json: true
  	}
  	request.post(authOptions, function(error, response) {
    //console.log(response);
  });
}
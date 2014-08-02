var spotify = {};

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

spotify.refreshToken = function(){
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(card.client_id + ':' + card.client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: card.refresh
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      card.access = access_token;
	}
	console.log('access token refreshed: ', card.access)
})
};

//http://localhost:8888/refresh_token?refresh_token=AQC8qXjapJ7keYft_KXsWewZm4StM7E2YX141T5Ah3F90bIR04oRtpmbZkZyOL9J071Q9DHksaQ4I5fZyc4NiZ0Ax-W232ciI9JB3xjHOJog6NGFKyIXOqWgr4Oll3PBHEI


spotify.addMusic = function(song_id){
	var authOptions = {
    	url: 'https://api.spotify.com/v1/users/' + card.user_id + '/playlists/'+card.playlist+'/tracks?uris='+song_id,
    	headers: { 'Authorization': 'Bearer ' + card.access },
    	json: true
  	}
  	request.post(authOptions, function(error, response) {
    console.log('música adicionada:', song_id, 'statusCode',response.statusCode);
  });
}

spotify.refreshToken(); //asks for access token at the beggining
var autoToken=setInterval(function(){spotify.refreshToken()},900000); //keeps refreshing access token every 15min
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

spotify.getSpotilocal = function(){
  for(var i=4370; i<4391; i++){
      spotify.trySpotilocal(i); 
    }
  };

spotify.trySpotilocal = function(port){
var authOptions = {
        url: 'http://www.spotilocal.com:'+port+'/remote/status.json',
        json: true
      }
    request.get(authOptions, function(error, response) {
      if(response!==undefined && response.statusCode===200){
        card.spotilocal = 'http://www.spotilocal.com:'+port+'/remote';
        console.log('trySpotilocal: ',card.spotilocal);
        return true;
      }else return false;
  })
}

spotify.getplaylists = function(song_id){
    var hasPlaylist = false;
    var regex = /^hangTheDj$/;
    var authOptions = {
      url: 'https://api.spotify.com/v1/users/' + card.user_id + '/playlists',
      headers: { 'Authorization': 'Bearer ' + card.access },
      json: true
    }
  request.get(authOptions, function(error, response) {
    for(var i=0;i<response.body.items.length;i++){
        var obj = response.body.items[i];
        console.log(obj.name, '->', obj.id)
        if(regex.test(obj.name)===true){
          card.playlistID = obj.id;
          hasPlaylist = true;
        } 
    }
    (hasPlaylist===true) ? spotify.addToPlaylist(song_id) : spotify.createPlaylist(song_id);
  });
  
}


spotify.addMusic = function(song_id){
  spotify.getplaylists(song_id);
}

spotify.addToPlaylist = function(song_id){
  var authOptions = {
      url: 'https://api.spotify.com/v1/users/' + card.user_id + '/playlists/'+card.playlistID+'/tracks?uris='+song_id,
      headers: { 'Authorization': 'Bearer ' + card.access },
      json: true
    }
    request.post(authOptions, function(error, response) {
    console.log('addToPlaylist:', response.statusCode);
  });
}

spotify.createPlaylist = function(song_id){
  var authOptions = {
      url: 'https://api.spotify.com/v1/users/' + card.user_id + '/playlists',
      headers: { 'Authorization': 'Bearer ' + card.access },
      body: {'name':'hangTheDj','public':false},
      json: true
    }
    request.post(authOptions, function(error, response) {
    console.log('createPlaylist:' ,response.statusCode);
    if(response.statusCode===200 || response.statusCode===201) spotify.getplaylists(song_id);
  });
}

spotify.getSpotilocal();
spotify.refreshToken(); //asks for access token at the beggining
var autoToken=setInterval(function(){spotify.refreshToken()},900000); //keeps refreshing access token every 15min
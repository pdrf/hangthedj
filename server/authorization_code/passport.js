global.passport = {};

var	request = require('request'); // "Request" library

/*
responsible for refreshing the authorization token so the application can communicate and 'give orders'
*/
passport.refreshToken = function(){
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
	console.log('access token refreshed: ', card.access);
  	passport.getSpotilocal();
  	passport.getoauth();
  	spotify.checkPlaylist();
	})
};

/*
Finds the port where the spotify local server (spotilocal) is running 
*/
passport.getSpotilocal = function(){
  for(var i=4371; i<4391; i++){
      passport.getsimplecsrf(i);
      passport.setSpotilocal(i);
    }
  };

/*
gets the scrf code, necessary for the comunication with spotilocal
*/
passport.getsimplecsrf = function(port){
    var authOptions = { 
      url: 'https://hangthedj.spotilocal.com:'+port+'/simplecsrf/token.json?',
      headers: {'Origin' : 'https://embed.spotify.com'},
      //body: {'oauth':card.access},
      json: true
    }
      request.get(authOptions, function(error, response) {
      if(response!==undefined && (response.statusCode===201 || response.statusCode===200)){
        card.csrftoken = response.body.token;
        console.log('csrftoken: ',card.csrftoken);
      };
    });
}

/*
setting the global parameter with the correct spotilocal path
*/
passport.setSpotilocal = function(port){
    var authOptions = { 
      url: 'https://hangthedj.spotilocal.com:'+port+'/remote/status',
      json: true
    }
      request.get(authOptions, function(error, response) {
      if(response!==undefined && (response.statusCode===201 || response.statusCode===200)){
        card.spotilocal = 'https://hangthedj.spotilocal.com:'+port;
        console.log('spotilocal: ',card.spotilocal);
      };
    });
}

/*
gets authorization token for the spotilocal
*/
passport.getoauth = function(){
    var authOptions = { 
      url: 'https://open.spotify.com/token'
    }
      request.get(authOptions, function(error, response) {
      if(response!==undefined){
        var result = JSON.parse(response.body);
        card.oauth = result.t;
        console.log('oauth: ',card.oauth);
      }
    })
}


passport.refreshToken(); //asks for access token at the beggining
var autoToken=setInterval(function(){passport.refreshToken()},900000); //keeps refreshing access token every 15min
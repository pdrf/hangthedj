global.passport = {};

var	request = require('request'); // "Request" library
var sys = require('sys')
var exec = require('child_process').exec;


/*
responsible for refreshing the authorization token so the application can communicate and 'give orders'
*/
passport.refreshToken = function(){
  //exec("ls -la", puts);
  //exec("open --background /Applications/Spotify.app", passport.openSpotify);
  passport.openSpotify("open --background /Applications/Spotify.app", function(response){
      if(response){
        passport.getSpotilocal(card.startPort);
      }else{passport.refreshToken()}
    })
};

/*
Finds the port where the spotify local server (spotilocal) is running 
*/
passport.getSpotilocal = function(startPort){
    passport.setSpotilocal(startPort,function(setSpotilocalRes){
      if(setSpotilocalRes){
        passport.getoauth(function(getoauthRes){
          if(card.oauth==null){
            passport.refreshToken();
          }
        });
        passport.getsimplecsrf();
      }else{
        (startPort===4371) ? passport.getSpotilocal(card.startPort) : passport.getSpotilocal(startPort-1);
      };
  });
};


/*
gets the scrf code, necessary for the comunication with spotilocal
*/
passport.getsimplecsrf = function(port){
    var authOptions = { 
      url: card.spotilocal+'/simplecsrf/token.json?',
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
passport.setSpotilocal = function(port,callback){
    var authOptions = { 
      url: 'https://hangthedj.spotilocal.com:'+port+'/remote/status',
      json: true
    }
    request.get(authOptions, function(error, response) {
      if(response!==undefined && (response.statusCode===201 || response.statusCode===200)){
        card.spotilocal = 'https://hangthedj.spotilocal.com:'+port;
        console.log('spotilocal: ',card.spotilocal);
        callback(true)
      }else{callback(false)}
    });
}

/*
gets authorization token for the spotilocal
*/
passport.getoauth = function(callback){
    var authOptions = { 
      url: 'https://open.spotify.com/token'
    }
      request.get(authOptions, function(error, response) {
      if(response!==undefined){
        var result = JSON.parse(response.body);
        card.oauth = result.t;
        callback(true)
        console.log('oauth: ',card.oauth);
      }
    })
}

passport.openSpotify = function(command, callback){
    exec(command, function(error, stdout, stderr){
      callback('Opening Spotify...');
    });
};

passport.verifySpotifyOpen = function(command, callback){
    exec(command, function(error, stdout, stderr){
      callback(stdout);
    });
};

//passport.openSpotify = function(error, stdout, stderr){
//  passport.getSpotilocal();
//  passport.getoauth();
//}


passport.refreshToken(); //asks for access token at the beggining
var autoToken=setInterval(function(){passport.refreshToken()},1800000); //keeps refreshing access token every 30min
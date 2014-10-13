global.spotify = {};

var request = require('request'); // "Request" library


/*
Starts the 'add music to playlist' proccess 
*/
spotify.addMusic = function(song,callback){
  var song = JSON.parse(song);
  card.curPlaylist.push(song);
  if(card.curPlaylist.length===1 && card.playing.length === 0){
    spotify.startSong(card.curPlaylist[0], function(startSongRes){
      callback('Start Playing');
    });
  }else{
    callback('Do nothing, just enjoy');
  }
}

/*
Starts playing our playlist, keeps track to the player status
*/
spotify.startSong = function(song_id, callback){
  var authOptions = {
    url: card.spotilocal+'/remote/play.json?csrf='+card.csrftoken+'&oauth='+card.oauth+'&uri='+song_id.song_id,
    json:true
  }
  request.get(authOptions,function(error, response){
    if(response){
        var old = card.curPlaylist.reverse().pop();
        card.curPlaylist.reverse();
        card.playing.push(song_id);
        console.log('playingSong : ',song_id.music, ' - ', response.body.playing);
        var check=setInterval(function () {
        spotify.checkStatus(function(statusPlaying) {
          if(statusPlaying===false){
            card.playing.pop();
            card.oldPlaylist.push(old);
            spotify.playNextTrack();
            clearInterval(check);
          }
        });
      }, 1000);
    }
    var statusCode = (response) ? response.statusCode : '401';
    callback(statusCode);
  })
}

/*
Starts playing the next track on the list
*/
spotify.playNextTrack = function(){
  if(card.curPlaylist.length>0){
    var song = card.curPlaylist[0];
    spotify.startSong(song, function(startSongRes){
    })
  }
}

/*
checks the player status
*/
spotify.checkStatus = function(callback){
  var authOptions = { 
      url: card.spotilocal+'/remote/status.json?csrf='+card.csrftoken+'&oauth='+card.oauth+'&cors=&ref=',
      json: true
    }
      request.get(authOptions, function(error, response) {
      if(callback) callback(response.body.playing);
    })
}

/*
Get all tracks info in playlist
*/
spotify.getplaylistItems = function(song_id,callback){
  var html = '<ul>';
  for (var a in card.playing) {
    html+='<li><p></p><strong>playing...</strong></li>'
    if(card.playing.hasOwnProperty(a)) {
      //html+='<li><img src="'+card.playing[a].smallimg.url+'" alt="'+card.playing[a].album+'" width="'+card.playing[a].smallimg.width+'px" height="'+card.playing[a].smallimg.height+'px">'+card.playing[a].music+' by '+card.playing[a].artist+' from '+card.playing[a].album+'</li>'
      html+='<li>'+card.playing[a].music+' by '+card.playing[a].artist+' from '+card.playing[a].album+'</li>'

  }}
  for (var b in card.curPlaylist) {
    if(card.curPlaylist.hasOwnProperty(b)) {
      //html+='<li><img src="'+card.curPlaylist[b].smallimg.url+'" alt="'+card.curPlaylist[b].album+'" width="'+card.curPlaylist[b].smallimg.width+'px" height="'+card.curPlaylist[b].smallimg.height+'px">'+card.curPlaylist[b].music+' by '+card.curPlaylist[b].artist+' from '+card.curPlaylist[b].album+'</li>'
      if(b == 0) { html+='<p></p><li><strong>next on playlist...</strong></li>' };
      html+='<li>'+card.curPlaylist[b].music+' by '+card.curPlaylist[b].artist+' from '+card.curPlaylist[b].album+'</li>'

  }}
  for (var c in card.oldPlaylist) {
    if(card.oldPlaylist.hasOwnProperty(c)) {
      //html+='<li><img src="'+card.oldPlaylist[c].smallimg.url+'" alt="'+card.oldPlaylist[c].album+'" width="'+card.oldPlaylist[c].smallimg.width+'px" height="'+card.oldPlaylist[c].smallimg.height+'px">'+card.oldPlaylist[c].music+' by '+card.oldPlaylist[c].artist+' from '+card.oldPlaylist[c].album+'</li>'
      if(c == 0) { html+='<p></p><li><strong>played today...</strong></li>' };
      html+='<li>'+card.oldPlaylist[c].music+' by '+card.oldPlaylist[c].artist+' from '+card.oldPlaylist[c].album+'</li>'
  }}

  html+= '</ul>'



  callback(html);
}
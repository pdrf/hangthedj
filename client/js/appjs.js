var app = {};
var card = {client_id:"130780f8dab64cf987437469c00ab6a2",
			client_secret:"7ec55499f13f48059ae24fc7866a9eab",
			user_id:"spotdevuser",
			user_pwd:"aveiro14"};

$(document).bind('pageinit', function(){
//$(document).ready(function(){

	//applies the left swift action
	$("#pageone").on("swipeleft",function(){
  		$("#gotopagetwo").click();
	});

	//applies the left swift action
	$("#pagetwo").on("swiperight",function(){
  		$("#gotopageone").click();
	});

	//autocomplete using the spotify api
	$( "#search" ).on( "listviewbeforefilter", function ( e, data ) {
		app.getResponse(data);
	});
	//closes popup window
	$("#popClose").click(function(){
		$("#popupMenu").popup("close");
	})
	
	//POST https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks?uris={uris}
	//"https://api.spotify.com/v1/users/wizzler/playlists/7oi0w0SLbJ4YyjrOxhZbUv/tracks"
	//-H "Authorization: Bearer {your access token}" 
	//-H "Content-Type: application/json" --data "[\"spotify:track:4iV5W9uYEdYUVa79Axb7Rh\", \"spotify:track:1301WleyT98MSxVHPZCA6M\"]"
	//adds song to spotify playlist
	$("#popAddSong").click(function(event){
		$("#popupMenu").popup("close");
		var song_id = $("#popName").attr('songId');
		console.log($("#popName").attr('songId'))
	})
});

//gets and handles the responses from the search
app.getResponse = function(data) {
	var $input = $( data.input ),
		value = $input.val();
	if ( value && value.length > 2 ) {
		$.ajax({
			url: 'https://api.spotify.com/v1/search',
      			data: {
      			    q: $input.val()+'*',
      			    type: 'track',
      			    limit: 50
      			},
		})
		.then( function ( response ) {
			//creates 'no cover' image object in case of no cover available
			var	noImg = {
				url:"img/nocover.jpeg",
				width:64,
				height:64
			}
			var dataSet = [];
			//for each element...
			$.each(response.tracks.items, function ( i, val ) {
				var newelem=[],
					album  = this.album,
					//verifies if cover is available
      	    		imagem = (album.images[2] === undefined) ? noImg : album.images[2],
      	    		music=this.name,
      	    		artist=this.artists[0].name,
      	    		id=this.uri,
      	    		result = music+" - "+artist+" - "+album.name,
      	    		img = '<img src="'+imagem.url+'" alt="'+music+'" width="'+imagem.width+'px" height="'+imagem.height+'px"><a href="#popupMenu" id="'+id+'" music="'+music+'" artist="'+artist+'" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="gear" data-theme="e" onclick="app.popInfo(this)"><img id="addSong" src="img/add_song2.png" alt="Add Song" width="'+imagem.width+'px" height="'+imagem.height+'px"></a>';
      	    	//img = "<img src='"+imagem.url+"' alt='"+this.name+"' width='"+imagem.width+"px' height='"+imagem.height+"px'><a href='#popupMenu' data-rel='popup' data-role='button' data-inline='true' data-transition='slideup' data-icon='gear' data-theme='e' onclick='app.popInfo()'><img id='addSong' src='img/add_song2.png' alt='Add Song' width='"+imagem.width+"px' height='"+imagem.height+"px'></a>";
      	    	newelem.push(img, result, id)
				dataSet.push(newelem)
			});
		    $('#tableContainer').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="resultsTable"></table>' );
		 	//build table using datatables plugin
		    $('#resultsTable').dataTable( {
		    	"bFilter": false,
    			"bLengthChange": false,
    			"bPaginate": true,
    			"iDisplayLength": 5,
    			"bSort": false,
		        "data": dataSet,
		        "columns": [
		            { "title": "", "class":"cover" },
		            { "title": "", "class":"title" },
		            { "title": "", "visible": false, "class":"id" },
		        ]
		    } );
		});
	}
}
//gives information to popup about the choice made
app.popInfo = function(elem){
	var id = $(elem).attr('id'),
		music = $(elem).attr('music'),
		artist= $(elem).attr('artist');
	$("#popName").html(music+' by '+artist);
	$("#popName").attr("songId",id);
} 
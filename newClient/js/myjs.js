var app={};

 $(function() {
 	$("#title").fitText(0.6);
	$( ".searchBox").autocomplete({ 
		minLength: 3,
		autoFocus: true,
		open: function( event, ui ) {
			$( ".ui-autocomplete").outerWidth($(this).outerWidth())	;
		},
		select: function( event, ui ) {
			var id = ui.item.id;
			app.clean();
			$('.searchBox').blur();
			app.getTrack(id);
			clearInterval(app.check);
		},
		source: function( request, response ) {
			var term = request.term;
 			$.ajax({
				url: 'https://api.spotify.com/v1/search',
      				data: {
      				    q: term+'*',
      				    type: 'track',
      				    limit: 50,
      				    market: 'PT'
      				},
			}).then( function ( data ) {
				var JSONdata = app.getResultJSON(data)
				response( JSONdata );
			})
		}
	})
	$(".btn").click(function(event){
		$(this).attr("disabled", true);
		$.ajax({
        	url: 'http://127.0.0.1:9999',
        	data: {
        	  'function': 'addMusic',
        	  'song_id': JSON.stringify(app.music)
        	},
        	json: true
        }).done(function(data){
        	app.getPlaylist();
        	$('.searchBox').val('');
        	app.music = {};
        })
	})
});

app.getResultJSON = function(data){
	var dataSet = [];
	$.each(data.tracks.items, function ( i, val ) {
		var id, label, value, uri;
      	var artist=this.artists[0].name;
      	var music=this.name;
      	var album  = this.album.name;
      	id =this.id;
      	label = music+' - '+artist+' - '+album;
      	var elem = {
      		'id' : id,
      		'label' : label,
      		'value' : label
      	}
		dataSet.push(elem)
	});
	return dataSet;
}

app.getTrack = function(id){
	var	noImg = {
		url:"css/images/keecalm.png",
		width:300,
		height:300
	}
	var smallNoImg = {
		url:"css/images/nocover.jpeg",
		width:64,
		height:64		
	}
	$.ajax({
		url: 'https://api.spotify.com/v1/tracks/'+id
	}).then( function ( data ) {
		var img = (data.album.images[1] === undefined) ? noImg : data.album.images[1],
		smallimg = (data.album.images[2] === undefined) ? smallNoImg : data.album.images[2],
		artist=data.artists[0].name,
      	music=data.name,
      	album =data.album.name,
      	info = '<h3>'+music+'</h3><h4>'+artist+'</h4>',
		imghtml = '</div><img src="'+img.url+'" alt="Album Cover" style="padding:10px;width:'+img.width+'px;height:'+img.height+'px">';
		$('#imageholder').append(imghtml);
		$('#trackinfo').append(info);
		$('.btn').show().removeAttr("disabled");
		app.music = {
			artist: artist,
			music: music,
			album: album,
			smallimg: smallimg,
			song_id: data.uri
		}
	})
}

app.getPlaylist = function(){
	app.check=setInterval(function () {
		app.clean();
		$.ajax({
       		url: 'http://127.0.0.1:9999',
       		data: {
       	  	'function': 'getplaylistItems',
       	  	'song_id': 'song_id'
       		}
       	}).done(function(strdata){
			$('#imageholder').append(strdata);
    	})
     }, 1000);
}

app.clean = function(){
	$('#imageholder').empty();
	$('#trackinfo').empty();
	$('.btn').hide();
}

app.jsload = function(){
	document.body.style.visibility='visible';
}

app.music = {};
















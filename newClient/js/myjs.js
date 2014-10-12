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
			var id = ui.item.value;
			ui.item.value = '';
			app.clean();
			$('#songid').text(ui.item.id);
			$('.searchBox').blur();
			app.getTrack(id);
		},
		source: function( request, response ) {
			var term = request.term;
 			$.ajax({
				url: 'https://api.spotify.com/v1/search',
      				data: {
      				    q: term+'*',
      				    type: 'track',
      				    limit: 50
      				},
			}).then( function ( data ) {
				var JSONdata = app.getResultJSON(data)
				response( JSONdata );
			})
		}
	})
	$(".btn").click(function(event){
		var song_id = $("#songid").text();
		$.ajax({
        	url: 'http://127.0.0.1:9999',
        	data: {
        	  'function': 'addMusic',
        	  'song_id': song_id
        	},
        	json: true
        }).done(function(data){
        	app.getPlaylist();
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
      	uri= 'spotify:track:'+id;
      	label = music+' - '+artist+' - '+album;
      	value = music+' '+artist+' '+album;
      	var elem = {
      		'id' : uri,
      		'label' : label,
      		'value' : id
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
	$.ajax({
		url: 'https://api.spotify.com/v1/tracks/'+id
	}).then( function ( data ) {
		var img = (data.album.images[1] === undefined) ? noImg : data.album.images[1],
		artist=data.artists[0].name,
      	music=data.name,
      	album =data.album.name,
      	info = '<h3>'+music+'</h3><h4>'+artist+'</h4>',
		imghtml = '</div><img src="'+img.url+'" alt="Album Cover" style="padding:10px;width:'+img.width+'px;height:'+img.height+'px">';
		$('#imageholder').append(imghtml);
		$('#trackinfo').append(info);
		$('.btn').show();
	})
}

app.getPlaylist = function(){
	app.clean();
	$.ajax({
       	url: 'http://127.0.0.1:9999',
       	data: {
       	  'function': 'getplaylistItems',
       	  'song_id': 'song_id'
       	}
       }).done(function(strdata){
       		var html = '<ul>';
       		var data = jQuery.parseJSON(strdata);
       		var	noImg = {
				url:"css/images/nocover.jpeg",
				width:64,
				height:64
			}
       		for(var i=0;i<data.items.length;i++){
       			var obj = data.items[i],
       			img = (obj.track.album.images[2] === undefined) ? noImg : obj.track.album.images[2],
       			artist= obj.track.artists[0].name,
        		music = obj.track.name,
        		album = obj.track.album.name;
        		html+='<li>'+music+' - '+artist+' - '+album+'</li>';
    		}
    		html+='</ul>';
			//var img = (data.album.images[2] === undefined) ? noImg : data.album.images[2],
			//artist=data.artists[0].name,
     		//music=data.name,
     		//album =data.album.name,
     		//info = '<h3>'+music+'</h3><h4>'+artist+'</h4>',
			//imghtml = '</div><img src="'+img.url+'" alt="Album Cover" style="padding:10px;width:'+img.width+'px;height:'+img.height+'px">';
			//console.log(imghtml)
			//console.log(info)
			$('#imageholder').append(html);
			//$('#trackinfo').append(info);
    	})
}

app.clean = function(){
	$('#imageholder').empty();
	$('#trackinfo').empty();
	$('.btn').hide();
}

app.jsload = function(){
	document.body.style.visibility='visible';
}
















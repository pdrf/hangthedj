var app = {};

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

	//tap action
	$("#tableContainer").on("taphold","#myTable tr",function(event){
		event.preventDefault();
		event.stopPropagation();
		var songName = $(this).find("td:last").text();
		var songID   = $(this).attr("id");
		$("#addSong .ui-content").attr("id", songID);
		$("#addSong .ui-content p").text(songName);
		$("#addSongLink").click();
		return false;
	});
});

//gets and handles the responses from the search
app.getResponse = function(data) {
	var $table = $( "#tableContainer" ),
		$input = $( data.input ),
		value = $input.val(),
		html = "<table id='myTable'><thead><tr><th></th><th></th></tr></thead><tbody>";
	//starts to build the table html that will contain the results
	$table.html( "" );
	if ( value && value.length > 2 ) {
		$table.listview( "refresh" );
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
			var	img = {
				url:"img/nocover.jpeg",
				width:64,
				height:64
			}
			//for each element...
			$.each(response.tracks.items, function ( i, val ) {
				var album  = this.album;
				//verifies if cover is available
      	    	var imagem = (album.images[2] === undefined) ? img : album.images[2];
      	    	var width  = imagem.width;
      	    	var height = imagem.height;
      	    	var result = this.name+" - "+this.artists[0].name+" - "+album.name;
      	    	//add results to table
				//html += "<tr id='"+this.uri+"'><td><img class='addSong' src='img/plus.png' alt='add song' width='30px' height='30spx'><img src='"+imagem.url+"' alt='"+this.name+"' width='"+width+"px' height='"+height+"px'> </td><td>"+result+"</td></tr>";
				html += "<tr id='"+this.uri+"'><td><img src='"+imagem.url+"' alt='"+this.name+"' width='"+width+"px' height='"+height+"px'> </td><td>"+result+"</td></tr>";

			});
			html += "</tbody></table>";
			$table.html( html );
			$table.listview( "refresh" );
			$table.trigger( "updatelayout");
			//uses the datatables plugin to enjoy enhanced table
			$("#myTable").dataTable({
    			"bFilter": false,
    			"bLengthChange": false,
    			"bPaginate": true,
    			"iDisplayLength": 5,
    			"bSort": false
  			});
		});
	}
}
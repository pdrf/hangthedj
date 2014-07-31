var card = {client_id:"130780f8dab64cf987437469c00ab6a2",
            client_secret:"7ec55499f13f48059ae24fc7866a9eab",
            user_id:"spotdevuser",
            user_pwd:"aveiro14",
            redirect_uri:"",
            access_token:"BQArO9fFXu0q9qUCOs-7BUnPZD_StGDceuZ1wkoMlnae7cMBZ6MEFe8IV3NBjK10J7s0xZQVi3yr32xQeQFxLDWzm2Xos2WNAL5Jowz_g4tJCGV_q8E4h_E-3IHCYGN3_iNJx_lCu7SK-uNXhsMex4DNU54ktbu_V2AF1oKn3qsGLq069g_fjVndNhsPf01qVQq_16UoLOcg4i9xBQ",
            playlist:"1gDcMvi8daManFexydRIDV"
            };

var scope = 'playlist-modify-public playlist-modify-private playlist-read-private streaming user-read-private user-read-email';
var encodedData = card.client_id +':'+ card.client_secret;
var url = 'https://accounts.spotify.com/authorize?';

//      url: 'https://accounts.spotify.com/api/token',
//      form: {
//        code: code,
//        redirect_uri: redirect_uri,
//        grant_type: 'authorization_code',
//        client_id: client_id,
//        client_secret: client_secret

/*$.ajax({
    type:'POST',
    url: 'https://accounts.spotify.com/api/token',
    contentType: 'text/plain',
    xhrFields: {
        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        // This can be used to set the 'withCredentials' property.
        // Set the value to 'true' if you'd like to pass cookies to the server.
        // If this is enabled, your server must respond with the header
        // 'Access-Control-Allow-Credentials: true'.
        withCredentials: true
    },
    grant_type: "client_credentials",
    scope: scope,
    headers: {
        'Authorization': 'Basic ' + window.btoa(encodedData)
    },
    success: function(response) {
        var data = response;
        console.log(data) 
    },
    error: function(){
        console.log('ups you did it again')
    }
});*/
/*$.ajax({
type: 'GET',
url: 'http://192.168.1.3:9999',
success: function (data) {
    console.log('data', data)
},
error: function (xhr, status, error) {
    console.log('Error: ' + error.message);
}
});*/

/*$.ajax({
    type:'GET',
    url: 'http://localhost:9999',
    contentType: 'text/plain',
    xhrFields: {
        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        // This can be used to set the 'withCredentials' property.
        // Set the value to 'true' if you'd like to pass cookies to the server.
        // If this is enabled, your server must respond with the header
        // 'Access-Control-Allow-Credentials: true'.
        withCredentials: true
    },
    success: function(response) {
        var data = response;
        console.log(data) 
    },
    error: function(){
        console.log('ups you did it again')
    }
});*/

/* Loading JSON objects using JSONP */
/*    var url = 'https://accounts.spotify.com/api/token';
    $.ajax({
        type: 'POST',
        url: url,
        grant_type: "client_credentials",
        scope: scope,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        username:card.user_id,
        password:card.user_pwd,
        headers: {
            'Authorization': 'Basic ' + window.btoa(encodedData)
        },
        success: function(response) {
            var data = response;
            console.log(data) 
        }
    });*/


/*var scope = 'playlist-modify-public playlist-modify-private playlist-read-private streaming user-read-private user-read-email';
var encodedData = card.client_id +'-'+ card.client_secret;
console.log(window.btoa(encodedData))
$.ajax({
    url: 'https://accounts.spotify.com/api/token',
    type: "POST", 
    grant_type: "client_credentials",
    scope: scope,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'runscope/0.1',
        'Authorization': 'Basic ' + window.btoa(encodedData)
    },
    success: function(response) {
        var data = response;
        console.log(data) 
    }
});*/

/*$.ajax({
    url: 'http://192.168.1.5:8888',
    success: function (data) {
        console.info(data);
    }
});*/
//var access_token = card.client_id + ':' + card.client_secret;
//console.log('access_token',access_token);
//var access_teste = 'BQAZtIQQpKTVcPHnGiDDtUKKydzk4DQcZnBZi_Obsa2WAObOQiKhicNNKi6SPukH5rpYerln-hzkKQYD5ZR0tF2LOG5LkPV0ZR1t6GOoGIeZA9wVWMB7g3nAQCB59RwyPiUvysNFmcJfZmRhG46mhNhgXw';
//console.log('access_teste',access_teste)
//var encodedData = window.btoa(card.client_id)+'-'+window.btoa(card.client_secret);
//console.log("encodedData",encodedData)

/*$.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: {
        'Authorization': 'Bearer ' + card.access_token
    },
    success: function(response) {
        var data = response;
        console.log(data) 
    }
});*/



/*$.ajax({        
    url: 'https://api.spotify.com/v1/users/' + card.user_id + '/playlists/'+card.playlist+'/tracks?uris={uris},
    headers: {
        'Authorization': 'Bearer ' + card.access_token
    },
    success: function(response) {
        console.log(response);
        response.items;
    }
});*/

    //Authorization: Basic <base64 encoded client_id:client_secret>
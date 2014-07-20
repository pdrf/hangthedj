var card = {client_id:"130780f8dab64cf987437469c00ab6a2",
            client_secret:"7ec55499f13f48059ae24fc7866a9eab",
            user_id:"spotdevuser",
            user_pwd:"aveiro14",
            redirect_uri:""};



$.ajax({
    url: 'https://accounts.spotify.com/api/token',
    type: 'post',
    headers: {
        'Authorization': 'Basic ' + (card.client_id + ':' +
            card.client_secret).toString('base64')
    },
    form: {
        grant_type: 'bearer'
    },
    json: true,
    success: function (data) {
        console.info(data);
    }
});
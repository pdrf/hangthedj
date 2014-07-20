var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request');
var querystring = require('querystring');
var config = {client_id:"130780f8dab64cf987437469c00ab6a2",
            client_secret:"7ec55499f13f48059ae24fc7866a9eab",
            user_id:"spotdevuser",
            user_pwd:"aveiro14",
            redirect_uri:""};

var client_id = config.client_id,
 client_secret = config.client_secret,
 redirect_uri = config.redirect_uri;

var spotifyApi = new SpotifyWebApi({
 client_id: client_id,
 redirect_uri: redirect_uri
});

exports.login = function(req, res) {
 var scope = 'user-read-private playlist-read playlist-read-private',
    state = 'mixr-test';

res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
};

exports.callback = function(req, res) {
var code = req.query.code;
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
        client_id: client_id,
        client_secret: client_secret
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };

        // res.send(options);

        res.redirect('http://localhost:8080/#/test#' +
            querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
            }));
    }

    res.send({
        access_token: access_token,
        refresh_token: refresh_token
    });
});
};

exports.refreshToken = function(req, res) {
var refresh_token = req.query.refresh_token;

var authOptions = {
    url: 'https:/accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' +
            client_secret).toString('base64'))
    },
    form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
            'access_token': access_token
        });
    }
});
};
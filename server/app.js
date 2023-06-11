import dotenv from 'dotenv';
import express from 'express';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import request from 'request';
import { nanoid } from 'nanoid';
import axios from 'axios';
import FormData from 'form-data';
import fetch from 'node-fetch';

import { Server } from 'socket.io';

const io = new Server(8080, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		transports: ['websocket']
	}
});

dotenv.config({ path: '../.env' });

var client_id = process.env.VITE_CLIENT_ID;
var client_secret = process.env.VITE_CLIENT_SECRET;
var redirect_uri = 'http://localhost:8888/callback';

var access_token = '';
var refresh_token = '';

const app = express();

app.use(cors());
app.use(cookieParser());

app.get('/login', function (req, res) {
	var state = nanoid(16);
	var scope = 'user-modify-playback-state user-read-playback-state';

	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state
			})
	);
});

app.get('/callback', function (req, res) {
	// your application requests refresh and access tokens
	// after checking the state parameter

	var code = req.query.code || null;
	var state = req.query.state || null;

	if (state === null) {
		res.redirect(
			'/#' +
				querystring.stringify({
					error: 'state_is_null'
				})
		);
	} else {
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
			},
			json: true
		};

		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				access_token = body.access_token;
				refresh_token = body.refresh_token;

				// we can also pass the token to the browser to make requests from there
				res.redirect(
					'/#' +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token
						})
				);
			} else {
				res.redirect(
					'/#' +
						querystring.stringify({
							error: 'invalid_token'
						})
				);
			}
		});
	}
});

io.on('connection', (socket) => {
	socket.on('track', (arg) => {
		console.log(arg.link);
		fetch(`https://api.spotify.com/v1/me/player/queue?uri=${arg.link}`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		}).catch((err) => console.log(err));
	});
});

console.log('Listening on 8888');
app.listen(8888);

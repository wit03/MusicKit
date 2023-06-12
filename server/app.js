import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
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

var access_token = '';

const app = express();

app.use(cors());

io.on('connection', (socket) => {
	socket.on('token', (arg) => {
		access_token = arg.access_token;
		console.log('received token: ' + access_token);
	});
	socket.on('track', (arg) => {
		console.log('queue added: ' + arg.link);
		fetch(`https://api.spotify.com/v1/me/player/queue?uri=${arg.link}`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		}).catch((err) => console.log(err));
	});
});

console.log('Listening on 8080');
app.listen(8080);

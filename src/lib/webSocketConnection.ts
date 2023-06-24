import ioClient from 'socket.io-client';

const ENDPOINT = 'https://musickit.wit03.xyz';
const socket = ioClient(ENDPOINT);

export const io = socket;

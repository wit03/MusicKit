import ioClient from 'socket.io-client';

const ENDPOINT = 'http://18.141.235.114:8080';
const socket = ioClient(ENDPOINT);

export const io = socket;

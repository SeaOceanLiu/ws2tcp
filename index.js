#!/usr/bin/env node

const net = require('net');
const wsStreamServer = require('websocket-stream');
const streamPump = require('pump');
const dotenv = require('dotenv');
const path = require('path');

const config = dotenv.config({path: path.join(__dirname, '.env.ws2tcp')});

const toPort = process.env.TARGET_PORT;
const toHostIP = process.env.TARGET_HOST_IP;
const proxyPort = process.env.PROXY_PORT;

wsStreamServer.createServer({port:proxyPort}, (wsStream) => {
    streamPump(wsStream, net.connect(toPort, toHostIP), wsStream, (error) => {
        console.log('pump error information: ', error);
    });
    console.log('a stream pump instance is created.');
});

console.log(`Proxy for WebSocket port ${proxyPort} to TCP ${toHostIP}:${toPort} is established.`);
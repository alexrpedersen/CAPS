'use strict';

const net = require('net');
const events = require('./events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');
const PORT = process.env.PORT||3000
const server = net.createServer();

let socketPool = {};

events.on('pickUp', payload => console.log('The "package" has been picked up', payload));
events.on('inTransit', payload => console.log('The package is in transit', payload));
events.on('delivered', payload => console.log('The package has been delivered', payload));

function log(event, payload) {
  let timestamp = new Date();
  console.log('LOG:', {payload})
}

server.on('connection', (socket) => {
  console.log('client:', socket);
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;

  socket.on('data', (buffer) => {
    //dispatch function 
  });
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  broadcaast(message);
}

function broadcast(message) {
  let payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}

server.listen(PORT, () => {
  console.log('Server is up on ${PORT}');
});
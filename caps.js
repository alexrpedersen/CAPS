'use strict';
const net = require('net');// Brings in the net library
const server = net.createServer();// Creates a new tcp instance
const PORT = process.env.PORT || 3000;

const events = require('./events.js');
// const vendor = require('./vendor.js');
// const driver = require('./driver.js');

let socketPool = {}; //clients who are connected to the app

events.on('pickUp', payload => console.log('The "package" has been picked up', payload));
events.on('inTransit', payload => console.log('The package is in transit', payload));
events.on('delivered', payload => console.log('The package has been delivered', payload));

function log(event, payload) {
  let timestamp = new Date();
  console.log('LOG:', {
    payload
  });
};

server.on('connection', (socket) => { // as soon as you connect, you are a socket
  // console.log('client:', socket);
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Add new connection to socket pool:', id)
  socket.on('data', (buffer) => {
    dispatchEvent(buffer);
  });
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  console.log(`Broadcasting "${message.event}" event`)
  broadcast(message);
};

function broadcast(message) {
  let payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  };
};

server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
'use strict';

const events = require('./events.js');
const faker = require('faker');
// require('./vendor.js');

const net = require('net');
const socket = new net.Socket();

socket.connect({
  port:3000,
  host: 'localhost'
}, () => {
  console.log('Successfully connected to driver.js')
});

let payload = {
  companyName : faker.company.companyName(),
  orderId : faker.random.number(),
  customerName : faker.name.findName(),
  customerAddress : faker.address.streetAddress(),
};

socket.on('data', (buffer) => {
  // console.log('got a buffer', buffer)
  const jsonString = buffer.toString()
  // console.log('made it a string', jsonString)
  const data = JSON.parse(jsonString)

  if (data.event === 'pickUp') {
    setTimeout(handlePickup, 1000, data.payload);
  }
  if (data.event === 'inTransit') {
    setTimeout(handleDelivered, 3000, data.payload);
  }
})
// socket.on('data', handlePickup);
// events.on('inTransit', transitHandler);
// events.on('delivered', deliveryHandler);

function transitHandler(payload){
  setTimeout(handleTransit, 1000, payload);
};

function deliveryHandler(payload){
  setTimeout(handleDelivered, 3000, payload);
};

function handlePickup(payload) {
  console.log(`'Driver picked up package ${payload.orderId}`);
  let data = JSON.stringify({event: 'inTransit', payload})
  socket.write(data);
};

function handleTransit(payload) {
  console.log(`'Package is in transit ${payload.orderId}, ${payload}`);
  events.emit('delivered',payload);
};

function handleDelivered(payload) {
  console.log(`'I have delivered ${payload.orderId}`);
  let data = JSON.stringify({event: 'delivered', payload})
  socket.write(data);
};
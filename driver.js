'use strict';

const events = require('./events.js');

events.on('pickUp', handlePickup);
events.on('inTransit', handleTransit);
events.on('delivered', handleDelivered);


function handlePickup(payload) {
  console.log(`'Driver picked up package ${payload.orderId}`);
  events.emit('inTransit', payload);
};

function handleTransit(payload) {
  console.log(`'Package is in transit ${payload.orderId}, ${payload}`);
  events.emit('delivered',payload);
};

function handleDelivered(payload) {
  console.log('delivered', payload);
};
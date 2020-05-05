'use strict';

const events = require('./events.js');
const faker = require('faker');

events.on('delivered', () => {
    console.log('Delivered');
});


setInterval(() => {
    let payload = {
        companyName : faker.company.companyName(),
        orderId : faker.random.number(),
        customerName : faker.name.findName(),
        customerAddress : faker.address.streetAddress(),
    };
    console.log('Order created', payload);
    events.emit('pickUp', payload);
}, 5000);
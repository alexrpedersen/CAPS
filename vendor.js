'use strict';

const net = require('net');
const socket = new net.Socket();

const events = require('./events.js');
const faker = require('faker');

socket.connect({
    port: 3000,
    host: 'localhost'
}, () => {
    console.log('Successfully connected to caps.js')
});

// events.on('delivered', () => {
//     console.log('Vendor: Thank you for delivering the package!');
// });

socket.on('data', (buffer) => {
    // console.log('got a buffer', buffer)
    const jsonString = buffer.toString()
    // console.log('made it a string', jsonString)
    const data = JSON.parse(jsonString)

    if (data.event === 'delivered') {
        console.log(`Thank you for delivering package ID ${data.payload.orderId}`);
    };
});


setInterval(() => {
    let payload = {
        companyName: faker.company.companyName(),
        orderId: faker.random.number(),
        customerName: faker.name.findName(),
        customerAddress: faker.address.streetAddress(),
    };
    console.log('Order created', payload);
    let data = JSON.stringify({
        event: 'pickUp',
        payload
    });
    socket.write(data);
}, 5000);
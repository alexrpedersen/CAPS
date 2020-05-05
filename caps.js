const events = require('./events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');

events.on('pickup', payload => console.log('The "package" has been picked up', payload));
events.on('inTransit', payload => console.log('The package is in transit', payload));
events.on('delivered', payload => console.log('The package has been delivered', payload));

function log(event, payload) {
  let timestamp = new Date();
  console.log('LOG:', {payload})
}
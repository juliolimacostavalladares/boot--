const faker = require('faker');
 
const fromMilli = Date.parse(0);
const dateOffset = faker.random.number(Date.parse(50) - fromMilli);

const newDate = new Date(fromMilli + dateOffset);

const dateTime = newDate.toJSON().split('T')[0].replace(/-/g, '/')

console.log(dateTime)


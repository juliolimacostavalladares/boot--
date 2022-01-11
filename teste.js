var faker = require('faker');
 
var randomPhoneNumber = faker.phone.phoneNumber();
var randomEmail = faker.internet.email();

console.log(randomPhoneNumber, randomEmail)

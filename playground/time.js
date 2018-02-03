// Jan 1sst 1970 00:00 am
const moment = require('moment');


/*var date = moment();*/

//date.add(1, 'year').subtract(9,'months');

/*
console.log(date.format('MMM, Do YYYY'));*/
var createdAt = new Date().getTime();
var date = moment(createdAt);

console.log(date.format('h:m a'));

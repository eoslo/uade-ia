var schedule = require('node-schedule');

var job = schedule.scheduleJob('00 00 16 29 * *', function(){
    console.log('The answer to life, the universe, and everything!');
});

module.exports = job;
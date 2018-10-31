var schedule = require('node-schedule');
var BillingService = require('../services/billingService');
var billingService = new BillingService();


var job = schedule.scheduleJob('00 00 00 01 * *', function(){
    console.log("starting job scheduler")
    billingService.createAllBills();
});



module.exports = job;
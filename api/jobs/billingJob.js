var schedule = require('node-schedule');
var BillingService = require('../services/billingService');
var billingService = new BillingService();

/*
var job = schedule.scheduleJob('* * * * *', function(){
    console.log("starting job scheduler")
    billingService.createAllBills(function (err) {
        if(err){
            console.error(err);
        }
        console.log("finished job")
    });
});

*/

module.exports = job;
var schedule = require('node-schedule');
var BillingService = require('../services/billingService');
var billingService = new billingService();

var job = schedule.scheduleJob('50 16 12 30 * *', function(){
    salaryService.payroll(function (err) {
        if(err){
            console.error(err);
        }
    });
});

module.exports = job;
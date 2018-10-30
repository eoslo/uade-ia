var schedule = require('node-schedule');
var SalaryService = require('../services/salaryService');
var salaryService = new SalaryService();

var job = schedule.scheduleJob('50 16 12 30 * *', function(){
    salaryService.payroll(function (err) {
        if(err){
            console.error(err);
        }
    });
});

module.exports = job;
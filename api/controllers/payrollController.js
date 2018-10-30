var PayrollService = require('../services/salaryService');
var payrollService = new PayrollService();

class payrollController {
    generatePayroll(callback){
        return payrollService.payroll(function (err) {
            if(err){
                return callback(err);
            }
            return callback();
        })
    }
}

module.exports = payrollController;
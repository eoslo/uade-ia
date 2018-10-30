var PayrollService = require('../services/salaryService');

class payrollController {
    constructor(){
        this.payrollService = new PayrollService();
    }

    generatePayroll(callback){
        return this.payrollService.payroll(function (err) {
            if(err){
                return callback(err);
            }
        })
    }
}

module.exports = payrollController;
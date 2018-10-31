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

    generateOnePayroll(req, callback){
        return payrollService.onePayroll(req.params.id, function (err) {
            if(err){
                return callback(err);
            }
            return callback(err, "done");
        })
    }
}

module.exports = payrollController;
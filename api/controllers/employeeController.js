var EmployeeService = require('../services/employeeService');

class employeeController {
    constructor(){
        this.employeeService = new EmployeeService();
    }

    createEmployee(req, callback) {
        return this.employeeService.createEmployee(req.body.name, req.body.address,
            req.body.birth_date, req.body.dni, req.body.payroll_type, req.body.gross_salary, req.body.salary_per_hour, req.body.estimated_hours,
            SalaryService.deductions, req.body.client_id, function (err, employee) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, employee);
            })
    }

    modifyEmployee(req, callback){
        return this.employeeService.modifyEmployee(req.body.employee_id, req.body.address,
            req.body.gross_salary, req.body.salary_per_hour, req.body.estimated_hours, function (err, employee) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, employee)
            })
    }

    deleteEmployee(req, callback){
        return this.employeeService.deleteEmployee(req.body.employee_id, function (err, employee) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, employee)
            })
    }

    getUpdatesByEmployeeId(req, callback){
        return this.employeeService.getUpdatesByEmployeeId(req.params.id, function(err, updates){
            if (err){
                console.error(err);
                return callback(err);
            }
            return callback(err, updates);
        });
    }

    getLastPayroll(req, callback){
        return this.employeeService.getLastPayroll(req.params.id, function (err, salary) {
            if(err){
                console.error(err);
                return callback(err);
            }
            else{
                return callback(err, salary);
            }
        })
    }
}


module.exports = employeeController;
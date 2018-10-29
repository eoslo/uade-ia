var EmployeeService = require('../services/employeeService');

class employeeController {
    constructor(){
        this.employeeService = new EmployeeService();
    }

    createEmployee(req, callback) {
        return this.employeeService.createEmployee(req.body.name, req.body.address,
            req.body.birth_date, req.body.dni, req.body.payroll_type, req.body.gross_salary, req.body.salary_per_hour, req.body.client_id, function (err, employee) {
                if(err){
                    console.error(err);
                }
                return callback(err, employee);
            })
    }

    modifyEmployee(req, callback){
        return this.employeeService.modifyEmployee(req.body.employee_id, req.body.address,
            req.body.payroll_type, req.body.gross_salary, req.body.salary_per_hour, function (err, employee) {
                if(err){
                    console.error(err);
                }
                return callback(err, employee)
            })
    }
}


module.exports = employeeController;
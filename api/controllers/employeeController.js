var EmployeeService = require('../services/employeeService');
var employeeService = new EmployeeService();

class employeeController {

    getEmployeeId(req, callback){
        return employeeService.getEmployeeId(req.params.dni, function (err, employee) {
            if(err){
                console.error(err);
                return callback(err);
            }
            return callback(err, employee);
        })
    }

    createEmployee(req, callback) {
        return employeeService.createEmployee(req.body.name, req.body.address,
            req.body.birth_date, req.body.dni, req.body.payroll_type, req.body.gross_salary, req.body.salary_per_hour, req.body.estimated_hours,
            req.body.deductions, req.body.client_id, req.body.cbu, function (err, employee) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, employee);
            })
    }

    modifyEmployee(req, callback){
        return employeeService.modifyEmployee(req.body.employee_id, req.body.name, req.body.address,
            req.body.birth_date, req.body.dni, req.body.estimated_hours, req.body.deductions, req.body.cbu, function (err, employee) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, employee)
            })
    }

    deleteEmployee(req, callback){
        console.log(req.body);
        return employeeService.deleteEmployee(req.body.employee_id, function (err, employee) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, employee)
            });
    }

    getUpdatesByEmployeeId(req, callback){
        return employeeService.getUpdatesByEmployeeId(req.params.id, function(err, updates){
            if (err){
                console.error(err);
                return callback(err);
            }
            return callback(err, updates);
        });
    }

    getLastPayroll(req, callback){
        return employeeService.getLastPayroll(req.params.id, function (err, salary) {
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
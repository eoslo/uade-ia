var Employee = require('../models/employee');
var Salary = require('../models/salary');

class SalaryService {

    payroll(callback) {
        var errors = [];
        Employee.find({}, function (err, employees) {
            if(err){
                return callback(err);
            }
            employees.forEach(function (employee) {
                var salary = new Salary();
                if(employee.payroll_type === 'monthly'){
                    salary.mount = employee.gross_salary;
                }
                if(employee.updates.length){
                    employee.updates.forEach(function (update) {
                        if(employee.payroll_type === 'per_hour' && update.worked_hours){
                            salary.mount += update.worked_hours*employee.salary_per_hour;
                        }
                        else if(employee.payroll_type === 'monthly' && update.absence_days){
                            salary.mount -= ((employee.gross_salary/30)*update.absence_days);
                        }
                    })
                }
                else if(employee.payroll_type === 'per_hour'){
                    if(employee.salaries.length>0){
                        salary.mount = employee.salaries[employee.salaries.length-1];
                    }
                    else{
                        salary.mount += employee.salary_per_hour*employee.estimated_hours;
                    }
                }
                employee.update({ $push :{salaries:salary} }, function (err, raw) {
                    if(err){
                        errors.push({error:err, employee:employee.dni});
                    }
                    else{
                        employee.salaries.push(salary);
                        console.log(employee.dni + ' ' + employee.salaries[employee.salaries.length-1]);
                    }
                });
            });
            return callback(err);
        })
    }

}

module.exports = SalaryService;
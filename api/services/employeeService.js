var Employee = require('../models/employee');
var Client = require('../models/client');


class EmployeeService {

    createEmployee(name, address, birth_date, dni, payroll_type, gross_salary, salaray_per_hour, clientId, callback) {
        var employee = new Employee();
        employee.name = name;
        employee.address = address;
        employee.birth_date = birth_date;
        employee.dni = dni;
        employee.payroll_type = payroll_type;
        employee.gross_salary = gross_salary;
        employee.salary_per_hour = salaray_per_hour;
        employee.save(function (err) {
            if(err){
                return callback(err, null);
            }

            console.log(employee)

            Client.findOneAndUpdate(
                { _id: clientId },
                { $push: { employees: employee._id } }, function (err, client) {
                    return callback(err, employee);
            });
        });
    }

    modifyEmployee(id, address, payroll_type, gross_salary, salary_per_hour, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(employee){
                employee.update({ address: address ,payroll_type: payroll_type , gross_salary: gross_salary , salary_per_hour: salary_per_hour }, function (err, raw) {
                    if(err){
                        return callback(err);
                    }
                    else{
                        console.log(raw);
                        return callback(err, employee);
                    }
                });
            }
        })
    }

    modifyEmployee(id, address, payroll_type, gross_salary, salary_per_hour, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(employee){
                employee.update({ address: address ,payroll_type: payroll_type , gross_salary: gross_salary , salary_per_hour: salary_per_hour }, function (err, raw) {
                    if(err){
                        return callback(err);
                    }
                    else{
                        console.log(raw);
                        return callback(err, employee);
                    }
                });
            }
        })
    }
}

module.exports = EmployeeService;
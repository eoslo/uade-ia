var Employee = require('../models/employee');
var Client = require('../models/client');


class EmployeeService {

    createEmployee(name, address, birth_date, dni, payroll_type, gross_salary, salaray_per_hour, estimated_hours, clientId, callback) {
        var employee = new Employee();
        employee.name = name;
        employee.address = address;
        employee.birth_date = birth_date;
        employee.dni = dni;
        employee.payroll_type = payroll_type;
        employee.gross_salary = gross_salary;
        employee.salary_per_hour = salaray_per_hour;
        employee.estimated_hours = estimated_hours;
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

    modifyEmployee(id, address, gross_salary, salary_per_hour, estimated_hours, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(employee){
                employee.update({ address: address, gross_salary: gross_salary, salary_per_hour: salary_per_hour, estimated_hours: estimated_hours }, function (err, raw) {
                    if(err){
                        return callback(err);
                    }
                    else{
                        return callback(err, employee);
                    }
                });
            }
        })
    }

    deleteEmployee(id, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(employee){
                employee.update({ status: "inactive" }, function (err, raw) {
                    if(err){
                        return callback(err);
                    }
                    else{
                        return callback(err, employee);
                    }
                });
            }
        })
    }

    getUpdatesByEmployeeId(id){
        Employee.findById(id, function (err, employee) {
            if (err){
                return err;
            } else {
                if(employee){
                    return employee.updates;
                }
                return {};
            }
        });
    }


    getLastPayroll(id, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(employee && employee.salaries.length>0){
                return callback(err, employee.salaries[employee.salaries.length-1]);
            }
            else{
                return callback(err, {});
            }
        })
    }
}

module.exports = EmployeeService;
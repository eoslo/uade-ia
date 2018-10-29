var Employee = require('../models/employee');


class EmployeeController {

    createEmployee(name, address, birth_date, dni, payroll_type, gross_salary, salaray_per_hour, callback) {
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
                return callback(err);
            }
            return callback(err, employee);
        });
    }
}

module.exports = EmployeeController;
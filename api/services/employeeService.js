var Employee = require('../models/employee');
var Client = require('../models/client');


class EmployeeService {

    getEmployeeId(dni, callback){
        Employee.findOne({dni:dni}, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(!employee){
                return callback("No existe dicho empleado.");
            }
            return callback(err, {employee_id:employee.id});
        })
    }

    createEmployee(name, address, birth_date, dni, payroll_type, gross_salary, salaray_per_hour, estimated_hours, deductions, clientId, cbu, callback) {
        var employee = new Employee();
        employee.name = name;
        employee.address = address;
        employee.birth_date = birth_date;
        employee.dni = dni;
        employee.payroll_type = payroll_type;
        employee.gross_salary = gross_salary;
        employee.salary_per_hour = salaray_per_hour;
        employee.estimated_hours = estimated_hours;
        employee.deductions = deductions;
        employee.cbu = cbu;
        employee.save(function (err) {
            if(err){
                return callback(err, null);
            }

            Client.findOneAndUpdate(
                { _id: clientId },
                { $push: { employees: employee._id } }, function (err, client) {
                    return callback(err, employee);
            });
        });
    }

    modifyEmployee(id, name, address, birth_date, dni, estimated_hours, deductions, cbu, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                return callback(err);
            }
            if(employee && employee.status === 'active'){
                employee.update({ name: name, address: address, birth_date: birth_date, dni: dni, estimated_hours: estimated_hours, deductions: deductions, cbu:cbu }, function (err, raw) {
                    if(err){
                        return callback(err);
                    }
                    else{
                        return callback(err, employee);
                    }
                });
            } else {
                return callback("The employee you are trying to update is currently inactive!");
            }
        })
    }

    deleteEmployee(id, callback){
        Employee.findById(id, function (err, employee) {
            if(err){
                console.log("[+] Could not find an employee with that id inside the database :(");
                return callback(err);
            }
            if(employee && employee.status === 'active'){
                employee.update({ status: "inactive" }, function (err, raw) {
                    if(err){
                        console.log("[+] Error while updating the employee :(");
                        return callback(err);
                    }
                    else{
                        return callback(err, employee);
                    }
                });
            } else {
                console.log(employee);
                return callback("The employee you are trying to delete is already inactive or does not exist!");
            }
        })
    }

    getUpdatesByEmployeeId(id, callback){
        Employee.findById(id, function (err, employee) {
            if (err){
                return callback(err);
            } else {
                if(employee){
                    return callback(err, employee.updates);
                }
                return callback("Employee ", {});
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
                return callback("No employee or salaries!", {});
            }
        })
    }
}

module.exports = EmployeeService;
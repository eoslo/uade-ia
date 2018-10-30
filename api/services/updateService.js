var Employee = require('../models/employee');
var Update = require('../models/update');


class UpdateService {

    createUpdate(updateText, mount, employeeId, callback) {
        var update = new Update();
        update.update = updateText;
        update.mount = mount;
        Employee.findById(employeeId, function (err, employee) {
            if(employee){
                let salary_per_hour = employee.salary_per_hour;
                let gross_salary = employee.gross_salary;
                if(updateText === 'salary_change'){
                    gross_salary = mount;
                    update.status = 'inactive';
                }
                else if(updateText === 'per_hour_change'){
                    salary_per_hour = mount;
                    update.status = 'inactive';
                }
                employee.update({ $push: { updates: update }, gross_salary:gross_salary, salary_per_hour:salary_per_hour }, function (err) {
                    if(err){
                        return callback(err);
                    }
                    return callback();
                })
            }
            else{
                return callback("Empleado no existente.")
            }
        });
    }


    deleteUpdate(id, callback){
        Update.findById(id, function (err, update){
            if (err){
                return callback(err);
            } else {
                if (update && update.status === 'active'){
                    update.status = 'inactive';
                    update.save(function (err){
                        if (err){
                            return callback(err);
                        }
                        return callback(err, update);
                    });
                } else {
                    return callback("La novedad que esta intentando actualizar ya esta inactiva.");
                }
            }
        })
    }
}

module.exports = UpdateService;
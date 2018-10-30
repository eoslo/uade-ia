var Employee = require('../models/employee');
var Update = require('../models/update');


class UpdateService {

    createUpdate(updateText, mount, employeeId, callback) {
        var update = new Update();
        update.update = update;
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
        // Employee.findOneAndUpdate(
        //     { _id: employeeId },
        //     { $push: { updates: update } }, function (err, employee) {
        //         if(err){
        //             return callback(err);
        //         }
        //         if(!employee){
        //             return callback("Empleado no existente.");
        //         }
        //         return callback(err, update);
        //     });
    }


    deleteUpdate(id, callback){
        Update.findById(id, function (err, update){
            if (err){
                return callback(err);
            } else {
                if (update != null){
                    update.status = 'inactive';
                    update.save(function (err){
                        if (err){
                            return callback(err);
                        }
                        console.log('[+] Successfully deleted update with id:' + id + '(Logically)');
                        return callback(err, update);
                    });
                }
            }
        })
    }
}

module.exports = UpdateService;
var Employee = require('../models/employee');
var Update = require('../models/update');


class UpdateService {

    createUpdate(absence_days, worked_hours, employeeId, callback) {
        var update = new Update();
        update.absence_days = absence_days;
        update.worked_hours = worked_hours;
        Employee.findOneAndUpdate(
            { _id: employeeId },
            { $push: { updates: update } }, function (err, employee) {
                if(err){
                    return callback(err);
                }
                if(!employee){
                    return callback("Empleado no existente.");
                }
                return callback(err, update);
            });
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
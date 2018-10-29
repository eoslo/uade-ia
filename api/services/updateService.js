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

    }
}

module.exports = UpdateService;
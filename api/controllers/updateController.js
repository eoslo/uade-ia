var UpdateService = require('../services/updateService');

class updateController {
    constructor(){
        this.updateService = new UpdateService();
    }

    createUpdate(req, callback){
        return this.updateService.createUpdate(req.body.absence_days, req.body.worked_hours, function (err, update){
            if (err){
                console.error(err);
            }
            return callback(err, update);
        });
    }

    updateUpdate(req, callback){
        return this.updateService.updateUpdate(req.body.id, req.body.absence_days, req.body.worked_hours, function (err, update){
            if (err){
                console.error(err);
            }
            return callback(err, update);
        });
    }

    deleteUpdate(req, callback){
        return this.updateService.deleteUpdate(req.body.id, function (err){
            if (err){
                console.error(err);
            }
            return callback(err);
        });
    }
}

module.exports = updateController;
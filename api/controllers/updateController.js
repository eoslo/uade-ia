var UpdateService = require('../services/updateService');

class updateController {
    constructor(){
        this.updateService = new UpdateService();
    }

    createUpdate(req, callback){
        return this.updateService.createUpdate(req.body.update, req.body.mount, req.body.employee_id, function (err, update){
            if (err){
                console.error(err);
            }
            return callback(err, update);
        });
    }

    createUpdateWithCuit(req, callback){
        return this.updateService.createUpdateWithDni(req.body.update, req.body.mount, req.params.dni, req.params.cuit, function (err, update){
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
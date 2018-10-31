var TransferSchedulerService = require('../services/transferSchedulerService');
var transferSchedulerService = new TransferSchedulerService();

class transferSchedulerController {
    sendScheduledTransfers(callback){
        return transferSchedulerService.sendScheduledTransfers(function (err) {
            if(err){
                return callback(err);
            }
            return callback();
        })
    }
}

module.exports = transferSchedulerController;
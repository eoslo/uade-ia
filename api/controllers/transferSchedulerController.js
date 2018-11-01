var TransferSchedulerService = require('../services/transferSchedulerService');
var ClientService = require('../services/clientService');
var transferSchedulerService = new TransferSchedulerService();
var clientService = new ClientService();
var DateUtils = require('../utils/dateUtil');
var dateUtils = new DateUtils();

class transferSchedulerController {
    sendScheduledTransfers(req, callback){
        clientService.getClient(req.params.id, function (err, client) {
            if(err){
                return callback(err);
            }
            if(!client){
                return callback("Cliente no encontrado.")
            }
            return transferSchedulerService.sendScheduledTransfers(cbu ,client.cbu, "SueldosYa!",
                client.bills[client.bills.length-1].total_amount, dateUtils.formattedDateArgentinaWithOutHourMinutes(),function (err) {
                if(err){
                    return callback(err);
                }
                return callback();
            })
        })
    }
}

module.exports = transferSchedulerController;
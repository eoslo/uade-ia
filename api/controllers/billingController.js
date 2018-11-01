var BillingService = require('../services/billingService');
var billingService = new BillingService();


class billingController {
    createBill(req, callback) {
        var clientId = req.params.clientId
        if (clientId && clientId.length == 24){
            return billingService.createBill(clientId, function (err, bill) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, bill);
            })
        }else{
            return callback("error in client id format, should have 24 characters",{})
        }
    }

    getBill(req, callback) {
        var clientId = req.params.clientId
        if (clientId && clientId.length == 24){
            return billingService.getBill(clientId , function (err, bill) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, bill);
            })
        }else{
            return callback("error in client id format, should have 24 characters",{})
        }
    }

    getBillById(req, callback) {
        return billingService.getBillById(req.params.billId, function(err, bill){
            if(err){
                console.error(err);
                return callback(err);
            }
            return callback(err, bill);
        })
    }
}

module.exports = billingController;

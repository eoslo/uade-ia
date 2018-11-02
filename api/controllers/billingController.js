var BillingService = require('../services/billingService');
var billingService = new BillingService();


class billingController {
    createBill(req, callback) {
        var clientId = req.params.clientId
        return billingService.createBill(clientId, function (err, bill) {
            if(err){
                console.error(err);
                return callback(err);
            }
            return callback(err, bill);
        })
    }

    getBill(req, callback) {
    var clientId = req.params.clientId
        return billingService.getBill(clientId , function (err, bill) {
            if(err){
                console.error(err);
                return callback(err);
            }
            return callback(err, bill);
        })
    }
    payBill(req, callback) {
        var clientId = req.body.clientId
        var billId = req.body.billId

        if (!clientId || !billId){
            console.log("clientId and billId are required in body")
            return callback("clientId and billId are required in body")
        }
        return billingService.payBill(clientId,billId, function (err){
            if (err){
                console.log(err);
                return callback(err);
            }
            return callback();
        })
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

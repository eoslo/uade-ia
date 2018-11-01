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

    payBill(req, callback) {
        var clientId = req.params.clientId
        var billId = req.params.billId

        if (!clientId || !billId){
            console.log("clientId and billId are required in body")
            return callback("clientId and billId are required in body")
        }
        if (clientId.length != 24 || billId.length != 24){
            console.log("clientId and billId must have 24 characters")
            return callback("clientId and billId must have 24 characters")
        }
        return billingService.payBill(clientId,billId, function (err){
            if (err){
                console.log(err)
                return callback(err)
            }
        })
    }

}

module.exports = billingController;

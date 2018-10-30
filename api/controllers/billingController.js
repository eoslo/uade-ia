var BillingService = require('../services/billingService');

class billingController {
    constructor(){
        this.billingService = new BillingService();
    }

    createBill(req, callback) {
        var clientId = req.params.clientId
        if (clientId && clientId.length == 24){
            return this.billingService.createBill(clientId , function (err, bill) {
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
}

module.exports = billingController;

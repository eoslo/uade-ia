var BillingService = require('../services/billingService');

class billingController {
    constructor(){
        this.billingService = new BillingService();
    }

    createBill(req, callback) {
        return this.billingService.createBill(req.params.clientId, function (err, bill) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, bill);
            })
    }
}

module.exports = billingController;

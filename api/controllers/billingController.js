var BillingService = require('../services/billingService');
var billingService = new BillingService();


class billingController {
    createBill(req, callback) {
        return billingService.createBill(req.params.clientId, function (err, bill) {
                if(err){
                    console.error(err);
                    return callback(err);
                }
                return callback(err, bill);
            })
    }
}

module.exports = billingController;

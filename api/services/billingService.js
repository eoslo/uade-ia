var Billing = require('../models/billing');
var billingMock = require('../../mock/billingMock')
var DateUtil = require('../utils/dateUtil')
var Client = require('../models/client');

class BillingService {

    constructor(){

        this.dateUtil = new DateUtil();
        this.nextMonth =  new Date()
        this.nextMonth.setMonth(this.nextMonth.getMonth() + 1)
        this.billing = new billingMock(5,5,5,5,5,5, this.dateUtil.formattedDateArgentina(new Date()),this.dateUtil.formattedDateArgentina(this.nextMonth));
    }

    createBill(id, done){
        Client.findById(id, function (err, client) {
            if (err) {
                return done(err);
            }
            if (client) {
                return done(null,client)
            }
            console.log("id: "+id)
            return done(`Client with id ${id} not found`,{})
        })

    }
}

module.exports = BillingService;
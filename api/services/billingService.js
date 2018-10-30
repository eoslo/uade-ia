var Billing = require('../models/billing');
var DateUtil = require('../utils/dateUtil')
var Client = require('../models/client');

class BillingService {

    constructor(){
        this.cost_per_employee = 500
        this.base_cost = 20000
        this.dateUtil = new DateUtil();
        this.nextMonth =  new Date()
        this.nextMonth.setMonth(this.nextMonth.getMonth() + 1)
    }

    createBill(id, done){
        var self = this
        Client.findById(id, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client || client.status != "active") {
                return done(`active client with id ${id} not found`,{})
            }
            Billing.count({}, function( err, count){
                var employees_amount = client.employees.length
                var iva = client.iva
                var billing = new Billing()

                billing.bill_number         = count+1
                billing.base_cost           = self.base_cost;
                billing.cost_per_employee   = self.cost_per_employee;
                billing.creation_date       = self.dateUtil.formattedDateArgentina();
                billing.expiration_date     = self.dateUtil.formattedDateArgentina(self.nextMonth);

                billing.employees_amount    = employees_amount;
                billing.iva_percent         = iva;


                billing.gross_amount        = employees_amount * self.cost_per_employee + self.base_cost;
                billing.iva_value           = billing.gross_amount * iva/100;
                billing.total_amount        = billing.gross_amount + billing.iva_value

                billing.save(function (err, bill) {
                    if(err){
                        return done(err,{});
                    }
                    Client.findOneAndUpdate(
                        { _id: id },
                        { $push: { billings: bill._id } }, function (err, client) {
                            return done(null, bill);
                        });
                })
            })
        })
    }
}

module.exports = BillingService;
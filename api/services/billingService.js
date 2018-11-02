var Billing = require('../models/billing');
var DateUtil = require('../utils/dateUtil')
var Client = require('../models/client');
var TransferSchedulerService = require('./transferSchedulerService');
var transferSchedulerService = new TransferSchedulerService()
var cbu = 1000000000

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
            if (!client || client.status !== "active") {
                return done(`active client with id ${id} not found`,{})
            }

            Client.findById(id).populate('billings').exec(function (err,client){
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
                            console.error(err);
                            return done(err,{});
                        }
                        Client.findOneAndUpdate(
                            { _id: id },
                            { $push: { billings: bill._id } }, function (err, client) {
                                if(err){
                                    return done(err);
                                }
                                return done(null, bill);
                            });
                    })
                })
            })
        })
    }

    createAllBills(){
        console.log("starting job")
        let self = this;
        Client.find({}, function(err, clients) {
            clients.forEach(function(client) {
                self.createBill(client.id, function (err, bill) {
                    if(err){
                        console.error(err);
                    }
                })
            });
        });
        return callback()
    }

    getBill(id, done) {
        Client.findById(id).populate('billings').exec(function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client || client.status != "active") {
                return done(`active client with id ${id} not found`,{})
            } else {
                var bills = client.billings;
                return done(null, bills);
            }
         });
    }

    getBillById(id, done){
        Billing.findById(id, function (err, bill){
            if(err){
                return done(err);
            }
            if(!bill || bill.status === "payment_closed"){
                return done(`Sorry, we couldn't find a bill with tid numer ${id} in our database`,{});
            } else {
                return done(err, bill);
            }
        })
    }

    payBill(clientId, billId, done) {
        this.getBillById(billId, function (err, bill) {
            if (err) {
                return done(err)
            }

            Client.findById(clientId, function (err, client) {
                if (err) {
                    return done(err);
                }

                transferSchedulerService.sendScheduledTransfers(client.cbu,cbu, "SueldosYa!", bill.total_amount, null ,function (err) {
                    if (err) {
                        return done(err)
                    }
                    bill.status = "payment_closed"
                    bill.save(function(err) {
                        if (err){
                            return done(err);
                        }
                    })
                    return null
                })
            })
        })
    }
}

module.exports = BillingService;

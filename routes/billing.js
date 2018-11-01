var express = require('express');
var router = express.Router();
var billingMock = require('../mock/billingMock')
var DateUtil = require('../api/utils/dateUtil')
var BillingController = require('../api/controllers/billingController');
var TransferSchedulerController = require('../api/controllers/transferSchedulerController');

var dateUtil = new DateUtil();
var billingController = new BillingController();
var transferSchedulerController = new TransferSchedulerController();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var nextMonth =  new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    var billing = new billingMock(1,2,3,4,5,6, dateUtil.formattedDateArgentina(new Date()),dateUtil.formattedDateArgentina(nextMonth));
    res.send(billing);
});

router.get('/:clientId', function(req, res, next) {
    billingController.getBill(req, function (err, bill) {
        if(err){
            res.status(500);
            res.send({error:err})
        }
        res.status(200);
        res.send(bill);
    })
});

router.post('/:clientId', function(req, res, next) {
    billingController.createBill(req, function (err, bill) {
        if(err){
            res.status(500);
            res.send({error:err})
        }
        res.status(200);
        res.send(bill);
    })
});

router.post('/:clientId/billing', function(req, res, next) {
    transferSchedulerController.sendScheduledTransfers(req, function (err, bill) {
        if(err){
            res.status(500);
            res.send({error:err})
        }
        res.status(200);
        res.send(bill);
    })
});

module.exports = router;

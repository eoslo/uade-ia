var express = require('express');
var router = express.Router();
var billingMock = require('../mock/billingMock')
var DateUtil = require('../api/utils/dateUtil')
var BillingController = require('../api/controllers/billingController');

var dateUtil = new DateUtil();
var billingController = new BillingController();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var nextMonth =  new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    var billing = new billingMock(1,2,3,4,5,6, dateUtil.formattedDateArgentina(new Date()),dateUtil.formattedDateArgentina(nextMonth));
    res.send(billing);
});

/*
router.delete('/', function(req, res, next) {
    clientController.deleteClient(id, function (err) {
        if (err) {
            res.status(500);
            res.send({error:err})
        } else {
            res.send({})
        }
    });
});

router.put('/', function(req, res, next){
    clientController.updateClient(req, function (err) {
        if (err) {
            res.status(500);
            res.send({error:err})
        } else {
            res.send({})
        }
    });
});

router.get('/:id/employees', function (req, res, next) {
    clientController.getEmployees(req, function (err, employees) {
        if(err){
            res.status(500);
            res.send({error:err})
        }
        res.status(200);
        res.send(employees);
    })
});

router.get('/:id/updates', function(req, res, next) {
    clientController.getAllUpdates(req, function (err) {

    });
});

router.post('/auth', function(req, res, next) {
    clientController.getClientId(req, function (err, clientId) {
        if(err){
            res.status(500);
            res.send({error:err})
        }
        if(clientId){
            res.send({client_id:clientId});
        }
    });
});
*/
module.exports = router;

var express = require('express');
var router = express.Router();
var PayrollController = require('../api/controllers/payrollController');
var payrollController = new PayrollController();

router.post('/', function(req, res, next) {
    payrollController.generatePayroll(function (err) {
        if(err){
            res.status(500);
            res.send(err);
            return;
        }
        res.status(200);
        res.send("done");
    })
});

router.post('/:id', function(req, res, next) {
    payrollController.generateOnePayroll(req, function (err) {
        if(err){
            res.status(500);
            res.send(err);
            return;
        }
        res.status(200);
        res.send("done");
    })
});
module.exports = router;

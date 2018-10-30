var express = require('express');
var router = express.Router();
var PayrollController = require('../api/controllers/payrollController');
var payrollController = new PayrollController();

router.post('/', function(req, res, next) {
    payrollController.generatePayroll(function (err) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al crear el empleado'});
            return;
        }
        res.status(200);
        res.send("done");
    })
});

module.exports = router;

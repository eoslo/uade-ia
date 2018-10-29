var express = require('express');
var router = express.Router();
var EmployeeController = require('../api/controllers/employeeController');
var employeeController = new EmployeeController();

/* GET users listing. */
router.post('/', function(req, res, next) {
    employeeController.createEmployee(req, function (err, employee) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al crear el empleado'});
        }
        res.status(201);
        res.send(employee);
    })
});

router.put('/', function(req, res, next) {
    employeeController.modifyEmployee(req, function (err, employee) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al crear el empleado'});
        }
        res.status(200);
        res.send(employee);
    })
});
module.exports = router;

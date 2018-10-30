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
            return;
        }
        res.status(201);
        res.send(employee);
    })
});

router.put('/', function(req, res, next) {
    employeeController.modifyEmployee(req, function (err, employee) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al modificar el empleado'});
            return;
        }
        res.status(200);
        res.send(employee);
    })
});

router.delete('/', function(req, res, next) {
    employeeController.deleteEmployee(req, function (err, employee) {
        if(err){
            res.status(500);
            res.send({error:err});
            return;
        }
        res.status(200);
        res.send(employee);
    })
});

router.get('/:id/updates', function(req, res, next){
    employeeController.getUpdatesByEmployeeId(req, function (err, updates){
        if(err) {
            res.status(500);
            res.send({error:'Hubo un error intentando encontrar las novedades del empleado'});
            return;
        }
        res.status(200);
        res.send(updates);
    })
});

router.get('/:id/salary', function (req, res, next) {
    employeeController.getLastPayroll(req, function (err, salary) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al obtener la ultima liquidacion.'});
            return;
        }
        res.status(200);
        res.send(salary);
    })
});
module.exports = router;

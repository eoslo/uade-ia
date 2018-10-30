var express = require('express');
var router = express.Router();
var UpdateController = require('../api/controllers/updateController');
var updateController = new UpdateController();

/* GET users listing. */
router.post('/', function(req, res, next) {
    updateController.createUpdate(req, function (err, update) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al crear la novedad'});
            return;
        }
        res.status(201);
        res.send(update);
    })
});

router.delete('/', function(req, res, next) {
    employeeController.deleteEmployee(req, function (err, employee) {
        if(err){
            res.status(500);
            res.send({error:'Hubo un error al eliminar la novedad'});
        }
        res.status(200);
        res.send(employee);
    })
});
module.exports = router;

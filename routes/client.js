var express = require('express');
var router = express.Router();
var clientMock = require('../mock/clientMock');
var ClientController = require('../api/controllers/clientController');

var clientController = new ClientController();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var client = new clientMock('Lucio', new Date().getDate(), '27302434','active');
    res.send(client);
});

router.delete('/', function(req, res, next) {
    clientController.deleteClient(id, function (err) {
        if (err) {
            res.status(500);
            res.send({error:err});
        } else {
            res.send({})
        }
    });
});

router.put('/', function(req, res, next){
    clientController.updateClient(req, function (err) {
        if (err) {
            res.status(500);
            res.send({error:err});
        } else {
            res.send({});
        }
    });
});

router.get('/:id/employees', function (req, res, next) {
    clientController.getEmployees(req, function (err, employees) {
        if(err){
            res.status(500);
            res.send({error:err});
            return;
        }
        res.status(200);
        res.send(employees);
    })
});

router.get('/:id/updates', function(req, res, next) {
    clientController.getAllUpdates(req, function (err, updates) {
        if (err) {
            res.status(500);
            res.send({error:err});
            return;
        }
        res.status(200);
        res.send(updates);
    });
});

router.get('/:id/salaries', function(req, res, next) {
    clientController.getAllSalaries(req, function (err, updates) {
        if (err) {
            res.status(500);
            res.send({error:err});
            return;
        }
        res.status(200);
        res.send(updates);
    });
});

router.post('/auth', function(req, res, next) {
    clientController.getClientId(req, function (err, clientId) {
        if(err){
            res.status(500);
            res.send({error:err})
            return;
        }
        if(clientId){
            res.send(clientId);
        }
    });
});

module.exports = router;

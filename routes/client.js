var express = require('express');
var router = express.Router();
var clientMock = require('../mock/clientMock');
var ClientController = require('../api/controllers/clientController');
var DateUtil = require('../api/utils/dateUtil')

var dateUtil = new DateUtil()
var clientController = new ClientController();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    clientController.getClient(req, function (err,client) {
        if (err) {
            res.status(500);
            res.send({error:err});
        } else {
            res.send(client);
        }
    });
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

router.post('/:cuit', function(req, res, next) {
    clientController.getClientIdByCuit(req, function (err, clientId) {
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

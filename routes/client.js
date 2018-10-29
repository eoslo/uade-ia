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
            res.send(err)
        } else {
            res.send('[+] Client Successfully Deleted!')
        }
    });
});

router.put('/', function(req, res, next){
    clientController.updateClient(req, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('[+] Client Successfully Updated!')
        }
    });
});

router.get('/:id/updates', function(req, res, next) {
    clientController.getAllUpdates(req, function (err) {

    });
});

module.exports = router;

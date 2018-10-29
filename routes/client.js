var express = require('express');
var router = express.Router();
var clientMock = require('../mock/clientMock')

/* GET users listing. */
router.get('/', function(req, res, next) {
    var client = new clientMock('Lucio', new Date().getDate(), '27302434','active');
    res.send(client);
});

module.exports = router;

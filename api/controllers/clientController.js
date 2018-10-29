var ClientService = require('../models/client');

class clientController {

    var clientService = new clientService();

    function modifyClient(req, callback){
        return this.clientService.createClient(req.name, req.person_type, req.address, req.cuit, req.iva, req.gross_income, req.employees, function (err, client){
            if(err){
                console.error(err);
            }
            return callback(err, client);
        })
    }
}

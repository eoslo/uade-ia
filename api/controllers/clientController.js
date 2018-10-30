var ClientService = require('../services/clientService');

class clientController {
    constructor(){
        this.clientService = new ClientService();
    }

    updateClient(req, callback){
       return this.clientService.updateClient(req.body.id, req.body.name, req.body.person_type, req.body.address, req.body.cuit, req.body.iva, req.body.gross_income, req.body.employees, function (err, client) {
           if (err) {
               console.error(err);
           }
           return callback(err, client);
       });
    }

    deleteClient(req, callback){
        return this.clientService.deleteClient(req.body.id, function (err){
            if (err) {
                console.error(err);
            }
            return callback(err);
        });
    }

    getEmployees(req, callback){
        return this.clientService.getEmployees(req.params.id, function (err, employees) {
            if(err){
                console.error(err);
            }
            return callback(err, employees);
        });
    }

    getAllUpdates(req, callback) {
        this.getEmployees(req, function (err, employees) {
            if (err) {
                console.log(err);
            }
            return this.clientService.getAllUpdates(employees, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        });
    }

    getClientId(req, callback){
        return this.clientService.getClientId(req.body.username, req.body.password, function (err, clientId) {
            if (err) {
                console.error(err);
                return callback(err, clientId);
            }
            return callback(err, clientId);
        });
    }
}

module.exports = clientController;
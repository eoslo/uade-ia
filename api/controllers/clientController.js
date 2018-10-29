var ClientService = require('../models/client');

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
       })
    }

    deleteClient(req, callback){
        return this.clientService.deleteClient(req.body.id, function (err){
            if (err) {
                console.error(err);
            }
        })
    }

    getEmployees(req, callback){
        return this.clientService.getEmployees(req.params.id, function (err, employees) {
            if(err){
                console.error(err);
            }
            return callback(err, employees);
        })
    }

    getAllUpdates(req, callback){
        var employees = this.getEmployees(req.params.id, function (err){
            if (err) {
                console.log(err);
            }
        });
        return this.clientService.getAllUpdates(employees, function (err){
            if (err) {
                console.error(err);
            }
        })
    }
}

module.exports = clientController;
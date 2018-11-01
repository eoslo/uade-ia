var ClientService = require('../services/clientService');
var clientService = new ClientService();

class clientController {

    updateClient(req, callback){
       return clientService.updateClient(req.body.id, req.body.name, req.body.address, req.body.iva, req.body.gross_income,
           req.body.pay_date, req.body.cbu, function (err, client) {
           if (err) {
               console.error(err);
               return callback(err);
           }
           return callback(err, client);
       });
    }

    deleteClient(req, callback){
        return clientService.deleteClient(req.body.id, function (err){
            if (err) {
                console.error(err);
                return callback(err);
            }
            return callback(err);
        });
    }

    getEmployees(req, callback){
        return clientService.getEmployees(req.params.id, function (err, employees) {
            if(err){
                console.error(err);
                return callback(err);
            }
            return callback(err, employees);
        });
    }

    getAllUpdates(req, callback) {
        return this.getEmployees(req, function (err, employees) {
            if (err) {
                console.error(err);
                return callback(err);
            }
            return  clientService.getAllUpdates(employees, function (err, updates) {
                if (err) {
                    console.error(err);
                    return callback(err);
                }
                return callback(err, updates)
            })
        });
    }

    getAllSalaries(req, callback) {
        return this.getEmployees(req, function (err, employees) {
            if(err){
                console.error(err);
                return callback(err);
            }
            var result = [];
            employees.forEach(function (employee){
                if(employee.salaries.length){
                    result.push({
                        employee_id: employee.id,
                        employee_name: employee.name,
                        salary: employee.salaries[employee.salaries.length-1]
                    });
                }
            });
            return callback(err, result);
        });
    }

    getClientId(req, callback){
        return clientService.getClientId(req.body.username, req.body.password, function (err, clientId) {
            if (err) {
                console.error(err);
                return callback(err, clientId);
            }
            if(!clientId){
                console.error(clientId);
                return callback("No existe dicho usuario")
            }
            return callback(err, clientId);
        });
    }

    getClientIdByCuit(req, callback){
        return clientService.getClientIdByCuit(req.params.cuit, function (err, clientId) {
            if (err) {
                console.error(err);
                return callback(err, clientId);
            }
            if(!clientId){
                console.error(clientId);
                return callback("No existe dicho usuario")
            }
            return callback(err, clientId);
        });
    }

    getClient(req, callback) {
        return clientService.getClient(req.params.id, function (err, client) {
            if (err) {
                console.error(err);
                return callback(err, client);
            }
            return callback(err, client);
        });
    }
}

module.exports = clientController;
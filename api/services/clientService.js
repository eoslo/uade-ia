var Client = require('../models/client');

class ClientService {

    updateClient(id, name, person_type, address, cuit, iva, gross_income, employees, callback){
        var client = Client.findById(id);
        client.name = name;
        client.person_type = person_type;
        client.address = address;
        client.cuit = cuit;
        client.iva = iva;
        client.gross_income = gross_income;
        client.employees = employees;
        client.save(function (err) {
            if (err) {
                return callback(err);
            }
            return callback(err, client);
        });
    }

    deleteClient(id){
        var client = Client.findById(id);
        client.deleteOne({_id: id}, function (err) {
            if (err) {
                return callback(err)
            }
        })
    }
}

module.exports = ClientService;


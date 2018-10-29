var Client = require('../models/client');

class ClientService {

    updateClient(id, name, person_type, address, cuit, iva, gross_income, employees, callback){
        console.log(id);
        console.log(name);
        var client = Client.findById(id, function (err, client){
            if (err) {
                return callback(err);
            }
            if (client != null) {
                console.log(client.name);
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
            } else {
                console.log("[+] The user you are looking for does not exist in our database!");
            }
        });

    }

    deleteClient(id){
        Client.deleteOne({_id: id}, function (err) {
            if (err) {
                return callback(err)
            }
            console.log("[+] Successfully deleted user with id:" + id);
        })
    }

    getEmployees(id, callback){
        Client.findOne({ _id: id }).populate('employees').
        exec(function (err, client) {
            if (err){
                return callback(err);
            }
            return callback(err, client.employees);
        });
    }

    getAllUpdates(employees){
        console.log(employees);
    };
}

module.exports = ClientService;


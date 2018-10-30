var Client = require('../models/client');

class ClientService {

    createClient(username, password, name, person_type, address, cuit, iva, gross_income, done){
        Client.findOne({'username': username}, function (err, client) {
            if(err){
                return done(err);
            }
            if(client){
                return done(null, false, {message:'Cliente ya existente.'});
            }
            var newClient = new Client();
            newClient.username = username;
            newClient.password = password;
            newClient.name = name;
            newClient.person_type = person_type;
            newClient.address = address;
            newClient.cuit = cuit;
            newClient.iva = iva;
            newClient.gross_income = gross_income;
            newClient.save(function (err, result) {
                if(err){
                    return done(err);
                }
                return done(null, newClient);
            })
        })
    }

    updateClient(id, name, person_type, address, cuit, iva, gross_income, employees, callback){
        console.log(id);
        console.log(name);
        Client.findById(id, function (err, client){
            if (err) {
                return callback(err);
            } else {
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
            }
        });

    }

    deleteClient(id){
    Client.findById(id, function (err, client){
            if (err){
                return callback(err);
            } else {
                if (client != null){
                    client.status = 'inactive';
                    client.save(function (err){
                        if (err){
                            return callback(err);
                        }
                        console.log("[+] Successfully deleted user with id:" + id + "(Logically)");
                        return callback(err, client);
                    });
                }
            }
        });
    }

    getClientForPassport(username, password, done){
        Client.findOne({'username': username}, function (err, client) {
            if(err){
                return done(err);
            }
            if(client && client.password === password){
                return done(null, client);
            }
            return done(err, false, {message: "Cliente no existente."});
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

    getAllUpdates(employees, callback){
        console.log(employees);
        var updates = [];
        employees.forEach(function (employee){
            updates.concat(employee.updates);
        });
        return callback(updates);
    }

    getClientId(username, password, callback){
        Client.findOne({ username: username }, function (err, client) {
            if(err){
                return callback(err);
            }
            if(!client){
                return callback("No existe ese cliente.");
            }
            if (client.password === password){
                return callback(err, client.id);
            }
            return callback("Autenticacion no valida.")
        })
    }
}

module.exports = ClientService;


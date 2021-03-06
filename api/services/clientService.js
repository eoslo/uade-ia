var Client = require('../models/client');
var DateUtil = require('../utils/dateUtil');
var dateUtil = new DateUtil();

class ClientService {

    createClient(username, password, name, person_type, address, cuit, iva, gross_income, pay_date, cbu, done){
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
            newClient.pay_date = pay_date;
            newClient.cbu = cbu;
            newClient.save(function (err, result) {
                if(err){
                    return done(err);
                }
                return done(null, newClient);
            })
        })
    }

    updateClient(id, name, address, iva, gross_income, pay_date, cbu, callback){
        Client.findById(id, function (err, client){
            if (err) {
                return callback(err);
            } else {
                if (client && client.status === 'active') {
                    client.name = name;
                    client.address = address;
                    client.iva = iva;
                    client.gross_income = gross_income;
                    client.pay_date = pay_date;
                    client.cbu = cbu;
                    client.save(function (err) {
                        if (err) {
                            return callback(err);
                        }
                        return callback(err, client);
                    });
                } else {
                    if(client.status === 'inactive'){
                        return callback("El cliente esta inactivo actualmente.");
                    }
                    return callback("El cliente no existe.");
                }
            }
        });

    }

    deleteClient(id, callback){
        Client.findById(id, function (err, client){
            if (err){
                return callback(err);
            } else {
                if (client && client.status === 'active'){
                    client.status = 'inactive';
                    client.save(function (err){
                        if (err){
                            return callback(err);
                        }
                        return callback(err, client);
                    });
                } else {
                    return callback("El cliente esta inactivo actualmente.")
                }
            }
        });
    }

    getClientForPassport(usernameOrCuit, password, done){
        this.getClientId(usernameOrCuit, password, done);
    }

    getEmployees(id, callback){
        Client.findOne({ _id: id }).populate('employees').
        exec(function (err, client) {
            if (err){
                return callback(err);
            }
            if(!client){
                return callback("No hay empleados con ese id.");
            }
            return callback(err, client.employees);
        });
    }

    getAllUpdates(employees, callback){
        var updates = [];
        employees.forEach(function (employee){
            if (employee.status === 'active'){
                employee.updates.forEach(function (update){
                    var update = {
                        update: update,
                        employee_id: employee.id,
                        employee_name: employee.name
                    }
                    updates.push(update);
                });
            }
        });
        return callback(null, updates);
    }

    getClientId(usernameOrCuit, password, done){
        Client.findOne({'username': usernameOrCuit}, function (err, client) {
            if(err){
                return done(err);
            }
            if(client && client.password === password){
                return done(null, {_id:client.id, name:client.name});
            }
            else if(!client){
                Client.findOne({'cuit': usernameOrCuit}, function (err, client) {
                    if(err){
                        return done(err);
                    }
                    if(client && client.password === password){
                        return done(null, {_id:client.id, name:client.name, });
                    }
                    return done(err, false, {message: "Cliente no existente."});
                })
            }
        })
    }

    getClientIdByCuit(cuit, done){
        Client.findOne({'cuit': cuit}, function (err, client) {
            if(err){
                return done(err);
            }
            if(client){
                return done(null, {_id:client.id, name:client.name});
            }
            else if(!client){
                return done("Cliente no existe.");
            }
        })
    }

    getClient(id, done) {
        Client.findById(id, function (err, client) {
            if (err) {
                return done(err);
            }
            return done(null,client);
        })
    }
}

module.exports = ClientService;


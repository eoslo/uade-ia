var Client = require('../models/client');

class clientService {
    function createClient(username, password, name, person_type, address, cuit, iva, gross_income, employees, callback){
        var client = new Client();
        client.username = username;
        client.password = password;
        client.name = name;
        client.person_type = person_type;
        client.address = address;
        client.cuit = cuit;
        client.iva = iva;
        client.gross_income = gross_income;
        client.employees = employees;
        client.save(callback);
    }
}

module.export = ;


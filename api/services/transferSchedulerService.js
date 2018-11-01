var http = require('http');

class transferSchedulerService {

    sendScheduledTransfers(sourceCbu, destinationCbu, description, amount, payDate, callback) {
        let data = JSON.stringify({
            origen: sourceCbu,
            destino: destinationCbu,
            descripcion: description,
            monto: amount,
            fecha: payDate
        });

        let options = {
            hostname: 'http://192.168.215.34',
            port: 8080,
            path: '/api/transferencia',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        let req = http.request(options, (res) => {
            console.log('[+] Status Code: ' + res.statusCode);

            res.on('data', (data) => {
                console.log('[+] Response Data: ' + data);
                return callback(null, data);
            })
        });

        req.on('error', (err) => {
            console.error(err);
            return callback(err);
        });

        req.write(data);
        req.end();
    }
}

module.exports = transferSchedulerService;
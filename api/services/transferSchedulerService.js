var http = require('http');

class transferSchedulerService {

    sendScheduledTransfers(sourceCbu, destinationCbu, description, amount, payDate, callback) {
        let data = JSON.stringify({
            source_cbu: sourceCbu,
            destination_cbu: destinationCbu,
            description: description,
            amount: amount,
            pay_date: payDate,
        });

        let options = {
            hostname: 'ip_banco',
            port: 9000,
            path: '/api/transferencias/programar',
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
            })
        });

        req.on('error', (err) => {
            console.error(err);
        });

        req.write(data);
        req.end();
    }
}

module.exports = transferSchedulerService;
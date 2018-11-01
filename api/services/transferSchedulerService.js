var http = require('http');
var DateUtil = require('../utils/dateUtil');
var dateUtil = new DateUtil()
class transferSchedulerService {

    sendScheduledTransfers(sourceCbu, destinationCbu, description, amount, payDate, callback) {
        var date = payDate ? dateUtil.formattedDateYearMonthDay(payDate) : null;
        let data = JSON.stringify({
            origen: sourceCbu,
            destino: destinationCbu,
            descripcion: description,
            monto: amount,
            fecha: date
        });

        let options = {
            hostname: '192.168.43.201',
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
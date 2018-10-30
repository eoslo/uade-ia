var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillingSchema = new Schema({
    gross_amount: {
        type: Number,
        required: 'Please enter the gross_amount'
    },
    net_amount: {
        type: Number,
        required: 'Please enter the net_amount'
    },
    employees_amount: {
        type: Number,
        required: 'Please enter the employees_amount'
    },
    cost_per_employee: {
        type: Number,
        required: 'Please enter the cost_per_employee'
    },
    iva: {
        type: Number,
        required: 'Please enter the iva'
    },
    base_cost: {
        type: Number,
        required: 'Please enter the base_cost'
    },
    creation_date: {
        type: Date,
        required: 'Please enter the creation_date'
    },
    expiration_date: {
        type: Date,
        required: 'Please enter the expiration_date'
    }
});

module.exports = mongoose.model('billing', BillingSchema);
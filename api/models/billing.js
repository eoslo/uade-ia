var mongoose = require('mongoose');
var DateUtils = require('../utils/dateUtil');
var dateUtils = new DateUtils();

var Schema = mongoose.Schema;

var BillingSchema = new Schema({
    bill_number: {
        type: Number,
        required: 'Please enter the bill_number',
        default: 0
    },
    gross_amount: {
        type: Number,
        required: 'Please enter the gross_amount'
    },
    total_amount: {
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
    iva_percent: {
        type: Number,
        required: 'Please enter the iva percent'
    },
    iva_value: {
        type: Number,
        required: 'Please enter the iva value'
    },
    base_cost: {
        type: Number,
        required: 'Please enter the base_cost'
    },
    creation_date: {
        type: String,
        required: 'Please enter the creation_date',
        default: dateUtils.formattedDateArgentina()
    },
    expiration_date: {
        type: String,
        required: 'Please enter the expiration_date',
        default: dateUtils.formattedDateArgentina()
    },
    status: {
        type: String,
        default: "payment pending"
    }
});

module.exports = mongoose.model('billing', BillingSchema);
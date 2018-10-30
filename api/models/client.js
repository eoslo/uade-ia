var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = require('../models/employee');
var DateUtils = require('../utils/dateUtil');
var dateUtils = new DateUtils();

var clientSchema = new Schema({
    username: {
      type: String,
      required: 'Please enter the client Username'
    },
    password: {
      type: String,
      required: 'Please enter the client Password'
    },
    name: {
        type: String,
        required: 'Kindly enter the name of the client'
    },
    person_type: {
        type: [{
            type: String,
            enum: ['physical', 'legal entity']
        }],
        default: ['physical']
    },
    address: {
        type: String,
        default: "NONE"
    },
    cuit: {
        type: String,
        default: "NONE"
    },
    iva: {
        type: Number,
        default: 21
    },
    gross_income: {
        type: Number,
        default: 0
    },
    pay_date: {
        type: Number,
        default: 0
    },
    employees: [ { type: Schema.Types.ObjectId, ref: 'employee' , default:[]}],
    billings: [ { type: Schema.Types.ObjectId, ref: 'billing' , default:[]}],
    creation_date: {
        type: String,
        default: dateUtils.formattedDateArgentina()
    },
    status: {
        type: String,
        default: 'active'
    }
});

module.exports = mongoose.model('client', clientSchema);
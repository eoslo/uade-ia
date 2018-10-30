var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = require('../models/employee');

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
        default: 0.21
    },
    gross_income: {
        type: Number,
        default: "NONE"
    },
    employees: [ { type: Schema.Types.ObjectId, ref: 'employee' , default:[]}],
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'active'
    }
});

module.exports = mongoose.model('client', clientSchema);
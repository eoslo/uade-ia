'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var clientSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the client'
    },
    person_type: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    cuit: {
        type: String,
        default: null
    },
    iva: {
        type: Number,
        default: 0.21
    },
    gross_income: {
        type: Number,
        default: null
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    doc: {
        type: String,
        default: null
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'inactive']
        }],
        default: ['active']
    }
});

module.exports = mongoose.model('client', clientSchema);
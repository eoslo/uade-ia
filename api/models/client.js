'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var clientSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the client'
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    doc: {
        type: String
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
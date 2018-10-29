var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the employee'
    },
    address: {
        type: String,
        default: null
    },
    birth_date: {
        type: String,
        default: null
    },
    dni: {
        type: String,
        default: null
    }
    creation_date: {
        type: Date,
        default: Date.now
    },
    doc: {
        type: String
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

module.exports = mongoose.model('employee', employeeSchema);
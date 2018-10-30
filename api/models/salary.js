var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salarySchema = new Schema({
    description: {type:[{
            description: String,
            mount: Number
        }], default:[]},
    gross_income: {
        type: Number,
        default: 0
    },
    net_income: {
        type: Number,
        default: 0
    },
    pay_date: {
        type: Date,
        default: null
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model('salary', salarySchema);
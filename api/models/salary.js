var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DateUtils = require('../utils/dateUtil');
var dateUtils = new DateUtils();

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
        type: String,
        default: null
    },
    creation_date: {
        type: String,
        default: dateUtils.formattedDateArgentina()
    },
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model('salary', salarySchema);
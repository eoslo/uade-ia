var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salarySchema = new Schema({
    mount: {
        type: Number,
        default: null
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
        type: [{
            type: String,
            enum: ['active', 'inactive']
        }],
        default: ['active']
    }
});

module.exports = mongoose.model('salary', salarySchema);
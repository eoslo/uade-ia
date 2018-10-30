var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* worked_hours
* salary_change
* absense_days
* per_hour_change
* */
var updateSchema = new Schema({
    update: {
        type: String,
        default: "NONE"
    },
    mount: {
        type: Number,
        default: 0
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'active'
    }
});

module.exports = mongoose.model('update', updateSchema);
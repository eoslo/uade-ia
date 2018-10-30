var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DateUtils = require('../utils/dateUtil');
var dateUtils = new DateUtils();

/*
* worked_hours
* salary_change
* absense_days
* per_hour_change
* bonus
* vacation_days
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
        type: String,
        default: dateUtils.formattedDateArgentina()
    },
    status: {
        type: String,
        default: 'active'
    }
});

module.exports = mongoose.model('update', updateSchema);
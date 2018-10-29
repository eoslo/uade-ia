var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var updateSchema = new Schema({
    absence_days: {
        type: Number,
        default: null
    },
    worked_hours: {
        type: Number,
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

module.exports = mongoose.model('update', updateSchema);
// module.exports = updateSchema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var updateSchema = require('../models/update');
var salarySchema = require('../models/salary');

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
    },
    payroll_type: {
        type: String,
        default: null
    },
    gross_salary: {
        type: Number,
        default: null
    },
    salary_per_hour: {
        type: Number,
        default: null
    },
    updates: [updateSchema.schema],
    salaries: [salarySchema.schema],
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

module.exports = mongoose.model('employee', employeeSchema);
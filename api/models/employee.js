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
        default: "NONE"
    },
    birth_date: {
        type: String,
        default: "NONE"
    },
    dni: {
        type: String,
        default: "NONE"
    },
    payroll_type: {
        type: String,
        default: "monthly",
        required: 'Kindly enter the payroll type of the employee'
    },
    gross_salary: {
        type: Number,
        default: 0
    },
    salary_per_hour: {
        type: Number,
        default: 0
    },
    estimated_hours: {
        type: Number,
        default: 0
    },
    deductions:{
        type: Number,
        default: 17
    },
    updates: {type:[updateSchema.schema], default:[]},
    salaries: {type:[salarySchema.schema], default:[]},
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "active"
    }
});

module.exports = mongoose.model('employee', employeeSchema);
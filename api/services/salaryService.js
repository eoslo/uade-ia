var Client = require('../models/client');
var Salary = require('../models/salary');
var DateUtil = require('../utils/dateUtil')
var dateUtil = new DateUtil();

class SalaryService {

    payroll(callback) {
        var errors = [];
        Client.find({}).populate('employees').
        exec(function (err, clients) {
            if(err){
                return callback(err);
            }
            if(clients){
                clients.forEach(function (client) {
                    if(client.employees.length){
                        client.employees.forEach(function (employee) {
                            let activeUpdates = SalaryService.wipeInactiveUpdates(employee);
                            if(employee.status === 'active'){
                                var salary = new Salary();
                                salary.pay_date = dateUtil.formattedDateArgentinaForPayroll(client.pay_date);
                                if(employee.payroll_type === 'monthly'){
                                    salary.net_income = employee.gross_salary;
                                    salary.gross_income = employee.gross_salary;
                                    salary.description.push({description:`Sueldo basico`, mount:salary.gross_income});
                                }
                                if(employee.updates.length && activeUpdates.length){
                                    employee.updates.forEach(function (update) {
                                        if(update.status === 'active'){
                                            let mount = 0;
                                            if(employee.payroll_type === 'per_hour' && update.update === 'worked_hours'){
                                                mount = update.mount*employee.salary_per_hour;
                                                salary.description.push({description:`${update.mount.toString()} horas trabajadas.`, mount:mount});
                                                salary.net_income += mount;
                                            }
                                            else if(employee.payroll_type === 'monthly' && update.update === 'absense_days'){
                                                mount = ((employee.gross_salary/30)*update.mount);
                                                salary.description.push({description:`${update.mount.toString()} dias ausentes.`, mount:-mount});
                                                salary.net_income -= mount;
                                            }
                                            else if(employee.payroll_type === 'monthly' && update.update === 'vacation_days'){
                                                mount = ((employee.gross_salary/25)*update.mount);
                                                salary.description.push({description:`${update.mount.toString()} dias de vacaciones`, mount:mount});
                                                salary.net_income += mount;
                                            }
                                            else if(update.update === 'bonus'){
                                                salary.description.push({description:"Bono", mount:update.mount});
                                                salary.net_income += update.mount;
                                            }
                                            update.status = 'inactive';
                                        }
                                    })
                                }
                                else if(employee.payroll_type === 'per_hour'){
                                    if(employee.salaries.length>0){
                                        employee.salaries[employee.salaries.length-1].description.forEach(function (description) {
                                            salary.description.push({description:`De ultima liquidacion ${description.description.toLowerCase().replace(/de ultima liquidacion /g, '')}`, mount:description.mount});
                                        });
                                        salary.net_income = employee.salaries[employee.salaries.length-1].net_income;
                                    }
                                    else{
                                        salary.net_income += employee.salary_per_hour*employee.estimated_hours;
                                        salary.description.push({description:`Por horas estimadas`, mount:salary.net_income});
                                    }
                                }
                                if(employee.payroll_type === 'monthly'){
                                    salary = SalaryService.deductions(employee, salary);
                                }
                                else{
                                    salary.gross_income = salary.net_income;
                                }
                                employee.update({ $push :{salaries:salary}, updates:employee.updates }, function (err, raw) {
                                    if(err){
                                        errors.push({error:err, employee:employee.dni});
                                    }
                                    else{
                                        employee.salaries.push(salary);
                                    }
                                });
                            }
                        });
                    }
                });
                return callback(err);
            }
        })
    }

    static deductions(employee, salary){
        salary.net_income -= salary.net_income*(employee.deductions/100);
        salary.description.push({description:"Deducciones", mount:-(salary.net_income*(employee.deductions/100))});
        return salary;
    }

    static wipeInactiveUpdates(employee){
        let activeUpdates = [];
        employee.updates.forEach(function (update){
            if(update.status === 'active'){
                activeUpdates.push(update);
            }
        });
        return activeUpdates;
    }
}

module.exports = SalaryService;
class billingMock{
    constructor(gross_amount, net_amount, employees_amount, cost_per_employee, iva, base_cost, creation_date,expiration_date) {
        this.gross_amount=gross_amount;
        this.net_amount=net_amount;
        this.employees_amount=employees_amount;
        this.cost_per_employee=cost_per_employee;
        this.iva=iva;
        this.base_cost=base_cost;
        this.creation_date=creation_date;
        this.expiration_date=expiration_date;
    }
}
module.exports=billingMock;

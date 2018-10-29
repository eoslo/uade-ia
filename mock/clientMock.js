class clientMock{
    constructor(name, person_type, address, cuit, iva, gross_income, creation_date, doc, status) {
        this.name=name;
        this.person_type=person_type;
        this.address=address;
        this.cuit=cuit;
        this.iva=iva;
        this.gross_income=gross_income;
        this.creation_date=creation_date;
        this.doc=doc;
        this.status=status;
    }
}
module.exports=clientMock;

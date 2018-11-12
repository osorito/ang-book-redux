export class Tran {
    type: boolean;
    borrowDate: Date;
    returnDate: Date;

    constructor(type:boolean,borrowDate:Date,returnDate:Date){
        this.type=type;
        this.borrowDate=borrowDate;
        this.returnDate=returnDate;
    }
}

import { Tran } from "./tran";


export class Book {
    name: string;
    author: string;
    isbn: string;
    quantity: number;
    published: Date;
    category: string;
    Issued:number;
    transactions: Array<Tran>;

    constructor(name:string,author:string,isbn:string,quantity:number,published:Date,category:string,issued:number,tran:Array<Tran>){
        this.name = name;
        this.author = author;
        this.isbn = isbn;
        this.quantity = quantity;
        this.published = published;
        this.category = category;
        this.Issued = issued;
        this.transactions = new Array<Tran>();
        this.transactions = tran;
    }
}

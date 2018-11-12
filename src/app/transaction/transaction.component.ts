import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Tran } from '../tran';
import { Book } from '../book';
import { Store } from '@ngrx/store';
import * as fromBook from '../store/book.reducers';
import * as BookActions from '../store/book.actions';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit,OnDestroy {

  constructor(private route: ActivatedRoute,private router: Router,private store:Store<fromBook.AppState>) { }

  paramsubscription:  Subscription;

  id: number;
  editMode = false;
  
  selectedBook: Book;
  booksubscription: Subscription;
  bookListState: Observable<{books: Book[]}>;

  ngOnInit() {
    this.selectedBook = null;
    this.paramsubscription= this.route.params.subscribe((params: Params)=> {
      this.id = +params['id'];
      this.editMode = params['id']!=null ;
      if(this.editMode){
        this.store.dispatch(new BookActions.StartEdit(this.id));
      }   
      this.initForm();
      
      // if(this.editMode){
      //   this.disableEdit();
      // } 
    });    
  }

   initForm = () => {
    
    this.booksubscription = this.store.select("bookList").subscribe(
      (data)=>{
        if(data.editedBookIndex>-1){
          this.selectedBook = data.editedBook;
          console.log("name",this.selectedBook.name);
        }else{
         
          this.router.navigate(['../']);
        }
      }
    );
   }

  onBorrow = () => {
    const today : Date = new Date();
    const defaultReturn: Date = new Date('1900-01-01');
    const tran = new Tran(false,today,defaultReturn);
    //console.log("qty",this.selectedBook.quantity,"borr",this.selectedBook.Issued);
    if(this.selectedBook.quantity<=this.selectedBook.Issued){
      alert("Quantity cannot be inferior to the number of issued books");
      return;
    }
    this.selectedBook.transactions.push(tran);
    this.selectedBook.Issued = (this.selectedBook.Issued + 1);
    this.store.dispatch(new BookActions.UpdateBook({book:this.selectedBook}));
  }

  handleReturn = (index:number) => {
    const today : Date = new Date();
    this.selectedBook.transactions[index].returnDate=today;
    this.selectedBook.transactions[index].type = true;
    this.selectedBook.Issued = (this.selectedBook.Issued - 1);
    this.store.dispatch(new BookActions.UpdateBook({book:this.selectedBook}));
  }

  ngOnDestroy(){
    this.paramsubscription.unsubscribe();
    this.booksubscription.unsubscribe();
    this.store.dispatch(new BookActions.StopEdit());
  }

}

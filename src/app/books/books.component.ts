import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as fromBooks from '../store/book.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../book';
import * as BookActions from '../store/book.actions';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit,OnDestroy {

  constructor(private router: Router,private store:Store<fromBooks.AppState>) { }

  bookListState: Observable<{books: Book[]}>;
  index : number;
  bookSubscription: Subscription;
  ngOnInit() {
    this.bookListState = this.store.select('bookList');
    this.index = -1;
    this.bookSubscription = this.store.select('bookList').subscribe(
      (data)=>{
        //console.log("test",data);
        this.index = data.editedBookIndex;
      }
    );
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
  }

  onCancel = () => {
    this.store.dispatch(new BookActions.StopEdit());
    this.router.navigate(['/books']);
  }

  onAdd = () => {
    this.router.navigate(['/books/new']);
  }
  
  onTran = () => {
    if(this.index!==-1){
      this.router.navigate(['/books/'+this.index+"/tran"]);
    }
    
  }

  onDelete = () => {
    this.store.dispatch(new BookActions.DeleteBook());
    this.router.navigate(['../']);
  }  

}

import { Component, OnInit,Input } from '@angular/core';
import { Book } from '../book';
import * as fromBooks from '../store/book.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'; 
import { Router } from '@angular/router';
import * as BookActions from '../store/book.actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Input() index : number;

  constructor(private store: Store<fromBooks.AppState>,private router: Router) { }
  bookListState: Observable<{books: Book[]}>;
  ngOnInit() {
    this.bookListState = this.store.select('bookList');
    //console.log("index",this.index);
   
    //console.log("booklist",this.bookListState );
  }

  SelectedBook = (index:number) => {
    //console.log("selected",index);
    var id = index;
    this.store.dispatch(new BookActions.StartEdit(index));
    this.router.navigate(['/books/'+id+'/edit']);
  }

}

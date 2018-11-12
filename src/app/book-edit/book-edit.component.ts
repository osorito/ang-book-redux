import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../book';
import { Store } from '@ngrx/store';
import * as BookActions from '../store/book.actions';
import * as fromBook from '../store/book.reducers';
import { Observable, Subscription } from 'rxjs';
import { Tran } from '../tran';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit,OnDestroy {

  id: number;
  editMode = false;
  bookForm: FormGroup;
  paramsubscription:  Subscription;
  booksubscription: Subscription;
  bookListState: Observable<{books: Book[]}>;
  selectedBook: Book;

  constructor(private route: ActivatedRoute,private router: Router,private store:Store<fromBook.AppState>) { }

  ngOnInit() {
    this.paramsubscription= this.route.params.subscribe((params: Params)=> {
      //console.log("evaluated");
      this.id = +params['id'];
      this.editMode = params['id']!=null ;
      this.initForm();
      //console.log("edit",this.editMode,this.id);
      if(this.editMode){
        this.disableEdit();
      } else {
        this.bookForm.controls['issued'].disable();
      }
    });    
  }

  ngOnDestroy(){
    this.paramsubscription.unsubscribe();
    if(this.editMode){
      this.booksubscription.unsubscribe();
    }
    this.store.dispatch(new BookActions.StopEdit());
    
  }

  disableEdit = () => {
     this.bookForm.controls['name'].disable();
     this.bookForm.controls['author'].disable();
     this.bookForm.controls['isbn'].disable();
     //this.bookForm.controls['quantity'].disable();
     this.bookForm.controls['published'].disable();
     this.bookForm.controls['category'].disable();
     this.bookForm.controls['issued'].disable();
  }

  initForm = () => {
    /*
      name: string;
    author: string;
    isbn: string;
    quantity: number;
    published: Date;
    category: string;
    Issued:number;
    */
    let book_name="";
    let book_author="";
    let book_isbn="";
    let book_quantity=0;
    let book_published="";
    let book_category="";
    let book_issued = 0;
    if(this.editMode){
      this.booksubscription = this.store.select("bookList").subscribe(
        (data)=>{
          if(data.editedBookIndex>-1){
            //const book = data.editedBook;
            this.selectedBook = data.editedBook;
            //console.log("this book",book);
            book_name = this.selectedBook.name;
            book_author = this.selectedBook.author;
            book_isbn = this.selectedBook.isbn;
            book_quantity = this.selectedBook.quantity;
            book_published = this.selectedBook.published.toISOString().substring(0,10);//this.dateFormat(book.published) ;
            book_category = this.selectedBook.category;
            book_issued = this.selectedBook.Issued;   
            //console.log("selected published",book_published);     
          }else{
            //alert("Please select a book");
            this.router.navigate(['../']);
          }
        }
      );
      
      /*
      const book =
      
      */
    }
    
      this.bookForm = new FormGroup(
        {
          "name": new FormControl(book_name,Validators.required),
          "author": new FormControl(book_author,Validators.required),
          "isbn": new FormControl(book_isbn,Validators.required),
          "quantity": new FormControl(book_quantity,Validators.required),
          "published": new FormControl(book_published,Validators.required),
          "category": new FormControl(book_category,Validators.required),
          "issued": new FormControl(book_issued,Validators.required)
        }
      );
    
  }

  dateFormat = (value: Date) => {
    var pad = "00";
    var month = value.getMonth() + 1;
    var day = value.getDate();
    var year = value.getFullYear();
    return pad.substring(0,pad.length - month.toString().length) + month + '/' +
     pad.substring(0,pad.length - day.toString().length) + day + '/' +  
     year;
  }



  onSubmit = () => {
    if(this.bookForm.controls['name'].value===""){
      alert("Name can't be empty");
      return;
    }
    if(this.bookForm.controls['author'].value===""){
      alert("Author can't be empty");
      return;
    }
    if(this.bookForm.controls['isbn'].value===""){
      alert("ISBN can't be empty");
      return;
    }
    if(this.bookForm.controls['quantity'].value===""){
      alert("Quantity can't be empty");
      return;
    }
    if(this.bookForm.controls['published'].value===""){
      alert("Publish date can't be empty");
      return;
    }
    if(this.bookForm.controls['category'].value===""){
      alert("Category can't be empty");
      return;
    }
    if(this.bookForm.controls['issued'].value===""){
      alert("Issued can't be empty");
      return;
    }
    if(this.bookForm.controls['quantity'].value<this.bookForm.controls['issued'].value){
      alert("Quantity of books cannot be lower then the number of issued books");
      return;
    }
    if(this.bookForm.controls['quantity'].value<=0){
      alert("Quantity must be greater than zero");
      return;
    }    
    if(this.editMode){
      // console.log("Name",this.bookForm.controls['name'].value);
      // console.log("Author",this.bookForm.controls['author'].value);
      // console.log("isbn",this.bookForm.controls['isbn'].value);
      // console.log("qty",this.bookForm.controls['quantity'].value);
      // console.log("published",this.bookForm.controls['published'].value);
      // console.log("category",this.bookForm.controls['category'].value);
      // console.log("issued",this.bookForm.controls['issued'].value);
      this.selectedBook.quantity = this.bookForm.controls['quantity'].value;
      this.store.dispatch(new BookActions.UpdateBook({book:this.selectedBook}));
      this.store.dispatch(new BookActions.StopEdit());
      this.selectedBook = null;
      this.router.navigate(['../']);
    }else{
      
      //var tran = new Array<Tran>();
      this.store.dispatch(new BookActions.AddBook(new Book(
        this.bookForm.value['name'],
        this.bookForm.value['author'],
        this.bookForm.value['isbn'],
        this.bookForm.value['quantity'],
        new Date(this.bookForm.value['published']),
        this.bookForm.value['category'],
        0,
        new Array<Tran>()
      )));
      this.bookForm.reset();
      if(this.editMode){
        this.store.dispatch(new BookActions.StopEdit());
      }
      this.router.navigate(['../']);
    }
  }

}

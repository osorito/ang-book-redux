import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookStartComponent } from './book-start/book-start.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { StoreModule } from '@ngrx/store';
import { bookListReducer } from './store/book.reducers';
import { TransactionComponent } from './transaction/transaction.component';


const appRoute : Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component: BooksComponent, children:[
    {path: '', component: BookStartComponent,pathMatch: 'full' },
    {path: 'new', component:BookEditComponent},
    
    {path: ':id', component: BookDetailComponent, pathMatch: 'full'},
    {path: ':id/edit',component:BookEditComponent}  ,
    {path: ':id/tran',component:TransactionComponent}  ,
    
  ]},
  {path:'**', component:PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    BooksComponent,
    BookStartComponent,
    BookEditComponent,
    BookDetailComponent,
    PageNotFoundComponent,
    BookListComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    StoreModule.forRoot({bookList: bookListReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

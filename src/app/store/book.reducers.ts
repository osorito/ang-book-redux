import * as BookActions from './book.actions';
import { Book } from '../book';
import { Tran } from '../tran';

export interface AppState {
    bookList: State
}

export interface State{
    books: Book[],
    editedBook : Book;
    editedBookIndex:number;
}

const initialState: State = {
    books: [
        new Book("Bible","God","1",25,new Date('1958-12-5'),'Religion',0,new Array<Tran>()),
        new Book("Luna","Cat","13",6,new Date('2017-10-9'),'Pets',0,new Array<Tran>())
    ],
    editedBook:null,
    editedBookIndex:-1
};

export function bookListReducer(state=initialState,action:BookActions.BookActions){
    switch(action.type){
        case BookActions.ADD_BOOK:
        return {
          ...state,
          books: [...state.books, action.payload]
        };
      case BookActions.ADD_BOOKS:
        return {
          ...state,
          books: [...state.books, ...action.payload]
        };
      case BookActions.UPDATE_BOOK:
        const book = state.books[state.editedBookIndex];
        const updatedBook = {
          ...book,
          ...action.payload.book
        };
        const books = [...state.books];
        books[state.editedBookIndex] = updatedBook;
        return {
          ...state,
          books: books,
          editedBook: null,
          editedBookIndex: -1
        };
      case BookActions.DELETE_BOOK:
        const oldBooks = [...state.books];
        oldBooks.splice(state.editedBookIndex, 1);
        return {
          ...state,
          books: oldBooks,
          editedBook: null,
          editedBookIndex: -1
        };
      case BookActions.START_EDIT:
        const editedBook = {...state.books[action.payload]};
        //console.log("editing book",action.payload);
        return {
          ...state,
          editedBook: editedBook,
          editedBookIndex: action.payload
        };
      case BookActions.STOP_EDIT:
        return {
          ...state,
          editedBook: null,
          editedBookIndex: -1
        };
  
        default: return state;
    }
}
import { Action } from '@ngrx/store';
import { Book } from '../book';

export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOKS = 'ADD_BOOKS';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddBook implements Action {
  readonly type = ADD_BOOK;

  constructor(public payload: Book) {}
}

export class AddBooks implements Action {
  readonly type = ADD_BOOKS;

  constructor(public payload: Book[]) {}
}

export class UpdateBook implements Action {
  readonly type = UPDATE_BOOK;

  constructor(public payload: {book: Book}) {}
}

export class DeleteBook implements Action {
  readonly type = DELETE_BOOK;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type BookActions =
  AddBook |
  AddBooks |
  UpdateBook |
  DeleteBook |
  StartEdit |
  StopEdit;

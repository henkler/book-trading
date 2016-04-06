import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Books, myBooks, tradedBooks } from '/imports/api/books/books';
import BookList from '../components/bookList';

const composer = (props, onData) => {
  if (Meteor.subscribe(props.publication, props.title).ready()) {
    let books = [];
    if (props.filter === 'available') {
      books = myBooks();
    } else if (props.filter === 'traded') {
      books = tradedBooks();
    } else {
      books = Books.find().fetch();
    }

    onData(null, { books });
  }
};

export default composeWithTracker(composer)(BookList);

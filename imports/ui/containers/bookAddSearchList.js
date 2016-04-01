import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Books } from '/imports/api/books/books';
import BookList from '../components/bookList';

const composer = (props, onData) => {
  if (Meteor.subscribe('booksAddSearch', props.title).ready()) {
    const books = Books.find().fetch();
    onData(null, { books });
  }
};

export default composeWithTracker(composer)(BookList);

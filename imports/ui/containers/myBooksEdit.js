import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Books } from '/imports/api/books/books';
import BookForm from '../components/bookForm';

const composer = (props, onData) => {
  if (Meteor.subscribe('books', props.params.id).ready()) {
    const book = Books.findOne(props.params.id);
    onData(null, { book });
  }
};

export default composeWithTracker(composer)(BookForm);

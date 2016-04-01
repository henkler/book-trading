import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { BookSearch } from '/imports/api/book_search/bookSearch';
import SearchList from '../components/searchList';

const composer = (props, onData) => {
  if (Meteor.subscribe('bookSearch', props.title).ready()) {
    const results = BookSearch.find().fetch();
    onData(null, { results });
  }
};

export default composeWithTracker(composer)(SearchList);

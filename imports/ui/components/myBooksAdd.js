import React from 'react';
import SearchForm from './searchForm';
import BooksList from '../containers/bookList';

class MyBooksAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.doSearch = this.doSearch.bind(this);
  }

  doSearch(title) {
    this.setState({ title });
  }

  render() {
    return (
      <div>
        <SearchForm doSearch={this.doSearch} />
        <BooksList
          publication={'booksAddSearch'}
          title={this.state.title}
          actions={['add']}
        />
      </div>
    );
  }
}

export default MyBooksAdd;

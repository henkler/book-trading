import React from 'react';
import SearchForm from './searchForm';
import BooksList from '../containers/bookList';

class AllBooks extends React.Component {
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
          publication={'allBooks'}
          title={this.state.title}
          actions={['trade']}
        />
      </div>
    );
  }
}

export default AllBooks;

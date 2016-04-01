import React from 'react';
import SearchForm from './searchForm';
import BookList from '../containers/bookOwnedList';

class BooksOwned extends React.Component {
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
        <SearchForm doSearch={this.doSearch}/>
        <BookList title={this.state.title} actions={['edit', 'delete']} />
      </div>
    );
  }
}

export default BooksOwned;

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';

import SearchList from '../containers/searchList';

const styles = {
  button: {
    marginLeft: 20
  }
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titleInput: null,
      doSearch: false
    };

    this.handleSearchTitleChange = this.handleSearchTitleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchTitleChange(event) {
    let titleInput = event.target.value;
    const doSearch = false;

    if (!titleInput) {
      titleInput = null;
    }

    this.setState({ titleInput, doSearch });
  }

  handleSearchClick() {
    this.setState({ doSearch: true });
  }

  renderSearchList() {
    if (this.state.doSearch) {
      return <SearchList title={this.state.titleInput} />;
    }
  }

  render() {
    return (
      <div>
        <TextField
          name="searchTitleInput"
          ref="searchTitle"
          value={this.state.titleInput}
          onChange={this.handleSearchTitleChange}
          hintText="Type book title to search for..."
        />
        <FloatingActionButton
          mini={true}
          style={styles.button}
          onClick={this.handleSearchClick}
        >
          <ActionSearch />
        </FloatingActionButton>
        {this.renderSearchList()}
      </div>
    );
  }
}

export default SearchForm;

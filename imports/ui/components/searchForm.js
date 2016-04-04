import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';

const styles = {
  button: {
    marginLeft: 20
  },
  paper: {
    width: 350,
    margin: 10,
    padding: 10
  }
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
  }

  handleSearchClick() {
    const titleInput = this.refs.searchTitle.getValue();
    this.props.doSearch(titleInput);
  }

  handleSearchKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSearchClick();
    }
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <TextField
          name="searchTitleInput"
          ref="searchTitle"
          hintText="Type book title to search for..."
          onKeyDown={this.handleSearchKeyDown}
        />
        <FloatingActionButton
          mini={true}
          style={styles.button}
          onClick={this.handleSearchClick}
        >
          <ActionSearch />
        </FloatingActionButton>
      </Paper>
    );
  }
}

SearchForm.propTypes = {
  doSearch: React.PropTypes.func
};

export default SearchForm;

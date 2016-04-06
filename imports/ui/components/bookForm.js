import React from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import { insert } from '/imports/api/books/methods';
import { update } from '/imports/api/books/methods';

const styles = {
  paper: {
    width: 500,
    margin: 10,
    padding: 10
  }
};

class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  getFormData() {
    const title = this.refs.titleInput.getValue().trim();
    const author = this.refs.authorInput.getValue().trim();
    const thumbnail = this.refs.thumbnailInput.getValue().trim();
    const description = this.refs.descriptionInput.getValue().trim();
    const publisher = this.refs.publisherInput.getValue().trim();
    const pageCount = parseInt(this.refs.pageCountInput.getValue().trim());

    return {
      title,
      author,
      thumbnail,
      description,
      publisher,
      pageCount
    };
  }

  handleSave() {
    const bookId = this.props.book._id;
    const book = this.getFormData();

    // if we have a bookId, do an update rather than insert
    if (bookId) {
      book.bookId = bookId;
      update.call(book);
    } else {
      insert.call(book);
    }

    this.context.router.goBack();
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <label>Title: </label>
        <TextField
          ref="titleInput"
          hintText="Book Title"
          defaultValue={ this.props.book.title }
        />
        <br />
        <label>Author: </label>
        <TextField
          ref="authorInput"
          hintText="Book Author"
          defaultValue={ this.props.book.author }
        />
        <br />
        <label>Thumbnail: </label>
        <TextField
          ref="thumbnailInput"
          hintText="Book Thumbnail URL"
          defaultValue={ this.props.book.thumbnail }
        />
        <br />
        <label>Description: </label>
        <TextField
          ref="descriptionInput"
          hintText="Book Description"
          defaultValue={ this.props.book.description }
          multiLine={true}
        />
        <br />
        <label>Publisher: </label>
        <TextField
          ref="publisherInput"
          hintText="Book Publisher"
          defaultValue={ this.props.book.publisher }
        />
        <br />
        <label>Page Count: </label>
        <TextField
          ref="pageCountInput"
          hintText="Page Count"
          defaultValue={ this.props.book.pageCount }
        />
        <br />
        <RaisedButton label="Save" primary={true} onClick={this.handleSave} />
      </Paper>
    );
  }
}

BookForm.propTypes = {
  book: React.PropTypes.object
};

BookForm.defaultProps = {
  book: {
    title: ''
  }
};

BookForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookForm;

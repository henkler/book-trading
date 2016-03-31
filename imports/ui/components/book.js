import React from 'react';

const Book = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

Book.propTypes = {
  title: React.PropTypes.string
};

export default Book;

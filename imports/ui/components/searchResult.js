import React from 'react';

const SearchResult = (props) => (
  <div>
    <h1>{props.result.title}</h1>
  </div>
);

SearchResult.propTypes = {
  result: React.PropTypes.object
};

export default SearchResult;

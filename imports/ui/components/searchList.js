import React from 'react';
import SearchResult from './searchResult';

const SearchList = (props) => (
  <div>
    {props.results.map(result =>
      <SearchResult
        key={result.id}
        result={result}
      />)}
  </div>
);

SearchList.propTypes = {
  results: React.PropTypes.array
};

export default SearchList;

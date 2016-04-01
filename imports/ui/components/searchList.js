import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
    marginBottom: 24,
  },
  gridTile: {
    width: 200
  },
  gridImage: {
    width: "100%",
    height: "auto"
  }
};

const SearchList = (props) => (
  <div style={styles.root}>
    <GridList
      cols={4}
      cellHeight={200}
      padding={10}
      style={styles.gridList}
    >
    {props.results.map(result => (
      <GridTile
        key={result.id}
        style={styles.gridTile}
        title={result.title}
        subtitle={result.author}
        actionIcon={<IconButton><ContentAdd color="white" /></IconButton>}
      >
        <img src={result.thumbnail} style={styles.gridImage} />
      </GridTile>
    ))}
    </GridList>
  </div>
);

SearchList.propTypes = {
  results: React.PropTypes.array
};

export default SearchList;

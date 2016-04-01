import React from 'react';
import { Link } from 'react-router';

const Navigation = () => (
  <div>
    <Link to="/">List</Link>
    <Link to="/books/add">Add Book</Link>
    <Link to="/search">Search</Link>
  </div>
);

export default Navigation;

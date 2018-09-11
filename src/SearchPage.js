import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class SearchPage extends Component {
  state = {
    searchedBooks: [],
    query: '' //l,v,b,
  }

  searchBooks = (query) => {
    console.log(query);
    if (query !== '') {
      BooksAPI.search(query)
      .then(results => this.checkBooks(results))
    } else {
      this.setState({searchedBooks: []})
    }
  }

  checkBooks = (results) => {
    if (results.length > 0) {
      console.log(results);
      console.log('results found');
      results.map(result => this.setShelf(result));
      this.setState({searchedBooks: results});
  } else {
      console.log('no results');
      this.setState({searchedBooks: []});
      }
  }

  setShelf(result) {
    const {books} = this.props;
    console.log(result);
    for (let book of books) {
      if (result.id === book.id) {
        result.shelf = book.shelf;
        break;
      } else {
        result.shelf = 'none';
      }
  }}

// componentDidMount() {
//   this.searchBooks('l');
// }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
            placeholder="Search by title or author"
            onChange={(e) => this.searchBooks(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          <Book books={this.state.searchedBooks} />
          </ol>
        </div>
      </div>
  )}
}

export default SearchPage;

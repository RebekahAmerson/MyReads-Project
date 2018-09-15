import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class SearchPage extends Component {
  state = {
    searchedBooks: [],
  }

  //Debounce code adapted from https://davidwalsh.name/javascript-debounce-function
  debounce(func, wait, immediate) {
  	let timeout;
  	return function() {
  		let context = this, args = arguments;
  		let later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		let callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  searchBooks = this.debounce((query) => {
    if (query !== '') {
      BooksAPI.search(query)
      .then(results => this.checkBooks(results));
    } else {
      this.setState({searchedBooks: []})
    }
  },500)

  checkBooks = (results) => {
    if (results.length > 0) {
      results.map(result => this.setShelf(result));
      this.setState({searchedBooks: results});
  } else {
      this.setState({searchedBooks: []});
      }
  }

  setShelf(result) {
    const {books} = this.props;
    for (let book of books) {
      if (result.id === book.id) {
        result.shelf = book.shelf;
        break;
      } else {
        result.shelf = 'none';
      }
  }}

  renderBooks() {
      if (this.state.searchedBooks.length === 0) {
        return(
          <div>No Results Found</div>
        )
      } else {
        return (
          <Book books={this.state.searchedBooks} onShelfChange={this.props.updateBooks} />
        )
      }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input id="search-input" type="text"
            placeholder="Search by title or author"
            onChange={(e) => this.searchBooks(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.renderBooks()
          }
          </ol>
        </div>
      </div>
  )}
}

export default SearchPage;

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class SearchPage extends Component {
  state = {
    searchedBooks: []
  }

  searchBooks(query) {
    BooksAPI.search(query).then(results => this.setShelf(results)).then(searchedBooks => this.setState({searchedBooks}));
  }

  setShelf(results) {
    results.map(result => this.checkBooks(result));
    return results;
  }

  checkBooks(result) {
    const {books} = this.props;
    for (let book of books) {
      if (result.id === book.id) {
        result.shelf = book.shelf;
        break;
      } else {
        result.shelf = 'none';
      }
  }}

componentDidMount() {
  this.searchBooks('games');
}

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
              {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

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

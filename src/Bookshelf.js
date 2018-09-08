import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';



class Bookshelf extends Component {
  state = {
    books: []
  }

  updateBooks = (shelf, book) => {
    console.log(`moved to ${shelf}`);
    BooksAPI.update(book, shelf).then(() => BooksAPI.getAll().then((books) => this.setState({books})))
    console.log(this.state.books);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({books}))
  }

  render() {
    const { books } = this.state;
    const shelves = [
      {name: 'currentlyReading',
       text: 'Currently Reading'},
      {name: 'wantToRead',
       text: 'Want to Read'},
      {name: 'read',
       text: 'Read'},
    ];

    return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <div className="bookshelf" key={shelf.name}>
            <h2 className="bookshelf-title">{shelf.text}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              <Book books={books.filter((book) => book.shelf === shelf.name)} onShelfChange={this.updateBooks}/>
              </ol>
            </div>
          </div>
))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )

  }
}


export default Bookshelf;

import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';



class Bookshelf extends Component {
  render() {
    const { books } = this.props;
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
              <Book books={books.filter((book) => book.shelf === shelf.name)} onShelfChange={this.props.updateBooks}/>
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

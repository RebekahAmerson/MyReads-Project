import React, { Component } from 'react';

class Bookshelf extends Component {
  render() {
    const { books } = this.props;
    const shelves = [
      {name: 'Current',
       text: 'Currently Reading'},
      {name: 'Want',
       text: 'Want to Read'},
      {name: 'Read',
       text: 'Read'},
    ];

    return(
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
                {books.filter((book) => book.shelf === shelf.name).map((book) => (
                  <li key={book.title}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+ book.image +")" }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange=''>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ book.author }</div>
                  </div>
                </li>)
  )}
              </ol>
            </div>
          </div>
))}
        </div>
      </div>
    </div>)

  }
}


export default Bookshelf;

import React, { Component } from 'react';

class Book extends Component {
  changeShelf = (shelf, book) => {
    if (this.props.onShelfChange) {
      this.props.onShelfChange(shelf, book);
    }
  }

  render() {
    const {books} = this.props;

    return (
      books.map((book) => (
        <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url("+ book.imageLinks.thumbnail +")" }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => this.changeShelf(e.target.value, {id: book.id})}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
      </li>)
    ))
  }
}

export default Book;

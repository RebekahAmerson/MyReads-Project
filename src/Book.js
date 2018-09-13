import React, { Component } from 'react';
import noCover from './icons/no-cover.png';

class Book extends Component {
  changeShelf = (shelf, book) => {
    if (this.props.onShelfChange) {
      this.props.onShelfChange(shelf, book);
    }
  }

checkImage(book) {
  if (!book.hasOwnProperty('imageLinks')) {
    book.imageLinks = {thumbnail: noCover};
  }
}

checkAuthor(book) {
  if (!book.hasOwnProperty('authors')) {
    book.authors = 'Unknown';
  }
}

  render() {
    const {books} = this.props;

    return (
      books.map((book) => (
        <li key={book.id}>
        {this.checkImage(book)}
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
          {this.checkAuthor(book)}
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
      </li>)
    ))
  }
}

export default Book;

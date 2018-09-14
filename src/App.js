import React from 'react'
import './App.css'
import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';


class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateState = (shelf, book) => {
    BooksAPI.update(book, shelf);
    BooksAPI.get(book.id).then(book => this.setState(state => ({books: state.books.filter(b => b.id !== book.id).concat(book),})));
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({books}));
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={({history}) => (
          < SearchPage books={this.state.books}
          updateBooks={ (shelf, book) => {
            this.updateState(shelf, book);
            history.push('/');
          }}/>
        )}/>
        <Route exact path='/' render={() => (
          < Bookshelf books={this.state.books} updateBooks={(shelf, book) => this.updateState(shelf, book)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

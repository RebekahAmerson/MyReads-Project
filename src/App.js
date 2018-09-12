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
    BooksAPI.update(book, shelf).then(() => BooksAPI.getAll().then((books) => this.setState({books})))
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({books}))
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          < SearchPage books={this.state.books} updateBooks={this.updateState}/>
        )}/>
        <Route exact path='/' render={() => (
          < Bookshelf books={this.state.books} updateBooks={this.updateState}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

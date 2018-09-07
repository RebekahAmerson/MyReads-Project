import React from 'react'
import './App.css'
import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          < SearchPage />
        )}/>
        <Route exact path='/' render={() => (
          < Bookshelf />
        )}/>
      </div>
    )
  }
}

export default BooksApp

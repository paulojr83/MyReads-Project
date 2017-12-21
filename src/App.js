import React, { Component } from 'react';
import './App.css'
import Books from './Books'
import Home from './Home'
import { Route } from 'react-router-dom'

class BooksApp extends Component {

    state = {
        myBooks: []
    }
    removeBook = (book) => {
        this.setState( (state) => ({
            myBooks: state.myBooks.filter((_) => _.id !== book.id)
        }))

    }

  render() {
    return (
        <div className="page-wrapper">
            <Route exact path='/' render={() => (
                <Home onDeleteBook={this.removeBook} contacts={this.state.myBooks}/>
            )}/>

            <Route exact path='/books' render={() => (
                <Books/>
            )}/>

        </div>
    );
  }
}

export default BooksApp;

import React, { Component } from 'react';
import './App.css'
import Books from './Books'
import Home from './Home'
import { Route } from 'react-router-dom'
import * as BooksAPI  from './BooksAPI';

class BooksApp extends Component {

  render() {
    return (
        <div className="page-wrapper">
            <Route exact path='/' render={() => (
                <Home/>
            )}/>

            <Route exact path='/books' render={() => (
                <Books/>
            )}/>

        </div>
    );
  }
}

export default BooksApp;

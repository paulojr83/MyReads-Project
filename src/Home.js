import React, { Component } from 'react';
import BookCard from './BookCard'
import { Link } from 'react-router-dom'
import If from "./If";
class Home extends  Component{

    constructor(props) {
        super(props);
        this.state = { booksRead: [], booksWantToRead: [], booksCurrentlyReading: []};
    }

    componentWillMount(){
        let booksRead= [];
        let booksWant= [];
        let booksReading= [];

        let myBooks = window.localStorage.getItem('myBooks') || '[]';
        let books= JSON.parse(myBooks);

        for (var i=0; i < books.length; i++){
            if(books[i].shelf == 'read'){
                booksRead.push(books[i]);
            }else if(books[i].shelf == 'wantToRead') {
                booksWant.push(books[i]);
            }else if(books[i].shelf == 'currentlyReading') {
                booksReading.push(books[i]);
            }
        }
        this.setState({ myBooks: JSON.parse( myBooks ), booksRead: booksRead , booksCurrentlyReading: booksReading, booksWantToRead: booksWant });
    }

    updateLocalStorage =(items) =>{
        window.localStorage.setItem('myBooks', JSON.stringify(items));
    }


    render(){

    return (

        <div className="container">
          <header id="main-header" >
            <div className="col-12">
              <div id="title" className="navbar text-color-chocolate top">My Books</div>
            </div>
          </header>

          <section className="content main">
            <hr/>
            <div className="col-12 col-4 readSpace">
                <div className="row">
                    <h2 className="card-header text-color-burlywood text-read">Currently Reading</h2>
                </div>

                <div className="row">
                    <If test={this.state.booksCurrentlyReading.length == 0}>
                        <div className="label">You are not reading any books yet.</div>
                    </If>
                    {this.state.booksCurrentlyReading.map((book, index) => (

                      <div className="col-3 col-md-6" key={book.id}>
                          <BookCard
                              id={book.id}
                              title={book.title}
                              description={book.description}
                              imageLink={book.imageLink}
                              previewLink={book.previewLink}
                              verifyWantToRead={false}
                              verifyCurrentlyReading={false}
                              verifyRead={true}
                              verifyRemove={true}/>
                      </div>

                    ))}
                </div>
            </div>
            <hr/>


              <div className="col-12 col-4 readSpace">
                <div className="row">
                  <h2 className="card-header text-color-chocolate text-read">Want to Read</h2>
                </div>
                <div className="row">
                    <If test={this.state.booksWantToRead.length == 0}>
                        <div className="label">You don't have any book to reads yet.</div>
                    </If>
                  {this.state.booksWantToRead.map((book, index) => (

                      <div className="col-3 col-md-6"  key={book.id}>
                          <BookCard
                              id={book.id}
                              title={book.title}
                              description={book.description}
                              imageLink={book.imageLink}
                              previewLink={book.previewLink}
                              verifyWantToRead={false}
                              verifyCurrentlyReading={true}
                              verifyRead={false}
                              verifyRemove={true}/>
                      </div>
                  ))}

                </div>
            </div>
            <hr/>

              <div className="col-12 col-4 readSpace">
                <div className="row">
                  <h2 className="card-header text-color-cornflowerblue text-read">Read</h2>
                </div>
                <div className="row">
                    <If test={this.state.booksRead.length == 0}>
                        <div className="label">You don't have any book to read yet.</div>
                    </If>
                      {this.state.booksRead.map((book, index) => (

                          <div className="col-3 col-md-6"  key={book.id}>
                              <BookCard
                                  id={book.id}
                                  title={book.title}
                                  description={book.description}
                                  imageLink={book.imageLink}
                                  previewLink={book.previewLink}
                                  verifyWantToRead={false}
                                  verifyCurrentlyReading={true}
                                  verifyRead={true}
                                  verifyRemove={true}/>
                          </div>

                      ))}
                </div>
            </div>

              <Link className='btn new-book' to='/books'>
                  <i className="fa fa-search-plus fa-3x" aria-hidden="true"></i>
              </Link>
          </section>

        </div>
    )
  }
}

export default Home

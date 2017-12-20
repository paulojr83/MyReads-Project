import React, { Component } from 'react';
import BookCard from './BookCard'
import { Link } from 'react-router-dom'
import If from "./If";
class Home extends  Component{

    constructor(props) {
        super(props);
        this.state = { books: [], booksRead: [], booksWant: [], booksReading: []};
    }

    componentWillMount(){
        let booksRead= [];
        let booksWant= [];
        let booksReading= [];

        let myBooks = window.localStorage.getItem('myBooks') || '[]';
        let books= JSON.parse(myBooks);

        books.find(function (book, index) {
            if(book.status == 'read'){
                booksRead.push(book);
            }else if(book.status == 'want') {
                booksWant.push(book);
            }else if(book.status == 'reading') {
                booksReading.push(book);
            }
        })
        this.setState({ myBooks: JSON.parse( myBooks ), booksRead: booksRead , booksReading: booksReading, booksWant: booksWant });
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
                    <If test={this.state.booksReading.length == 0}>
                        <div className="label">You are not reading any books yet.</div>
                    </If>
                    {this.state.booksReading.map((book, index) => (

                      <div className="col-3 col-md-6">
                          <BookCard
                              id={book.id}
                              title={book.title}
                              description={book.description}
                              imageLink={book.imageLink}
                              previewLink={book.previewLink}
                              verifyHome={true}/>
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
                    <If test={this.state.booksWant.length == 0}>
                        <div className="label">You don't have any book to reads yet.</div>
                    </If>
                  {this.state.booksWant.map((book, index) => (

                      <div className="col-3 col-md-6">
                          <BookCard
                              id={book.id}
                              title={book.title}
                              description={book.description}
                              imageLink={book.imageLink}
                              previewLink={book.previewLink}
                              verifyHome={true}/>
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

                          <div className="col-3 col-md-6">
                              <BookCard
                                  id={book.id}
                                  title={book.title}
                                  description={book.description}
                                  imageLink={book.imageLink}
                                  previewLink={book.previewLink}
                                  verifyHome={true}/>
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

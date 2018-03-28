import React,{Component} from 'react'
import '../.././App.css'
import SweetAlert from 'sweetalert-react';
import { If, Then, Else } from 'react-if';
import BookCard  from '../BookCard';
import { Link, Route } from 'react-router-dom'
import Search from '../Search'

import * as BooksAPI from '../../services/BooksAPI'

class BooksApp extends Component {

  state = {
    showSearchPage: false,
    books:[],
    myBooks:[],
    showAdded:false,
    showError:false,
  }

    
    componentWillReceiveProps(){
        alert('teste')
    }
    componentDidMount(){
        let myBooks = window.localStorage.getItem('myBooks') || '[]';
        this.setState({ myBooks: JSON.parse(myBooks)});
    }

    updateLocalStorage =(myBooks) =>{
        window.localStorage.setItem('myBooks', JSON.stringify(myBooks));
        this.setState({showAddBook:true})
    }

    saveNewBook = (shelf, book) =>{
        if( book !== undefined && book.id !== undefined && book.id !== Object){
            this.setState(function (prev) {
                let { myBooks =[]} = prev;
                let oldBook = myBooks.filter((_)=> book.id === _.id);
                if(oldBook.length === 0){
                    const newBook = {
                        id: book.id,
                        title: book.title,
                        description: book.description,
                        imageLink: book.imageLink,
                        previewLink: book.previewLink,
                        authors:book.authors,
                        shelf:shelf
                    };

                    if(this.state.books.length > 0){
                        let indexToRemove;
                        this.state.books.find(function(value, index){
                            if(value.id === book.id){
                                indexToRemove= index;
                                return;
                            }
                        });
                        this.state.books.splice(indexToRemove,1);
                        this.state.books.push(newBook);
                    }

                    myBooks.push(newBook);
                    this.updateLocalStorage(myBooks);
                }else{
                    if(book.shelf !== undefined && shelf !== book.shelf){
                        this.updateShelf(book,shelf);
                    }else{
                        this.setState({showAdded:true});
                    }
                }
                return {myBooks};
            })
        }else{
            this.setState({showError:true});
        }
        
    }

    updateShelf(book, shelf){
        let books  = this.state.myBooks;
        let indexToRemove;
        books.find(function(value, index){
            if(value.id === book.id){
                indexToRemove= index;
                return;
            }
        });

        books.splice(indexToRemove,1);
        if(shelf !== 'none'){
            book.shelf = shelf;
            books.push(book);
            BooksAPI.update(book, shelf);
        }
        window.localStorage.setItem('myBooks', JSON.stringify(books));
    }

    showSearchPage =()=> {
        this.setState({ showSearchPage: true })
    }

    render() {
        const book ={};
    return (
        
      <div className="app">
           <Route exact path="/search" render={() => (
               <Search myBooks={this.state.myBooks}  
                    saveNewBook={(shelf, book)=> {
                        this.saveNewBook(shelf, book)
                }}/>
           )}/>

           <Route exact path="/" render={() =>(               
            <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">                       
                        
                        <If condition={this.state.myBooks.length === 0}>
                            <Then>
                            <div className="label">You don't have any book to reads yet.</div>
                            </Then>
                            <Else>
                                {this.state.myBooks.map((book, index) => (
                                    <If condition={book.shelf === 'wantToRead'} key={book.id}>
                                        <BookCard
                                            onCreateSaveBook={(shelf, book)=> {
                                                this.saveNewBook(shelf, book)
                                            }}
                                            id={book.id }
                                            title={book.title}
                                            description={book.description !== undefined ? book.description:""}
                                            imageLink={book.imageLink}
                                            previewLink={book.previewLink !== undefined ? book.previewLink:""}
                                            authors={book.authors instanceof Array ? book.authors:[]}
                                            shelf={book.shelf}
                                        />
                                    </If>
                                ))}
                            </Else>
                        </If>

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                        <If condition={this.state.myBooks.length === 0 ? true:false}>
                            <Then>
                                <span className="label" >You don't have any book to reads yet. </span>
                            </Then>
                            <Else>
                                {this.state.myBooks.map((book, index) => (   
                                    <If condition={book.shelf === 'currentlyReading'} key={book.id}>                                 
                                        <BookCard
                                            onCreateSaveBook={(shelf, book)=> {
                                                this.saveNewBook(shelf, book)
                                            }}
                                            id={book.id }
                                            title={book.title}
                                            description={book.description !== undefined ? book.description:""}
                                            imageLink={book.imageLink}
                                            previewLink={book.previewLink !== undefined ? book.previewLink:""}
                                            authors={book.authors instanceof Array ? book.authors:[]}
                                            shelf={book.shelf}
                                        />
                                    </If>
                                    
                                ))}
                            </Else>

                        </If>
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Readed</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        <If condition={this.state.myBooks.length === 0}>
                            <Then>
                            <div className="label">You don't have any book to read yet.</div>
                            </Then>
                            <Else>
                                {this.state.myBooks.map((book, index) => (
                                    <If condition={book.shelf === 'read'} key={book.id}>
                                        <BookCard
                                            onCreateSaveBook={(shelf, book)=> {
                                                this.saveNewBook(shelf, book)
                                            }}
                                            id={book.id }
                                            title={book.title}
                                            description={book.description !== undefined ? book.description:""}
                                            imageLink={book.imageLink}
                                            previewLink={book.previewLink !== undefined ? book.previewLink:""}
                                            authors={book.authors instanceof Array ? book.authors:[]}
                                            shelf={book.shelf}
                                        />
                                    </If>
                                ))}
                            </Else>
                        </If>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link                 
                to="/search"                
              >Add a book</Link>
            </div>
          </div>
           )} />

          
        

        <SweetAlert
            showCancelButton={true}
            showConfirmButton={true}
            show={this.state.showConfirmRemove}
            title="Remove"
            confirmButtonText={"Yes"}
            cancelButtonText={"No"}
            onClose={() => this.setState({ showConfirmRemove: false })}
            text={'Would like to remove ' + book.title}
            onCancel={() => this.setState({ showConfirmRemove: false })}
            onConfirm={(e) => this.confirmDeleteBook(book)}
        />

        <SweetAlert
            show={this.state.showAddBook}
            title={"The book was add."}
            confirmButtonColor="green"
            onConfirm={() => this.setState({ showAddBook: false })}
        />

        <SweetAlert
            show={this.state.showAdded}
            title={"The book already was added" }
            confirmButtonColor="red"
            onConfirm={() => this.setState({ showAdded: false })}
        />

        <SweetAlert
            show={this.state.showError}
            title={"Oops! Something wrong happened!!" }
            confirmButtonColor="red"
            onConfirm={() => this.setState({ showError: false })}
        />
      </div>
    )
  }
}

export default BooksApp

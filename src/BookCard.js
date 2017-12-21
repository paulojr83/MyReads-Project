import React, {Component} from 'react'
import PropTypes from 'prop-types'
import If from "./If";
import SweetAlert from 'sweetalert-react';
import * as BooksAPI  from './BooksAPI';
class BookCard extends Component{

    constructor(props) {
        super(props);
            this.state = { myBooks: [],
            verifyRemove:false,
            verifyRead: false,
            verifyWantToRead: false,
            verifyCurrentlyReading:false,
            showConfirmRemove: false,
            showAddBook: false,
            showAdded: false,
            showError: false};
    }

    static propTypes = {
        id:PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageLink: PropTypes.string.isRequired,
        previewLink: PropTypes.string.isRequired,
        verifyWantToRead: PropTypes.bool.isRequired,
        updateLists: PropTypes.func.isRequired
    }

    updateLists(){
        const myBooks = window.localStorage.getItem('myBooks') || '[]';
        if (this.props.updateLists)
            this.props.updateLists(JSON.parse( myBooks ))
    }
    componentWillMount(){
        const myBooks = window.localStorage.getItem('myBooks') || '[]';
        this.setState({ myBooks: JSON.parse( myBooks )});
    }

    updateLocalStorage =(books) =>{
        window.localStorage.setItem('myBooks', JSON.stringify(books));
        this.setState({ myBooks: JSON.stringify(books), showAddBook:true});
    }

    reading = (book)=>{
        this.updateShelf(book, "currentlyReading")
    }

    read = (book)=> {
        this.updateShelf(book, "read")
    }

    onDeleteBook = (book)=>{
        this.setState({showConfirmRemove : true});
    }

    confirmDeleteBook = (book)=>{
        let books  = this.state.myBooks;
        let indexToRemove;

        books.find(function(value, index){
            if(value.id == book.id){
                indexToRemove= index;
                return;
            }
        });

        books.splice(indexToRemove,1);
        if(books.length == 0){
            window.localStorage.clear();
            this.setState({ myBooks: '[]'});
        }else{
            window.localStorage.setItem('myBooks', JSON.stringify(books));
            this.setState({ myBooks: JSON.stringify( books )});
        }
        this.setState({showConfirmRemove : false});
    }

    updateShelf(book, shelf){
        let books  = this.state.myBooks;
        let indexToRemove;
        books.find(function(value, index){
            if(value.id == book.id){
                indexToRemove= index;
                return;
            }
        });

        books.splice(indexToRemove,1);
        book.shelf = shelf;
        books.push(book);

        window.localStorage.setItem('myBooks', JSON.stringify(books));
        this.setState({ myBooks: JSON.stringify( books )});

        BooksAPI.update(book, book.shelf)

    }
    wantToRead= (book) =>{
        if( book !== undefined && book.id !== undefined && book.id !== Object){
            this.setState(function (prev) {
                let { myBooks =[]} = prev;
                let oldBook = myBooks.filter((_)=> book.id == _.id);
                if(oldBook.length == 0){
                    const newBook = {
                        id: book.id,
                        title: book.title,
                        description: book.description,
                        imageLink: book.imageLink,
                        previewLink: book.previewLink,
                        shelf:'wantToRead'
                    };

                    myBooks.push(newBook);
                    this.updateLocalStorage(myBooks);

                }else{
                    this.setState({showAdded:true});
                }
                return {myBooks};
            })
        }else{
            this.setState({showError:true});
        }
        browserHistory.push('/')
    }


    render(){
        const { id, title, description, imageLink, previewLink, verifyWantToRead, showError, verifyRemove, verifyRead, verifyCurrentlyReading,  } = this.props
        const book ={id:id, title:title, description:description, imageLink:imageLink, previewLink:previewLink};
        return(
            <div className="col-12">
                <div className="card" >
                    <span className="card-header text-span" >{title}</span>
                    <hr/>
                    <div className="content">

                        <div className="row">
                            <div className="col-12">
                                <div className="icon-big icon-warning text-center">
                                    <img src={imageLink} id="imageLink"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="description">
                                    <span className="text-span" id="description">{description}</span>
                                </div>
                            </div>
                        </div>

                        <div className="footer">
                            <hr />
                            <div className="stats">
                                <a className="btn orange" id="previewLink" title="Detail" href={previewLink} target="_blank">
                                    <i className="fa fa-info" aria-hidden="true"></i>
                                </a>

                                <If test={verifyWantToRead == true}>
                                    <a className="btn green" title="Want to Read" onClick={(e) => this.wantToRead(book)}>
                                        <i className="fa fa-bookmark" aria-hidden="true"></i>
                                    </a>
                                </If>


                                <If test={verifyCurrentlyReading == true}>
                                    <a className="btn yellow" title="Reading" onClick={(e) => this.reading(book)}>
                                        <i className="fa fa-bolt" aria-hidden="true" alt="Reading"></i>
                                    </a>
                                </If>

                                <If test={verifyRead == true}>
                                    <a className="btn blue" title="Read" onClick={(e) => this.read(book)}>
                                        <i className="fa fa-check-square-o" aria-hidden="true" ></i>
                                    </a>
                                </If>

                                <If test={verifyRemove == true}>
                                    <a className="btn red" title="Remove from this list" onClick={(e) => this.onDeleteBook(book)}>
                                        <i className="fa fa-times" aria-hidden="true" ></i>
                                    </a>
                                </If>

                            </div>
                        </div>
                    </div>
                </div>

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
                    title={"The book " + book.title + " was add."}
                    confirmButtonColor="green"
                    onConfirm={() => this.setState({ showAddBook: false })}
                />

                <SweetAlert
                    show={this.state.showAdded}
                    title={"The book " + book.title +" already was added" }
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

export default BookCard
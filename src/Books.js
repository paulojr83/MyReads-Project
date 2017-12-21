import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import If from "./If";
import * as BooksAPI  from './BooksAPI';
import BookCard from './BookCard'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Books extends Component {

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    constructor(props) {
        super(props);
        this.state = { books: [], query: '' };
    }

    updateQuery = (query) => {
        //this.setState({ query: query.trim() })
        BooksAPI.search(query.trim()).then((books)=>{
            this.setState({ books: books })
        });
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    search = ()=>{
        BooksAPI.search(this.state.query).then((books)=>{
            this.setState({ books: books })
        });
    }

    render() {
        const { query, books } = this.state
        let showingBooks=[]
        if (query && query.length > 3) {
            this.search();
            return;
        } else {
            const match = new RegExp(escapeRegExp(query), 'i')
            if(books instanceof Array ){
                showingBooks = books.filter((book) => match.test(book !== undefined ? book.title: ""))
            }

        }
        showingBooks.sort(sortBy('title'))

        return (
            <div className="container fixed-top">
                <header className="row">
                    <div className="col-12">

                        <Link className='back-btn' to='/'><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                        <div id="title" className="navbar text-color-chocolate top">Looking for a new book</div>
                    </div>
                </header>

                <section className="content">
                    <div className="col-12">
                        <div className='list-book-top'>
                            <input className='search-book' type="text"   placeholder="Search for..."
                                   onChange={(event) => this.updateQuery(event.target.value)} ></input>
                        </div>
                    </div>
                </section>
                <If test={showingBooks.length > 0} >
                <section className="content content-top">
                    <div className="col-12 col-4">
                        <div className="row">

                            {showingBooks.map((book, index) => (
                            <div className="col-3 col-md-6" key={index}>
                                <BookCard
                                    id={book.id }
                                    title={book.title !== undefined ? book.title:"No description"}
                                    description={book.description !== undefined ? book.description : "No description"}
                                    imageLink={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail :""}
                                    previewLink={book.previewLink !== undefined ? book.previewLink:""}
                                    verifyWantToRead={true}
                                    />
                            </div>
                            ))}

                        </div>

                    </div>

                </section>
                </If>
            </div>
        )
    }
}

export default Books
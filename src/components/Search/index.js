import React, {Component} from 'react'
import BookCard from '../BookCard'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../../services/BooksAPI'

class Search extends Component {

    constructor(props) {
        super(props);
        this.saveNewBook = this.saveNewBook.bind(this);
    }

    saveNewBook= (shelf, book) => {        
        if (this.props.saveNewBook){
            this.props.saveNewBook(shelf, book)            
        }
    }

    state = {      
        books:[],        
    }

    updateQuery = (query) => {
        if(query.length >= 3){
            let myBooks = JSON.parse(window.localStorage.getItem('myBooks') || '[]');
            
            BooksAPI.search(query.trim()).then((data)=>{
                if(data instanceof  Array){
                  let books=[]

                    for (var i=0; i < data.length; i++){
                        const book=  myBooks.filter((_)=>  _.id === data[i].id);
                        if(book.length !== 0){
                            books.push(book[0])
                        }else {
                            books.push(data[i])
                        }
                    }

                    this.setState(
                        state=>({
                            books: books 
                        })
                    )
                    return
                }
            });
        }
    }

    render(){
        
        return(
        <div className="search-books">

        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">            
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <div className="list-books">

                <ol className="books-grid">
                {this.state.books.map((book, index) => (
                    <div key={book.id}>
                        <BookCard
                            onCreateSaveBook={(shelf, book)=> {                                
                                this.saveNewBook(shelf, book)
                            }}
                            id={book.id }
                            title={book.title !== undefined ? book.title:"No description"}
                            description={book.description !== undefined ? book.description : "No description"}
                            imageLink={book.imageLinks !== undefined ? book.imageLinks.smallThumbnail :book.imageLink}
                            previewLink={book.previewLink !== undefined ? book.previewLink:""}
                            authors={book.authors instanceof Array ? book.authors:[]}
                            isValidNew={true}
                            shelf={book.shelf}
                        />
                    </div>
                 ))}
                </ol>
        </div>
        </div>
      </div>)
    }

}

export default Search
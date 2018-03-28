import React from 'react'
import PropTypes from 'prop-types'
import { If, Then, Else } from 'react-if';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
      id:PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageLink: PropTypes.string.isRequired,
      previewLink: PropTypes.string.isRequired,
      shelf: PropTypes.string,
      authors:PropTypes.array,
      isValidNew:PropTypes.bool,
      myBooks:PropTypes.array,
    }
    
    handleChange= (book, e) => {
        e.preventDefault()
        let shelf = e.target.value
        if (this.props.onCreateSaveBook){
            this.props.onCreateSaveBook(shelf, book)
        }
    }

    render(){
      const { id, title, description, imageLink, previewLink, authors, shelf, isValidNew} = this.props
      const book ={id:id, title:title, description:description, imageLink:imageLink, previewLink:previewLink, authors:authors, shelf:shelf};
    return(
      <div>
              <li key={id} name='avatarURL' className="card">
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"  id='imageLink' style={{ width: 128, height: 193, backgroundImage: 'url('+imageLink+')' }} />
                          
                    <div className="book-shelf-changer" >
                    <select value={shelf} id="shelf" onChange={(e) =>this.handleChange(book, e)} className="select-options">
                        <option value="" disabled="disabled" >Move to...</option>
                        <option value="currentlyReading"  className={shelf === 'currentlyReading'? 'blue':''}>Currently Reading</option>
                        <option value="wantToRead"  className={shelf === 'wantToRead'? 'blue':''} >Want to Read</option>
                        <option value="read" className={shelf === 'read'? 'blue':''}>Read</option>
                        { !isValidNew &&
                            <option value="none" >None</option>
                        }                        
                    </select>
                    </div>
                          
                  </div>

                  <div className="book-title" id='title'>{title}</div>
                    <div className="currrently-shelf">{shelf === 'currentlyReading' && isValidNew ? 'Currently Reading':''}</div>
                    <div className="currrently-shelf">{shelf === 'wantToRead'  && isValidNew ? 'Want to Read':''}</div>
                    <div className="currrently-shelf">{shelf === 'read'  && isValidNew  ? 'Read':''}</div>

                    <div className="book-authors" id='author'>
                        <ol>
                            {book.authors.map((author, index) => (
                                <span key={index}>
                                    {author}
                                </span>
                            ))}
                        </ol>
                    </div>

                </div>
              </li>
      </div>
    )
  }
}

export default BookCard
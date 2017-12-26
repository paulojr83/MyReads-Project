import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'


class BookCard extends Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {value:"none"}
  static propTypes = {
      id:PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageLink: PropTypes.string.isRequired,
      previewLink: PropTypes.string.isRequired,
      shelf: PropTypes.string,
      authors:PropTypes.array,
      isValidNew:PropTypes.bool,
      arrayOptions:PropTypes.array,
  }
    componentWillMount(){

    }

  handleSubmit = (shelf,book) => {
    if (this.props.onCreateSaveBook){
        this.props.onCreateSaveBook(shelf, book)
    }
  }

    handleChange= (book, e) => {
        e.preventDefault()
        let shelf = e.target.value
        if (this.props.onCreateSaveBook){
            this.props.onCreateSaveBook(shelf, book)
        }
    }

    render(){
      const { id, title, description, imageLink, previewLink, authors, shelf} = this.props
      const book ={id:id, title:title, description:description, imageLink:imageLink, previewLink:previewLink, authors:authors, shelf:shelf};
    return(
      <div>
          <form>
              <li key={id} name='avatarURL' className="card">
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"  id='imageLink'
                         style={{ width: 128, height: 193,
                           backgroundImage: 'url('+imageLink+')' }} />
                      <div className="book-shelf-changer" >
                          <select value="none" id="shelf" onChange={(e) =>this.handleChange(book, e)}>
                              <option value="none" disabled="disabled" >Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead" >Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                          </select>
                      </div>

                  </div>

                  <div className="book-title" id='title'>{title}</div>
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
          </form>
      </div>
    )
  }
}

export default BookCard

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import If from "./If";
import SweetAlert from 'sweetalert-react';

class BookCard extends Component{

    constructor(props) {
        super(props);
        this.state = { myBooks: [], verifyHome: false, show: false};
    }

    static propTypes = {
        id:PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageLink: PropTypes.string.isRequired,
        previewLink: PropTypes.string.isRequired,
        verifyHome: PropTypes.bool.isRequired
    }

    componentWillMount(){
        const myBooks = window.localStorage.getItem('myBooks') || '[]';
        this.setState({ myBooks: JSON.parse( myBooks )});

    }

    updateLocalStorage =(books) =>{
        window.localStorage.setItem('myBooks', JSON.stringify(books));
    }

    reading(){
        alert('reading')
    }

    read() {
        alert('read')

    }
    componentWillReceiveProps(nextProps) {
        const myBooks = window.localStorage.getItem('myBooks') || '[]';
        this.setState({ myBooks: JSON.parse( myBooks )});
        if (nextProps.myBooks !== this.props.myBooks) {
            this.setState({myBooks: myBooks});
        }
    }

    remove = (book)=>{
        this.setState({show : true});
    }

    confirmRemove = (book)=>{
        let books  = this.state.myBooks;
        books.find(function(value, index){
            if(value.id === book.id){
                books.splice(index,1);
                return
            }
        });
        if(books.length == 0){
            window.localStorage.clear();
            this.setState({ myBooks: '[]'});
        }else{
            window.localStorage.setItem('myBooks', JSON.stringify(books));
            this.setState({ myBooks: JSON.stringify( books )});
        }
        this.setState({show : false});
    }

    want= (book) =>{
        this.setState(function (prev) {
            let { myBooks =[]} = prev;
            let oldBook = myBooks.filter((_)=> book.id === _.id);
            if(oldBook.length == 0){
                const newBook = {
                    id: book.id,
                    title: book.title,
                    description: book.description,
                    imageLink: book.imageLink,
                    previewLink: book.previewLink,
                    status:'want'
                };

                myBooks.push(newBook);
                this.updateLocalStorage(myBooks);
            }
            return {myBooks};
        })

    }


    render(){
        const { id, title, description, imageLink, previewLink, verifyHome } = this.props
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

                                <If test={verifyHome == false}>
                                    <a className="btn green" title="Want to Read" onClick={(e) => this.want(book)}>
                                        <i className="fa fa-bookmark" aria-hidden="true"></i>
                                    </a>
                                </If>
                                <If test={verifyHome == true}>
                                    <a className="btn yellow" title="Reading" onClick={this.reading}>
                                        <i className="fa fa-bolt" aria-hidden="true" alt="Reading"></i>
                                    </a>

                                    <a className="btn blue" title="Read" onClick={this.read}>
                                        <i className="fa fa-check-square-o" aria-hidden="true" ></i>
                                    </a>

                                    <a className="btn red" title="Remove from this list" onClick={(e) => this.remove(book)}>
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
                    show={this.state.show}
                    title="Remove"
                    confirmButtonText={"Sim"}
                    cancelButtonText={"Não"}
                    onClose={() => this.setState({ show: false })}
                    text={'Would like to remove ' + book.title}
                    onCancel={() => this.setState({ show: false })}
                    onConfirm={(e) => this.confirmRemove(book)}
                />
            </div>
        )
    }
}

export default BookCard
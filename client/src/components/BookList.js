import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooks } from '../queries'
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  handleClick = book => {
    this.setState({
      selected: book.id
    })
  }

  displayBooks() {
    let data = this.props.data

    if(data.loading) return(<div>Loading books...</div>)
    
    return data.books.map(book => (
      <li key={ book.id } onClick={()=> this.handleClick(book) }>{ book.title }</li>
    ))
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
        <BookDetails 
          bookId={this.state.selected}
        />
      </div>
    )
  }
}

export default graphql(getBooks)(BookList)
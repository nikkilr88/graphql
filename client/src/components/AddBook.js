import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthors, getBooks, addBook, } from '../queries'

class AddBook extends Component {
   constructor(props) {
      super(props)

      this.state = {
         title: '',
         genre: '',
         authorId: ''
      }
   }

   displayAuthors() {
      let data = this.props.getAuthors

      if(data.loading) return(<option disabled>Loading authors...</option>)

      return data.authors.map(author => (
         <option key={ author.id } value={ author.id }>{ author.name }</option>
      ))
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   onSubmit = e => {
      e.preventDefault()
      this.props.addBook({
         variables: {
            title: this.state.title,
            genre: this.state.genre,
            authorId: this.state.authorId
         },
         refetchQueries: [{ query: getBooks }]
      })
   }

   render() {
      return (
         <form id="add-book" onSubmit={ this.onSubmit }>
            <div className="field">
               <label>Book title:</label>
               <input type="text" name='title' onChange={ this.onChange } />
            </div>
            <div className="field">
               <label>Genre:</label>
               <input type="text" name='genre' onChange={this.onChange} />
            </div>
            <div className="field">
               <label>Author:</label>
               <select name='authorId' onChange={this.onChange}>
                  <option>Select author</option>
                  {this.displayAuthors()}
               </select>
            </div>
            <button>+</button>
         </form>
      )
   }
}

export default compose(
   graphql(getAuthors, { name: "getAuthors" }),
   graphql(addBook, { name: "addBook" })
)(AddBook)
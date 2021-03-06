import { gql } from 'apollo-boost'

export const getAuthors = gql`
  {
    authors {
      name
      id
    }
  }
`

export const getBooks = gql`
  {
    books {
      title
      id
    }
  }
`

export const getBook = gql`
  query($id: ID){
    book(id: $id) {
      title 
      genre
      author {
        id
        name
        age
        books {
          title
          id
        }
      }
    }
  }
`

export const addBook = gql`
  mutation($title: String!, $genre: String!, $authorId: ID!){
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      id
    }
  }
`
const graphql = require('graphql')
const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')

const { 
   GraphQLObjectType, 
   GraphQLString, 
   GraphQLInt,
   GraphQLID, 
   GraphQLSchema,
   GraphQLList,
   GraphQLNonNull
} = graphql

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLID },
      title: {  type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args) {
            // return _.find(authors, { id: parent.authorId })
            return Author.findById(parent.authorId)
         }
      }
   })
})

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
         type: GraphQLList(BookType),
         resolve(parent) {
            // return _.filter(books, {authorId: parent.id})
            return Book.find({ authorId: parent.id })
         }
      }
   })
})


const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      book: {
         type: BookType,
         args: {
            id: {
               type: GraphQLID
            }
         },
         resolve(parent, args) {
            // return _.find(books, { id: args.id })
            return Book.findById(args.id)
         }
      },
      author: {
         type: AuthorType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            // return _.find(authors, { id: args.id })
            return Author.findById(args.id)
         }
      },
      books: {
         type: GraphQLList(BookType),
         resolve() {
            // return books
            return Book.find({})
         }
      },
      authors: {
         type: GraphQLList(AuthorType),
         resolve() {
            // return authors
            return Author.find({})
         }
      }
   }
})

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: { type: GraphQLNonNull(GraphQLString) },
            age: { type: GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            let author = new Author({
               name: args.name,
               age: args.age
            })
            return author.save()
         }
      },
      addBook: {
         type: BookType,
         args: {
            title: { type: GraphQLNonNull(GraphQLString) },
            genre: { type: GraphQLNonNull(GraphQLString) },
            authorId: { type: GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args) {
            let book = new Book({
               title: args.title,
               genre: args.genre,
               authorId: args.authorId
            })
            return book.save()
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})
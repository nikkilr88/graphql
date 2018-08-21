const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose
   .connect('mongodb://admin:pass123@ds121312.mlab.com:21312/ninja-graph', {
      useNewUrlParser: true
   })
   .then(() => console.log('Connected to DB...'))
   .catch(err => console.log(`Cound not connect to DB... ${err}`))

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}))

app.listen(8000, () => console.log('Server started on port 8000...'))
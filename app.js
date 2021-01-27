const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const auth = require('./auth')

const port = process.env.PORT || 3001

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use('/graphql', auth)

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: process.env.NODE_ENV === 'production' ? false : true,
    })
)

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, './client/build')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})
// }

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wtvq6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`server runnuing on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

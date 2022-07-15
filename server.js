const express = require('express');
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/database')
const port = process.env.PORT || 4000


connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/users', require('./routes/userRoutes'))


app.listen(port, () => console.log(`Server started on port ${port}`))
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db')
const methodOverride = require('method-override');
const port = process.env.PORT

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/uploads', express.static('public/uploads'));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

const adminRoutes = require('./routes/adminRoutes')
const api = require('./routes/apiRoutes')

app.get('/', (req,res) => {
    res.render('home')
})

app.use('/admin', adminRoutes)
app.use('/api', api)

app.listen(port, () => {
    console.log(`Server disponibile su http://localhost:${port}`)
})

connectDB()
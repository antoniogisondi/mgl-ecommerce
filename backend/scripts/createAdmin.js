const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()

const Admin = require('../models/Admin')

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    const name = 'MGL CONSULTING SRLS'
    const email = 'info@mglconsultingsrls.it'
    const password = process.env.PW_ADMIN

    console.log(typeof password)
    console.log(password)

    const hashed = await bcrypt.hash(password, 10)

    const admin = new Admin({name, email, password: hashed})
    await admin.save()
    console.log('Admin creato con successo')
    mongoose.disconnect()
}

createAdmin()
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginPage = (req, res) => {
    res.render('login', { error: null });
};

const loginAdmin = async (req,res) => {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})

    if(!admin || !(await bcrypt.compare(password, admin.password))){
        return res.render('login', {error: 'Credenziali errate'})
    }

    req.session.admin = admin
    res.redirect('/admin/dashboard')
}

module.exports = {
    loginAdmin, loginPage
}
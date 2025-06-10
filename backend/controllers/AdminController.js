const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginPage = (req, res) => {
    res.render('auth/login', { error: null });
};

const loginAdmin = async (req,res) => {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})

    if(!admin || !(await bcrypt.compare(password, admin.password))){
        return res.render('auth/login', {error: 'Credenziali errate'})
    }

    req.session.admin = admin
    res.redirect('/admin/dashboard')
}

const Dashboard = (req,res) => {
    res.render('dashboard', {admin: req.session.admin})
}

module.exports = {
    loginAdmin, loginPage, Dashboard
}
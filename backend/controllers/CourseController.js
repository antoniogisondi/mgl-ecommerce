const Course = require('../models/Course')

const Dashboard = (req,res) => {
    console.log(req.session.admin)
    res.render('dashboard', {admin: req.session.admin})
}

const getAllCourses = async (req,res) => {
    try {
        const courses = await Course.find()
    } catch (error) {
        
    }
}

module.exports = {
    Dashboard, getAllCourses
}
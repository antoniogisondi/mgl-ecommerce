const Course = require('../models/Course')

const Dashboard = (req,res) => {
    console.log(req.session.admin)
    res.render('dashboard', {admin: req.session.admin})
}

const getAllCourses = async (req,res) => {
    const courses = await Course.find()
    res.render('courses', {courses})
}

const createCourseGet = (req,res) => {
    res.render('create-course')
}

const createCoursePost = async (req,res) => {
    const {title, description, price, image, date, mode} = req.body

    await Course.create({title, description, price, image, date, mode})
    res.redirect('/admin/courses')
}

module.exports = {
    Dashboard, getAllCourses, createCourseGet, createCoursePost
}
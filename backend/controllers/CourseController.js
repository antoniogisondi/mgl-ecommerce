const Course = require('../models/Course')
const fs = require('fs');
const path = require('path');


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
    const {title, description, price, date, mode} = req.body
    const image = req.file ? '/uploads/' + req.file.filename : ''
    await Course.create({title, description, price, image, date, mode})
    res.redirect('/admin/courses')
}

const editCourseGet = async (req,res) => {
    const course = await Course.findById(req.params.id)
    if (!course) return res.redirect('/admin/courses');
    res.render('edit-course', {course})
}

const editCoursePut = async (req,res) => {
    try {
        const { title, description, price, date, mode } = req.body;
        const course = await Course.findById(req.params.id);
        if (!course) return res.redirect('/admin/courses');

        course.title = title;
        course.description = description;
        course.price = price;
        course.date = date;
        course.mode = mode;

        if (req.file) {
            if (course.image && course.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', 'public', course.image)
                fs.unlink(oldImagePath, (error) => {
                    if (error) console.error('Errore durante la modifica immagine', error.message)
                })
            }
            course.image = '/uploads/' + req.file.filename;
        }

        await course.save();
        res.redirect('/admin/courses');
    } catch (error) {
        console.error('Errore aggiornamento corso:', error);
        res.redirect('/admin/courses');
    }
}

const deleteCourse = async (req,res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (!course) return res.redirect('/admin/courses');

        if (course.image) {
            const imagePath = path.join(__dirname, '..', 'public', course.image)
            fs.unlink(imagePath, (err) => {
                if(err) console.error('Errore eliminazione immagine:', err.message);
            })
        }

        await Course.findByIdAndDelete(req.params.id)
        res.redirect('/admin/courses');
    } catch (error) {
        console.error('Errore eliminazione corso:', error);
        res.redirect('/admin/courses');
    }
}

module.exports = {
    Dashboard, getAllCourses, createCourseGet, createCoursePost, editCourseGet, editCoursePut, deleteCourse
}
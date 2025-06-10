const Course = require('../models/Course')
const fs = require('fs');
const path = require('path');


const Dashboard = (req,res) => {
    console.log(req.session.admin)
    res.render('dashboard', {admin: req.session.admin})
}

const getAllCourses = async (req,res) => {
    const courses = await Course.find({}, 'title price image')
    res.render('courses/corsi-sicurezza/courses', {courses})
}

const detailsCourses = async (req,res) => {
    try {
        const course = await Course. findById(req.params.id)
        console.log(typeof course.date)
        res.render('courses/corsi-sicurezza/details-course', {course})
    } catch (error) {
        console.error('Errore di navigazione', error)
        res.redirect('/admin/courses')
    }
}

const createCourseGet = (req,res) => {
    res.render('courses/corsi-sicurezza/create-course')
}

const createCoursePost = async (req,res) => {
    try {
        const { title, subtitle, description, price, duration, modality, location, categories } = req.body;

        const newCourse = new Course({
            title,
            subtitle,
            description,
            price,
            duration,
            modality,
            location,
            categories: categories.split(',').map(c => c.trim()),
            image: req.file ? '/uploads/' + req.file.filename : ''
        })
        
        await newCourse.save()
        res.redirect('/admin/courses')
    } catch (error) {
        console.error('Errore creazione corso:', error);
        res.status(500).send('Errore nel salvataggio corso');
    }
}

const editCourseGet = async (req,res) => {
    const course = await Course.findById(req.params.id)
    if (!course) return res.redirect('/admin/courses');
    res.render('courses/corsi-sicurezza/edit-course', {course})
}

const editCoursePut = async (req,res) => {
    try {
        const {id} = req.params
        const { title, subtitle, description, price, duration, modality, location, categories } = req.body;
        const course = await Course.findById(id);
        if (!course) return res.redirect('/admin/courses');

        course.title = title;
        course.subtitle = subtitle;
        course.description = description;
        course.price = price;
        course.duration = duration;
        course.modality = modality;
        course.location = location;
        course.categories = categories.split(',').map(c => c.trim());

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
        res.redirect(`/admin/courses/${course.id}`);
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
    Dashboard, getAllCourses, detailsCourses, createCourseGet, createCoursePost, editCourseGet, editCoursePut, deleteCourse
}
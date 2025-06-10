const Course = require('../models/Course')
const fs = require('fs');
const path = require('path');


const getAllCourses = async (req,res) => {
    const courses = await Course.find({}, 'title price image')
    res.render('courses/corsi-sicurezza/view-courses', {courses})
}

const detailsCourses = async (req,res) => {
    try {
        const course = await Course. findById(req.params.id)
        console.log(typeof course.date)
        res.render('courses/corsi-sicurezza/details-courses', {course})
    } catch (error) {
        console.error('Errore di navigazione', error)
        res.redirect('/admin/courses')
    }
}

const createCourseGet = (req,res) => {
    res.render('courses/corsi-sicurezza/create-courses')
}

const createCoursePost = async (req,res) => {
    try {
        const { title, description, price, duration, modality, location, category, subCategory } = req.body;

        const newCourse = new Course({
            title,
            description,
            price,
            duration,
            modality,
            location,
            category,
            subCategory: subCategory.split(',').map(c => c.trim()),
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
    res.render('courses/corsi-sicurezza/edit-courses', {course})
}

const editCoursePut = async (req,res) => {
    try {
        const {id} = req.params
        const { title, description, price, duration, modality, location, category, subCategory } = req.body;
        const course = await Course.findById(id);
        if (!course) return res.redirect('/admin/courses');

        course.title = title;
        course.description = description;
        course.price = price;
        course.duration = duration;
        course.modality = modality;
        course.location = location;
        course.category = category
        course.subCategory = Array.isArray(subCategory) ? subCategory : typeof subCategory === 'string' ? subCategory.split(',').map(c => c.trim()) : [];

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
    getAllCourses, detailsCourses, createCourseGet, createCoursePost, editCourseGet, editCoursePut, deleteCourse
}
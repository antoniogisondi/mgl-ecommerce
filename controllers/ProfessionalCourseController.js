const ProfessionalCourse = require('../models/ProfessionalCourse')
const path = require('path')
const fs = require('fs')

const getCourses = async (req,res) => {
    const courses = await ProfessionalCourse.find({}, 'title subtitle duration modality image')
    res.render('admin/courses/corsi-professionali/view-courses', {courses})
}

const createCoursesGet = (req,res) => {
    res.render('admin/courses/corsi-professionali/create-courses')
}

const createCoursesPost = async (req,res) => {
    try {
        const { title, subtitle, description, price, duration, modality, location, trainingType, courseCategory } = req.body;

        const newCourse = new ProfessionalCourse({
            title,
            subtitle,
            description,
            price,
            duration,
            modality,
            location,
            trainingType,
            courseCategory: courseCategory.split(',').map(c => c.trim()),
            image: req.file ? '/uploads/' + req.file.filename : ''
        })

        await newCourse.save()
        res.redirect('/admin/professional-courses')

    } catch (error) {
        console.error('Errore creazione corso:', error);
        res.status(500).send('Errore nel salvataggio corso');
    }
}

const DetailsCourses = async (req,res) => {
    try {
        const course = await ProfessionalCourse.findById(req.params.id)
        res.render('admin/courses/corsi-professionali/details-courses', {course})
    } catch (error) {
        console.error('Errore di navigazione', error)
        res.redirect('/admin/professional-courses')
    }
}

const EditCoursesGet = async (req,res) => {
    const course = await ProfessionalCourse.findById(req.params.id)
    if (!course) return res.redirect('/admin/professional-courses');
    res.render('admin/courses/corsi-professionali/edit-courses', {course})
}

const EditCoursesPut = async (req,res) => {
    try {
        const { id } = req.params
        const { title, subtitle, description, price, duration, modality, location, trainingType, courseCategory } = req.body;
        const course = await ProfessionalCourse.findById(id)
        if (!course) return res.redirect('/admin/professional-courses');

        course.title = title;
        course.subtitle = subtitle;
        course.description = description;
        course.price = price;
        course.duration = duration;
        course.modality = modality;
        course.location = location;
        course.trainingType = trainingType
        course.courseCategory = Array.isArray(courseCategory) ? courseCategory : typeof courseCategory === 'string' ? courseCategory.split(',').map(c => c.trim()) : [];
        
        if (req.file) {
            if (course.image && course.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', 'public', course.image)
                fs.unlink(oldImagePath, (error) => {
                    if (error) console.error('Errore durante la modifica immagine', error.message)
                })
            }
            course.image = '/uploads/' + req.file.filename;
        }

        await course.save()
        res.redirect(`/admin/professional-courses/${course.id}`);
    } catch (error) {
        console.error('Errore aggiornamento corso:', error);
        res.redirect('/admin/professional-courses');
    }
}

const DeleteCourse = async (req,res) => {
    try {
        const course = await ProfessionalCourse.findById(req.params.id)
        if (!course) return res.redirect('/admin/professional-courses');

        if (course.image) {
            const imagePath = path.join(__dirname, '..', 'public', course.image)
            fs.unlink(imagePath, (err) => {
                if(err) console.error('Errore eliminazione immagine:', err.message);
            })
        }

        await ProfessionalCourse.findByIdAndDelete(req.params.id)
        res.redirect('/admin/professional-courses');
    } catch (error) {
        console.error('Errore eliminazione corso:', error);
        res.redirect('/admin/professional-courses');
    }
}

module.exports = {
    getCourses, createCoursesGet, createCoursesPost, DetailsCourses, EditCoursesGet, EditCoursesPut, DeleteCourse
}
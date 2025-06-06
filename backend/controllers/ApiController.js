const Course = require('../models/Course')
const mongoose = require('mongoose')

const getApiCourses = async (req,res) => {
    try {
        const courses = await Course.find({}, 'title subtitle price duration image')
        res.json(courses)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getApiCoursesDetails = async (req,res) => {
    
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

    try {
        const course = await Course.findById(id)

        if (!course || !course.published) {
            return res.status(404).json({ error: 'Corso non trovato' });
        }

        res.json(course)
    } catch (error) {
        console.error('Errore recupero corso:', err);
        res.status(500).json({ error: 'Errore server' });
    }
}

module.exports = {getApiCourses, getApiCoursesDetails}
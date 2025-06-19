const ProfessionalCourse = require('../models/ProfessionalCourse')
const mongoose = require('mongoose')

const getApiProfessionalCourses = async (req,res) => {
    try {
        const courses = await ProfessionalCourse.find({}, 'title subtitle description price duration image')
        res.json(courses)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getApiProfessionalCoursesDetails = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

    try {
        const course = await ProfessionalCourse.findById(id)

        if (!course) {
            return res.status(404).json({ error: 'Corso non trovato' });
        }
        res.json(course)
    } catch (error) {
        console.error('Errore recupero corso:', error);
        res.status(500).json({ error: 'Errore server' });
    }
}

module.exports = { getApiProfessionalCourses, getApiProfessionalCoursesDetails}
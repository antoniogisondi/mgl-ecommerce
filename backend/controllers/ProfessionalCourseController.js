const ProfessionalCourse = require('../models/ProfessionalCourse')

const getCourses = async (req,res) => {
    const courses = await ProfessionalCourse.find({}, 'title subtitle duration modality')
    res.render('courses/corsi-professionali/view-courses', {courses})
}

module.exports = {
    getCourses
}
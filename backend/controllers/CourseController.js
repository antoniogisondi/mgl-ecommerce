const Course = require('../models/Course')

const getAllCourses = async (req,res) => {
    try {
        const courses = await Course.find()
    } catch (error) {
        
    }
}
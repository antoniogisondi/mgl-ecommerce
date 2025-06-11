const express = require('express')
const router = express.Router()
const {getApiCourses, getApiCoursesDetails, getApiProfessionalCourses, getApiProfessionalCoursesDetails} = require('../controllers/ApiController')

router.get('/courses', getApiCourses)
router.get('/courses/:id', getApiCoursesDetails)

router.get('/professional-courses', getApiProfessionalCourses)
router.get('/professional-courses/:id', getApiProfessionalCoursesDetails)
module.exports = router
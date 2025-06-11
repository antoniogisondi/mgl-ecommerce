const express = require('express')
const router = express.Router()
const {getApiCourses, getApiCoursesDetails, getApiProfessionalCourses, getApiProfessionalCoursesDetails} = require('../controllers/ApiController')
const { sendContactRequest } = require('../controllers/ContactController')

router.get('/courses', getApiCourses)
router.get('/courses/:id', getApiCoursesDetails)

router.get('/professional-courses', getApiProfessionalCourses)
router.get('/professional-courses/:id', getApiProfessionalCoursesDetails)

router.post('/contact', sendContactRequest)

module.exports = router
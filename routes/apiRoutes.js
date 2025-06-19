const express = require('express')
const router = express.Router()
const { getApiProfessionalCourses, getApiProfessionalCoursesDetails} = require('../controllers/ApiController')
const { sendContactRequest } = require('../controllers/ContactController')

router.get('/professional-courses', getApiProfessionalCourses)
router.get('/professional-courses/:id', getApiProfessionalCoursesDetails)

router.post('/contact', sendContactRequest)

module.exports = router
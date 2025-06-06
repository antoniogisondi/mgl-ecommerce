const express = require('express')
const router = express.Router()
const {getApiCourses, getApiCoursesDetails} = require('../controllers/ApiController')

router.get('/courses', getApiCourses)
router.get('/courses/:id', getApiCoursesDetails)

module.exports = router
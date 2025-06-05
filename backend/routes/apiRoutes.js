const express = require('express')
const router = express.Router()
const {getApiCourses} = require('../controllers/ApiController')

router.get('/courses', getApiCourses)

module.exports = router
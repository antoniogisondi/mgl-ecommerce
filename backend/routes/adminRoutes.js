const express = require('express')
const router = express.Router()
const {loginAdmin, loginPage} = require('../controllers/AdminController')
const {Dashboard, getAllCourses} = require('../controllers/CourseController')

const ensureAdmin = (req,res,next) => {
    if (!req.session.admin) return res.redirect('/admin/login')
    next()
}

router.get('/login', loginPage)
router.post('/login', loginAdmin)

router.get('/dashboard', ensureAdmin, Dashboard)

module.exports = router
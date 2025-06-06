const express = require('express')
const router = express.Router()
const {loginAdmin, loginPage} = require('../controllers/AdminController')
const {Dashboard, getAllCourses, detailsCourses, createCourseGet, createCoursePost, editCourseGet, editCoursePut, deleteCourse} = require('../controllers/CourseController')
const upload = require('../middleware/uploadMiddleware')

const ensureAdmin = (req,res,next) => {
    if (!req.session.admin) return res.redirect('/admin/login')
    next()
}

router.get('/login', loginPage)
router.post('/login', loginAdmin)

router.get('/dashboard', ensureAdmin, Dashboard)

router.get('/courses', ensureAdmin, getAllCourses)

router.get('/courses/create-courses', ensureAdmin, createCourseGet)
router.post('/courses/create-courses', ensureAdmin, upload.single('image'), createCoursePost)

router.get('/courses/:id', ensureAdmin, detailsCourses)

router.get('/courses/edit/:id', ensureAdmin, editCourseGet)
router.put('/courses/edit/:id', ensureAdmin, upload.single('image'), editCoursePut)

router.delete('/courses/delete/:id', ensureAdmin, deleteCourse)

module.exports = router
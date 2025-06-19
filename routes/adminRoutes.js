const express = require('express')
const router = express.Router()
const {loginAdmin, loginPage, Dashboard} = require('../controllers/AdminController')
const {getCourses, createCoursesGet, createCoursesPost, DetailsCourses, EditCoursesGet, EditCoursesPut, DeleteCourse} = require('../controllers/ProfessionalCourseController')
const { getAllRequests } = require('../controllers/ContactController')
const upload = require('../middleware/uploadMiddleware')

const ensureAdmin = (req,res,next) => {
    if (!req.session.admin) return res.redirect('/admin/login')
    next()
}

router.get('/login', loginPage)
router.post('/login', loginAdmin)

router.get('/dashboard', ensureAdmin, Dashboard)

router.get('/requests', ensureAdmin, getAllRequests)

router.get('/professional-courses', ensureAdmin, getCourses)

router.get('/professional-courses/create-courses', ensureAdmin, createCoursesGet)
router.post('/professional-courses/create-courses', ensureAdmin, upload.single('image'), createCoursesPost)

router.get('/professional-courses/:id', ensureAdmin, DetailsCourses)

router.get('/professional-courses/edit/:id', ensureAdmin, EditCoursesGet)
router.put('/professional-courses/edit/:id', ensureAdmin, upload.single('image'), EditCoursesPut)

router.delete('/professional-courses/delete/:id', ensureAdmin, DeleteCourse)

module.exports = router
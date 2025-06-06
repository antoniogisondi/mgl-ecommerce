import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Catalogo from '../pages/Catalogo'
import CourseDetails from '../pages/CourseDetails'

function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/corsi' element={<Catalogo/>}/>
                <Route path='/corsi/:id' element={<CourseDetails/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes

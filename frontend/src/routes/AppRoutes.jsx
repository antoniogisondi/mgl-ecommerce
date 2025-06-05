import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Catalogo from '../pages/Catalogo'

function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/corsi' element={<Catalogo/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes

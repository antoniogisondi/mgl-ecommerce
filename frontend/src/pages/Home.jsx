import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
    <div>
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold">Benvenuto su MGL Consulting</h1>
            <p className="mt-4">Scopri i nostri corsi di formazione professionale.</p>
            <Link to='/corsi'>Corsi</Link>
        </div>
    </div>
    )
}

export default Home

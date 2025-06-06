import {useState, useEffect} from 'react'
import { getCourses } from '../services/courseServices'
import { Link } from 'react-router-dom'

function Catalogo() {
    const [courses, setCourses] = useState([])
    const backendUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        getCourses().then(setCourses).catch((err) => console.error('Errore fetch:', err))
    })
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Catalogo Corsi</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((corso) => (
                <div key={corso._id} className="border rounded p-4 shadow hover:shadow-lg">
                    <img src={`${backendUrl}${corso.image}`} alt="immagine" />
                    <h2 className="text-xl font-semibold">{corso.title}</h2>
                    <h3 className="text-xl font-semibold">{corso.subtitle}</h3>
                    <h4>€ {corso.price}</h4>
                    <p>{corso.duration}</p>
                    <Link to={`/corsi/${corso._id}`}>Informazioni</Link>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Catalogo

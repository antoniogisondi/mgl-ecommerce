import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getCourseById } from '../services/courseServices'

function CourseDetails() {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const data = await getCourseById(id)
                setCourse(data)
            } catch (error) {
                setError('Errore nel caricamento del corso');
                console.error(error);
            }
        }
        loadCourse()
    }, [id])

    if (error) return <p>{error}</p>;
    if (!course) return <p>Caricamento...</p>;
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <h2 className="text-lg text-gray-600">{course.subtitle}</h2>
            <img src={course.image} alt={course.title} className="my-4 rounded" />
            <p>{course.description}</p>
            <p><strong>Durata:</strong> {course.duration}</p>
            <p><strong>Prezzo:</strong> €{course.price}</p>
            <p><strong>Modalità:</strong> {course.modality}</p>
            {course.location && <p><strong>Luogo:</strong> {course.location}</p>}
            {course.categories?.length > 0 && (
                <p><strong>Categorie:</strong> {course.categories.join(', ')}</p>
            )}
        </div>
    )
}

export default CourseDetails

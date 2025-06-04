import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [message, setMessage] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3000/api/ping')
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err))
    })
  return (
    <>
      <p>{message}</p>
    </>
  )
}

export default App

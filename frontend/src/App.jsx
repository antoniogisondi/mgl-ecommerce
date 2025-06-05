import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <main className="min-h-screen">
          <AppRoutes />
        </main>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App

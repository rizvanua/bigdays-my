import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Schedule from './components/Schedule'
import Locations from './components/Locations'
import Wishlist from './components/Wishlist'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Auth from './components/Auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem('wedding-auth')
    const storedGuestName = sessionStorage.getItem('guest-name')
    
    if (authStatus === 'true' && storedGuestName) {
      setIsAuthenticated(true)
      setGuestName(storedGuestName)
    }
    setIsLoading(false)
  }, [])

  const handleAuthenticated = (name: string) => {
    setIsAuthenticated(true)
    setGuestName(name)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('wedding-auth')
    sessionStorage.removeItem('guest-name')
    setIsAuthenticated(false)
    setGuestName('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-green flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Auth onAuthenticated={handleAuthenticated} />
  }

  return (
    <div className="App">
      <Header guestName={guestName} onLogout={handleLogout} />
      <main>
        <Hero />
        <Countdown />
        <Schedule />
        <Locations />
        <Wishlist />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

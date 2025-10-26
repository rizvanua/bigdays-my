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
import { apiService } from './services/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<string>('')
  const [isTestingApi, setIsTestingApi] = useState(false)

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

  const testApiCall = async () => {
    setIsTestingApi(true)
    setApiStatus('')
    
    try {
      const response = await apiService.getHealth()
      setApiStatus(`✅ API is healthy! Message: ${response.message}`)
    } catch (error) {
      setApiStatus(`❌ API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsTestingApi(false)
    }
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
        {/* API Test Section */}
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">API Test</h2>
            <button
              onClick={testApiCall}
              disabled={isTestingApi}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isTestingApi ? 'Testing...' : 'Test API Health'}
            </button>
            {apiStatus && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <p className="text-sm font-mono">{apiStatus}</p>
              </div>
            )}
          </div>
        </section>
        
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

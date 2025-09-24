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
import { configureAmplify } from './amplify-config'
import apiService from './services/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [apiResponse, setApiResponse] = useState<string>('')

  useEffect(() => {
    // Configure Amplify
    configureAmplify()
    
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
    try {
      setApiResponse('Calling API...')
      const response = await apiService.getHealth()
      setApiResponse(JSON.stringify(response, null, 2))
    } catch (error) {
      setApiResponse(`Error: ${error}`)
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
        <Hero />
        
        {/* API Test Section - Remove this in production */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                API Test Section
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <button
                  onClick={testApiCall}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                >
                  Test Lambda Function
                </button>
                {apiResponse && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">API Response:</h3>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                      {apiResponse}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
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

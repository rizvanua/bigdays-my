import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { Heart, Lock } from 'lucide-react'

// Guest list - add the names of people who should have access
const allowedGuests = [
  { firstName: 'Roman', familyName: 'Ivanytskyi' },
  { firstName: 'Oksana', familyName: 'Ivanytskyi' },
  { firstName: 'John', familyName: 'Smith' },
  { firstName: 'Jane', familyName: 'Doe' },
  { firstName: 'Michael', familyName: 'Johnson' },
  { firstName: 'Sarah', familyName: 'Williams' },
  { firstName: 'David', familyName: 'Brown' },
  { firstName: 'Emma', familyName: 'Davis' },
  // Add more guests as needed
]

interface AuthProps {
  onAuthenticated: (guestName: string) => void
}

const Auth: React.FC<AuthProps> = ({ onAuthenticated }) => {
  const [firstName, setFirstName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 200,
    config: { tension: 120, friction: 14 }
  })

  const formSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay: 400,
    config: { tension: 120, friction: 14 }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate loading for better UX
    setTimeout(() => {
      // Check if the guest is in the allowed list
      const isAllowed = allowedGuests.some(guest => 
        guest.firstName.toLowerCase() === firstName.toLowerCase() &&
        guest.familyName.toLowerCase() === familyName.toLowerCase()
      )

      if (isAllowed) {
        // Save authentication to session storage
        const guestName = `${firstName} ${familyName}`
        sessionStorage.setItem('wedding-auth', 'true')
        sessionStorage.setItem('guest-name', guestName)
        onAuthenticated(guestName)
      } else {
        setError('Sorry, you are not on the guest list. Please check your name spelling or contact the couple.')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green via-primary-green-light to-green-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <animated.div ref={ref} style={titleSpring} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-primary-green" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Roman & Oksana
          </h1>
          <p className="text-xl text-white/90 font-light">
            Wedding Celebration
          </p>
          <div className="flex items-center justify-center mt-6 text-white/80">
            <Lock size={20} className="mr-2" />
            <span className="text-sm">Private Event - Guest Access Required</span>
          </div>
        </animated.div>

        <animated.div style={formSpring} className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary-green mb-2">
                Welcome to Our Wedding
              </h2>
              <p className="text-gray-600 text-sm">
                Please enter your name to access the wedding details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-green bg-white"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Family Name
                </label>
                <input
                  type="text"
                  id="familyName"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-green bg-white"
                  placeholder="Enter your family name"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !firstName.trim() || !familyName.trim()}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                isLoading || !firstName.trim() || !familyName.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-green text-white hover:bg-primary-green-light hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Access Wedding Details'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Having trouble accessing? Contact Roman or Oksana for assistance.
            </p>
          </div>
        </animated.div>

        <animated.div style={titleSpring} className="text-center mt-8">
          <p className="text-white/70 text-sm">
            Made with ❤️ for our special day
          </p>
        </animated.div>
      </div>
    </div>
  )
}

export default Auth

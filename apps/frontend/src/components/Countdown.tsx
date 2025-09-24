import React, { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay: 200,
    config: { tension: 120, friction: 14 }
  })

  const cardsSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 400,
    config: { tension: 120, friction: 14 }
  })

  useEffect(() => {
    const targetDate = new Date('October 26, 2025 00:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <section id="countdown" className="section py-20" style={{ backgroundColor: '#F5E6D3' }}>
      <div className="container">
        <animated.div ref={ref} style={titleSpring} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#8B7355' }}>
            Countdown to Our Wedding
          </h2>
          <p className="text-xl text-gray-600 font-light">
            October 26th, 2025
          </p>
        </animated.div>

        <animated.div style={cardsSpring} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#8B7355' }}>
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base font-medium uppercase tracking-wider" style={{ color: '#A68B5B' }}>
                {unit.label}
              </div>
            </div>
          ))}
        </animated.div>

        <animated.div style={cardsSpring} className="text-center mt-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We can't wait to celebrate this special day with all of you. 
            The countdown is on to the most magical day of our lives!
          </p>
        </animated.div>
      </div>
    </section>
  )
}

export default Countdown

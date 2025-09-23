import React from 'react'
import { ChevronDown } from 'lucide-react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

const Hero: React.FC = () => {
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

  const subtitleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 400,
    config: { tension: 120, friction: 14 }
  })

  const scrollSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    delay: 600,
    config: { tension: 120, friction: 14 }
  })

  const backgroundSpring = useSpring({
    transform: inView ? 'scale(1)' : 'scale(1.1)',
    config: { tension: 120, friction: 14 }
  })

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <animated.div className="absolute inset-0" style={backgroundSpring}>
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src="/hero-banner.webp" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </animated.div>
      
      <div className="relative z-10 text-center text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <animated.h1 style={titleSpring} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Our Wedding
            </animated.h1>
            <animated.p style={subtitleSpring} className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 opacity-95 drop-shadow-md">
              October 26th, 2025
            </animated.p>
          </div>
        </div>
      </div>
      
      <animated.div style={scrollSpring} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white cursor-pointer transition-transform duration-300 hover:-translate-y-1 z-10">
        <span className="text-sm font-medium uppercase tracking-wider">Scroll</span>
        <ChevronDown size={24} className="animate-bounce" />
      </animated.div>
    </section>
  )
}

export default Hero

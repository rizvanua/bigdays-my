import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

const portfolios = [
  {
    names: 'Joy & Jordan',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    names: 'Dianne & Michael',
    gradient: 'from-pink-400 to-red-500'
  },
  {
    names: 'Gabrielle & Simon',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    names: 'Zee & Adrian',
    gradient: 'from-green-400 to-teal-500'
  }
]

interface PortfolioCardProps {
  portfolio: { names: string; gradient: string }
  index: number
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, index }) => {
  const [cardRef, cardInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const cardSpring = useSpring({
    opacity: cardInView ? 1 : 0,
    transform: cardInView ? 'translateY(0px)' : 'translateY(50px)',
    delay: index * 150,
    config: { tension: 120, friction: 14 }
  })

  return (
    <animated.div ref={cardRef} style={cardSpring} className="relative aspect-square rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
      <div className={`absolute inset-0 bg-gradient-to-br ${portfolio.gradient}`}>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex items-end">
          <h3 className="text-white text-xl md:text-2xl font-semibold drop-shadow-lg">{portfolio.names}</h3>
        </div>
      </div>
    </animated.div>
  )
}

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [gridRef, gridInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0px)' : 'translateX(-50px)',
    delay: 200,
    config: { tension: 120, friction: 14 }
  })

  const gridSpring = useSpring({
    opacity: gridInView ? 1 : 0,
    transform: gridInView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 100,
    config: { tension: 120, friction: 14 }
  })

  return (
    <section className="section bg-white">
      <div className="container">
        <animated.div ref={ref} style={titleSpring} className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl text-primary-green">Our portfolios</h2>
        </animated.div>
        
        <animated.div ref={gridRef} style={gridSpring} className="grid md:grid-cols-2 gap-8">
          {portfolios.map((portfolio, index) => (
            <PortfolioCard key={portfolio.names} portfolio={portfolio} index={index} />
          ))}
        </animated.div>
      </div>
    </section>
  )
}

export default Portfolio

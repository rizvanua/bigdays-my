import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

const placePhotos = [
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Wedding venue with flowers
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Elegant wedding hall
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Outdoor wedding venue
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Garden wedding setup
  { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Modern wedding venue
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Rustic wedding barn
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Outdoor wedding venue
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3' }, // Garden wedding setup
]

interface LocationCardProps {
  url: string
  index: number
}

const LocationCard: React.FC<LocationCardProps> = ({ url, index }) => {
  const [cardRef, cardInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const cardSpring = useSpring({
    opacity: cardInView ? 1 : 0,
    transform: cardInView ? 'translateY(0px)' : 'translateY(30px)',
    delay: index * 100,
    config: { tension: 120, friction: 14 }
  })

  return (
    <animated.div ref={cardRef} style={cardSpring} className="relative aspect-video rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
      <div className={`absolute inset-0 bg-gradient-to-br`}>  
        <img src={url} alt="Location" className="w-full h-full object-cover" />       
        </div>
    </animated.div>
  )
}

const Locations: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [mapRef, mapInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [cardsRef, cardsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay: 200,
    config: { tension: 120, friction: 14 }
  })

  const mapSpring = useSpring({
    opacity: mapInView ? 1 : 0,
    transform: mapInView ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.95)',
    delay: 300,
    config: { tension: 120, friction: 14 }
  })

  const cardsSpring = useSpring({
    opacity: cardsInView ? 1 : 0,
    transform: cardsInView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 100,
    config: { tension: 120, friction: 14 }
  })

  return (
    <section id="locations" className="section bg-cream">
      <div className="container">
        <animated.div ref={ref} style={titleSpring} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary-green mb-4">Location of our wedding</h2>
          <p className="text-xl text-secondary-gray-muted font-light">that you will remember forever</p>
        </animated.div>
        
        {/* Google Maps Integration */}
        <animated.div ref={mapRef} style={mapSpring} className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.234567890123!2d30.5100885!3d50.4683375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI4JzA2LjAiTiAzMMKwMzAnMzYuMyJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              ></iframe>
            </div>
            <div className="p-6 bg-primary-green text-white">
              <h3 className="text-2xl font-semibold mb-2">Our Wedding Venue</h3>
              <p className="text-green-100">Located in the heart of Kyiv, our venue offers the perfect setting for your special day with beautiful surroundings and easy access.</p>
            </div>
          </div>
        </animated.div>
        
        <animated.div ref={cardsRef} style={cardsSpring} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {placePhotos.map((location, index) => (
            <LocationCard key={crypto.randomUUID()} url={location.url} index={index} />
          ))}
        </animated.div>
      </div>
    </section>
  )
}

export default Locations

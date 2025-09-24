import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

const Schedule: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [timelineRef, timelineInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 200,
    config: { tension: 120, friction: 14 }
  })

  const timelineSpring = useSpring({
    opacity: timelineInView ? 1 : 0,
    transform: timelineInView ? 'translateY(0px)' : 'translateY(50px)',
    delay: 400,
    config: { tension: 120, friction: 14 }
  })

  const events = [
    {
      id: 1,
      date: 'SATURDAY 20TH NOVEMBER',
      title: 'THE WEDDING',
      description: 'Same day, same dress, same location, same amazing photographer + videographer. Just a much more scaled down, intimate event with bridal party only in what we have dubbed our \'minimony\'.',
      time: null,
      rsvp: null
    },
    {
      id: 2,
      date: 'FRIDAY 26TH NOVEMBER',
      title: 'THE PARTY',
      time: '7:30pm - 12:30am',
      description: 'Let\'s celebrate our marriage! Time to gather our amazing guests (you!). Canapés, drinks and good times provided. Dress to dance! Your outfit (and dance moves) will be captured by our amazing wedding photographer.',
      rsvp: 'Please RSVP before 1st October via the button in the menu.'
    }
  ]

  return (
    <section id="schedule" className="section py-20" style={{ backgroundColor: '#F5E6D3' }}>
      <div className="container">
        <animated.div ref={ref} style={titleSpring} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#8B7355' }}>
            SCHEDULE
          </h2>
        </animated.div>

        <animated.div ref={timelineRef} style={timelineSpring} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full" style={{ backgroundColor: '#D4C4B0' }}></div>
          
          <div className="space-y-20">
            {events.map((event, index) => {
              const [eventRef, eventInView] = useInView({
                threshold: 0.1,
                triggerOnce: true
              })

              const eventSpring = useSpring({
                opacity: eventInView ? 1 : 0,
                transform: eventInView ? 'translateY(0px)' : 'translateY(30px)',
                delay: index * 200 + 600,
                config: { tension: 120, friction: 14 }
              })

              return (
                <animated.div
                  key={event.id}
                  ref={eventRef}
                  style={eventSpring}
                  className={`relative flex ${index % 2 === 0 ? 'items-start' : 'justify-end'}`}
                >
                  {/* Timeline marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10 shadow-sm" style={{ backgroundColor: '#8B7355' }}></div>
                  
                  {/* Content */}
                  <div className="w-5/12 pl-8">
                    <div className="text-left">
                      <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: '#8B7355' }}>
                        {event.date}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3" style={{ color: '#8B7355' }}>
                        {event.title}
                      </h3>
                      {event.time && (
                        <p className="text-lg font-medium mb-4" style={{ color: '#A68B5B' }}>
                          {event.time}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#8B7355' }}>
                        {event.description}
                      </p>
                      {event.rsvp && (
                        <p className="text-sm font-medium" style={{ color: '#8B7355' }}>
                          {event.rsvp}
                        </p>
                      )}
                    </div>
                  </div>
                </animated.div>
              )
            })}
          </div>
        </animated.div>
      </div>
    </section>
  )
}

export default Schedule

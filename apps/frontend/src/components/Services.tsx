import React from 'react'

const services = [
  {
    title: 'Photography',
    gradient: 'from-blue-500 to-purple-600',
    description: 'Capture every precious moment with our professional photography services'
  },
  {
    title: 'Ceremony',
    gradient: 'from-pink-400 to-red-500',
    description: 'Beautiful ceremony planning and coordination for your special day'
  },
  {
    title: 'Wedding Design',
    gradient: 'from-cyan-400 to-blue-500',
    description: 'Stunning floral arrangements and elegant wedding design services'
  }
]

const Services: React.FC = () => {
  return (
    <section id="services" className="section section-light">
      <div className="container">
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl text-primary-green mb-4">Services</h2>
          <p className="text-xl text-secondary-gray-muted font-light">to plan and orchestrate your special occasion</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className={`h-64 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex items-end">
                  <h3 className="text-white text-2xl font-semibold drop-shadow-lg">{service.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-base leading-relaxed text-secondary-gray text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FeaturedVenues: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-1 lg:order-1">
            <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/30 via-primary-green-light/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-transparent"></div>
            </div>
          </div>
          
          <div className="order-2 lg:order-2">
            <h2 className="text-4xl md:text-5xl text-primary-green mb-10 text-left">Featured venues</h2>
            
            <div className="max-w-lg">
              <h3 className="text-3xl md:text-4xl text-primary-green mb-2 font-bold">Villa Balbianello</h3>
              <p className="text-xl text-secondary-gray-muted mb-8 font-light">Lake Como</p>
              
              <div className="mb-8">
                <p className="text-lg leading-relaxed text-secondary-gray mb-5">
                  Nestled on a wooded promontory overlooking Lake Como, Villa Balbianello offers an enchanting 
                  setting for your special day. This 18th-century villa features magnificent terraced gardens 
                  and stunning lake views that will create the perfect backdrop for your wedding celebration.
                </p>
                <p className="text-lg leading-relaxed text-secondary-gray">
                  With its romantic architecture and pristine natural surroundings, Villa Balbianello provides 
                  an intimate and luxurious atmosphere that will make your wedding day truly unforgettable.
                </p>
              </div>
              
              <a href="#contact" className="inline-block text-primary-green font-semibold text-lg mb-10 relative transition-colors duration-300 hover:text-primary-green-light after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-green after:transition-all after:duration-300 hover:after:w-full">
                View more
              </a>
              
              <div className="flex gap-5">
                <button className="w-12 h-12 border-2 border-primary-green bg-transparent text-primary-green rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary-green hover:text-white hover:scale-110" aria-label="Previous venue">
                  <ChevronLeft size={24} />
                </button>
                <button className="w-12 h-12 border-2 border-primary-green bg-transparent text-primary-green rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-primary-green hover:text-white hover:scale-110" aria-label="Next venue">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedVenues

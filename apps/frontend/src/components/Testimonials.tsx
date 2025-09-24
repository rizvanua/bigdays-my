import React from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="section section-dark">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">Testimonials</h2>
          <p className="text-xl text-white/80 font-light">from happy, delighted couples</p>
        </div>
        
        <div className="flex items-center justify-center gap-10 max-w-5xl mx-auto">
          <div className="flex items-center">
            <button className="w-16 h-16 border-2 border-white/30 bg-transparent text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:scale-110" aria-label="Previous testimonial">
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="flex-1 text-center max-w-4xl">
            <div className="mb-8 opacity-60">
              <Quote size={48} className="mx-auto" />
            </div>
            
            <blockquote className="text-xl md:text-2xl leading-relaxed text-white mb-10 italic opacity-95">
              Our wedding at Villa Balbianello was absolutely magical. The team made every detail perfect, 
              from the initial planning to the final celebration. The venue's breathtaking beauty combined 
              with their exceptional service created memories we'll treasure forever. Every guest was amazed 
              by the elegance and attention to detail. We couldn't have asked for a more perfect day.
            </blockquote>
            
            <div className="flex items-center justify-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-white">Joy & Jordan</h4>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="w-16 h-16 border-2 border-white/30 bg-transparent text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:scale-110" aria-label="Next testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

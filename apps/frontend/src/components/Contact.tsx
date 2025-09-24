import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partner1: '',
    partner2: '',
    date: '',
    guests: '',
    rsvp: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? (e.target as HTMLInputElement).value : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Google Apps Script web app URL (Updated deployment)
      const GOOGLE_SCRIPT_URL ='https://script.google.com/macros/s/AKfycbwq-XGl9cXGqe2z04y7tQ9L37-yU84PLnB62KjnaKKNHU1vXcXJB6ZJGV83qUR4GcVcAg/exec'
      
      // Create URL parameters for GET request (JSONP approach)
      const params = new URLSearchParams({
        api_key: 'your-secure-api-key-here', // Must match the API key in Google Apps Script
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        partner1: formData.partner1,
        partner2: formData.partner2,
        date: formData.date,
        guests: formData.guests,
        rsvp: formData.rsvp,
        message: formData.message
      })

      // Use GET request to avoid CORS issues
      await fetch(`${GOOGLE_SCRIPT_URL}?${params}`, {
        method: 'GET',
        mode: 'no-cors'
      })

      console.log('Form data being sent:', formData)
      console.log('URL parameters:', params.toString())
      console.log('Full URL being called:', `${GOOGLE_SCRIPT_URL}?${params}`)

      // Since we're using no-cors mode, we can't read the response
      // But if no error is thrown, we assume success
      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        partner1: '',
        partner2: '',
        date: '',
        guests: '',
        rsvp: '',
        message: ''
      })

    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        <div className="grid gap-16 items-start">
          <div>
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl text-primary-green mb-4">Are you going to come?</h2>              
            </div>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-green bg-white"
                /> 
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone no."
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-green bg-white"
                />                
              </div>   
              <div className="space-y-3">
                <label className="block text-lg font-medium text-primary-green mb-3">
                  Will you be attending our wedding?
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="rsvp"
                      value="Yes, I will come"
                      checked={formData.rsvp === 'Yes, I will come'}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                      formData.rsvp === 'Yes, I will come'
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {formData.rsvp === 'Yes, I will come' && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className={`text-lg font-medium transition-colors duration-300 ${
                      formData.rsvp === 'Yes, I will come'
                        ? 'text-green-600'
                        : 'text-gray-700 group-hover:text-green-600'
                    }`}>
                      Yes, I will come
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="rsvp"
                      value="No, I won't come"
                      checked={formData.rsvp === 'No, I won\'t come'}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                      formData.rsvp === 'No, I won\'t come'
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300 group-hover:border-red-400'
                    }`}>
                      {formData.rsvp === 'No, I won\'t come' && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className={`text-lg font-medium transition-colors duration-300 ${
                      formData.rsvp === 'No, I won\'t come'
                        ? 'text-red-600'
                        : 'text-gray-700 group-hover:text-red-600'
                    }`}>
                      No, I won't come
                    </span>
                  </label>
                </div>
                </div>

                {/* Show guests input only if user is coming */}
                {formData.rsvp === 'Yes, I will come' && (
                  <input
                    type="number"
                    name="guests"
                    placeholder="How many people are you bringing?"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-green bg-white"
                    min="1"
                  />
                )}
              
              <textarea
                name="message"
                placeholder="Tell us anything more that can help!"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="p-4 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-green bg-white resize-y min-h-[120px]"
              ></textarea>
              
              <button 
                type="submit" 
                className={`btn self-start ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Thank you! Your message has been sent successfully. We'll get back to you soon!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  Sorry, there was an error sending your message. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

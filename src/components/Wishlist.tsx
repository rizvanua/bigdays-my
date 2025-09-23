import React, { useState, useEffect } from 'react'
import { Heart, Gift, Home, ExternalLink } from 'lucide-react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

interface Venue {
  id: string
  name: string
  location: string
  image: string
  rating: number
  capacity: string
  price: string
  description: string
  features: string[]
  type: 'venue'
}

interface GiftItem {
  id: string
  name: string
  category: string
  image: string
  price: string
  store: string
  storeUrl: string
  description: string
  priority: 'high' | 'medium' | 'low'
  type: 'gift'
}

type WishlistItem = Venue | GiftItem

const giftItems: GiftItem[] = [
  {
    id: 'gift-1',
    name: 'Tesla Model 3',
    category: 'Transportation',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$45,000',
    store: 'Tesla',
    storeUrl: 'https://tesla.com',
    description: 'Electric car for our new life together. Perfect for weekend getaways!',
    priority: 'high',
    type: 'gift'
  },
  {
    id: 'gift-2',
    name: 'Designer Dining Table',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$2,500',
    store: 'West Elm',
    storeUrl: 'https://westelm.com',
    description: 'Large oak dining table to host family gatherings and dinner parties.',
    priority: 'high',
    type: 'gift'
  },
  {
    id: 'gift-3',
    name: 'Luxury Sofa Set',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$3,200',
    store: 'Crate & Barrel',
    storeUrl: 'https://crateandbarrel.com',
    description: 'Comfortable 3-seater sofa for our living room. Perfect for movie nights!',
    priority: 'medium',
    type: 'gift'
  },
  {
    id: 'gift-4',
    name: 'Kitchen Appliances Set',
    category: 'Appliances',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$1,800',
    store: 'KitchenAid',
    storeUrl: 'https://kitchenaid.com',
    description: 'Complete set including stand mixer, blender, and food processor.',
    priority: 'medium',
    type: 'gift'
  },
  {
    id: 'gift-5',
    name: 'Honeymoon Fund',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$5,000',
    store: 'Travel Fund',
    storeUrl: '#',
    description: 'Help us create magical memories on our dream honeymoon to Italy!',
    priority: 'high',
    type: 'gift'
  },
  {
    id: 'gift-6',
    name: 'Home Gym Equipment',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$1,200',
    store: 'Peloton',
    storeUrl: 'https://peloton.com',
    description: 'Treadmill and weights for staying fit together in our new home.',
    priority: 'low',
    type: 'gift'
  },
  {
    id: 'gift-7',
    name: 'Garden Furniture Set',
    category: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$900',
    store: 'IKEA',
    storeUrl: 'https://ikea.com',
    description: 'Outdoor dining set for summer barbecues and garden parties.',
    priority: 'medium',
    type: 'gift'
  },
  {
    id: 'gift-8',
    name: 'Smart Home System',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$800',
    store: 'Amazon',
    storeUrl: 'https://amazon.com',
    description: 'Smart home hub with lighting, security, and temperature control.',
    priority: 'low',
    type: 'gift'
  }
]

const allItems: WishlistItem[] = giftItems

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [activeTab] = useState<'all' | 'venues' | 'gifts'>('all')
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

  const cardsSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay: 400,
    config: { tension: 120, friction: 14 }
  })

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wedding-wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wedding-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (venueId: string) => {
    setWishlist(prev => 
      prev.includes(venueId) 
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    )
  }

  const isInWishlist = (itemId: string) => wishlist.includes(itemId)

  // Filter items based on active tab
  const filteredItems = allItems.filter(item => {
    if (activeTab === 'all') return true
    if (activeTab === 'venues') return item.type === 'venue'
    if (activeTab === 'gifts') return item.type === 'gift'
    return true
  })


  const GiftItemCard: React.FC<{ gift: GiftItem; index: number }> = ({ gift, index }) => {
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
      <animated.div
        ref={cardRef}
        style={cardSpring}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={() => toggleWishlist(gift.id)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isInWishlist(gift.id)
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            aria-label={isInWishlist(gift.id) ? 'Already pledged' : 'I will get this for you'}
          >
            <Heart 
              size={20} 
              className={isInWishlist(gift.id) ? 'fill-current' : ''}
            />
          </button>
          {/* <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(gift.priority)}`}>
            {gift.priority} priority
          </div> */}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-primary-green mb-1">{gift.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Gift size={16} className="mr-1" />
                <span className="text-sm">{gift.category}</span>
              </div>
            </div>
            <span className="text-lg font-bold text-primary-green">{gift.price}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gift.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <Home size={16} className="mr-1" />
              <span>{gift.store}</span>
            </div>
            <a
              href={gift.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-green text-sm hover:text-primary-green-light transition-colors"
            >
              <ExternalLink size={14} className="mr-1" />
              Visit Store
            </a>
          </div>
          
          <button
            onClick={() => toggleWishlist(gift.id)}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              isInWishlist(gift.id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary-green text-white hover:bg-primary-green-light'
            }`}
          >
            {isInWishlist(gift.id) ? 'Already pledged' : 'I will get this for you'}
          </button>
        </div>
      </animated.div>
    )
  }

  const renderItem = (item: WishlistItem, index: number) => {   
      return <GiftItemCard key={item.id} gift={item as GiftItem} index={index} />
  }

  return (
    <section id="wishlist" className="section bg-cream">
      <div className="container">
        <animated.div ref={ref} style={titleSpring} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary-green font-serif font-bold mb-4">
            Wedding Wishlist
          </h2>
          <p className="text-xl text-secondary-gray-muted font-light max-w-2xl mx-auto">
            Save your favorite venues and gift registry items for your special day
          </p>
        </animated.div>        

        <animated.div style={cardsSpring} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => renderItem(item, index))}
        </animated.div>

        {wishlist.length > 0 && (
          <animated.div style={cardsSpring} className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary-green mb-4">
                Our Wishlist ({wishlist.length} venue{wishlist.length !== 1 ? 's' : ''})
              </h3>
              <p className="text-gray-600 mb-6">
                You have {wishlist.length} venue{wishlist.length !== 1 ? 's' : ''} saved to your wishlist. 
                Ready to book your dream wedding venue?
              </p>
              <a
                href="#contact"
                className="btn inline-block"
              >
                Get Quote for Selected Venues
              </a>
            </div>
          </animated.div>
        )}
      </div>
    </section>
  )
}

export default Wishlist

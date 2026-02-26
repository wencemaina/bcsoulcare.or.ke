"use client"
import { useState } from 'react'
import { Search } from 'lucide-react'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    console.log('Search query:', searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1920")'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 text-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 lg:mb-12 leading-tight">
          Biblical Approach to Soul-Care for Mental Wellness
        </h1>

        {/* Decorative Lines with Tagline */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 md:mb-8 lg:mb-12 max-w-4xl mx-auto">
          <div className="flex-1 h-px bg-white/40"></div>
          <p className="text-white italic text-base sm:text-lg md:text-xl font-serif whitespace-nowrap px-2 sm:px-4">
            "Soul-Care. Wellness. Discipleship."
          </p>
          <div className="flex-1 h-px bg-white/40"></div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 lg:mb-12 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed">
          Christ-Centered Counseling and Soul-Care Rooted in The Sufficiency of Scripture,
          <br className="hidden sm:block" />
          Nurturing Hope, Healing, and Transformation in Christ.
        </p>

        {/* Learn More Button */}
        <button className="inline-block bg-white text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300 mb-8 md:mb-12 rounded">
          Learn More
        </button>

        {/* Search Bar */}
        <div className="max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 shadow-2xl rounded overflow-hidden bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Your Query"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-800 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-900 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Search size={16} className="sm:size-18" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
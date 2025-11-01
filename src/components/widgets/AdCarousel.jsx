"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Megaphone, Tag, Gift, TrendingUp } from "lucide-react"

const adSlides = [
  {
    id: 1,
    title: "Special Weekend Deals!",
    description: "Get up to 50% off on selected items",
    icon: Tag,
    gradient: "from-purple-400 to-pink-400",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "Fresh Arrivals Daily",
    description: "New products added every morning",
    icon: Gift,
    gradient: "from-blue-400 to-cyan-400",
    cta: "Explore"
  },
  {
    id: 3,
    title: "Member Exclusive",
    description: "Extra 20% discount for loyalty members",
    icon: TrendingUp,
    gradient: "from-green-400 to-teal-400",
    cta: "Learn More"
  }
]

export default function AdCarousel({ colors }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % adSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + adSlides.length) % adSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentAd = adSlides[currentSlide]
  const Icon = currentAd.icon

  return (
    <div className="rounded-xl border-2 border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-64 lg:h-72">
        {/* Slide content */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentAd.gradient} transition-all duration-500`}>
          <div className="h-full flex flex-col items-center justify-center p-6 lg:p-8 text-white relative z-10">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <Icon className="w-10 h-10 lg:w-12 lg:h-12" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-center">{currentAd.title}</h3>
            <p className="text-base lg:text-lg mb-6 text-center opacity-90">{currentAd.description}</p>
            <button
              className="px-6 lg:px-8 py-3 lg:py-4 bg-white text-gray-900 rounded-lg font-semibold text-base lg:text-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg"
            >
              {currentAd.cta}
            </button>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>
      </div>

      {/* Slide indicators with progress */}
      <div className="p-4 lg:p-5 bg-gray-50 flex items-center justify-center gap-2">
        {adSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`w-8 lg:w-10 h-2 lg:h-2.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-[#009178]' : 'bg-gray-300'
            }`}>
              {index === currentSlide && isAutoPlaying && (
                <div
                  className="h-full bg-[#007a63] rounded-full animate-progress"
                  style={{ animation: 'progress 5s linear' }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}

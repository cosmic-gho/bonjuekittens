"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const images = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop"
]

export function HeroImageSlider() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 8000) // Change image every 8 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-16">
      {/* Image Backgrounds */}
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Hero Background ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Glass/Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10" />

      {/* Content */}
      <div className="container relative z-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both max-w-4xl mx-auto">
        <Badge className="bg-background/10 text-white hover:bg-background/20 border-white/20 px-5 py-2 text-sm rounded-full backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-flex items-center gap-2 mb-6">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> Premium Cat Breeding
        </Badge>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[1.05] mb-6 drop-shadow-2xl">
          Welcome to <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            Bonjuekittens
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light mb-10 drop-shadow-lg">
          Discover beautiful, healthy kittens from our premium breeding program. Specializing in <span className="text-white font-medium">Persian</span>, <span className="text-white font-medium">British</span>, and <span className="text-white font-medium">Exotic</span> breeds only.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/kittens">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-[0_10px_40px_-10px_rgba(245,158,11,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(245,158,11,0.8)] transition-all duration-500 hover:-translate-y-1 h-16 px-10 rounded-full text-lg font-semibold group border-0"
            >
              View Available Kittens
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full text-lg bg-background/10 hover:bg-background/20 backdrop-blur-md transition-all duration-500 border-white/30 text-white font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Slider Indicators */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-amber-400 scale-125" : "bg-background/50 hover:bg-background/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

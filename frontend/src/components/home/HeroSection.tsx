"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  credit: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Discover Amazing Places",
    subtitle: "Find the best restaurants, services, and experiences in your city",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80",
    credit: "Fine Dining Experience"
  },
  {
    id: 2,
    title: "Explore Local Businesses",
    subtitle: "Support your community and discover hidden gems nearby",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
    credit: "Local Shopping District"
  },
  {
    id: 3,
    title: "Find Your Perfect Match",
    subtitle: "From fitness centers to beauty salons, we've got you covered",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    credit: "Fitness & Wellness"
  },
  {
    id: 4,
    title: "Connect with Your Community",
    subtitle: "Read reviews, share experiences, and make informed decisions",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80",
    credit: "Community Events"
  }
];

interface HeroSectionProps {
  children?: React.ReactNode;
}

const HeroSection = ({ children }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex flex-col gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white h-8 w-1"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="mt-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Center Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Title - Above Search */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-5 drop-shadow-2xl leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 drop-shadow-lg font-light">
              {slides[currentSlide].subtitle}
            </p>
          </div>
          
          {/* Search Bar Component - Centered */}
          <div className="w-full relative z-50">
            <h1>Search bar index here</h1>
            {children}
          </div>
        </div>
      </div>

      {/* Image Credit */}
      <div className="absolute bottom-4 left-6 z-20 text-white text-sm">
        <p className="font-medium drop-shadow-lg">{slides[currentSlide].credit}</p>
        <p className="text-xs opacity-80">Photo from the business owner</p>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;

"use client";

import RecipeCard from "../recipeCard/RecipeCard";
import { useState, useRef, useEffect, useCallback } from "react";

const MenuCarousel: React.FC<MenuCarouselProps> = ({
  totalCards = 3,
  cardWidth = 320,
  recipes,
}) => {
  const middleCardIndex = Math.floor(totalCards / 2);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(middleCardIndex);
  const [dragDistance, setDragDistance] = useState(0);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  // Dynamic card width based on screen size
  const getResponsiveCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return cardWidth;
    
    const width = window.innerWidth;
    if (width < 640) return Math.min(280, width - 40); // Mobile: full width minus padding
    if (width < 1024) return 300; // Tablet
    return cardWidth; // Desktop: use provided cardWidth
  }, [cardWidth]);

  const [responsiveCardWidth, setResponsiveCardWidth] = useState(getResponsiveCardWidth());

  // Update screen size and card width on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
      setResponsiveCardWidth(getResponsiveCardWidth());
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveCardWidth]);

  const scrollToCard = useCallback(
    (index: number) => {
      if (!carouselRef.current) return;
      const containerWidth = carouselRef.current.offsetWidth;
      const currentCardWidth = responsiveCardWidth;
      
      // Adjust padding for mobile screens
      const paddingWidth = screenSize === 'mobile' ? 20 : (containerWidth - currentCardWidth) / 2;
      const targetScroll = paddingWidth + index * (currentCardWidth + (screenSize === 'mobile' ? 16 : 0));

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    },
    [responsiveCardWidth, screenSize]
  );

  const autoScrollToNext = useCallback(() => {
    const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
    if (timeSinceLastInteraction < 2000) return;

    const nextIndex = (currentIndex + 1) % totalCards;
    scrollToCard(nextIndex);
  }, [currentIndex, totalCards, scrollToCard]);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(autoScrollToNext, 3000);
  }, [autoScrollToNext]);

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const updateLastInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setDragDistance(0);
    updateLastInteraction();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const distance = e.pageX - startX;
    setDragDistance(distance);
    updateLastInteraction();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleDragEnd();
    updateLastInteraction();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setDragDistance(0);
    updateLastInteraction();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const distance = e.touches[0].pageX - startX;
    setDragDistance(distance);
    updateLastInteraction();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    handleDragEnd();
    updateLastInteraction();
  };

  const handleDragEnd = () => {
    const threshold = 50;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
        scrollToCard(prevIndex);
      } else {
        const nextIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
        scrollToCard(nextIndex);
      }
    } else {
      scrollToCard(currentIndex);
    }

    setDragDistance(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(middleCardIndex);
    }, 100);

    return () => clearTimeout(timer);
  }, [middleCardIndex, scrollToCard]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [currentIndex, startAutoScroll]);

  const getCardStyle = (index: number) => {
    const isFocused = index === currentIndex;

    // On mobile, show all cards without blur/scale effects for better usability
    if (screenSize === 'mobile') {
      return {
        transform: "scale(1) translateY(0px)",
        filter: "blur(0px)",
        opacity: "1",
        zIndex: isFocused ? "10" : "5",
        transition: isDragging ? "none" : "all 0.3s ease-out",
      };
    }

    if (isFocused) {
      return {
        transform: "scale(1) translateY(0px)",
        filter: "blur(0px)",
        opacity: "1",
        zIndex: "10",
        transition: isDragging ? "none" : "all 0.4s ease-out",
      };
    }

    const distance = Math.abs(index - currentIndex);
    const factor = distance / (totalCards - 1);

    // Reduce effects on tablet for better visibility
    const scaleFactor = screenSize === 'tablet' ? 0.1 : 0.2;
    const blurFactor = screenSize === 'tablet' ? 3 : 6;
    const opacityFactor = screenSize === 'tablet' ? 0.2 : 0.3;

    return {
      transform: `scale(${1 - factor * scaleFactor}) translateY(${factor * (screenSize === 'tablet' ? 15 : 30)}px)`,
      filter: `blur(${factor * blurFactor}px)`,
      opacity: (1 - factor * opacityFactor).toString(),
      zIndex: (10 - distance).toString(),
      transition: isDragging ? "none" : "all 0.4s ease-out",
    };
  };

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className={`flex overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } select-none items-center ${
          screenSize === 'mobile' 
            ? 'py-4 px-4' // Reduced padding on mobile
            : screenSize === 'tablet'
            ? 'py-8 px-6' // Medium padding on tablet
            : 'py-20' // Full padding on desktop
        }`}
        style={{
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left padding - minimal on mobile, centered on larger screens */}
        <div
          className="flex-shrink-0"
          style={{ 
            width: screenSize === 'mobile' 
              ? '20px' // Minimal left padding on mobile
              : `calc(50% - ${responsiveCardWidth / 2}px)` 
          }}
        />

        {recipes.map((recipe, index) => (
          <div
            key={index}
            className={`flex-shrink-0 relative ${
              screenSize === 'mobile' ? 'mr-4' : '' // Add margin between cards on mobile
            }`}
            style={{
              ...getCardStyle(index),
              width: responsiveCardWidth,
              scrollSnapAlign: screenSize === 'mobile' ? "start" : "center",
            }}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}

        {/* Right padding - minimal on mobile, centered on larger screens */}
        <div
          className="flex-shrink-0"
          style={{ 
            width: screenSize === 'mobile' 
              ? '20px' // Minimal right padding on mobile
              : `calc(50% - ${responsiveCardWidth / 2}px)` 
          }}
        />
      </div>

      {/* Mobile-specific navigation indicators */}
      {screenSize === 'mobile' && totalCards > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-orange w-4' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCarousel;

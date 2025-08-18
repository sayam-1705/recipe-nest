"use client";

import RecipeCard from "../recipeCard/RecipeCard";
import { useState, useRef, useEffect, useCallback } from "react";

interface MenuCarouselProps {
  totalCards?: number;
  cardWidth?: number;
  recipes: Recipe[];
}

const MenuCarousel: React.FC<MenuCarouselProps> = ({ 
  totalCards = 3, 
  cardWidth = 320 ,
  recipes
}) => {
  // Configuration
  const middleCardIndex = Math.floor(totalCards / 2);

  // State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(middleCardIndex);
  const [dragDistance, setDragDistance] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  // Scroll to a specific card
  const scrollToCard = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.offsetWidth;
    const paddingWidth = (containerWidth - cardWidth) / 2;
    const targetScroll = paddingWidth + (index * cardWidth);
    
    carouselRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  }, [cardWidth]);

  // Auto scroll to next card
  const autoScrollToNext = useCallback(() => {
    const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
    if (timeSinceLastInteraction < 2000) return;
    
    const nextIndex = (currentIndex + 1) % totalCards;
    scrollToCard(nextIndex);
  }, [currentIndex, totalCards, scrollToCard]);

  // Auto scroll management
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

  // Event handlers
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

  // Handle drag end with threshold-based navigation
  const handleDragEnd = () => {
    const threshold = 50;
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        // Dragged right, go to previous card
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
        scrollToCard(prevIndex);
      } else {
        // Dragged left, go to next card
        const nextIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
        scrollToCard(nextIndex);
      }
    } else {
      // Small drag, snap back to current card
      scrollToCard(currentIndex);
    }
    
    setDragDistance(0);
  };

  // Initialize carousel with middle card centered
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(middleCardIndex);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [middleCardIndex, scrollToCard]);

  // Auto scroll effect
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [currentIndex, startAutoScroll]);

  // Get card styling based on position relative to current focused card
  const getCardStyle = (index: number) => {
    const isFocused = index === currentIndex;
    
    if (isFocused) {
      return {
        transform: 'scale(1) translateY(0px)',
        filter: 'blur(0px)',
        opacity: '1',
        zIndex: '10',
        transition: isDragging ? 'none' : 'all 0.4s ease-out'
      };
    }
    
    // Calculate effects for non-focused cards
    const distance = Math.abs(index - currentIndex);
    const factor = distance / (totalCards - 1);
    
    return {
      transform: `scale(${1 - factor * 0.2}) translateY(${factor * 30}px)`,
      filter: `blur(${factor * 6}px)`,
      opacity: (1 - factor * 0.3).toString(),
      zIndex: (10 - distance).toString(),
      transition: isDragging ? 'none' : 'all 0.4s ease-out'
    };
  };

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className={`flex overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } select-none items-center py-20`}
        style={{ 
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left padding for centering */}
        <div className="flex-shrink-0" style={{ width: `calc(50% - ${cardWidth/2}px)` }} />

        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative"
            style={{
              ...getCardStyle(index),
              width: cardWidth,
              scrollSnapAlign: 'center'
            }}
          >
            <RecipeCard recipe={recipe}/>
          </div>
        ))}
        
        {/* Right padding for centering */}
        <div className="flex-shrink-0" style={{ width: `calc(50% - ${cardWidth/2}px)` }} />
      </div>
    </div>
  );
};

export default MenuCarousel;
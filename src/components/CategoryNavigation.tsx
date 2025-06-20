
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface CategoryNavigationProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to active category on mobile
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  return (
    <section className="py-8 border-b border-cosmic-constellation/10">
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cosmic-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cosmic-dark to-transparent z-10 pointer-events-none" />
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                data-active={activeCategory === category}
                onClick={() => onCategoryChange(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`
                  whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all duration-200 focus-ring
                  ${activeCategory === category
                    ? 'bg-cosmic-comet text-white comet-glow shadow-lg' 
                    : 'border-cosmic-constellation/30 text-cosmic-star hover:border-cosmic-constellation hover:bg-cosmic-constellation/10'
                  }
                `}
                role="tab"
                aria-selected={activeCategory === category}
                tabIndex={activeCategory === category ? 0 : -1}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;

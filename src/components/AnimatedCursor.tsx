
import React, { useEffect, useState } from 'react';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.closest('button') || 
                           target.closest('a') ||
                           target.classList.contains('card-hover');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate3d(${mousePosition.x - 12}px, ${mousePosition.y - 12}px, 0)`,
          transition: isHovering ? 'all 0.15s ease-out' : 'none'
        }}
      >
        <div 
          className={`w-full h-full rounded-full bg-cosmic-constellation transition-all duration-300 ${
            isHovering ? 'scale-150 bg-cosmic-comet' : 'scale-100'
          }`}
          style={{
            filter: 'blur(1px)',
            boxShadow: `0 0 20px ${isHovering ? '#ff1493' : '#00d4ff'}, 0 0 40px ${isHovering ? '#ff1493' : '#00d4ff'}30`
          }}
        />
      </div>

      {/* Trailing blur effect */}
      <div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-40"
        style={{
          transform: `translate3d(${mousePosition.x - 24}px, ${mousePosition.y - 24}px, 0)`,
          transition: 'all 0.3s ease-out'
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-cosmic-constellation/30"
          style={{
            filter: 'blur(8px)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
      </div>

      {/* Background particle that follows cursor */}
      <div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-30"
        style={{
          transform: `translate3d(${mousePosition.x - 64}px, ${mousePosition.y - 64}px, 0)`,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-gradient-to-r from-cosmic-constellation/10 to-cosmic-comet/10"
          style={{
            filter: 'blur(20px)',
            animation: 'float 4s ease-in-out infinite'
          }}
        />
      </div>
    </>
  );
};

export default AnimatedCursor;

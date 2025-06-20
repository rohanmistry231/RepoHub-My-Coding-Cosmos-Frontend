
import React, { useEffect, useState } from 'react';

const CursorBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trailing particles occasionally
      if (Math.random() > 0.95) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          delay: Math.random() * 2
        };
        
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-15));
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Main cursor glow that affects background */}
      <div
        className="absolute w-96 h-96 rounded-full transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, rgba(255, 20, 147, 0.02) 50%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Trailing particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-cosmic-constellation/40 animate-fade-out"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s',
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Animated background elements that react to cursor */}
      <div
        className="absolute w-64 h-64 rounded-full transition-all duration-2000 ease-out opacity-20"
        style={{
          left: mousePosition.x * 0.1 - 128,
          top: mousePosition.y * 0.1 - 128,
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />

      <div
        className="absolute w-48 h-48 rounded-full transition-all duration-3000 ease-out opacity-15"
        style={{
          right: mousePosition.x * 0.05,
          bottom: mousePosition.y * 0.05,
          background: 'radial-gradient(circle, rgba(255, 20, 147, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 12s ease-in-out infinite reverse'
        }}
      />
    </div>
  );
};

export default CursorBackground;

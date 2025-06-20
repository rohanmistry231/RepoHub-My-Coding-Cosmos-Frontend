
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-cosmic-constellation/10 relative overflow-hidden">
      {/* Constellation map background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
          {/* Constellation lines */}
          <path 
            d="M100 100 L200 150 L300 120 L400 180 L500 140 L600 200 L700 160" 
            stroke="currentColor" 
            strokeWidth="1" 
            className="text-cosmic-constellation"
          />
          <path 
            d="M150 250 L250 200 L350 280 L450 240 L550 300 L650 260" 
            stroke="currentColor" 
            strokeWidth="1" 
            className="text-cosmic-constellation"
          />
          
          {/* Stars */}
          <circle cx="100" cy="100" r="2" fill="currentColor" className="text-cosmic-star" />
          <circle cx="200" cy="150" r="1.5" fill="currentColor" className="text-cosmic-constellation" />
          <circle cx="300" cy="120" r="2" fill="currentColor" className="text-cosmic-comet" />
          <circle cx="400" cy="180" r="1" fill="currentColor" className="text-cosmic-star" />
          <circle cx="500" cy="140" r="2" fill="currentColor" className="text-cosmic-constellation" />
          <circle cx="600" cy="200" r="1.5" fill="currentColor" className="text-cosmic-star" />
          <circle cx="700" cy="160" r="1" fill="currentColor" className="text-cosmic-comet" />
          
          <circle cx="150" cy="250" r="1.5" fill="currentColor" className="text-cosmic-constellation" />
          <circle cx="250" cy="200" r="2" fill="currentColor" className="text-cosmic-star" />
          <circle cx="350" cy="280" r="1" fill="currentColor" className="text-cosmic-comet" />
          <circle cx="450" cy="240" r="1.5" fill="currentColor" className="text-cosmic-star" />
          <circle cx="550" cy="300" r="2" fill="currentColor" className="text-cosmic-constellation" />
          <circle cx="650" cy="260" r="1" fill="currentColor" className="text-cosmic-star" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full border-cosmic-constellation/30 text-cosmic-constellation hover:bg-cosmic-constellation/10 hover:border-cosmic-constellation focus-ring p-0"
              asChild
            >
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full border-cosmic-constellation/30 text-cosmic-constellation hover:bg-cosmic-constellation/10 hover:border-cosmic-constellation focus-ring p-0"
              asChild
            >
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full border-cosmic-constellation/30 text-cosmic-constellation hover:bg-cosmic-constellation/10 hover:border-cosmic-constellation focus-ring p-0"
              asChild
            >
              <a 
                href="mailto:your.email@example.com"
                aria-label="Send email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Copyright and theme info */}
          <div className="space-y-3">
            <p className="text-cosmic-star/70 text-sm">
              © {currentYear} RepoHub. Crafted with ✨ in the coding cosmos.
            </p>
            <p className="text-cosmic-star/50 text-xs">
              Explore • Discover • Create • Inspire
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-8 left-1/4 w-1 h-1 bg-cosmic-constellation rounded-full animate-twinkle" />
      <div className="absolute bottom-8 right-1/3 w-1.5 h-1.5 bg-cosmic-comet rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-cosmic-star rounded-full animate-twinkle" style={{ animationDelay: '3s' }} />
    </footer>
  );
};

export default Footer;

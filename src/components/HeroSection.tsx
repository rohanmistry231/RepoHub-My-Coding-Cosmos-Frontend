
import React from 'react';
import { Star, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  totalRepos: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ totalRepos }) => {
  const lastRefreshed = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className="relative py-16 lg:py-20 galactic-gradient overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 cosmic-particles" />
      
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-cosmic-star mb-6 tracking-tight">
              🌟 <span className="bg-gradient-to-r from-cosmic-constellation to-cosmic-comet bg-clip-text text-transparent">
                RepoHub
              </span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-cosmic-constellation mb-4">
              My Coding Cosmos
            </h2>
            <p className="text-lg lg:text-xl text-cosmic-star/80 leading-relaxed">
              Dive through nebulae of ideas & land on code that sparks imagination.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-8 bg-cosmic-nebula/50 backdrop-blur-sm rounded-2xl px-8 py-4 border border-cosmic-constellation/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-cosmic-constellation">{totalRepos}+</div>
                <div className="text-sm text-cosmic-star/70">Projects</div>
              </div>
              <div className="w-px h-12 bg-cosmic-constellation/20" />
              <div className="text-center">
                <div className="text-lg font-semibold text-cosmic-star">Last refreshed</div>
                <div className="text-sm text-cosmic-star/70">{lastRefreshed}</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="bg-cosmic-comet hover:bg-cosmic-comet/80 text-white font-semibold px-8 py-4 h-auto comet-glow focus-ring transition-all duration-200"
              asChild
            >
              <a href="https://github.com/yourusername/repohub" target="_blank" rel="noopener noreferrer">
                <Star className="w-5 h-5 mr-2" />
                <span className="lg:hidden">Star RepoHub</span>
                <span className="hidden lg:inline">Star RepoHub</span>
                <ExternalLink className="w-4 h-4 ml-2 lg:hidden" />
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-cosmic-constellation text-cosmic-constellation hover:bg-cosmic-constellation/10 font-semibold px-8 py-4 h-auto constellation-glow focus-ring transition-all duration-200"
              asChild
            >
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                <span className="lg:hidden">Follow Me</span>
                <span className="hidden lg:inline">Follow Me</span>
                <ExternalLink className="w-4 h-4 ml-2 lg:hidden" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cosmic-constellation rounded-full animate-twinkle" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-cosmic-comet rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cosmic-star rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-cosmic-constellation rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};

export default HeroSection;

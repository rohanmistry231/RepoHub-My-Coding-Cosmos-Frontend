
import React from 'react';

const CalloutBanner: React.FC = () => {
  return (
    <section className="lg:py-4 py-2 lg:pb-10 pb-6 relative overflow-hidden">
      {/* Cosmic particles background */}
      <div className="absolute inset-0 cosmic-particles opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-cosmic-nebula/30 backdrop-blur-sm rounded-3xl p-12 border border-cosmic-constellation/20">
            <h2 className="text-3xl lg:text-4xl font-bold text-cosmic-star mb-6 tracking-tight">
              ✨ Why RepoHub?
            </h2>
            <p className="text-lg lg:text-xl text-cosmic-star/80 leading-relaxed mb-8">
              In the vast cosmos of code, finding stellar projects can feel like searching for distant galaxies. 
              RepoHub serves as your celestial map, carefully curating and organizing repositories across the 
              development universe. Each project has been handpicked for its innovation, utility, and potential 
              to inspire your next breakthrough.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="text-3xl">🎯</div>
                <h3 className="text-lg font-semibold text-cosmic-constellation">Curated Excellence</h3>
                <p className="text-cosmic-star/70 text-sm">
                  Every repo is carefully selected for quality and innovation
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl">⚡</div>
                <h3 className="text-lg font-semibold text-cosmic-constellation">Lightning Fast</h3>
                <p className="text-cosmic-star/70 text-sm">
                  Intelligent search and filtering to find exactly what you need
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl">🌟</div>
                <h3 className="text-lg font-semibold text-cosmic-constellation">Always Fresh</h3>
                <p className="text-cosmic-star/70 text-sm">
                  Updated regularly with the latest trends and technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cosmic-constellation/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cosmic-comet/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default CalloutBanner;

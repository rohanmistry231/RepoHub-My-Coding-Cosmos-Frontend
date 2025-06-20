
import React from 'react';
import { Star, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Repo {
  id: number;
  name: string;
  emoji: string;
  tagline: string;
  category: string;
  stack: string;
  stars: number;
  lastUpdatedRelative: string;
  isTopPick: boolean;
  githubUrl: string;
  deepWikiUrl: string;
}

interface RepoCardProps {
  repo: Repo;
  index: number;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, index }) => {
  const formatStars = (stars: number) => {
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars.toString();
  };

  // Generate multiple tech tags based on the main stack
  const generateTechTags = (mainStack: string) => {
    const techCombos = {
      'Python': ['Python', 'FastAPI', 'NumPy'],
      'JavaScript': ['JavaScript', 'Node.js', 'Express'],
      'TypeScript': ['TypeScript', 'React', 'Next.js'],
      'React': ['React', 'TypeScript', 'Tailwind'],
      'Node.js': ['Node.js', 'Express', 'MongoDB'],
      'Docker': ['Docker', 'Kubernetes', 'AWS'],
      'Kubernetes': ['Kubernetes', 'Docker', 'DevOps'],
      'TensorFlow': ['TensorFlow', 'Python', 'ML'],
      'PyTorch': ['PyTorch', 'Python', 'Deep Learning'],
      'Vue': ['Vue.js', 'JavaScript', 'Vuex'],
      'Angular': ['Angular', 'TypeScript', 'RxJS'],
      'Go': ['Go', 'Gin', 'gRPC'],
      'Rust': ['Rust', 'Actix', 'WebAssembly'],
      'Java': ['Java', 'Spring', 'Maven'],
      'C++': ['C++', 'CMake', 'Qt']
    };
    
    return techCombos[mainStack] || [mainStack, 'GitHub', 'Open Source'];
  };

  const techTags = generateTechTags(repo.stack);

  return (
    <article 
      className="group bg-cosmic-nebula/50 backdrop-blur-sm rounded-2xl p-6 border border-cosmic-constellation/20 card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl" role="img" aria-label="Repository emoji">
              {repo.emoji}
            </span>
            <h3 className="text-xl font-semibold text-cosmic-star group-hover:text-cosmic-constellation transition-colors">
              {repo.name}
            </h3>
          </div>
          {repo.isTopPick && (
            <Badge className="bg-cosmic-comet/20 text-cosmic-comet border-cosmic-comet/30 text-xs">
              ⭐ Top Pick
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-cosmic-star/80 mb-6 leading-relaxed line-clamp-2">
        {repo.tagline}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techTags.map((tag, index) => (
          <Badge 
            key={index}
            variant="outline" 
            className="border-cosmic-constellation/30 text-cosmic-constellation bg-cosmic-constellation/10 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1 text-sm text-cosmic-star/70">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{formatStars(repo.stars)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          asChild
          size="sm"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium focus-ring"
        >
          <a 
            href={repo.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View ${repo.name} on GitHub`}
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
            <ExternalLink className="w-3 h-3 ml-2" />
          </a>
        </Button>
        
        <Button
          asChild
          size="sm"
          variant="outline"
          className="flex-1 border-slate-500 text-slate-300 hover:bg-slate-500/10 focus-ring"
        >
          <a 
            href={repo.deepWikiUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View ${repo.name} documentation`}
          >
            DeepWiki
            <ExternalLink className="w-3 h-3 ml-2" />
          </a>
        </Button>
      </div>
    </article>
  );
};

export default RepoCard;

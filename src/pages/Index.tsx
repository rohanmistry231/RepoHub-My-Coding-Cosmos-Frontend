import React, { useState, useEffect } from 'react';
import { Star, Github, ExternalLink, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HeroSection from '@/components/HeroSection';
import RepoCard from '@/components/RepoCard';
import CalloutBanner from '@/components/CalloutBanner';
import Footer from '@/components/Footer';
import AnimatedCursor from '@/components/AnimatedCursor';
import CursorBackground from '@/components/CursorBackground';

const Index = () => {
  const [repos, setRepos] = useState([]);
  const [categories, setCategories] = useState(['All']); // Dynamic categories
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showTopPicksOnly, setShowTopPicksOnly] = useState(false);
  const [visibleRepos, setVisibleRepos] = useState(12); // Kept for compatibility, but not used with limit

  // Fetch repos and categories from backend
  useEffect(() => {
    fetch(`http://localhost:5000/repos?searchQuery=${searchQuery}&sortBy=${sortBy}&filterCategory=${filterCategory}&showTopPicksOnly=${showTopPicksOnly}`)
      .then(res => res.json())
      .then(data => setRepos(data.repos))
      .catch(err => console.error('Error fetching repos:', err));

    fetch('http://localhost:5000/categories')
      .then(res => res.json())
      .then(data => setCategories(['All', ...data.sort()]))
      .catch(err => console.error('Error fetching categories:', err));
  }, [searchQuery, sortBy, filterCategory, showTopPicksOnly]);

  const handleLoadMore = () => {
    setVisibleRepos(prev => Math.min(prev + 12, repos.length));
  };

  const getRelativeTime = (date) => {
    const now = new Date('2025-06-20T10:26:00+05:30'); // Updated to current date and time in IST
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // CRUD Operations (Basic examples)
  const handleCreateRepo = () => {
    const newRepo = {
      name: 'new-project-1',
      tagline: 'New innovative project',
      category: 'Web Development',
      stack: ['React', 'Node.js'],
      stars: 100,
      lastUpdated: new Date().toISOString(),
      isTopPick: true,
      githubUrl: 'https://github.com/user/new-project-1',
      deepWikiUrl: 'https://deepwiki.com/new-project-1'
    };
    fetch('/api/repos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRepo)
    }).then(() => window.location.reload()); // Refresh to see new data
  };

  const handleDeleteRepo = (id) => {
    fetch(`/api/repos/${id}`, { method: 'DELETE' }).then(() => window.location.reload());
  };

  return (
    <div className="min-h-screen bg-cosmic-dark cursor-none">
      {/* Cursor Components - Hidden on mobile */}
      <div className="hidden lg:block">
        <AnimatedCursor />
        <CursorBackground />
      </div>
      
      {/* Hero Section */}
      <HeroSection totalRepos={repos.length} />

      {/* Search & Filters */}
      <section className="py-0">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cosmic-constellation w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search through the cosmos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star placeholder:text-cosmic-star/60 focus:border-cosmic-constellation focus-ring text-lg w-full"
                />
              </div>

              {/* Category Filter Dropdown */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star focus-ring w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-cosmic-nebula border-cosmic-constellation/20" side="bottom">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'All' ? '🌟 All Categories' : `📂 ${category}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star focus-ring w-full sm:w-48 flex items-center justify-center">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-cosmic-nebula border-cosmic-constellation/20" side="bottom">
                  <SelectItem value="stars">⭐ Most Stars</SelectItem>
                  <SelectItem value="updated">🕒 Recently Updated</SelectItem>
                  <SelectItem value="name">📝 Alphabetical</SelectItem>
                </SelectContent>
              </Select>

              {/* Top Picks Toggle */}
              <Button
                variant={showTopPicksOnly ? "default" : "outline"}
                onClick={() => setShowTopPicksOnly(!showTopPicksOnly)}
                className={`h-14 px-6 ${
                  showTopPicksOnly 
                    ? 'bg-cosmic-comet hover:bg-cosmic-comet/80 text-white' 
                    : 'border-cosmic-constellation/20 text-cosmic-star hover:bg-cosmic-constellation/10'
                } focus-ring w-full sm:w-auto`}
              >
                <Star className="w-4 h-4 mr-2" />
                Top Picks
              </Button>
            </div>

            {/* Results Count */}
            <div className="mt-6 text-center">
              <p className="text-cosmic-star/70" role="status" aria-live="polite">
                {repos.length === 0 
                  ? "No constellations found—try another star-name!" 
                  : `Found ${repos.length} stellar ${repos.length === 1 ? 'project' : 'projects'}`
                }
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Repo Grid */}
      <section className="py-6">
        <div className="container mx-auto px-8">
          {repos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {repos.map((repo, index) => (
                  <RepoCard 
                    key={repo.id} 
                    repo={{
                      ...repo,
                      lastUpdatedRelative: getRelativeTime(repo.lastUpdated)
                    }}
                    index={index}
                    // onDelete={() => handleDeleteRepo(repo._id)} // Assuming _id from MongoDB
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleRepos < repos.length && (
                <div className="mt-9 text-center">
                  <Button
                    onClick={handleLoadMore}
                    size="lg"
                    className="bg-cosmic-constellation hover:bg-cosmic-constellation/80 text-cosmic-dark font-semibold px-8 py-4 h-auto focus-ring"
                  >
                    Load More Stars ({repos.length - visibleRepos} remaining)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="animate-float mb-6">
                <Star className="w-16 h-16 text-cosmic-constellation/50 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-cosmic-star mb-4">
                No constellations found
              </h3>
              <p className="text-cosmic-star/70 max-w-md mx-auto">
                Try adjusting your search terms or exploring different categories to discover amazing projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call-out Banner */}
      <CalloutBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
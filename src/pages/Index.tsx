import React, { useState, useEffect, useRef } from 'react';
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
  const [allRepos, setAllRepos] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showTopPicksOnly, setShowTopPicksOnly] = useState(false);
  const [visibleRepos, setVisibleRepos] = useState(0); // Track visible repos count
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem('repoData');
    if (storedData) {
      const { repos, categories, total } = JSON.parse(storedData);
      console.log('Loaded from localStorage:', { repos: repos.length, categories, total });
      setAllRepos(repos);
      setCategories(categories);
      setTotalRepos(total);
      setLoading(false);
    } else {
      const reposUrl = `https://repo-hub-my-coding-cosmos-backend.vercel.app/categories-and-repos`;
      console.log('Fetching from API:', reposUrl);
      fetch(reposUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('API response:', data);
          const { repos, categories, total } = data;
          setAllRepos(repos);
          setCategories(categories);
          setTotalRepos(total);
          localStorage.setItem('repoData', JSON.stringify({ repos, categories, total }));
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setAllRepos([]); // Fallback to empty array on error
        })
        .finally(() => setLoading(false));
    }
  }, []);

  // Filter and sort repos locally
  const filteredRepos = allRepos.filter(repo => {
    const matchesCategory = filterCategory === 'All' || repo.category === filterCategory;
    const matchesSearch = !searchQuery || repo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopPicks = !showTopPicksOnly || repo.isTopPick;
    return matchesCategory && matchesSearch && matchesTopPicks;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'stars': return b.stars - a.stars;
      case 'updated': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'name': return a.name.localeCompare(b.name);
      default: return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const handleLoadMore = () => {
    const scrollPosition = window.scrollY; // Save current scroll position
    setVisibleRepos(prev => Math.min(prev + 12, filteredRepos.length)); // Increment by 12, cap at total filtered
    setTimeout(() => {
      window.scrollTo(0, scrollPosition); // Restore scroll position
      if (loadMoreRef.current) {
        loadMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Keep button in view
      }
    }, 0);
  };

  const getRelativeTime = (date) => {
    const now = new Date('2025-06-21T09:24:00+05:30'); // Updated to 09:24 AM IST
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen bg-cosmic-dark cursor-none">
      <div className="hidden lg:block">
        <AnimatedCursor />
        <CursorBackground />
      </div>
      
      <HeroSection totalRepos={totalRepos} />

      <section className="pt-2">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-2xl w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cosmic-constellation w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star placeholder:text-cosmic-star/60 focus:border-cosmic-constellation focus-ring text-lg w-full"
                />
              </div>

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

            <div className="mt-6 text-center">
              <p className="text-cosmic-star/70" role="status" aria-live="polite">
                {filteredRepos.length === 0 
                  ? "No constellations found—try another search or category!" 
                  : `Found ${Math.min(visibleRepos + 12, filteredRepos.length)} of ${totalRepos} stellar ${filteredRepos.length === 1 ? 'project' : 'projects'}`
                }
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cosmic-constellation"></div>
            </div>
          ) : filteredRepos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredRepos.slice(0, visibleRepos + 12).map((repo, index) => (
                  <RepoCard 
                    key={repo._id || index}
                    repo={{
                      ...repo,
                      lastUpdatedRelative: getRelativeTime(repo.lastUpdated)
                    }}
                    index={index}
                  />
                ))}
              </div>

              {visibleRepos + 12 < filteredRepos.length && (
                <div className="mt-9 text-center" ref={loadMoreRef}>
                  <Button
                    onClick={handleLoadMore}
                    size="lg"
                    className="bg-cosmic-constellation hover:bg-cosmic-constellation/80 text-cosmic-dark font-semibold px-8 py-4 h-auto focus-ring"
                  >
                    Load More Stars ({filteredRepos.length - (visibleRepos + 12)} remaining)
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

      <CalloutBanner />
      <Footer />
    </div>
  );
};

export default Index;
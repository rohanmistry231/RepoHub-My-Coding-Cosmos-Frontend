import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Edit, Trash } from 'lucide-react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminPassword'));
  const [repos, setRepos] = useState([]);
  const [categories, setCategories] = useState(['All']); // Dynamic categories
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [filterCategory, setFilterCategory] = useState('All');
  const [newRepo, setNewRepo] = useState({
    name: '',
    tagline: '',
    category: '',
    stack: [''],
    stars: 0,
    lastUpdated: '',
    isTopPick: false,
    githubUrl: '',
    deepWikiUrl: ''
  });
  const [editRepo, setEditRepo] = useState(null);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // Hardcoded password (change in production)

  // Handle password authentication
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminPassword', password);
      setPassword('');
    } else {
      setError('Incorrect password');
    }
  };

  // Fetch repos and categories from backend
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`https://repo-hub-my-coding-cosmos-backend.vercel.app/repos?searchQuery=${searchQuery}&sortBy=${sortBy}&filterCategory=${filterCategory}&showTopPicksOnly=false`)
        .then(res => res.json())
        .then(data => setRepos(data.repos))
        .catch(err => console.error('Error fetching repos:', err));

      fetch('https://repo-hub-my-coding-cosmos-backend.vercel.app/categories')
        .then(res => res.json())
        .then(data => setCategories(['All', ...data.sort()]))
        .catch(err => console.error('Error fetching categories:', err));
    }
  }, [searchQuery, sortBy, filterCategory, isAuthenticated]);

  // CRUD Operations
  const handleCreateRepo = (e) => {
    e.preventDefault();
    fetch('https://repo-hub-my-coding-cosmos-backend.vercel.app/repos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newRepo,
        lastUpdated: newRepo.lastUpdated || new Date('2025-06-20T10:20:00+05:30').toISOString(), // Current date and time
        stack: newRepo.stack.filter(s => s.trim())
      })
    })
      .then(res => res.json())
      .then(() => {
        setNewRepo({ name: '', tagline: '', category: '', stack: [''], stars: 0, lastUpdated: '', isTopPick: false, githubUrl: '', deepWikiUrl: '' });
        fetchRepos();
        fetchCategories(); // Refresh categories
      })
      .catch(err => console.error('Error creating repo:', err));
  };

  const handleUpdateRepo = (e) => {
    e.preventDefault();
    fetch(`https://repo-hub-my-coding-cosmos-backend.vercel.app/repos/${editRepo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...editRepo,
        lastUpdated: editRepo.lastUpdated || new Date('2025-06-20T10:20:00+05:30').toISOString(), // Current date and time
        stack: editRepo.stack.filter(s => s.trim())
      })
    })
      .then(res => res.json())
      .then(() => {
        setEditRepo(null);
        fetchRepos();
        fetchCategories(); // Refresh categories
      })
      .catch(err => console.error('Error updating repo:', err));
  };

  const handleDeleteRepo = (id) => {
    fetch(`https://repo-hub-my-coding-cosmos-backend.vercel.app/repos/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchRepos();
        fetchCategories(); // Refresh categories
      })
      .catch(err => console.error('Error deleting repo:', err));
  };

  const fetchRepos = () => {
    fetch(`https://repo-hub-my-coding-cosmos-backend.vercel.app/repos?searchQuery=${searchQuery}&sortBy=${sortBy}&filterCategory=${filterCategory}&showTopPicksOnly=false`)
      .then(res => res.json())
      .then(data => setRepos(data.repos))
      .catch(err => console.error('Error fetching repos:', err));
  };

  const fetchCategories = () => {
    fetch('https://repo-hub-my-coding-cosmos-backend.vercel.app/categories')
      .then(res => res.json())
      .then(data => setCategories(['All', ...data.sort()]))
      .catch(err => console.error('Error fetching categories:', err));
  };

  const handleStackChange = (index, value) => {
    const newStack = [...(editRepo ? editRepo.stack : newRepo.stack)];
    newStack[index] = value;
    if (editRepo) setEditRepo({ ...editRepo, stack: newStack });
    else setNewRepo({ ...newRepo, stack: newStack });
  };

  const addStackField = () => {
    if (editRepo) setEditRepo({ ...editRepo, stack: [...editRepo.stack, ''] });
    else setNewRepo({ ...newRepo, stack: [...newRepo.stack, ''] });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center p-6">
        <div className="bg-cosmic-nebula p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl text-cosmic-star mb-6 text-center">Admin Login</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-cosmic-constellation text-white py-3 rounded-lg hover:bg-cosmic-constellation/80">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-dark p-6">
      <h1 className="text-4xl text-cosmic-star mb-8 font-bold text-center">Admin Panel</h1>

      {/* CRUD Form */}
      <div className="bg-cosmic-nebula p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl text-cosmic-star mb-6">{editRepo ? 'Edit Repository' : 'Add New Repository'}</h2>
        <form onSubmit={editRepo ? handleUpdateRepo : handleCreateRepo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            placeholder="Name"
            value={editRepo ? editRepo.name : newRepo.name}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, name: e.target.value }) : setNewRepo({ ...newRepo, name: e.target.value })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <Input
            placeholder="Tagline"
            value={editRepo ? editRepo.tagline : newRepo.tagline}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, tagline: e.target.value }) : setNewRepo({ ...newRepo, tagline: e.target.value })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <Input
            placeholder="Category"
            value={editRepo ? editRepo.category : newRepo.category}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, category: e.target.value }) : setNewRepo({ ...newRepo, category: e.target.value })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <div className="md:col-span-2">
            {((editRepo ? editRepo.stack : newRepo.stack) || []).map((stack, index) => (
              <Input
                key={index}
                placeholder={`Stack ${index + 1}`}
                value={stack}
                onChange={(e) => handleStackChange(index, e.target.value)}
                className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg mb-2 focus:border-cosmic-constellation"
              />
            ))}
            <Button type="button" onClick={addStackField} variant="outline" className="w-full text-cosmic-star border-cosmic-constellation/20 py-2 rounded-lg hover:bg-cosmic-constellation/10">
              <Plus className="w-5 h-5 mr-2" /> Add Stack
            </Button>
          </div>
          <Input
            type="number"
            placeholder="Stars"
            value={editRepo ? editRepo.stars : newRepo.stars}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, stars: parseInt(e.target.value) }) : setNewRepo({ ...newRepo, stars: parseInt(e.target.value) })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <Input
            type="datetime-local"
            placeholder="Last Updated"
            value={editRepo ? editRepo.lastUpdated.split('T')[0] + 'T' + editRepo.lastUpdated.split('T')[1].split('.')[0] : newRepo.lastUpdated}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, lastUpdated: e.target.value }) : setNewRepo({ ...newRepo, lastUpdated: e.target.value })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <div className="flex items-center">
            <Input
              type="checkbox"
              checked={editRepo ? editRepo.isTopPick : newRepo.isTopPick}
              onChange={(e) => editRepo ? setEditRepo({ ...editRepo, isTopPick: e.target.checked }) : setNewRepo({ ...newRepo, isTopPick: e.target.checked })}
              className="mr-2"
            />
            <span className="text-cosmic-star">Top Pick</span>
          </div>
          <Input
            placeholder="GitHub URL"
            value={editRepo ? editRepo.githubUrl : newRepo.githubUrl}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, githubUrl: e.target.value }) : setNewRepo({ ...newRepo, githubUrl: e.target.value })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <Input
            placeholder="Deep Wiki URL"
            value={editRepo ? editRepo.deepWikiUrl : newRepo.deepWikiUrl}
            onChange={(e) => editRepo ? setEditRepo({ ...editRepo, deepWikiUrl: e.target.value }) : setNewRepo({ ...newRepo, deepWikiUrl: e.target.value })}
            className="w-full bg-cosmic-dark text-cosmic-star border-cosmic-constellation/20 p-3 rounded-lg focus:border-cosmic-constellation"
          />
          <div className="md:col-span-2 flex gap-4">
            <Button type="submit" className="flex-1 bg-cosmic-constellation text-white py-3 rounded-lg hover:bg-cosmic-constellation/80">
              {editRepo ? 'Update Repo' : 'Create Repo'}
            </Button>
            {editRepo && (
              <Button type="button" onClick={() => setEditRepo(null)} variant="outline" className="flex-1 text-cosmic-star border-cosmic-constellation/20 py-3 rounded-lg hover:bg-cosmic-constellation/10">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Search & Filters */}
      <div className="mb-10 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cosmic-constellation w-6 h-6" />
          <Input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 w-full h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star text-lg rounded-xl focus:border-cosmic-constellation"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star text-lg rounded-xl">
            <Filter className="w-6 h-6 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-cosmic-nebula border-cosmic-constellation/20 rounded-xl">
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-lg">
                {category === 'All' ? '🌟 All Categories' : `📂 ${category}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-14 bg-cosmic-nebula border-cosmic-constellation/20 text-cosmic-star text-lg rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-cosmic-nebula border-cosmic-constellation/20 rounded-xl">
            <SelectItem value="stars" className="text-lg">⭐ Most Stars</SelectItem>
            <SelectItem value="updated" className="text-lg">🕒 Recently Updated</SelectItem>
            <SelectItem value="name" className="text-lg">📝 Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Repo List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <div key={repo._id} className="bg-cosmic-nebula p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl text-cosmic-star font-semibold mb-2">{repo.name}</h3>
                  <p className="text-cosmic-star/70 mb-2">{repo.tagline}</p>
                  <p className="text-cosmic-star/70">Category: {repo.category}</p>
                  <p className="text-cosmic-star/70">Stack: {repo.stack.join(', ')}</p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setEditRepo(repo)} variant="outline" className="text-cosmic-star border-cosmic-constellation/20 py-2 px-4 rounded-lg hover:bg-cosmic-constellation/10">
                    <Edit className="w-5 h-5 mr-2" /> Edit
                  </Button>
                  <Button onClick={() => handleDeleteRepo(repo._id)} variant="outline" className="text-red-500 border-red-500 py-2 px-4 rounded-lg hover:bg-red-500/10">
                    <Trash className="w-5 h-5 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-cosmic-nebula p-6 rounded-xl">
            <p className="text-cosmic-star/70 text-lg">No repositories found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
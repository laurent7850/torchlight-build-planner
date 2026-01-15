import React, { useState } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { BuildCard } from '../components/BuildCard';
import { useBuildStore } from '../store/buildStore';
import { heroes } from '../data/heroes';

export const BuildsPage: React.FC = () => {
  const { savedBuilds } = useBuildStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHero, setSelectedHero] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'name'>('newest');

  // Get public builds
  const publicBuilds = savedBuilds.filter(b => b.isPublic);

  // Filter builds
  const filteredBuilds = publicBuilds.filter(build => {
    const matchesSearch =
      build.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      build.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      build.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHero = !selectedHero || build.heroId === selectedHero;

    return matchesSearch && matchesHero;
  });

  // Sort builds
  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Community Builds</h1>
          <p className="text-sm text-gray-400 mt-1">
            Explore builds created by the community
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search builds..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Hero Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedHero}
                onChange={e => setSelectedHero(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 cursor-pointer min-w-[160px]"
              >
                <option value="">All Heroes</option>
                {heroes.map(hero => (
                  <option key={hero.id} value={hero.id}>
                    {hero.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 cursor-pointer min-w-[140px]"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-400 mb-4">
          {sortedBuilds.length} build{sortedBuilds.length !== 1 ? 's' : ''} found
        </p>

        {/* Builds Grid */}
        {sortedBuilds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBuilds.map(build => (
              <BuildCard key={build.id} build={build} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-700">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No builds found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {publicBuilds.length === 0
                ? 'There are no public builds yet. Be the first to share your build!'
                : 'Try adjusting your search or filters to find what you\'re looking for.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FolderOpen, AlertCircle } from 'lucide-react';
import { BuildCard } from '../components/BuildCard';
import { useBuildStore } from '../store/buildStore';
import { useAuthStore } from '../store/authStore';

export const MyBuildsPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedBuilds, deleteBuild, duplicateBuild, loadBuild, clearCurrentBuild } = useBuildStore();
  const { user, isAuthenticated } = useAuthStore();

  const userBuilds = isAuthenticated && user
    ? savedBuilds.filter(b => b.authorId === user.id)
    : savedBuilds;

  const handleEdit = (buildId: string) => {
    loadBuild(buildId);
    navigate(`/edit/${buildId}`);
  };

  const handleDelete = (buildId: string) => {
    if (window.confirm('Are you sure you want to delete this build?')) {
      deleteBuild(buildId);
    }
  };

  const handleDuplicate = (buildId: string) => {
    duplicateBuild(buildId);
    navigate('/create');
  };

  const handleCreateNew = () => {
    clearCurrentBuild();
    navigate('/create');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Builds</h1>
            <p className="text-sm text-gray-400 mt-1">
              {userBuilds.length} build{userBuilds.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all shadow-lg shadow-orange-500/30"
          >
            <Plus className="w-5 h-5" />
            New Build
          </button>
        </div>

        {/* Login Prompt for non-authenticated users */}
        {!isAuthenticated && (
          <div className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl mb-6">
            <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-orange-300 font-medium">You're browsing as a guest</p>
              <p className="text-sm text-orange-400/80">
                Sign in to save your builds permanently and share them with the community.
              </p>
            </div>
            <Link
              to="/login"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Builds Grid */}
        {userBuilds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBuilds.map(build => (
              <BuildCard
                key={build.id}
                build={build}
                showActions
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-700">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No builds yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Start creating your first Torchlight Infinite build and plan your perfect character.
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all shadow-lg shadow-orange-500/30"
            >
              <Plus className="w-5 h-5" />
              Create Your First Build
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

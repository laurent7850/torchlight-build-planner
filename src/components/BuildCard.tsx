import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Calendar, User, Copy, Trash2, Edit } from 'lucide-react';
import { Build } from '../types';
import { getHeroById, getTraitById } from '../data/heroes';

interface BuildCardProps {
  build: Build;
  showActions?: boolean;
  onDelete?: (buildId: string) => void;
  onDuplicate?: (buildId: string) => void;
}

export const BuildCard: React.FC<BuildCardProps> = ({
  build,
  showActions = false,
  onDelete,
  onDuplicate,
}) => {
  const hero = getHeroById(build.heroId);
  const trait = build.traitId ? getTraitById(build.traitId) : null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all group">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <Link
              to={`/build/${build.id}`}
              className="text-lg font-bold text-white hover:text-orange-400 transition-colors line-clamp-1"
            >
              {build.name}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              {hero && (
                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                  {hero.name}
                </span>
              )}
              {trait && (
                <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded text-xs text-orange-300">
                  {trait.name}
                </span>
              )}
            </div>
          </div>
          {build.isPublic && (
            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
              Public
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-sm text-gray-400 line-clamp-2">
          {build.description || 'No description provided.'}
        </p>

        {/* Tags */}
        {build.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {build.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-700 rounded text-xs text-gray-400"
              >
                #{tag}
              </span>
            ))}
            {build.tags.length > 4 && (
              <span className="text-xs text-gray-500">+{build.tags.length - 4} more</span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>{build.authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(build.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{build.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            <span>{build.likes}</span>
          </div>
        </div>

        {/* Build Summary */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-lg font-bold text-white">{build.skills.length}</p>
            <p className="text-xs text-gray-500">Skills</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{build.talents.length}</p>
            <p className="text-xs text-gray-500">Talents</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">
              {Object.keys(build.equipment).length}
            </p>
            <p className="text-xs text-gray-500">Gear</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="px-4 pb-4 flex gap-2">
          <Link
            to={`/edit/${build.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300 hover:bg-purple-500/30 transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => onDuplicate?.(build.id)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300 hover:bg-blue-500/30 transition-all"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(build.id)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300 hover:bg-red-500/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

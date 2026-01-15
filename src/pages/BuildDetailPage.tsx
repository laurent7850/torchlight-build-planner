import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Eye,
  Calendar,
  User,
  Share2,
  Copy,
  Edit,
  Zap,
  Shield,
  Swords,
} from 'lucide-react';
import { useBuildStore } from '../store/buildStore';
import { useAuthStore } from '../store/authStore';
import { getHeroById, getTraitById } from '../data/heroes';
import { skills } from '../data/skills';
import { equipmentSlots } from '../data/equipment';

export const BuildDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedBuilds, loadBuild, duplicateBuild } = useBuildStore();
  const { user, isAuthenticated } = useAuthStore();

  const build = savedBuilds.find(b => b.id === id);

  if (!build) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Build Not Found</h2>
          <p className="text-gray-400 mb-6">This build doesn't exist or has been deleted.</p>
          <Link
            to="/builds"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Builds
          </Link>
        </div>
      </div>
    );
  }

  const hero = getHeroById(build.heroId);
  const trait = build.traitId ? getTraitById(build.traitId) : null;
  const isOwner = isAuthenticated && user?.id === build.authorId;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could show a toast notification here
  };

  const handleDuplicate = () => {
    duplicateBuild(build.id);
    navigate('/create');
  };

  const handleEdit = () => {
    loadBuild(build.id);
    navigate(`/edit/${build.id}`);
  };

  const getSkillById = (skillId: string) => skills.find(s => s.id === skillId);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/builds"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Builds
        </Link>

        {/* Header */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {hero && (
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
                    {hero.name}
                  </span>
                )}
                {trait && (
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-sm text-orange-300">
                    {trait.name}
                  </span>
                )}
                {build.isPublic && (
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-400">
                    Public
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">{build.name}</h1>

              {build.description && (
                <p className="text-gray-400 max-w-2xl">{build.description}</p>
              )}

              {/* Tags */}
              {build.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {build.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-700 rounded-full text-sm text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{build.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(build.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{build.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{build.likes} likes</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-300 hover:bg-slate-600 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleDuplicate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              {isOwner && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Build Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                Skills ({build.skills.length})
              </h2>

              {build.skills.length > 0 ? (
                <div className="space-y-4">
                  {build.skills.map((link, index) => {
                    const mainSkill = getSkillById(link.mainSkill);
                    if (!mainSkill) return null;

                    return (
                      <div
                        key={index}
                        className="bg-slate-800/50 rounded-xl border border-slate-700 p-4"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{mainSkill.name}</h4>
                            <p className="text-xs text-gray-400">{mainSkill.description}</p>
                          </div>
                        </div>

                        {link.supportSkills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {link.supportSkills.map(supportId => {
                              const support = getSkillById(supportId);
                              return support ? (
                                <span
                                  key={supportId}
                                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-sm text-purple-300"
                                >
                                  {support.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills configured</p>
              )}
            </div>

            {/* Guide */}
            {build.guide && (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Build Guide</h2>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{build.guide}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Hero & Equipment */}
          <div className="space-y-6">
            {/* Hero */}
            {hero && (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <Swords className="w-5 h-5 text-orange-400" />
                  Hero
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-2xl">
                      {hero.class === 'Berserker' && '⚔️'}
                      {hero.class === 'Divineshot' && '🏹'}
                      {hero.class === 'Frostfire' && '🔥'}
                      {hero.class === 'Commander' && '🤖'}
                      {hero.class === 'Assassin' && '🗡️'}
                      {!['Berserker', 'Divineshot', 'Frostfire', 'Commander', 'Assassin'].includes(hero.class) && '✨'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{hero.name}</h3>
                    <p className="text-sm text-purple-400">{hero.class}</p>
                    {trait && <p className="text-sm text-orange-400">{trait.name}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Equipment */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-400" />
                Equipment
              </h2>

              {Object.keys(build.equipment).length > 0 ? (
                <div className="space-y-2">
                  {equipmentSlots.map(slot => {
                    const item = build.equipment[slot.id];
                    if (!item) return null;

                    return (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                      >
                        <span className="text-sm text-gray-400">{slot.name}</span>
                        <span className="text-sm text-white font-medium">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">No equipment configured</p>
              )}
            </div>

            {/* Stats Summary */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Build Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-orange-400">{build.skills.length}</p>
                  <p className="text-xs text-gray-400">Skills</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-400">
                    {build.skills.reduce((acc, s) => acc + s.supportSkills.length, 0)}
                  </p>
                  <p className="text-xs text-gray-400">Supports</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-400">
                    {Object.keys(build.equipment).length}
                  </p>
                  <p className="text-xs text-gray-400">Gear Pieces</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-green-400">{build.talents.length}</p>
                  <p className="text-xs text-gray-400">Talents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, X, Search, Zap, Shield, Crosshair, Flame, Snowflake, Wind } from 'lucide-react';
import { skills, getActiveSkills, getSupportSkills } from '../data/skills';
import { Skill, SkillLink } from '../types';

interface SkillBuilderProps {
  skillLinks: SkillLink[];
  onAddSkillLink: (skillLink: SkillLink) => void;
  onRemoveSkillLink: (index: number) => void;
  onUpdateSkillLink: (index: number, skillLink: SkillLink) => void;
}

const skillTypeIcons: Record<string, React.ElementType> = {
  melee: Crosshair,
  ranged: Crosshair,
  spell: Zap,
  minion: Shield,
  fire: Flame,
  cold: Snowflake,
  lightning: Wind,
};

const getSkillIcon = (skill: Skill): React.ElementType => {
  for (const tag of skill.tags) {
    if (skillTypeIcons[tag]) {
      return skillTypeIcons[tag];
    }
  }
  return Zap;
};

const getSkillColor = (skill: Skill): string => {
  if (skill.tags.includes('fire')) return 'from-orange-500 to-red-500';
  if (skill.tags.includes('cold')) return 'from-blue-400 to-cyan-500';
  if (skill.tags.includes('lightning')) return 'from-yellow-400 to-amber-500';
  if (skill.tags.includes('physical')) return 'from-gray-400 to-slate-500';
  if (skill.tags.includes('minion')) return 'from-green-500 to-emerald-500';
  return 'from-purple-500 to-pink-500';
};

export const SkillBuilder: React.FC<SkillBuilderProps> = ({
  skillLinks,
  onAddSkillLink,
  onRemoveSkillLink,
  onUpdateSkillLink,
}) => {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainSkill, setSelectedMainSkill] = useState<string | null>(null);
  const [selectedSupports, setSelectedSupports] = useState<string[]>([]);

  const activeSkills = getActiveSkills();
  const supportSkills = getSupportSkills();

  const filteredActiveSkills = activeSkills.filter(
    s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredSupportSkills = supportSkills.filter(
    s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddNewSkillLink = () => {
    if (!selectedMainSkill) return;

    const newLink: SkillLink = {
      mainSkill: selectedMainSkill,
      supportSkills: selectedSupports,
    };

    if (editingIndex !== null) {
      onUpdateSkillLink(editingIndex, newLink);
    } else {
      onAddSkillLink(newLink);
    }

    resetModal();
  };

  const handleEditSkillLink = (index: number) => {
    const link = skillLinks[index];
    setSelectedMainSkill(link.mainSkill);
    setSelectedSupports([...link.supportSkills]);
    setEditingIndex(index);
    setIsAddingSkill(true);
  };

  const resetModal = () => {
    setIsAddingSkill(false);
    setEditingIndex(null);
    setSearchQuery('');
    setSelectedMainSkill(null);
    setSelectedSupports([]);
  };

  const toggleSupport = (skillId: string) => {
    if (selectedSupports.includes(skillId)) {
      setSelectedSupports(selectedSupports.filter(s => s !== skillId));
    } else if (selectedSupports.length < 5) {
      setSelectedSupports([...selectedSupports, skillId]);
    }
  };

  const getSkillById = (id: string): Skill | undefined => skills.find(s => s.id === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Skill Links ({skillLinks.length}/6)
        </h3>
        <button
          onClick={() => setIsAddingSkill(true)}
          disabled={skillLinks.length >= 6}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Skill Links Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillLinks.map((link, index) => {
          const mainSkill = getSkillById(link.mainSkill);
          if (!mainSkill) return null;

          const Icon = getSkillIcon(mainSkill);

          return (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSkillColor(mainSkill)} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{mainSkill.name}</h4>
                    <p className="text-xs text-gray-400">
                      {mainSkill.manaCost && `${mainSkill.manaCost} Mana`}
                      {mainSkill.cooldown && ` | ${mainSkill.cooldown}s CD`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditSkillLink(index)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/30 transition-all"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveSkillLink(index)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Support Skills */}
              <div className="flex flex-wrap gap-2">
                {link.supportSkills.map(supportId => {
                  const support = getSkillById(supportId);
                  if (!support) return null;

                  return (
                    <span
                      key={supportId}
                      className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300"
                    >
                      {support.name}
                    </span>
                  );
                })}
                {link.supportSkills.length === 0 && (
                  <span className="text-xs text-gray-500 italic">No support skills linked</span>
                )}
              </div>
            </div>
          );
        })}

        {skillLinks.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-slate-600">
            <Zap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No skills added yet</p>
            <p className="text-sm text-gray-500">Click "Add Skill" to start building your skill setup</p>
          </div>
        )}
      </div>

      {/* Add/Edit Skill Modal */}
      {isAddingSkill && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {editingIndex !== null ? 'Edit Skill Link' : 'Add New Skill Link'}
              </h3>
              <button
                onClick={resetModal}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Main Skill Selection */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-white mb-3">1. Select Main Skill</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                  {filteredActiveSkills.map(skill => {
                    const Icon = getSkillIcon(skill);
                    const isSelected = selectedMainSkill === skill.id;

                    return (
                      <button
                        key={skill.id}
                        onClick={() => setSelectedMainSkill(skill.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500/20'
                            : 'border-slate-600 bg-slate-800 hover:border-purple-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded bg-gradient-to-br ${getSkillColor(skill)} flex items-center justify-center`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-white truncate">
                            {skill.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Support Skill Selection */}
              {selectedMainSkill && (
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">
                    2. Select Support Skills ({selectedSupports.length}/5)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {filteredSupportSkills.map(skill => {
                      const isSelected = selectedSupports.includes(skill.id);
                      const isDisabled = !isSelected && selectedSupports.length >= 5;

                      return (
                        <button
                          key={skill.id}
                          onClick={() => toggleSupport(skill.id)}
                          disabled={isDisabled}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? 'border-purple-500 bg-purple-500/20'
                              : isDisabled
                              ? 'border-slate-700 bg-slate-800/50 opacity-50 cursor-not-allowed'
                              : 'border-slate-600 bg-slate-800 hover:border-purple-500'
                          }`}
                        >
                          <span className="text-sm font-medium text-white">{skill.name}</span>
                          <p className="text-xs text-gray-400 truncate">{skill.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-700 flex justify-end gap-3">
              <button
                onClick={resetModal}
                className="px-6 py-2 rounded-lg text-gray-300 hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewSkillLink}
                disabled={!selectedMainSkill}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingIndex !== null ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

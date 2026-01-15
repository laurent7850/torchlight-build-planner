import React, { useState } from 'react';
import { ChevronRight, Swords, Target, Sparkles, Cog, Ghost, Shield } from 'lucide-react';
import { heroes, getHeroTraits } from '../data/heroes';
import { Hero, HeroTrait, TalentArchetype } from '../types';

interface HeroSelectorProps {
  selectedHeroId: string | undefined;
  selectedTraitId: string | undefined;
  onHeroSelect: (heroId: string) => void;
  onTraitSelect: (traitId: string) => void;
}

const archetypeIcons: Record<TalentArchetype, React.ElementType> = {
  god_of_might: Shield,
  goddess_of_hunting: Target,
  goddess_of_knowledge: Sparkles,
  god_of_war: Swords,
  goddess_of_trickery: Ghost,
  god_of_machines: Cog,
};

const archetypeColors: Record<TalentArchetype, string> = {
  god_of_might: 'from-red-500 to-orange-500',
  goddess_of_hunting: 'from-green-500 to-emerald-500',
  goddess_of_knowledge: 'from-blue-500 to-cyan-500',
  god_of_war: 'from-red-600 to-red-800',
  goddess_of_trickery: 'from-purple-500 to-pink-500',
  god_of_machines: 'from-gray-500 to-slate-600',
};

const archetypeNames: Record<TalentArchetype, string> = {
  god_of_might: 'God of Might',
  goddess_of_hunting: 'Goddess of Hunting',
  goddess_of_knowledge: 'Goddess of Knowledge',
  god_of_war: 'God of War',
  goddess_of_trickery: 'Goddess of Trickery',
  god_of_machines: 'God of Machines',
};

export const HeroSelector: React.FC<HeroSelectorProps> = ({
  selectedHeroId,
  selectedTraitId,
  onHeroSelect,
  onTraitSelect,
}) => {
  const [hoveredHero, setHoveredHero] = useState<string | null>(null);

  const selectedHero = heroes.find(h => h.id === selectedHeroId);
  const heroTraits = selectedHeroId ? getHeroTraits(selectedHeroId) : [];

  return (
    <div className="space-y-6">
      {/* Hero Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Swords className="w-5 h-5 text-orange-400" />
          Select Your Hero
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {heroes.map(hero => {
            const Icon = archetypeIcons[hero.archetype];
            const isSelected = selectedHeroId === hero.id;
            const isHovered = hoveredHero === hero.id;

            return (
              <button
                key={hero.id}
                onClick={() => onHeroSelect(hero.id)}
                onMouseEnter={() => setHoveredHero(hero.id)}
                onMouseLeave={() => setHoveredHero(null)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/20 shadow-lg shadow-orange-500/30'
                    : 'border-slate-600 bg-slate-800/50 hover:border-purple-500 hover:bg-purple-500/10'
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${archetypeColors[hero.archetype]} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-white text-center">{hero.name}</h4>
                <p className="text-xs text-gray-400 text-center">{hero.class}</p>

                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Details & Trait Selection */}
      {selectedHero && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${archetypeColors[selectedHero.archetype]} flex items-center justify-center shadow-lg`}
            >
              {React.createElement(archetypeIcons[selectedHero.archetype], {
                className: 'w-8 h-8 text-white',
              })}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{selectedHero.name}</h3>
              <p className="text-sm text-purple-400">{selectedHero.class}</p>
              <p className="text-xs text-gray-400 mt-1">
                {archetypeNames[selectedHero.archetype]}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-6">{selectedHero.description}</p>

          {/* Trait Selection */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Select Hero Trait</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {heroTraits.map(trait => {
                const isSelected = selectedTraitId === trait.id;

                return (
                  <button
                    key={trait.id}
                    onClick={() => onTraitSelect(trait.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/20'
                        : 'border-slate-600 bg-slate-700/50 hover:border-purple-500 hover:bg-purple-500/10'
                    }`}
                  >
                    <h5 className="font-semibold text-white text-sm">{trait.name}</h5>
                    <p className="text-xs text-gray-400 mt-1">{trait.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

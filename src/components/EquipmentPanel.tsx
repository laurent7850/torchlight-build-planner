import React, { useState } from 'react';
import {
  HardHat,
  Shirt,
  Hand,
  Footprints,
  Sword,
  Shield,
  Gem,
  Circle,
  Minus,
  Sparkles,
  Cog,
  X,
  Search,
} from 'lucide-react';
import { equipmentSlots, getEquipmentBySlot } from '../data/equipment';
import { Equipment, EquipmentSlot } from '../types';

interface EquipmentPanelProps {
  equipment: { [slot in EquipmentSlot]?: Equipment };
  onEquipmentChange: (slot: EquipmentSlot, equipment: Equipment | undefined) => void;
}

const slotIcons: Record<EquipmentSlot, React.ElementType> = {
  helmet: HardHat,
  chest: Shirt,
  gloves: Hand,
  boots: Footprints,
  main_hand: Sword,
  off_hand: Shield,
  amulet: Gem,
  ring1: Circle,
  ring2: Circle,
  belt: Minus,
  spirit_ring: Sparkles,
  vorax_limb: Cog,
};

const rarityColors: Record<string, string> = {
  normal: 'border-gray-500 bg-gray-500/10',
  magic: 'border-blue-500 bg-blue-500/10',
  rare: 'border-yellow-500 bg-yellow-500/10',
  legendary: 'border-orange-500 bg-orange-500/10',
  unique: 'border-purple-500 bg-purple-500/10',
};

const rarityTextColors: Record<string, string> = {
  normal: 'text-gray-300',
  magic: 'text-blue-400',
  rare: 'text-yellow-400',
  legendary: 'text-orange-400',
  unique: 'text-purple-400',
};

export const EquipmentPanel: React.FC<EquipmentPanelProps> = ({
  equipment,
  onEquipmentChange,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const availableEquipment = selectedSlot ? getEquipmentBySlot(selectedSlot) : [];

  const filteredEquipment = availableEquipment.filter(
    e =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.baseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEquipment = (item: Equipment) => {
    if (selectedSlot) {
      onEquipmentChange(selectedSlot, item);
      setSelectedSlot(null);
      setSearchQuery('');
    }
  };

  const handleRemoveEquipment = (slot: EquipmentSlot, e: React.MouseEvent) => {
    e.stopPropagation();
    onEquipmentChange(slot, undefined);
  };

  // Character paper doll layout
  const leftSlots: EquipmentSlot[] = ['helmet', 'amulet', 'chest', 'belt', 'boots'];
  const rightSlots: EquipmentSlot[] = ['main_hand', 'off_hand', 'gloves', 'ring1', 'ring2'];
  const bottomSlots: EquipmentSlot[] = ['spirit_ring', 'vorax_limb'];

  const renderEquipmentSlot = (slotId: EquipmentSlot) => {
    const slotInfo = equipmentSlots.find(s => s.id === slotId);
    const equippedItem = equipment[slotId];
    const Icon = slotIcons[slotId];

    return (
      <button
        key={slotId}
        onClick={() => setSelectedSlot(slotId)}
        className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
          equippedItem
            ? rarityColors[equippedItem.rarity]
            : 'border-slate-600 bg-slate-800/50 hover:border-purple-500'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              equippedItem ? 'bg-slate-900/50' : 'bg-slate-700/50'
            }`}
          >
            <Icon
              className={`w-6 h-6 ${equippedItem ? rarityTextColors[equippedItem.rarity] : 'text-gray-500'}`}
            />
          </div>
          <div className="text-center">
            {equippedItem ? (
              <>
                <p className={`text-xs font-medium ${rarityTextColors[equippedItem.rarity]} truncate max-w-20`}>
                  {equippedItem.name}
                </p>
              </>
            ) : (
              <p className="text-xs text-gray-500">{slotInfo?.name}</p>
            )}
          </div>
        </div>

        {equippedItem && (
          <button
            onClick={e => handleRemoveEquipment(slotId, e)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-400" />
        Equipment
      </h3>

      {/* Paper Doll Layout */}
      <div className="bg-slate-800/30 rounded-2xl border border-slate-700 p-6">
        <div className="flex justify-center gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {leftSlots.map(slot => renderEquipmentSlot(slot))}
          </div>

          {/* Character Silhouette */}
          <div className="flex items-center justify-center">
            <div className="w-32 h-48 bg-gradient-to-b from-purple-500/20 to-transparent rounded-full border-2 border-dashed border-purple-500/30 flex items-center justify-center">
              <span className="text-4xl opacity-50">🧙</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {rightSlots.map(slot => renderEquipmentSlot(slot))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center gap-3 mt-4">
          {bottomSlots.map(slot => renderEquipmentSlot(slot))}
        </div>
      </div>

      {/* Equipment Stats Summary */}
      {Object.keys(equipment).length > 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
          <h4 className="text-sm font-semibold text-white mb-3">Equipment Stats</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {Object.values(equipment)
              .filter(Boolean)
              .flatMap(item => item!.stats)
              .reduce((acc, stat) => {
                const existing = acc.find(s => s.stat === stat.stat && s.type === stat.type);
                if (existing) {
                  existing.value += stat.value;
                } else {
                  acc.push({ ...stat });
                }
                return acc;
              }, [] as { stat: string; value: number; type: string }[])
              .map((stat, i) => (
                <div key={i} className="flex justify-between bg-slate-700/30 rounded px-2 py-1">
                  <span className="text-gray-400 capitalize">{stat.stat.replace(/_/g, ' ')}</span>
                  <span className="text-green-400">
                    +{stat.value}
                    {stat.type === 'percent' && '%'}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Equipment Selection Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Select {equipmentSlots.find(s => s.id === selectedSlot)?.name}
              </h3>
              <button
                onClick={() => {
                  setSelectedSlot(null);
                  setSearchQuery('');
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Equipment List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredEquipment.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectEquipment(item)}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${rarityColors[item.rarity]}`}
                  >
                    <h4 className={`font-semibold ${rarityTextColors[item.rarity]}`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2">{item.baseType}</p>
                    <div className="space-y-1">
                      {item.stats.map((stat, i) => (
                        <p key={i} className="text-xs text-green-400">
                          +{stat.value}
                          {stat.type === 'percent' && '%'}{' '}
                          {stat.stat.replace(/_/g, ' ')}
                        </p>
                      ))}
                    </div>
                    {item.requirements && (
                      <p className="text-xs text-yellow-500 mt-2">
                        Requires: Level {item.requirements.level}
                        {item.requirements.strength && `, ${item.requirements.strength} Str`}
                        {item.requirements.dexterity && `, ${item.requirements.dexterity} Dex`}
                        {item.requirements.intelligence && `, ${item.requirements.intelligence} Int`}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

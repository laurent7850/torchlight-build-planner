import { Equipment, EquipmentSlot } from '../types';

export const equipmentSlots: { id: EquipmentSlot; name: string; icon: string }[] = [
  { id: 'helmet', name: 'Helmet', icon: 'hard-hat' },
  { id: 'chest', name: 'Chest Armor', icon: 'shirt' },
  { id: 'gloves', name: 'Gloves', icon: 'hand' },
  { id: 'boots', name: 'Boots', icon: 'footprints' },
  { id: 'main_hand', name: 'Main Hand', icon: 'sword' },
  { id: 'off_hand', name: 'Off Hand', icon: 'shield' },
  { id: 'amulet', name: 'Amulet', icon: 'gem' },
  { id: 'ring1', name: 'Ring 1', icon: 'circle' },
  { id: 'ring2', name: 'Ring 2', icon: 'circle' },
  { id: 'belt', name: 'Belt', icon: 'minus' },
  { id: 'spirit_ring', name: 'Spirit Ring', icon: 'sparkles' },
  { id: 'vorax_limb', name: 'Vorax Limb', icon: 'cog' },
];

export const baseEquipment: Equipment[] = [
  // Helmets
  {
    id: 'iron-helmet',
    name: 'Iron Helmet',
    slot: 'helmet',
    rarity: 'normal',
    baseType: 'Iron Helmet',
    stats: [{ stat: 'armor', value: 50, type: 'flat' }],
  },
  {
    id: 'steel-helmet',
    name: 'Steel Helmet',
    slot: 'helmet',
    rarity: 'normal',
    baseType: 'Steel Helmet',
    stats: [{ stat: 'armor', value: 80, type: 'flat' }],
    requirements: { level: 20 },
  },
  {
    id: 'mage-hood',
    name: 'Mage Hood',
    slot: 'helmet',
    rarity: 'normal',
    baseType: 'Cloth Hood',
    stats: [
      { stat: 'energy_shield', value: 40, type: 'flat' },
      { stat: 'mana', value: 20, type: 'flat' },
    ],
  },

  // Chest Armor
  {
    id: 'iron-plate',
    name: 'Iron Plate',
    slot: 'chest',
    rarity: 'normal',
    baseType: 'Iron Plate',
    stats: [{ stat: 'armor', value: 100, type: 'flat' }],
  },
  {
    id: 'steel-plate',
    name: 'Steel Plate',
    slot: 'chest',
    rarity: 'normal',
    baseType: 'Steel Plate',
    stats: [{ stat: 'armor', value: 180, type: 'flat' }],
    requirements: { level: 30, strength: 80 },
  },
  {
    id: 'leather-vest',
    name: 'Leather Vest',
    slot: 'chest',
    rarity: 'normal',
    baseType: 'Leather Vest',
    stats: [
      { stat: 'armor', value: 60, type: 'flat' },
      { stat: 'evasion', value: 40, type: 'flat' },
    ],
  },
  {
    id: 'mage-robe',
    name: 'Mage Robe',
    slot: 'chest',
    rarity: 'normal',
    baseType: 'Silk Robe',
    stats: [
      { stat: 'energy_shield', value: 80, type: 'flat' },
      { stat: 'mana', value: 40, type: 'flat' },
    ],
  },

  // Gloves
  {
    id: 'iron-gauntlets',
    name: 'Iron Gauntlets',
    slot: 'gloves',
    rarity: 'normal',
    baseType: 'Iron Gauntlets',
    stats: [{ stat: 'armor', value: 30, type: 'flat' }],
  },
  {
    id: 'leather-gloves',
    name: 'Leather Gloves',
    slot: 'gloves',
    rarity: 'normal',
    baseType: 'Leather Gloves',
    stats: [
      { stat: 'armor', value: 20, type: 'flat' },
      { stat: 'attack_speed', value: 5, type: 'percent' },
    ],
  },

  // Boots
  {
    id: 'iron-boots',
    name: 'Iron Boots',
    slot: 'boots',
    rarity: 'normal',
    baseType: 'Iron Boots',
    stats: [
      { stat: 'armor', value: 40, type: 'flat' },
      { stat: 'movement_speed', value: 10, type: 'percent' },
    ],
  },
  {
    id: 'leather-boots',
    name: 'Leather Boots',
    slot: 'boots',
    rarity: 'normal',
    baseType: 'Leather Boots',
    stats: [
      { stat: 'armor', value: 25, type: 'flat' },
      { stat: 'movement_speed', value: 20, type: 'percent' },
    ],
  },

  // One-Handed Weapons
  {
    id: 'iron-sword',
    name: 'Iron Sword',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Iron Sword',
    stats: [
      { stat: 'physical_damage', value: 25, type: 'flat' },
      { stat: 'attack_speed', value: 1.4, type: 'flat' },
    ],
  },
  {
    id: 'steel-sword',
    name: 'Steel Sword',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Steel Sword',
    stats: [
      { stat: 'physical_damage', value: 45, type: 'flat' },
      { stat: 'attack_speed', value: 1.5, type: 'flat' },
    ],
    requirements: { level: 25, strength: 50 },
  },
  {
    id: 'iron-axe',
    name: 'Iron Axe',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Iron Axe',
    stats: [
      { stat: 'physical_damage', value: 35, type: 'flat' },
      { stat: 'attack_speed', value: 1.2, type: 'flat' },
    ],
  },
  {
    id: 'mage-wand',
    name: 'Mage Wand',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Wooden Wand',
    stats: [
      { stat: 'spell_damage', value: 20, type: 'percent' },
      { stat: 'mana', value: 30, type: 'flat' },
    ],
  },
  {
    id: 'crystal-wand',
    name: 'Crystal Wand',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Crystal Wand',
    stats: [
      { stat: 'spell_damage', value: 35, type: 'percent' },
      { stat: 'critical_chance', value: 8, type: 'flat' },
    ],
    requirements: { level: 30, intelligence: 80 },
  },

  // Bows
  {
    id: 'short-bow',
    name: 'Short Bow',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Short Bow',
    stats: [
      { stat: 'physical_damage', value: 20, type: 'flat' },
      { stat: 'attack_speed', value: 1.6, type: 'flat' },
    ],
  },
  {
    id: 'long-bow',
    name: 'Long Bow',
    slot: 'main_hand',
    rarity: 'normal',
    baseType: 'Long Bow',
    stats: [
      { stat: 'physical_damage', value: 40, type: 'flat' },
      { stat: 'attack_speed', value: 1.3, type: 'flat' },
    ],
    requirements: { level: 25, dexterity: 60 },
  },

  // Shields
  {
    id: 'iron-shield',
    name: 'Iron Shield',
    slot: 'off_hand',
    rarity: 'normal',
    baseType: 'Iron Shield',
    stats: [
      { stat: 'armor', value: 80, type: 'flat' },
      { stat: 'block_chance', value: 20, type: 'flat' },
    ],
  },
  {
    id: 'tower-shield',
    name: 'Tower Shield',
    slot: 'off_hand',
    rarity: 'normal',
    baseType: 'Tower Shield',
    stats: [
      { stat: 'armor', value: 150, type: 'flat' },
      { stat: 'block_chance', value: 30, type: 'flat' },
    ],
    requirements: { level: 30, strength: 100 },
  },

  // Accessories
  {
    id: 'gold-amulet',
    name: 'Gold Amulet',
    slot: 'amulet',
    rarity: 'normal',
    baseType: 'Gold Amulet',
    stats: [{ stat: 'all_attributes', value: 10, type: 'flat' }],
  },
  {
    id: 'iron-ring',
    name: 'Iron Ring',
    slot: 'ring1',
    rarity: 'normal',
    baseType: 'Iron Ring',
    stats: [{ stat: 'physical_damage', value: 5, type: 'flat' }],
  },
  {
    id: 'gold-ring',
    name: 'Gold Ring',
    slot: 'ring1',
    rarity: 'normal',
    baseType: 'Gold Ring',
    stats: [{ stat: 'elemental_damage', value: 10, type: 'percent' }],
  },
  {
    id: 'leather-belt',
    name: 'Leather Belt',
    slot: 'belt',
    rarity: 'normal',
    baseType: 'Leather Belt',
    stats: [{ stat: 'life', value: 30, type: 'flat' }],
  },
  {
    id: 'heavy-belt',
    name: 'Heavy Belt',
    slot: 'belt',
    rarity: 'normal',
    baseType: 'Heavy Belt',
    stats: [
      { stat: 'life', value: 50, type: 'flat' },
      { stat: 'strength', value: 15, type: 'flat' },
    ],
  },

  // Spirit Ring
  {
    id: 'spirit-ring-basic',
    name: 'Basic Spirit Ring',
    slot: 'spirit_ring',
    rarity: 'normal',
    baseType: 'Spirit Ring',
    stats: [
      { stat: 'spirit_power', value: 20, type: 'flat' },
      { stat: 'mana_regen', value: 5, type: 'percent' },
    ],
  },

  // Vorax Limb
  {
    id: 'vorax-limb-basic',
    name: 'Basic Vorax Limb',
    slot: 'vorax_limb',
    rarity: 'normal',
    baseType: 'Vorax Limb',
    stats: [
      { stat: 'vorax_power', value: 10, type: 'flat' },
      { stat: 'damage', value: 5, type: 'percent' },
    ],
  },
];

// Legendary/Unique Equipment
export const legendaryEquipment: Equipment[] = [
  {
    id: 'crown-of-flames',
    name: 'Crown of Flames',
    slot: 'helmet',
    rarity: 'legendary',
    baseType: 'Royal Crown',
    stats: [
      { stat: 'armor', value: 120, type: 'flat' },
      { stat: 'fire_damage', value: 30, type: 'percent' },
      { stat: 'fire_resistance', value: 40, type: 'flat' },
    ],
    requirements: { level: 50 },
  },
  {
    id: 'frostbite-gauntlets',
    name: 'Frostbite Gauntlets',
    slot: 'gloves',
    rarity: 'legendary',
    baseType: 'Eternal Gauntlets',
    stats: [
      { stat: 'armor', value: 80, type: 'flat' },
      { stat: 'cold_damage', value: 25, type: 'percent' },
      { stat: 'freeze_chance', value: 15, type: 'flat' },
    ],
    requirements: { level: 45 },
  },
  {
    id: 'boots-of-haste',
    name: 'Boots of Haste',
    slot: 'boots',
    rarity: 'legendary',
    baseType: 'Swift Boots',
    stats: [
      { stat: 'armor', value: 60, type: 'flat' },
      { stat: 'movement_speed', value: 35, type: 'percent' },
      { stat: 'attack_speed', value: 15, type: 'percent' },
    ],
    requirements: { level: 40 },
  },
  {
    id: 'sword-of-fury',
    name: 'Sword of Fury',
    slot: 'main_hand',
    rarity: 'legendary',
    baseType: 'Berserker Blade',
    stats: [
      { stat: 'physical_damage', value: 150, type: 'flat' },
      { stat: 'attack_speed', value: 1.8, type: 'flat' },
      { stat: 'critical_chance', value: 10, type: 'flat' },
      { stat: 'life_leech', value: 5, type: 'percent' },
    ],
    requirements: { level: 60, strength: 150 },
  },
];

export const allEquipment = [...baseEquipment, ...legendaryEquipment];

export const getEquipmentById = (id: string): Equipment | undefined => {
  return allEquipment.find(e => e.id === id);
};

export const getEquipmentBySlot = (slot: EquipmentSlot): Equipment[] => {
  return allEquipment.filter(e => e.slot === slot);
};

export const getEquipmentByRarity = (rarity: Equipment['rarity']): Equipment[] => {
  return allEquipment.filter(e => e.rarity === rarity);
};

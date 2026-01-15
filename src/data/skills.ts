import { Skill } from '../types';

export const skills: Skill[] = [
  // Active Skills - Melee
  {
    id: 'whirlwind',
    name: 'Whirlwind',
    type: 'active',
    description: 'Spin rapidly, dealing physical damage to all nearby enemies.',
    tags: ['melee', 'aoe', 'physical', 'channeling'],
    manaCost: 15,
  },
  {
    id: 'leap-slam',
    name: 'Leap Slam',
    type: 'active',
    description: 'Leap through the air and slam down, dealing damage in an area.',
    tags: ['melee', 'aoe', 'physical', 'movement'],
    manaCost: 12,
    cooldown: 2,
  },
  {
    id: 'ground-slam',
    name: 'Ground Slam',
    type: 'active',
    description: 'Slam the ground, creating a shockwave that damages enemies in a cone.',
    tags: ['melee', 'aoe', 'physical'],
    manaCost: 10,
  },
  {
    id: 'cleave',
    name: 'Cleave',
    type: 'active',
    description: 'Swing your weapon in a wide arc, hitting multiple enemies.',
    tags: ['melee', 'aoe', 'physical'],
    manaCost: 8,
  },
  {
    id: 'heavy-strike',
    name: 'Heavy Strike',
    type: 'active',
    description: 'A powerful single-target melee attack with high damage.',
    tags: ['melee', 'single-target', 'physical'],
    manaCost: 6,
  },

  // Active Skills - Ranged
  {
    id: 'arrow-rain',
    name: 'Arrow Rain',
    type: 'active',
    description: 'Fire a volley of arrows into the sky, raining down on enemies.',
    tags: ['ranged', 'aoe', 'physical', 'projectile'],
    manaCost: 20,
    cooldown: 4,
  },
  {
    id: 'piercing-shot',
    name: 'Piercing Shot',
    type: 'active',
    description: 'Fire an arrow that pierces through multiple enemies.',
    tags: ['ranged', 'projectile', 'physical', 'pierce'],
    manaCost: 10,
  },
  {
    id: 'split-arrow',
    name: 'Split Arrow',
    type: 'active',
    description: 'Fire multiple arrows that spread out in a cone.',
    tags: ['ranged', 'aoe', 'physical', 'projectile'],
    manaCost: 12,
  },
  {
    id: 'explosive-arrow',
    name: 'Explosive Arrow',
    type: 'active',
    description: 'Fire an arrow that explodes on impact, dealing area damage.',
    tags: ['ranged', 'aoe', 'fire', 'projectile'],
    manaCost: 15,
  },

  // Active Skills - Fire Magic
  {
    id: 'fireball',
    name: 'Fireball',
    type: 'active',
    description: 'Launch a ball of fire that explodes on impact.',
    tags: ['spell', 'aoe', 'fire', 'projectile'],
    manaCost: 12,
  },
  {
    id: 'flame-burst',
    name: 'Flame Burst',
    type: 'active',
    description: 'Create an explosion of fire around you.',
    tags: ['spell', 'aoe', 'fire'],
    manaCost: 18,
    cooldown: 3,
  },
  {
    id: 'meteor',
    name: 'Meteor',
    type: 'active',
    description: 'Call down a meteor from the sky, dealing massive fire damage.',
    tags: ['spell', 'aoe', 'fire'],
    manaCost: 35,
    cooldown: 8,
  },
  {
    id: 'flame-wave',
    name: 'Flame Wave',
    type: 'active',
    description: 'Send a wave of fire across the ground.',
    tags: ['spell', 'aoe', 'fire'],
    manaCost: 14,
  },

  // Active Skills - Cold Magic
  {
    id: 'ice-bolt',
    name: 'Ice Bolt',
    type: 'active',
    description: 'Fire a bolt of ice that chills enemies.',
    tags: ['spell', 'single-target', 'cold', 'projectile'],
    manaCost: 8,
  },
  {
    id: 'frost-nova',
    name: 'Frost Nova',
    type: 'active',
    description: 'Create an explosion of frost around you, freezing nearby enemies.',
    tags: ['spell', 'aoe', 'cold'],
    manaCost: 20,
    cooldown: 4,
  },
  {
    id: 'blizzard',
    name: 'Blizzard',
    type: 'active',
    description: 'Summon a blizzard that deals cold damage over time.',
    tags: ['spell', 'aoe', 'cold', 'dot'],
    manaCost: 25,
    cooldown: 6,
  },
  {
    id: 'ice-spear',
    name: 'Ice Spear',
    type: 'active',
    description: 'Launch a spear of ice that shatters on impact.',
    tags: ['spell', 'aoe', 'cold', 'projectile'],
    manaCost: 15,
  },

  // Active Skills - Lightning
  {
    id: 'lightning-bolt',
    name: 'Lightning Bolt',
    type: 'active',
    description: 'Strike enemies with a bolt of lightning.',
    tags: ['spell', 'single-target', 'lightning'],
    manaCost: 10,
  },
  {
    id: 'chain-lightning',
    name: 'Chain Lightning',
    type: 'active',
    description: 'Lightning that bounces between multiple enemies.',
    tags: ['spell', 'chain', 'lightning'],
    manaCost: 16,
  },
  {
    id: 'thunder-call',
    name: 'Thunder Call',
    type: 'active',
    description: 'Call down lightning strikes in an area.',
    tags: ['spell', 'aoe', 'lightning'],
    manaCost: 28,
    cooldown: 5,
  },

  // Active Skills - Summoning
  {
    id: 'summon-skeleton',
    name: 'Summon Skeleton',
    type: 'active',
    description: 'Summon skeleton warriors to fight for you.',
    tags: ['minion', 'summon'],
    manaCost: 20,
  },
  {
    id: 'summon-golem',
    name: 'Summon Golem',
    type: 'active',
    description: 'Summon a powerful golem to tank and deal damage.',
    tags: ['minion', 'summon'],
    manaCost: 35,
    cooldown: 30,
  },
  {
    id: 'deploy-turret',
    name: 'Deploy Turret',
    type: 'active',
    description: 'Deploy an automated turret that attacks nearby enemies.',
    tags: ['minion', 'mechanical', 'summon'],
    manaCost: 25,
    cooldown: 10,
  },
  {
    id: 'deploy-drone',
    name: 'Deploy Drone',
    type: 'active',
    description: 'Deploy a drone that follows you and attacks enemies.',
    tags: ['minion', 'mechanical', 'summon'],
    manaCost: 18,
  },

  // Active Skills - Movement/Utility
  {
    id: 'dash',
    name: 'Dash',
    type: 'active',
    description: 'Quickly dash in a direction, passing through enemies.',
    tags: ['movement', 'utility'],
    manaCost: 5,
    cooldown: 3,
  },
  {
    id: 'blink',
    name: 'Blink',
    type: 'active',
    description: 'Teleport to a target location.',
    tags: ['movement', 'utility', 'spell'],
    manaCost: 10,
    cooldown: 5,
  },
  {
    id: 'shadow-step',
    name: 'Shadow Step',
    type: 'active',
    description: 'Become invisible briefly and move to a new location.',
    tags: ['movement', 'utility', 'stealth'],
    manaCost: 15,
    cooldown: 8,
  },

  // Support Skills
  {
    id: 'added-fire-damage',
    name: 'Added Fire Damage',
    type: 'support',
    description: 'Adds fire damage to linked skills.',
    tags: ['damage', 'fire'],
  },
  {
    id: 'added-cold-damage',
    name: 'Added Cold Damage',
    type: 'support',
    description: 'Adds cold damage to linked skills.',
    tags: ['damage', 'cold'],
  },
  {
    id: 'added-lightning-damage',
    name: 'Added Lightning Damage',
    type: 'support',
    description: 'Adds lightning damage to linked skills.',
    tags: ['damage', 'lightning'],
  },
  {
    id: 'increased-area',
    name: 'Increased Area of Effect',
    type: 'support',
    description: 'Increases the area of effect of linked skills.',
    tags: ['aoe', 'utility'],
  },
  {
    id: 'faster-casting',
    name: 'Faster Casting',
    type: 'support',
    description: 'Increases the cast speed of linked spells.',
    tags: ['speed', 'spell'],
  },
  {
    id: 'faster-attacks',
    name: 'Faster Attacks',
    type: 'support',
    description: 'Increases the attack speed of linked attacks.',
    tags: ['speed', 'attack'],
  },
  {
    id: 'multiple-projectiles',
    name: 'Multiple Projectiles',
    type: 'support',
    description: 'Linked skills fire additional projectiles.',
    tags: ['projectile'],
  },
  {
    id: 'chain',
    name: 'Chain',
    type: 'support',
    description: 'Linked projectiles chain to additional targets.',
    tags: ['projectile', 'chain'],
  },
  {
    id: 'pierce',
    name: 'Pierce',
    type: 'support',
    description: 'Linked projectiles pierce through enemies.',
    tags: ['projectile', 'pierce'],
  },
  {
    id: 'critical-damage',
    name: 'Critical Damage',
    type: 'support',
    description: 'Increases critical strike damage of linked skills.',
    tags: ['critical', 'damage'],
  },
  {
    id: 'life-leech',
    name: 'Life Leech',
    type: 'support',
    description: 'Linked skills leech life from enemies.',
    tags: ['leech', 'life'],
  },
  {
    id: 'mana-leech',
    name: 'Mana Leech',
    type: 'support',
    description: 'Linked skills leech mana from enemies.',
    tags: ['leech', 'mana'],
  },

  // Passive Skills
  {
    id: 'iron-will',
    name: 'Iron Will',
    type: 'passive',
    description: 'Increases your armor and physical damage reduction.',
    tags: ['defense', 'armor'],
  },
  {
    id: 'blood-rage',
    name: 'Blood Rage',
    type: 'passive',
    description: 'Gain attack speed and life leech, but lose life over time.',
    tags: ['attack', 'leech', 'buff'],
  },
  {
    id: 'aura-of-fire',
    name: 'Aura of Fire',
    type: 'passive',
    description: 'Nearby allies deal additional fire damage.',
    tags: ['aura', 'fire', 'buff'],
  },
  {
    id: 'aura-of-cold',
    name: 'Aura of Cold',
    type: 'passive',
    description: 'Nearby enemies are chilled and take increased cold damage.',
    tags: ['aura', 'cold', 'debuff'],
  },
  {
    id: 'fortify',
    name: 'Fortify',
    type: 'passive',
    description: 'Gain a defensive buff that reduces damage taken.',
    tags: ['defense', 'buff'],
  },
  {
    id: 'elemental-overload',
    name: 'Elemental Overload',
    type: 'passive',
    description: 'Critical strikes grant a large elemental damage bonus.',
    tags: ['critical', 'elemental', 'buff'],
  },

  // Trigger Medium Skills
  {
    id: 'cast-on-crit',
    name: 'Cast on Critical Strike',
    type: 'trigger_medium',
    description: 'Linked spells trigger when you critically strike.',
    tags: ['trigger', 'critical', 'spell'],
  },
  {
    id: 'cast-on-damage',
    name: 'Cast when Damage Taken',
    type: 'trigger_medium',
    description: 'Linked spells trigger when you take a certain amount of damage.',
    tags: ['trigger', 'defense', 'spell'],
  },
  {
    id: 'cast-on-kill',
    name: 'Cast on Kill',
    type: 'trigger_medium',
    description: 'Linked spells trigger when you kill an enemy.',
    tags: ['trigger', 'kill', 'spell'],
  },
];

export const getSkillById = (id: string): Skill | undefined => {
  return skills.find(s => s.id === id);
};

export const getSkillsByType = (type: Skill['type']): Skill[] => {
  return skills.filter(s => s.type === type);
};

export const getActiveSkills = (): Skill[] => getSkillsByType('active');
export const getSupportSkills = (): Skill[] => getSkillsByType('support');
export const getPassiveSkills = (): Skill[] => getSkillsByType('passive');
export const getTriggerSkills = (): Skill[] => getSkillsByType('trigger_medium');

export const searchSkills = (query: string): Skill[] => {
  const lowerQuery = query.toLowerCase();
  return skills.filter(
    s =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
};

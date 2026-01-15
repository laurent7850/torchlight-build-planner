import { Hero, HeroTrait } from '../types';

export const heroTraits: HeroTrait[] = [
  // Rehan traits
  { id: 'rehan-anger', name: 'Anger', description: 'Rage-fueled burst damage with high DPS potential', heroId: 'rehan' },
  { id: 'rehan-seething', name: 'Seething Silhouette', description: 'Shadow-based melee combat with enhanced sustain', heroId: 'rehan' },

  // Carino traits
  { id: 'carino-lethal', name: 'Lethal Flash', description: 'All shots return and deal double damage with Evil Ouroboros', heroId: 'carino' },
  { id: 'carino-ranger', name: 'Ranger of Glory', description: 'Traditional ranged combat with enhanced mobility', heroId: 'carino' },
  { id: 'carino-zealot', name: 'Zealot of War', description: 'Aggressive ranged playstyle with war-themed abilities', heroId: 'carino' },

  // Gemma traits
  { id: 'gemma-icefire', name: 'Ice-Fire Fusion', description: 'Combines frost and fire magic for devastating combos', heroId: 'gemma' },
  { id: 'gemma-flame', name: 'Flame of Pleasure', description: 'Pure fire magic specialization with high burst damage', heroId: 'gemma' },
  { id: 'gemma-frost', name: 'Frost Heart', description: 'Cold-focused spellcaster with crowd control', heroId: 'gemma' },

  // Moto traits
  { id: 'moto-order', name: 'Order Calling', description: 'Summons mechanical minions to fight alongside you', heroId: 'moto' },
  { id: 'moto-charge', name: 'Charge Calling', description: 'Aggressive summoner with offensive tech devices', heroId: 'moto' },

  // Erika traits
  { id: 'erika-lightning', name: 'Lightning Shadow', description: 'Fast-paced lightning-infused assassination', heroId: 'erika' },
  { id: 'erika-blade', name: 'Blade of Destruction', description: 'Melee assassin with devastating critical strikes', heroId: 'erika' },

  // Youga traits
  { id: 'youga-illusion', name: 'Illusion', description: 'Creates shadow clones for AoE damage and control', heroId: 'youga' },
  { id: 'youga-elapse', name: 'Elapse', description: 'Time manipulation for strategic combat advantages', heroId: 'youga' },

  // Thea traits
  { id: 'thea-wisdom', name: 'Wisdom of the Gods', description: 'Divine knowledge granting powerful buffs', heroId: 'thea' },
  { id: 'thea-incarnation', name: 'Incarnation of the Gods', description: 'Channel divine power for devastating attacks', heroId: 'thea' },

  // Iris traits
  { id: 'iris-vigilant', name: 'Vigilant Breeze', description: 'Balanced damage and tankiness with wind abilities', heroId: 'iris' },
  { id: 'iris-storm', name: 'Storm Caller', description: 'Pure wind magic with high mobility', heroId: 'iris' },

  // Bing traits
  { id: 'bing-explosive', name: 'Explosive Expert', description: 'Bomb and explosive-based combat', heroId: 'bing' },
  { id: 'bing-demolition', name: 'Demolition Master', description: 'Massive area destruction capabilities', heroId: 'bing' },

  // Rosa traits
  { id: 'rosa-guardian', name: 'Guardian', description: 'High defense and team support abilities', heroId: 'rosa' },
  { id: 'rosa-protector', name: 'Divine Protector', description: 'Ultimate defensive capabilities with healing', heroId: 'rosa' },

  // Selena traits
  { id: 'selena-bubble', name: 'Bubble Master', description: 'Battlefield control through bubble mechanics', heroId: 'selena' },
  { id: 'selena-ocean', name: 'Ocean Depths', description: 'Water-based magic with drowning effects', heroId: 'selena' },
];

export const heroes: Hero[] = [
  {
    id: 'rehan',
    name: 'Rehan',
    class: 'Berserker',
    archetype: 'god_of_might',
    traits: heroTraits.filter(t => t.heroId === 'rehan'),
    description: 'A powerful melee warrior who excels at close-range combat. Rehan can take massive damage while dealing devastating blows to enemies. His rage-fueled abilities scale with damage taken.',
  },
  {
    id: 'carino',
    name: 'Carino',
    class: 'Divineshot',
    archetype: 'goddess_of_hunting',
    traits: heroTraits.filter(t => t.heroId === 'carino'),
    description: 'A ranged specialist who wields various projectile weapons with deadly precision. Carino relies on mobility and positioning to stay alive while dealing consistent damage from afar.',
  },
  {
    id: 'gemma',
    name: 'Gemma',
    class: 'Frostfire',
    archetype: 'goddess_of_knowledge',
    traits: heroTraits.filter(t => t.heroId === 'gemma'),
    description: 'A mage who commands both fire and frost magic. While not as durable as other heroes, Gemma compensates with incredible mobility and devastating elemental damage.',
  },
  {
    id: 'moto',
    name: 'Moto',
    class: 'Commander',
    archetype: 'god_of_machines',
    traits: heroTraits.filter(t => t.heroId === 'moto'),
    description: 'A technological summoner who commands mechanical devices and drones in battle. Moto can adapt to any situation by switching between offensive and defensive deployables.',
  },
  {
    id: 'erika',
    name: 'Erika',
    class: 'Assassin',
    archetype: 'goddess_of_trickery',
    traits: heroTraits.filter(t => t.heroId === 'erika'),
    description: 'The fastest hero in the game. Erika trades durability for incredible speed and burst damage. Perfect for players who enjoy high-risk, high-reward playstyles.',
  },
  {
    id: 'youga',
    name: 'Youga',
    class: 'Spacetime Witness',
    archetype: 'goddess_of_knowledge',
    traits: heroTraits.filter(t => t.heroId === 'youga'),
    description: 'A master of spacetime manipulation who creates shadow clones and controls the battlefield. Youga excels at AoE damage and crowd control.',
  },
  {
    id: 'thea',
    name: 'Thea',
    class: 'Divine Caster',
    archetype: 'goddess_of_knowledge',
    traits: heroTraits.filter(t => t.heroId === 'thea'),
    description: 'A divine spellcaster who channels the power of the gods. Thea provides powerful buffs and devastating holy magic.',
  },
  {
    id: 'iris',
    name: 'Iris',
    class: 'Wind Walker',
    archetype: 'goddess_of_hunting',
    traits: heroTraits.filter(t => t.heroId === 'iris'),
    description: 'A balanced hero combining wind magic with solid defenses. Iris is great for players who want damage and tankiness without heavy micromanagement.',
  },
  {
    id: 'bing',
    name: 'Bing',
    class: 'Demolisher',
    archetype: 'god_of_war',
    traits: heroTraits.filter(t => t.heroId === 'bing'),
    description: 'An explosive expert with high agility and devastating bomb abilities. Bing excels at clearing large groups of enemies with area damage.',
  },
  {
    id: 'rosa',
    name: 'Rosa',
    class: 'Guardian',
    archetype: 'god_of_might',
    traits: heroTraits.filter(t => t.heroId === 'rosa'),
    description: 'The tankiest hero with high defense and survivability. Rosa is perfect for new players and excels at supporting teammates in co-op.',
  },
  {
    id: 'selena',
    name: 'Selena',
    class: 'Tidecaller',
    archetype: 'goddess_of_trickery',
    traits: heroTraits.filter(t => t.heroId === 'selena'),
    description: 'A water mage who controls the battlefield with bubbles and tidal forces. Selena provides excellent crowd control and zone denial.',
  },
];

export const getHeroById = (id: string): Hero | undefined => {
  return heroes.find(h => h.id === id);
};

export const getTraitById = (id: string): HeroTrait | undefined => {
  return heroTraits.find(t => t.id === id);
};

export const getHeroTraits = (heroId: string): HeroTrait[] => {
  return heroTraits.filter(t => t.heroId === heroId);
};

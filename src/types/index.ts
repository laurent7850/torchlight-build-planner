// Types pour Torchlight Infinite Build Planner

export interface Hero {
  id: string;
  name: string;
  class: string;
  archetype: TalentArchetype;
  traits: HeroTrait[];
  description: string;
  image?: string;
}

export interface HeroTrait {
  id: string;
  name: string;
  description: string;
  heroId: string;
}

export type TalentArchetype =
  | 'god_of_might'
  | 'goddess_of_hunting'
  | 'goddess_of_knowledge'
  | 'god_of_war'
  | 'goddess_of_trickery'
  | 'god_of_machines';

export interface TalentNode {
  id: string;
  name: string;
  description: string;
  archetype: TalentArchetype;
  tier: number;
  position: { x: number; y: number };
  connections: string[];
  stats: StatModifier[];
}

export interface StatModifier {
  stat: string;
  value: number;
  type: 'flat' | 'percent' | 'multiplier';
}

export type SkillType =
  | 'active'
  | 'support'
  | 'passive'
  | 'trigger_medium'
  | 'noble_support'
  | 'magnificent_support';

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  description: string;
  tags: string[];
  manaCost?: number;
  cooldown?: number;
  linkedSkills?: string[];
  image?: string;
}

export interface SkillLink {
  mainSkill: string;
  supportSkills: string[];
}

export type EquipmentSlot =
  | 'helmet'
  | 'chest'
  | 'gloves'
  | 'boots'
  | 'main_hand'
  | 'off_hand'
  | 'amulet'
  | 'ring1'
  | 'ring2'
  | 'belt'
  | 'spirit_ring'
  | 'vorax_limb';

export type EquipmentRarity =
  | 'normal'
  | 'magic'
  | 'rare'
  | 'legendary'
  | 'unique';

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: EquipmentRarity;
  baseType: string;
  stats: StatModifier[];
  requirements?: {
    level?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  affixes?: Affix[];
  image?: string;
}

export interface Affix {
  id: string;
  name: string;
  tier: number;
  stats: StatModifier[];
  type: 'prefix' | 'suffix';
}

export interface Build {
  id: string;
  name: string;
  description: string;
  heroId: string;
  traitId?: string;
  talents: string[];
  skills: SkillLink[];
  equipment: { [slot in EquipmentSlot]?: Equipment };
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  likes: number;
  views: number;
  tags: string[];
  guide?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  builds: string[];
  likedBuilds: string[];
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
  builds: Build[];
  isAuthenticated: boolean;
}

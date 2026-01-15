import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Build, Equipment, EquipmentSlot, SkillLink } from '../types';

interface BuildState {
  // Current build being edited
  currentBuild: Partial<Build> | null;

  // All saved builds (local)
  savedBuilds: Build[];

  // Community builds (would come from API in real app)
  communityBuilds: Build[];

  // Actions
  createNewBuild: () => void;
  setHero: (heroId: string) => void;
  setTrait: (traitId: string) => void;
  setBuildName: (name: string) => void;
  setBuildDescription: (description: string) => void;
  addTalent: (talentId: string) => void;
  removeTalent: (talentId: string) => void;
  addSkillLink: (skillLink: SkillLink) => void;
  removeSkillLink: (index: number) => void;
  updateSkillLink: (index: number, skillLink: SkillLink) => void;
  setEquipment: (slot: EquipmentSlot, equipment: Equipment | undefined) => void;
  saveBuild: (authorId: string, authorName: string) => Build | null;
  loadBuild: (buildId: string) => void;
  deleteBuild: (buildId: string) => void;
  duplicateBuild: (buildId: string) => void;
  clearCurrentBuild: () => void;
  setGuide: (guide: string) => void;
  setTags: (tags: string[]) => void;
  togglePublic: () => void;
}

export const useBuildStore = create<BuildState>()(
  persist(
    (set, get) => ({
      currentBuild: null,
      savedBuilds: [],
      communityBuilds: [],

      createNewBuild: () => {
        set({
          currentBuild: {
            id: uuidv4(),
            name: 'New Build',
            description: '',
            heroId: '',
            traitId: undefined,
            talents: [],
            skills: [],
            equipment: {},
            isPublic: false,
            likes: 0,
            views: 0,
            tags: [],
            guide: '',
          },
        });
      },

      setHero: (heroId: string) => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, heroId, traitId: undefined }
            : null,
        }));
      },

      setTrait: (traitId: string) => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, traitId }
            : null,
        }));
      },

      setBuildName: (name: string) => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, name }
            : null,
        }));
      },

      setBuildDescription: (description: string) => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, description }
            : null,
        }));
      },

      addTalent: (talentId: string) => {
        set(state => {
          if (!state.currentBuild) return state;
          const talents = state.currentBuild.talents || [];
          if (talents.includes(talentId)) return state;
          return {
            currentBuild: {
              ...state.currentBuild,
              talents: [...talents, talentId],
            },
          };
        });
      },

      removeTalent: (talentId: string) => {
        set(state => {
          if (!state.currentBuild) return state;
          const talents = state.currentBuild.talents || [];
          return {
            currentBuild: {
              ...state.currentBuild,
              talents: talents.filter(t => t !== talentId),
            },
          };
        });
      },

      addSkillLink: (skillLink: SkillLink) => {
        set(state => {
          if (!state.currentBuild) return state;
          const skills = state.currentBuild.skills || [];
          return {
            currentBuild: {
              ...state.currentBuild,
              skills: [...skills, skillLink],
            },
          };
        });
      },

      removeSkillLink: (index: number) => {
        set(state => {
          if (!state.currentBuild) return state;
          const skills = state.currentBuild.skills || [];
          return {
            currentBuild: {
              ...state.currentBuild,
              skills: skills.filter((_, i) => i !== index),
            },
          };
        });
      },

      updateSkillLink: (index: number, skillLink: SkillLink) => {
        set(state => {
          if (!state.currentBuild) return state;
          const skills = [...(state.currentBuild.skills || [])];
          skills[index] = skillLink;
          return {
            currentBuild: {
              ...state.currentBuild,
              skills,
            },
          };
        });
      },

      setEquipment: (slot: EquipmentSlot, equipment: Equipment | undefined) => {
        set(state => {
          if (!state.currentBuild) return state;
          const currentEquipment = state.currentBuild.equipment || {};
          const newEquipment = { ...currentEquipment };
          if (equipment) {
            newEquipment[slot] = equipment;
          } else {
            delete newEquipment[slot];
          }
          return {
            currentBuild: {
              ...state.currentBuild,
              equipment: newEquipment,
            },
          };
        });
      },

      saveBuild: (authorId: string, authorName: string) => {
        const state = get();
        if (!state.currentBuild || !state.currentBuild.heroId) return null;

        const now = new Date();
        const build: Build = {
          id: state.currentBuild.id || uuidv4(),
          name: state.currentBuild.name || 'Unnamed Build',
          description: state.currentBuild.description || '',
          heroId: state.currentBuild.heroId,
          traitId: state.currentBuild.traitId,
          talents: state.currentBuild.talents || [],
          skills: state.currentBuild.skills || [],
          equipment: (state.currentBuild.equipment || {}) as Build['equipment'],
          authorId,
          authorName,
          createdAt: now,
          updatedAt: now,
          isPublic: state.currentBuild.isPublic || false,
          likes: state.currentBuild.likes || 0,
          views: state.currentBuild.views || 0,
          tags: state.currentBuild.tags || [],
          guide: state.currentBuild.guide,
        };

        set(state => {
          const existingIndex = state.savedBuilds.findIndex(b => b.id === build.id);
          let newBuilds: Build[];
          if (existingIndex >= 0) {
            newBuilds = [...state.savedBuilds];
            newBuilds[existingIndex] = { ...build, createdAt: state.savedBuilds[existingIndex].createdAt };
          } else {
            newBuilds = [...state.savedBuilds, build];
          }
          return { savedBuilds: newBuilds, currentBuild: build };
        });

        return build;
      },

      loadBuild: (buildId: string) => {
        const state = get();
        const build = state.savedBuilds.find(b => b.id === buildId) ||
                      state.communityBuilds.find(b => b.id === buildId);
        if (build) {
          set({ currentBuild: { ...build } });
        }
      },

      deleteBuild: (buildId: string) => {
        set(state => ({
          savedBuilds: state.savedBuilds.filter(b => b.id !== buildId),
          currentBuild: state.currentBuild?.id === buildId ? null : state.currentBuild,
        }));
      },

      duplicateBuild: (buildId: string) => {
        const state = get();
        const build = state.savedBuilds.find(b => b.id === buildId);
        if (build) {
          set({
            currentBuild: {
              ...build,
              id: uuidv4(),
              name: `${build.name} (Copy)`,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
      },

      clearCurrentBuild: () => {
        set({ currentBuild: null });
      },

      setGuide: (guide: string) => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, guide }
            : null,
        }));
      },

      setTags: (tags: string[]) => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, tags }
            : null,
        }));
      },

      togglePublic: () => {
        set(state => ({
          currentBuild: state.currentBuild
            ? { ...state.currentBuild, isPublic: !state.currentBuild.isPublic }
            : null,
        }));
      },
    }),
    {
      name: 'torchlight-builds',
      partialize: state => ({
        savedBuilds: state.savedBuilds,
      }),
    }
  )
);

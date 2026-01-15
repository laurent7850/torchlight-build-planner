import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Eye, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { HeroSelector } from '../components/HeroSelector';
import { SkillBuilder } from '../components/SkillBuilder';
import { EquipmentPanel } from '../components/EquipmentPanel';
import { useBuildStore } from '../store/buildStore';
import { useAuthStore } from '../store/authStore';

type BuildStep = 'hero' | 'skills' | 'equipment' | 'details';

export const CreateBuildPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<BuildStep>('hero');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { user, isAuthenticated } = useAuthStore();
  const {
    currentBuild,
    createNewBuild,
    setHero,
    setTrait,
    setBuildName,
    setBuildDescription,
    addSkillLink,
    removeSkillLink,
    updateSkillLink,
    setEquipment,
    saveBuild,
    setGuide,
    setTags,
    togglePublic,
  } = useBuildStore();

  useEffect(() => {
    if (!currentBuild) {
      createNewBuild();
    }

    // Check for hero param in URL
    const heroParam = searchParams.get('hero');
    if (heroParam && currentBuild && !currentBuild.heroId) {
      setHero(heroParam);
    }
  }, []);

  const steps: { id: BuildStep; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'skills', label: 'Skills' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'details', label: 'Details' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case 'hero':
        return !!currentBuild?.heroId;
      case 'skills':
        return true;
      case 'equipment':
        return true;
      case 'details':
        return !!currentBuild?.name?.trim();
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (user) {
      const savedBuild = saveBuild(user.id, user.username);
      if (savedBuild) {
        navigate(`/build/${savedBuild.id}`);
      }
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.currentTarget;
      const tag = input.value.trim().toLowerCase();
      if (tag && !currentBuild?.tags?.includes(tag)) {
        setTags([...(currentBuild?.tags || []), tag]);
        input.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((currentBuild?.tags || []).filter(t => t !== tagToRemove));
  };

  if (!currentBuild) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Create Build</h1>
            <p className="text-sm text-gray-400 mt-1">
              Build your perfect Torchlight Infinite character
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/my-builds')}
              className="px-4 py-2 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!currentBuild.heroId || !currentBuild.name?.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save Build
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-orange-500 text-white'
                      : index < currentStepIndex
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      index < currentStepIndex ? 'bg-green-500' : 'bg-slate-700'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
          {currentStep === 'hero' && (
            <HeroSelector
              selectedHeroId={currentBuild.heroId}
              selectedTraitId={currentBuild.traitId}
              onHeroSelect={setHero}
              onTraitSelect={setTrait}
            />
          )}

          {currentStep === 'skills' && (
            <SkillBuilder
              skillLinks={currentBuild.skills || []}
              onAddSkillLink={addSkillLink}
              onRemoveSkillLink={removeSkillLink}
              onUpdateSkillLink={updateSkillLink}
            />
          )}

          {currentStep === 'equipment' && (
            <EquipmentPanel
              equipment={currentBuild.equipment || {}}
              onEquipmentChange={setEquipment}
            />
          )}

          {currentStep === 'details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Build Details</h3>

              {/* Build Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Build Name *
                </label>
                <input
                  type="text"
                  value={currentBuild.name || ''}
                  onChange={e => setBuildName(e.target.value)}
                  placeholder="Enter build name..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={currentBuild.description || ''}
                  onChange={e => setBuildDescription(e.target.value)}
                  placeholder="Describe your build..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(currentBuild.tags || []).map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="w-4 h-4 rounded-full hover:bg-purple-500/30 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  onKeyDown={handleTagInput}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Guide */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Build Guide (Optional)
                </label>
                <textarea
                  value={currentBuild.guide || ''}
                  onChange={e => setGuide(e.target.value)}
                  placeholder="Write a guide for your build..."
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              {/* Public Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <h4 className="font-medium text-white">Make Build Public</h4>
                  <p className="text-sm text-gray-400">
                    Allow others to view and learn from your build
                  </p>
                </div>
                <button
                  onClick={togglePublic}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    currentBuild.isPublic ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      currentBuild.isPublic ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-gray-300 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!currentBuild.heroId || !currentBuild.name?.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              Save Build
            </button>
          )}
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Account Required</h3>
                <p className="text-sm text-gray-400">Sign in to save your build</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Create a free account or sign in to save your builds and share them with the community.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 px-4 py-3 border border-slate-600 text-gray-300 rounded-xl hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

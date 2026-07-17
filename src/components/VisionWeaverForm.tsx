import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDebouncedCallback } from 'use-debounce';
import { VisionWeaverData, LeadTemperature, PhotoItem } from '../types/visionWeaver';
import { ProgressBar } from './vision-weaver/ProgressBar';
import { ContinueBanner } from './vision-weaver/ContinueBanner';
import { renderStep } from './vision-weaver/Steps';
import { calculateLeadScore } from '../utils/leadScoring';

const PhotoUpload = React.lazy(() => import('./vision-weaver/PhotoUpload'));
const PaymentWall = React.lazy(() => import('./vision-weaver/PaymentWall'));
const SuccessScreen = React.lazy(() => import('./vision-weaver/SuccessScreen'));
const SummaryScreen = React.lazy(() => import('./vision-weaver/SummaryScreen').then(m => ({ default: m.SummaryScreen })));

export type AppState = VisionWeaverData & { 
  currentStep: number; 
  completedSteps: number[]; 
  isNavigatingBack: boolean; 
  paymentComplete: boolean;
};

const INITIAL_STATE: VisionWeaverData & { currentStep: number; completedSteps: number[]; isNavigatingBack: boolean; paymentComplete: boolean } = {
  currentStep: 1,
  sessionId: '',
  completedSteps: [],
  isNavigatingBack: false,
  bathroomType: undefined,
  bathroomSize: undefined,
  layoutOrientation: undefined,
  painPoints: [],
  bathroomAge: undefined,
  styleDirection: undefined,
  colourDirection: undefined,
  naturalLight: undefined,
  hasPlasterWalls: false,
  wallPaint: undefined,
  features: [],
  tapwareFinish: undefined,
  vanityFront: undefined,
  vanitySurface: undefined,
  tileStyle: undefined,
  showerScreen: undefined,
  groutColour: undefined,
  hasNiche: false,
  nicheDetails: undefined,
  mirrorStyle: undefined,
  lighting: [],
  stylingLevel: undefined,
  budget: undefined,
  timeline: undefined,
  ownership: undefined,
  suburb: '',
  firstName: '',
  email: '',
  mobile: '',
  optIn: false,
  photos: [],
  photoStepSkipped: false,
  leadScore: 0,
  leadTemperature: undefined,
  paymentComplete: false,
};

export default function VisionWeaverForm({ onClose }: { onClose?: () => void }) {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [showBanner, setShowBanner] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);
  const [isSuccessRoute, setIsSuccessRoute] = useState(false);

  useEffect(() => {
    // Check if we are on success route
    const urlParams = new URLSearchParams(window.location.search);
    if (window.location.pathname.includes('/vision-weaver/success') || urlParams.get('session_id')) {
      setIsSuccessRoute(true);
      return;
    }

    let sessionId = localStorage.getItem('vw_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('vw_session_id', sessionId);
      localStorage.setItem('vw_expires', new Date(Date.now() + 14 * 86400000).toISOString());
    }

    const expires = localStorage.getItem('vw_expires');
    if (expires && new Date(expires) < new Date()) {
      localStorage.removeItem(`vw_state_${sessionId}`);
    }

    const saveKey = `vw_state_${sessionId}`;
    const saved = localStorage.getItem(saveKey);
    if (saved) {
      setShowBanner(true);
      try {
        const parsed = JSON.parse(saved);
        setState({ ...INITIAL_STATE, ...parsed, sessionId });
      } catch (e) {
        setState({ ...INITIAL_STATE, sessionId });
      }
    } else {
      setState(s => ({ ...s, sessionId: sessionId as string }));
    }
  }, []);

  const debouncedSave = useDebouncedCallback((newState: AppState) => {
    if (!newState.sessionId) return;
    const saveKey = `vw_state_${newState.sessionId}`;
    // Don't save photos File objects, just preview URLs if needed, or exclude photos
    const stateToSave = { ...newState, photos: newState.photos.map(p => ({ ...p, file: undefined })) };
    localStorage.setItem(saveKey, JSON.stringify(stateToSave));
    
    if (newState.currentStep < 10) {
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 2000);
    }
  }, 500);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(s => {
      const next = { ...s, ...updates };
      debouncedSave(next);
      return next;
    });
  }, [debouncedSave]);

  const handleNext = () => {
    updateState({ 
      currentStep: state.currentStep + 1, 
      isNavigatingBack: false,
      completedSteps: Array.from(new Set([...state.completedSteps, state.currentStep]))
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    updateState({ currentStep: state.currentStep - 1, isNavigatingBack: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    const sessionId = localStorage.getItem('vw_session_id');
    if (sessionId) {
      localStorage.removeItem(`vw_state_${sessionId}`);
    }
    setState({ ...INITIAL_STATE, sessionId: sessionId || crypto.randomUUID() });
    setShowBanner(false);
  };

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (state.currentStep > 1 && !state.paymentComplete && !isSuccessRoute) {
        e.preventDefault();
        e.returnValue = 'Your progress is saved. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.currentStep, state.paymentComplete, isSuccessRoute]);

  if (isSuccessRoute) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessScreen />
      </Suspense>
    );
  }

  const canAdvance = () => {
    switch (state.currentStep) {
      case 1: return state.bathroomType && state.bathroomSize;
      case 2: return !!state.layoutOrientation;
      case 3: return state.painPoints.length > 0 && state.bathroomAge;
      case 4: return !!state.styleDirection;
      case 5: {
        const base = state.colourDirection && state.naturalLight && state.hasPlasterWalls;
        if (state.hasPlasterWalls === 'yes') {
          return base && state.paintColourDirection && state.paintFinish;
        }
        return base;
      }
      case 6: return state.features.length > 0;
      case 7: {
        const needsShowerScreen = state.features.includes('walk-in-shower') || state.features.includes('rain-shower') || state.features.includes('flush-floor');
        return state.tapwareFinish && state.vanityFront && state.vanitySurface && state.tileStyle && 
                     (needsShowerScreen ? state.showerScreenStyle : true);
      }
      case 8: {
        const nicheDone = state.features.includes('wall-niches') ? state.nicheCount && state.nicheOrientation && state.nicheTileFinish : true;
        return state.groutColour && nicheDone && state.mirrorStyle && state.lighting.length > 0 && state.stylingLevel;
      }
      case 9: return state.budget && state.timeline && state.ownership && state.suburb.length >= 2;
      case 10: return state.firstName && state.email.match(/^\\S+@\\S+\\.\\S+$/) && state.optIn;
      case 11: return true; // Photo upload
      default: return false;
    }
  };

  const getStepTitle = () => {
    const titles = [
      '', 'Your Bathroom', 'Layout', 'Current Situation', 'Style', 'Colour & Light', 
      'Features', 'Finishes (1/2)', 'Finishes (2/2)', 'Reality', 'Details'
    ];
    return titles[state.currentStep] || '';
  };

  return (
    <div className="min-h-[100dvh] bg-[#F9F6F1] font-sans flex flex-col relative w-full h-full text-[#2B2B2B]">
      {state.currentStep < 12 && (
        <ProgressBar currentStep={Math.min(state.currentStep, 10)} totalSteps={10} title={getStepTitle()} />
      )}

      <main className="flex-1 w-full max-w-[680px] mx-auto px-6 md:px-12 pt-24 pb-32">
        {state.currentStep === 1 && showBanner && (
          <ContinueBanner 
            step={Math.max(...state.completedSteps, 1)} 
            onContinue={() => {
              setShowBanner(false);
              updateState({ currentStep: Math.max(...state.completedSteps, 1) + 1 });
            }}
            onRestart={handleRestart}
          />
        )}
        
        <AnimatePresence mode="wait" initial={false}>
          {state.currentStep <= 10 && renderStep(state, updateState, handleNext)}
          {state.currentStep === 11 && (
            <Suspense fallback={<div>Loading...</div>}>
              <PhotoUpload 
                data={state} 
                onUpload={(p) => updateState({ photos: [...(state.photos || []), ...p] })}
                onDelete={(id) => updateState({ photos: state.photos.filter(p => p.id !== id) })}
                onSkip={() => { updateState({ photoStepSkipped: true }); handleNext(); }}
                onContinue={handleNext}
              />
            </Suspense>
          )}
          {state.currentStep === 12 && (
            <Suspense fallback={<div>Loading...</div>}>
              <PaymentWall data={state} onBack={handleBack} />
            </Suspense>
          )}
        </AnimatePresence>
      </main>

      {state.currentStep < 12 && state.currentStep > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-[#F9F6F1] border-t border-[#E0D8CC] p-4 h-[72px] z-50">
          <div className="max-w-[680px] mx-auto flex gap-4 h-full">
            {state.currentStep > 1 && (
              <button onClick={handleBack} className="text-[#4A4A4A] font-medium hover:underline px-4 h-full flex items-center shrink-0">
                &larr; Back
              </button>
            )}
            
            {state.currentStep < 11 ? (
              <button 
                onClick={() => {
                  if (state.currentStep === 10) {
                    const scoreData = calculateLeadScore(state);
                    updateState({ leadScore: scoreData.score, leadTemperature: scoreData.temperature });
                  }
                  handleNext();
                }}
                disabled={!canAdvance()}
                className={`h-full flex-1 md:flex-none md:ml-auto px-8 rounded font-bold transition-colors ${
                  canAdvance() 
                    ? 'bg-[#C8A951] text-[#2B2B2B] hover:bg-[#EDD98A]' 
                    : 'bg-[#D4C89A] text-[#8B8B8B] cursor-not-allowed'
                }`}
              >
                {state.currentStep === 10 ? 'Create My Vision \u2192' : 'Continue \u2192'}
              </button>
            ) : state.currentStep === 11 ? (
              <button 
                onClick={handleNext}
                className="h-full flex-1 md:flex-none md:ml-auto px-8 rounded font-bold bg-[#C8A951] text-[#2B2B2B] hover:bg-[#EDD98A]"
              >
                {state.photos.length > 0 ? `Continue with ${state.photos.length} photo/s \u2192` : 'Skip for now \u2192'}
              </button>
            ) : null}
          </div>
        </div>
      )}

      <AnimatePresence>
        {savedBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-[88px] right-6 text-[11px] text-[#4A4A4A] bg-[#F9F6F1] px-3 py-1 rounded-full border border-[#E0D8CC] shadow-sm z-50"
          >
            ✓ Saved
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

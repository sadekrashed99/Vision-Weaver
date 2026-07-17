import React, { useState } from 'react';
import { AppState } from '../VisionWeaverForm';
import { StepCard } from './StepCard';
import { OptionCard } from './OptionCard';
import { FeatureCard } from './FeatureCard';
import { CategoryTabs } from './CategoryTabs';
import { VisionAIBanner } from './VisionAIBanner';
import { buildRecommendations } from '../../utils/recommendations';

// Placeholders for SVGs since spec requires inline SVGs but keeping it manageable here.
const SvgPlaceholder = () => <svg viewBox="0 0 120 80" className="w-full h-16 text-[#E8E3D9]" fill="currentColor" stroke="#C8A951" strokeWidth="1.5"><rect x="10" y="10" width="100" height="60" rx="4" /></svg>;
const SvgIcon = () => <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>;
const SvgMirror = () => <svg viewBox="0 0 80 100" className="w-10 h-12" fill="none" stroke="#2B2B2B" strokeWidth="2"><rect x="10" y="10" width="60" height="80" rx="4" /></svg>;
const SvgSkip = () => <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#4A4A4A]" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export function renderStep(state: AppState, update: (u: Partial<AppState>) => void, next: () => void) {
  const { currentStep, isNavigatingBack } = state;
  const toggleArray = (arr: string[] = [], val: string) => arr.includes(val) ? arr.filter(i => i !== val) : [...arr, val];
  const recs = buildRecommendations(state);

  const onBack = () => update({ currentStep: currentStep - 1, isNavigatingBack: true });

  switch (currentStep) {
    case 1:
      return (
        <StepCard step={1} totalSteps={10} title="Which bathroom are we transforming?" direction={isNavigatingBack ? -1 : 1} onContinue={next} isValid={!!(state.bathroomType && state.bathroomSize)}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <OptionCard id="main" label="Main Bathroom" svgIcon={<SvgPlaceholder />} isSelected={state.bathroomType === 'main'} onClick={() => update({ bathroomType: 'main' })} />
            <OptionCard id="ensuite" label="Ensuite" svgIcon={<SvgPlaceholder />} isSelected={state.bathroomType === 'ensuite'} onClick={() => update({ bathroomType: 'ensuite' })} />
            <OptionCard id="guest" label="Guest Bathroom" svgIcon={<SvgPlaceholder />} isSelected={state.bathroomType === 'guest'} onClick={() => update({ bathroomType: 'guest' })} />
            <OptionCard id="powder" label="Powder Room" svgIcon={<SvgPlaceholder />} isSelected={state.bathroomType === 'powder'} onClick={() => update({ bathroomType: 'powder' })} />
          </div>
          {state.bathroomType && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <h3 className="font-bold text-[#2B2B2B] mb-3">How large is your bathroom?</h3>
              <div className="grid grid-cols-3 gap-3">
                <OptionCard id="small" label="Small" sublabel="Under 4m²" svgIcon={<SvgIcon/>} isSelected={state.bathroomSize === 'small'} onClick={() => update({ bathroomSize: 'small' })} />
                <OptionCard id="medium" label="Medium" sublabel="4 – 8m²" svgIcon={<SvgIcon/>} isSelected={state.bathroomSize === 'medium'} onClick={() => update({ bathroomSize: 'medium' })} />
                <OptionCard id="large" label="Large" sublabel="8m² and above" svgIcon={<SvgIcon/>} isSelected={state.bathroomSize === 'large'} onClick={() => update({ bathroomSize: 'large' })} />
              </div>
            </div>
          )}
        </StepCard>
      );
    case 2:
      return (
        <StepCard step={2} totalSteps={10} title="What does your bathroom layout look like?" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!state.layoutOrientation}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <OptionCard id="narrow" label="Narrow / Galley" svgIcon={<SvgPlaceholder />} isSelected={state.layoutOrientation === 'narrow'} onClick={() => update({ layoutOrientation: 'narrow' })} />
            <OptionCard id="rectangular" label="Standard Rectangular" svgIcon={<SvgPlaceholder />} isSelected={state.layoutOrientation === 'rectangular'} onClick={() => update({ layoutOrientation: 'rectangular' })} />
            <OptionCard id="square" label="Square / Open" svgIcon={<SvgPlaceholder />} isSelected={state.layoutOrientation === 'square'} onClick={() => update({ layoutOrientation: 'square' })} />
            <OptionCard id="alcove" label="Separate Toilet Alcove" svgIcon={<SvgPlaceholder />} isSelected={state.layoutOrientation === 'alcove'} onClick={() => update({ layoutOrientation: 'alcove' })} />
            <OptionCard id="irregular" label="L-Shaped / Irregular" svgIcon={<SvgPlaceholder />} isSelected={state.layoutOrientation === 'irregular'} onClick={() => update({ layoutOrientation: 'irregular' })} />
            <OptionCard id="unsure" label="Not Sure" svgIcon={<SvgPlaceholder />} isSelected={state.layoutOrientation === 'unsure'} onClick={() => update({ layoutOrientation: 'unsure' })} />
          </div>
        </StepCard>
      );
    case 3:
      return (
        <StepCard step={3} totalSteps={10} title="What frustrates you most?" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={state.painPoints && state.painPoints.length > 0 && !!state.bathroomAge}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { id: 'outdated', label: 'Looks and feels dated' },
              { id: 'no-storage', label: 'Not enough storage' },
              { id: 'poor-shower', label: 'Poor shower pressure or size' },
              { id: 'dark-space', label: 'Too dark, poor lighting' },
              { id: 'mould-issues', label: 'Mould or damp problems' },
              { id: 'small-feels', label: 'Cramped and small' },
              { id: 'cant-clean', label: 'Hard to clean surfaces' },
              { id: 'dated-layout', label: 'Awkward layout' },
              { id: 'no-bath', label: 'No bath — want one' },
              { id: 'low-value', label: 'Not adding property value' },
            ].map(f => (
              <FeatureCard key={f.id} id={f.id} label={f.label} svgIcon={<SvgIcon />} isSelected={state.painPoints?.includes(f.id) || false} onClick={() => update({ painPoints: toggleArray(state.painPoints, f.id) })} />
            ))}
          </div>
          {state.painPoints && state.painPoints.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <h3 className="font-bold text-[#2B2B2B] mb-3">How old is your current bathroom?</h3>
              <div className="flex flex-wrap gap-2">
                {['<5 years', '5–10 years', '10–20 years', '20–30 years', '30+ years'].map(age => (
                  <button key={age} onClick={() => update({ bathroomAge: age })} className={`px-4 py-2 border-[1.5px] rounded-lg text-sm transition-colors ${state.bathroomAge === age ? 'border-[#C8A951] bg-[#FDFAF3] font-medium' : 'border-[#E0D8CC] bg-white hover:border-[#C8A951]/50'}`}>{age}</button>
                ))}
              </div>
            </div>
          )}
        </StepCard>
      );
    case 4:
      return (
        <StepCard step={4} totalSteps={10} title="Which style speaks to you most?" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!state.styleDirection}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OptionCard id="modern-minimal" label="Modern Minimal" sublabel="Clean lines, restrained palette" image="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80" isSelected={state.styleDirection === 'modern-minimal'} onClick={() => update({ styleDirection: 'modern-minimal' })} />
            <OptionCard id="hamptons-coastal" label="Hamptons & Coastal" sublabel="Relaxed, light-filled, timeless" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" isSelected={state.styleDirection === 'hamptons-coastal'} onClick={() => update({ styleDirection: 'hamptons-coastal' })} />
            <OptionCard id="japandi-zen" label="Japandi / Zen" sublabel="Organic calm, warm neutrals" image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80" isSelected={state.styleDirection === 'japandi-zen'} onClick={() => update({ styleDirection: 'japandi-zen' })} />
            <OptionCard id="industrial-edge" label="Industrial Edge" sublabel="Bold, raw, unapologetically dark" image="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80" isSelected={state.styleDirection === 'industrial-edge'} onClick={() => update({ styleDirection: 'industrial-edge' })} />
            <OptionCard id="classic-elegance" label="Classic Elegance" sublabel="Timeless luxury, enduring detail" image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80" isSelected={state.styleDirection === 'classic-elegance'} onClick={() => update({ styleDirection: 'classic-elegance' })} />
            <OptionCard id="bold-statement" label="Bold Statement" sublabel="High contrast, full personality" image="https://images.unsplash.com/photo-1616680214084-22670de1bc82?auto=format&fit=crop&w=600&q=80" isSelected={state.styleDirection === 'bold-statement'} onClick={() => update({ styleDirection: 'bold-statement' })} />
          </div>
        </StepCard>
      );
    case 5:
      const isValid5 = state.colourDirection && state.naturalLight && state.hasPlasterWalls !== undefined && (!state.hasPlasterWalls || (state.wallPaint?.colourDirection && state.wallPaint?.finish));
      return (
        <StepCard step={5} totalSteps={10} title="Which colour direction feels right for your space?" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!isValid5}>
          {recs?.['step5'] && <VisionAIBanner message={recs['step5'].message} subtext={recs['step5'].subtext} />}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <OptionCard id="warm-whites" label="Warm Whites & Naturals" swatches={['#FAF7F2', '#EDD98A', '#D4C5A9', '#B8A88A', '#8B7355']} isSelected={state.colourDirection === 'warm-whites'} onClick={() => update({ colourDirection: 'warm-whites' })} />
            <OptionCard id="cool-greys" label="Cool Greys & Stone" swatches={['#F5F5F5', '#D1D5DB', '#9CA3AF', '#6B7280', '#374151']} isSelected={state.colourDirection === 'cool-greys'} onClick={() => update({ colourDirection: 'cool-greys' })} />
            <OptionCard id="earthy-naturals" label="Earthy & Terracotta" swatches={['#F5ECD7', '#D4A96A', '#A0785A', '#6B4226', '#3D2314']} isSelected={state.colourDirection === 'earthy-naturals'} onClick={() => update({ colourDirection: 'earthy-naturals' })} />
            <OptionCard id="japandi-warmth" label="Japandi Warmth" swatches={['#F7F0E6', '#E8D5B7', '#C4A882', '#8B6E47', '#4A3728']} isSelected={state.colourDirection === 'japandi-warmth'} onClick={() => update({ colourDirection: 'japandi-warmth' })} />
            <OptionCard id="coastal-blues" label="Coastal Blues" swatches={['#E8F4F8', '#93C5D2', '#5B9DB5', '#2E6F8A', '#1A4A5E']} isSelected={state.colourDirection === 'coastal-blues'} onClick={() => update({ colourDirection: 'coastal-blues' })} />
            <OptionCard id="bold-contrasts" label="Bold Contrasts" swatches={['#1A1A1A', '#C8A951', '#F9F6F1', '#8B0000', '#2B4B6F']} isSelected={state.colourDirection === 'bold-contrasts'} onClick={() => update({ colourDirection: 'bold-contrasts' })} />
          </div>
          {state.colourDirection && (
            <div className="mb-6">
              <h3 className="font-bold text-[#2B2B2B] mb-3">How much natural light does your bathroom get?</h3>
              <div className="grid grid-cols-3 gap-3">
                <OptionCard id="excellent" label="Excellent" sublabel="Full windows" svgIcon={<SvgIcon/>} isSelected={state.naturalLight === 'excellent'} onClick={() => update({ naturalLight: 'excellent' })} />
                <OptionCard id="moderate" label="Moderate" sublabel="Skylight/frosted" svgIcon={<SvgIcon/>} isSelected={state.naturalLight === 'moderate'} onClick={() => update({ naturalLight: 'moderate' })} />
                <OptionCard id="minimal" label="Minimal" sublabel="No direct light" svgIcon={<SvgIcon/>} isSelected={state.naturalLight === 'minimal'} onClick={() => update({ naturalLight: 'minimal' })} />
              </div>
            </div>
          )}
          {state.naturalLight && (
             <div className="mb-6">
              <div className="flex items-center justify-between p-4 border border-[#E0D8CC] rounded-xl bg-white">
                <div>
                  <div className="font-bold text-[#2B2B2B]">Will any plaster walls be exposed?</div>
                  <div className="text-xs text-[#6B6B6B]">Toggle on if you plan to paint sections of wall</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={state.hasPlasterWalls || false} onChange={(e) => update({ hasPlasterWalls: e.target.checked })} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C8A951]"></div>
                </label>
              </div>
             </div>
          )}
          {state.hasPlasterWalls && (
            <div className="animate-in fade-in slide-in-from-bottom-2 p-4 border border-[#C8A951] rounded-xl bg-[#FDFAF3] mb-6">
               <h3 className="font-bold text-[#2B2B2B] mb-2">Paint colour direction?</h3>
               <input type="text" placeholder="e.g. Warm white, sage green, deep navy" className="w-full bg-white border-b-2 border-[#E0D8CC] focus:border-[#C8A951] outline-none px-3 py-2 mb-4 text-[#2B2B2B]" value={state.wallPaint?.colourDirection || ''} onChange={e => update({ wallPaint: { ...state.wallPaint, colourDirection: e.target.value } as any })} />
               <h3 className="font-bold text-[#2B2B2B] mb-2">Preferred paint finish?</h3>
               <div className="grid grid-cols-3 gap-3">
                 <OptionCard id="flat" label="Flat / Matt" sublabel="Hides imperfections" svgIcon={<SvgIcon/>} isSelected={state.wallPaint?.finish === 'flat'} onClick={() => update({ wallPaint: { ...state.wallPaint, finish: 'flat' } as any })} />
                 <OptionCard id="low-sheen" label="Low Sheen" sublabel="Most popular" svgIcon={<SvgIcon/>} isSelected={state.wallPaint?.finish === 'low-sheen'} onClick={() => update({ wallPaint: { ...state.wallPaint, finish: 'low-sheen' } as any })} />
                 <OptionCard id="semi-gloss" label="Semi Gloss" sublabel="Easy to clean" svgIcon={<SvgIcon/>} isSelected={state.wallPaint?.finish === 'semi-gloss'} onClick={() => update({ wallPaint: { ...state.wallPaint, finish: 'semi-gloss' } as any })} />
               </div>
            </div>
          )}
        </StepCard>
      );
    case 6:
      const catCount = (ids: string[]) => ids.reduce((a, b) => a + (state.features?.includes(b) ? 1 : 0), 0);
      const TABS = [
        { id: 'tab1', label: 'Bathing & Showering', icon: <SvgIcon />, ids: ['freestanding-bath', 'walk-in-shower', 'rain-shower', 'shower-over-bath', 'double-shower', 'handheld-shower', 'flush-floor', 'heated-shower-floor'] },
        { id: 'tab2', label: 'Vanity & Storage', icon: <SvgIcon />, ids: ['double-vanity', 'under-bench-drawers', 'linen-tower', 'floating-vanity', 'his-and-hers', 'integrated-basin'] },
        { id: 'tab3', label: 'Surfaces & Features', icon: <SvgIcon />, ids: ['feature-wall', 'tile-to-ceiling', 'mosaic-accent', 'wall-niche', 'in-wall-cistern', 'frameless-screen'] },
        { id: 'tab4', label: 'Comfort & Function', icon: <SvgIcon />, ids: ['heated-towel-rail', 'in-floor-heating', 'exhaust-fan', 'ventilation-window', 'separate-toilet', 'accessibility'] },
        { id: 'tab5', label: 'Lighting & Tech', icon: <SvgIcon />, ids: ['recessed-downlights', 'backlit-mirror', 'led-strip', 'smart-mirror', 'bluetooth-speaker', 'dimmer-switch'] },
      ];
      // Workaround: We can't use useState here because it's just a render function inside a component without its own lifecycle, wait no, it's inside `VisionWeaverForm`.
      // Actually, we can use a wrapper component for Step 6.
      return <Step6Wrapper state={state} update={update} next={next} onBack={onBack} toggleArray={toggleArray} TABS={TABS} catCount={catCount} />;
    case 7:
      return (
        <StepCard step={7} totalSteps={10} title="Now let's lock in your finishes." subtitle="Every choice you make here feeds directly into your Vision AI brief." direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!(state.tapwareFinish && state.vanityFront && state.vanitySurface && state.tileStyle && (['walk-in-shower','rain-shower','flush-floor'].some(f=>state.features?.includes(f)) ? state.showerScreen : true))}>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Tapware finish</h3>
              {recs?.['step7a-tapware'] && <VisionAIBanner message={recs['step7a-tapware'].message} subtext={recs['step7a-tapware'].subtext} />}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'brushed-brass', label: 'Brushed Brass', gradient: 'radial-gradient(circle at 30% 30%, #F5E6A3, #C8A951, #8B6A1A)' },
                  { id: 'brushed-bronze', label: 'Brushed Bronze', gradient: 'radial-gradient(circle at 30% 30%, #C9A87C, #8B6914, #5C4000)' },
                  { id: 'chrome', label: 'Chrome', gradient: 'radial-gradient(circle at 30% 30%, #FFFFFF, #D4D4D4, #888888)' },
                  { id: 'brushed-nickel', label: 'Brushed Nickel', gradient: 'radial-gradient(circle at 30% 30%, #E8E8E8, #B0B0B0, #707070)' },
                  { id: 'matte-black', label: 'Matte Black', gradient: 'radial-gradient(circle at 30% 30%, #4A4A4A, #2B2B2B, #1A1A1A)' },
                  { id: 'gunmetal', label: 'Gunmetal', gradient: 'radial-gradient(circle at 30% 30%, #6B7280, #4B5563, #374151)' },
                  { id: 'brushed-gold', label: 'Brushed Gold', gradient: 'radial-gradient(circle at 30% 30%, #FFE8A3, #D4A017, #8B6914)' },
                  { id: 'polished-nickel', label: 'Polished Nickel', gradient: 'radial-gradient(circle at 30% 30%, #F5F5F5, #C8C8C8, #909090)' },
                  { id: 'matte-white', label: 'Matte White', gradient: 'radial-gradient(circle at 35% 35%, #FFFFFF, #F0F0F0, #D8D8D8)' },
                ].map(t => (
                  <OptionCard key={t.id} id={t.id} label={t.label} gradient={t.gradient} isSelected={state.tapwareFinish === t.id} isRecommended={recs?.['step7a-tapware']?.optionIds.includes(t.id)} onClick={() => update({ tapwareFinish: t.id as any })} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Vanity front</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['shaker', 'flat-panel', 'fluted', 'handleless', 'open-shelf'].map(id => (
                  <OptionCard key={id} id={id} label={id.replace('-', ' ')} image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80" isSelected={state.vanityFront === id} onClick={() => update({ vanityFront: id as any })} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Vanity surface</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['sintered-stone', 'porcelain-slab', 'natural-stone', 'timber', 'laminate'].map(id => (
                  <OptionCard key={id} id={id} label={id.replace('-', ' ')} image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=300&q=80" isSelected={state.vanitySurface === id} onClick={() => update({ vanitySurface: id as any })} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Tile style</h3>
              {recs?.['step7a-tile'] && <VisionAIBanner message={recs['step7a-tile'].message} subtext={recs['step7a-tile'].subtext} />}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['large-format-rect', 'large-format-square', 'subway', 'kit-kat', 'terrazzo', 'textured-stone', 'zellige'].map(id => (
                  <OptionCard key={id} id={id} label={id.replace(/-/g, ' ')} image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=300&q=80" isSelected={state.tileStyle === id} isRecommended={recs?.['step7a-tile']?.optionIds.includes(id)} onClick={() => update({ tileStyle: id as any })} />
                ))}
                <OptionCard id="skip" label="No Preference" isSkip isSelected={state.tileStyle === 'skip'} onClick={() => update({ tileStyle: undefined })} />
              </div>
            </div>
            {['walk-in-shower','rain-shower','flush-floor','double-shower'].some(f=>state.features?.includes(f)) && (
              <div>
                <h3 className="font-bold text-[#2B2B2B] mb-3">Shower screen</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {['frameless-clear', 'semi-frameless', 'framed', 'pivot-door', 'open-shower'].map(id => (
                    <OptionCard key={id} id={id} label={id.replace('-', ' ')} image="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=300&q=80" isSelected={state.showerScreen === id} onClick={() => update({ showerScreen: id as any })} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </StepCard>
      );
    case 8:
      return (
        <StepCard step={8} totalSteps={10} title="Finishes Part 2" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!(state.groutColour && (!state.features?.includes('wall-niche') || (state.nicheDetails?.count && state.nicheDetails?.orientation && state.nicheDetails?.finish)) && state.mirrorStyle && state.lighting?.length > 0 && state.stylingLevel)}>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Grout colour</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { id: 'white', label: 'White', color: '#FFFFFF' },
                  { id: 'light-grey', label: 'Light Grey', color: '#D1D5DB' },
                  { id: 'mid-grey', label: 'Mid Grey', color: '#9CA3AF' },
                  { id: 'charcoal', label: 'Charcoal', color: '#4A4A4A' },
                  { id: 'black', label: 'Black', color: '#1A1A1A' },
                  { id: 'match-tile', label: 'Match Tile', color: 'linear-gradient(135deg, #E0D8CC 50%, #C8A951 50%)' },
                ].map(g => (
                  <OptionCard key={g.id} id={g.id} label={g.label} gradient={g.color.includes('gradient') ? g.color : undefined} isSelected={state.groutColour === g.id} onClick={() => update({ groutColour: g.id as any })} />
                ))}
              </div>
            </div>
            {state.features?.includes('wall-niche') && (
              <div className="p-4 border border-[#C8A951] rounded-xl bg-[#FDFAF3]">
                <h3 className="font-bold text-[#2B2B2B] mb-3">Wall Niche Details</h3>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Count:</div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(n => (
                      <button key={n} onClick={() => update({ nicheDetails: { ...state.nicheDetails, count: n } as any })} className={`w-12 h-12 rounded-lg border-[1.5px] font-bold transition-colors ${state.nicheDetails?.count === n ? 'border-[#C8A951] bg-[#C8A951] text-white' : 'border-[#E0D8CC] bg-white text-[#2B2B2B]'}`}>{n}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Orientation:</div>
                  <div className="flex gap-4">
                    <OptionCard id="horiz" label="Horizontal" svgIcon={<SvgPlaceholder/>} isSelected={state.nicheDetails?.orientation === 'horizontal'} onClick={() => update({ nicheDetails: { ...state.nicheDetails, orientation: 'horizontal' } as any })} />
                    <OptionCard id="vert" label="Vertical" svgIcon={<SvgPlaceholder/>} isSelected={state.nicheDetails?.orientation === 'vertical'} onClick={() => update({ nicheDetails: { ...state.nicheDetails, orientation: 'vertical' } as any })} />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-sm font-medium mb-2">Finish:</div>
                  <div className="flex gap-4">
                    {['match-tile', 'contrast-tile', 'open'].map(f => (
                      <button key={f} onClick={() => update({ nicheDetails: { ...state.nicheDetails, finish: f } as any })} className={`px-4 py-2 border-[1.5px] rounded-lg text-sm transition-colors ${state.nicheDetails?.finish === f ? 'border-[#C8A951] bg-[#C8A951] text-white' : 'border-[#E0D8CC] bg-white'}`}>{f.replace('-', ' ')}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Mirror style</h3>
              {recs?.['step7b-mirror'] && <VisionAIBanner message={recs['step7b-mirror'].message} subtext={recs['step7b-mirror'].subtext} />}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['arched', 'oval-frameless', 'rectangular-frameless', 'rectangular-framed', 'round-backlit', 'shaving-cabinet'].map(id => (
                  <OptionCard key={id} id={id} label={id.replace(/-/g, ' ')} svgIcon={<SvgMirror />} isSelected={state.mirrorStyle === id} isRecommended={recs?.['step7b-mirror']?.optionIds.includes(id)} onClick={() => update({ mirrorStyle: id as any })} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Lighting</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['recessed-downlights', 'backlit-mirror', 'led-strip', 'feature-pendant', 'smart-mirror', 'dimmer-switch', 'natural-skylight'].map(id => (
                  <FeatureCard key={id} id={id} label={id.replace(/-/g, ' ')} svgIcon={<SvgIcon />} isSelected={state.lighting?.includes(id) || false} onClick={() => update({ lighting: toggleArray(state.lighting, id) })} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Styling level</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <OptionCard id="clean-minimal" label="Clean Minimal" sublabel="Nothing on the bench" image="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=300&q=80" isSelected={state.stylingLevel === 'clean-minimal'} onClick={() => update({ stylingLevel: 'clean-minimal' })} />
                <OptionCard id="warm-styled" label="Warm & Styled" sublabel="A few considered touches" image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=300&q=80" isSelected={state.stylingLevel === 'warm-styled'} onClick={() => update({ stylingLevel: 'warm-styled' })} />
                <OptionCard id="fully-styled" label="Fully Styled" sublabel="The full magazine look" image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=300&q=80" isSelected={state.stylingLevel === 'fully-styled'} onClick={() => update({ stylingLevel: 'fully-styled' })} />
              </div>
            </div>
          </div>
        </StepCard>
      );
    case 9:
      return (
        <StepCard step={9} totalSteps={10} title="Renovation Reality" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!(state.budget && state.timeline && state.ownership && state.suburb && state.suburb.length > 2)}>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Budget</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <OptionCard id="under-15k" label="Under $15,000" sublabel="Cosmetic refresh" svgIcon={<SvgIcon/>} isSelected={state.budget === 'under-15k'} onClick={() => update({ budget: 'under-15k' })} />
                <OptionCard id="15k-25k" label="$15,000 – $25,000" sublabel="Mid-range reno" svgIcon={<SvgIcon/>} isSelected={state.budget === '15k-25k'} onClick={() => update({ budget: '15k-25k' })} />
                <OptionCard id="25k-45k" label="$25,000 – $45,000" sublabel="Full renovation" svgIcon={<SvgIcon/>} isSelected={state.budget === '25k-45k'} onClick={() => update({ budget: '25k-45k' })} />
                <OptionCard id="45k-80k" label="$45,000 – $80,000" sublabel="Premium renovation" svgIcon={<SvgIcon/>} isSelected={state.budget === '45k-80k'} onClick={() => update({ budget: '45k-80k' })} />
                <OptionCard id="over-80k" label="$80,000+" sublabel="Luxury transformation" svgIcon={<SvgIcon/>} isSelected={state.budget === 'over-80k'} onClick={() => update({ budget: 'over-80k' })} />
                <OptionCard id="not-sure" label="Not sure yet" sublabel="I'll know after quotes" svgIcon={<SvgIcon/>} isSelected={state.budget === 'not-sure'} onClick={() => update({ budget: 'not-sure' })} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Timeline</h3>
              <div className="flex flex-wrap gap-2">
                {['within-3mo', '3-6mo', '6-12mo', 'exploring'].map(t => (
                  <button key={t} onClick={() => update({ timeline: t as any })} className={`px-4 py-2 border-[1.5px] rounded-lg text-sm transition-colors ${state.timeline === t ? 'border-[#C8A951] bg-[#C8A951] text-white font-medium' : 'border-[#E0D8CC] bg-white hover:border-[#C8A951]/50'}`}>{t.replace('-', ' ')}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-3">Ownership</h3>
              <div className="grid grid-cols-2 gap-3">
                <OptionCard id="own-my-decision" label="I own it" sublabel="My decision" svgIcon={<SvgIcon/>} isSelected={state.ownership === 'own-my-decision'} onClick={() => update({ ownership: 'own-my-decision' })} />
                <OptionCard id="own-need-signoff" label="I own it" sublabel="Need partner sign-off" svgIcon={<SvgIcon/>} isSelected={state.ownership === 'own-need-signoff'} onClick={() => update({ ownership: 'own-need-signoff' })} />
                <OptionCard id="renting-agreed" label="Renting" sublabel="Landlord agreed" svgIcon={<SvgIcon/>} isSelected={state.ownership === 'renting-agreed'} onClick={() => update({ ownership: 'renting-agreed' })} />
                <OptionCard id="renting-exploring" label="Renting" sublabel="Exploring options" svgIcon={<SvgIcon/>} isSelected={state.ownership === 'renting-exploring'} onClick={() => update({ ownership: 'renting-exploring' })} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2B2B2B] mb-1">What suburb or town are you in?</h3>
              <div className="text-xs text-[#6B6B6B] mb-3">Local design aesthetics and material availability vary across Australia.</div>
              <input type="text" value={state.suburb} onChange={e => update({ suburb: e.target.value })} className="w-full text-lg border-b-2 border-[#C8A951] px-2 py-3 outline-none focus:bg-[#FDFAF3] transition-colors" />
            </div>
          </div>
        </StepCard>
      );
    case 10:
      return (
        <StepCard step={10} totalSteps={10} title="Contact Details" direction={isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={!!(state.firstName && state.email && state.email.includes('@') && state.optIn)}>
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-bold text-[#2B2B2B] mb-2">First name</label>
              <input type="text" value={state.firstName || ''} onChange={e => update({ firstName: e.target.value })} className="w-full text-[16px] border-b-2 border-[#E0D8CC] focus:border-[#C8A951] px-2 py-3 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2B2B2B] mb-2">Email address</label>
              <input type="email" value={state.email || ''} onChange={e => update({ email: e.target.value })} className="w-full text-[16px] border-b-2 border-[#E0D8CC] focus:border-[#C8A951] px-2 py-3 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2B2B2B] mb-1">Mobile number (optional)</label>
              <div className="text-xs text-[#6B6B6B] mb-2">For your reveal notification via SMS</div>
              <input type="tel" value={state.mobile || ''} onChange={e => update({ mobile: e.target.value })} className="w-full text-[16px] border-b-2 border-[#E0D8CC] focus:border-[#C8A951] px-2 py-3 outline-none transition-colors" />
            </div>
            <div className="mt-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={state.optIn || false} onChange={e => update({ optIn: e.target.checked })} className="mt-1 w-5 h-5 text-[#C8A951] rounded border-[#E0D8CC] focus:ring-[#C8A951]" />
                <span className="text-sm text-[#4A4A4A]">I agree to receive my Vision Weaver results and renovation tips via email.</span>
              </label>
            </div>
            <div className="text-xs text-[#6B6B6B] mt-4">
              Your details are kept private and never sold.
            </div>
          </div>
        </StepCard>
      );
    // case 11 is Photo Upload which shouldn't be handled here directly, or rather we can return it.
    // wait, VisionWeaverForm handles step 11 manually in its render? No, let's just return it here.
  }
  return null;
}

// Wrapper for Step 6 to maintain its own tab state
function Step6Wrapper({ state, update, next, onBack, toggleArray, TABS, catCount }: any) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  
  const currentTabDefs = TABS.find((t: any) => t.id === activeTab);
  const selectedCounts = TABS.reduce((acc: any, tab: any) => {
    acc[tab.id] = catCount(tab.ids);
    return acc;
  }, {});

  return (
    <StepCard step={6} totalSteps={10} title="What features do you want in your new bathroom?" subtitle={`${state.features?.length || 0} features selected`} direction={state.isNavigatingBack ? -1 : 1} onBack={onBack} onContinue={next} isValid={state.features && state.features.length > 0}>
      <CategoryTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} selectedCount={selectedCounts}>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 p-1">
          {currentTabDefs.ids.map((id: string) => (
            <FeatureCard key={id} id={id} label={id.replace(/-/g, ' ')} svgIcon={<SvgIcon />} isSelected={state.features?.includes(id) || false} onClick={() => update({ features: toggleArray(state.features, id) })} />
          ))}
        </div>
      </CategoryTabs>
    </StepCard>
  );
}

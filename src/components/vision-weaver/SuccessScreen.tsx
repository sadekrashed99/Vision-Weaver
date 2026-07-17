import React, { useEffect, useState } from 'react';
import { AppState } from '../VisionWeaverForm';
import { generateAIBrief } from '../../utils/aiBriefGenerator';
import { MoodboardCanvas } from './MoodboardCanvas';

export const SuccessScreen: React.FC = () => {
  const [data, setData] = useState<AppState | null>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) return;

    const savedSessionId = localStorage.getItem('vw_session_id');
    const savedStateStr = localStorage.getItem(`vw_state_${savedSessionId || sessionId}`);
    if (!savedStateStr) return;
    
    const savedState: AppState = JSON.parse(savedStateStr);
    setData(savedState);

    // Remove file objects from local storage but keep state
    const cleanState = { ...savedState, paymentComplete: true, stripeSessionId: sessionId };
    localStorage.setItem(`vw_state_${savedSessionId || sessionId}`, JSON.stringify(cleanState));

    // Webhook implementation (mocked or real depending on env)
    const env = (import.meta as any).env;
    if (env && env.VITE_REACT_APP_GHL_WEBHOOK_URL) {
      fetch(env.VITE_REACT_APP_GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: savedState.firstName,
          email: savedState.email,
          phone: savedState.mobile,
          suburb: savedState.suburb,
          leadScore: savedState.leadScore,
          leadTemperature: savedState.leadTemperature,
          paymentAmount: 37,
          paymentCurrency: 'AUD',
          stripeSessionId: sessionId,
          bathroomType: savedState.bathroomType,
          bathroomSize: savedState.bathroomSize,
          styleDirection: savedState.styleDirection,
          budget: savedState.budget,
          timeline: savedState.timeline,
          ownership: savedState.ownership,
          features: savedState.features?.join(', ') || '',
          photoUrls: savedState.photos?.map(p => p.cloudinaryUrl).filter(Boolean).join(', ') || '',
          aiBrief: generateAIBrief(savedState),
          tags: [
            'vision-weaver-paid',
            `vw-${savedState.leadTemperature?.toLowerCase()}`,
            `style-${savedState.styleDirection}`,
            `budget-${savedState.budget}`,
            `timeline-${savedState.timeline}`,
          ],
        }),
      }).catch(console.error);
    }
  }, []);

  if (!data) {
    return <div className="min-h-[100dvh] bg-[#F9F6F1] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[100dvh] bg-[#F9F6F1] font-sans flex flex-col pt-16 pb-24 px-6 items-center text-center">
      <div className="w-16 h-16 bg-[#27AE60]/10 rounded-full flex items-center justify-center mb-8 shrink-0">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      
      <h1 className="font-heading font-extrabold text-[32px] md:text-[40px] text-[#2B2B2B] leading-tight mb-4 max-w-xl">
        Your vision is in Vision AI's hands{data.firstName ? `, ${data.firstName}` : ''}.
      </h1>
      <p className="text-[#4A4A4A] text-[16px] max-w-lg mb-12">
        Expect your personalised bathroom design video within 48 hours.
      </p>

      <div className="bg-white border border-[#E0D8CC] rounded-xl p-6 md:p-8 w-full max-w-xl text-left mb-12 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[#27AE60]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <div>
              <div className="font-bold text-[#2B2B2B] text-[15px]">Right now</div>
              <div className="text-[13px] text-[#27AE60] font-medium">Confirmation email + SMS dispatched ✓</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 relative flex items-center justify-center w-5 h-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C8A951] opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9E7A28]"></span>
            </div>
            <div>
              <div className="font-bold text-[#2B2B2B] text-[15px]">Within 1hr</div>
              <div className="text-[13px] text-[#C8A951] font-medium">Vision AI begins processing your brief</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-[#4A4A4A]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg></div>
            <div>
              <div className="font-bold text-[#2B2B2B] text-[15px]">Within 48hrs</div>
              <div className="text-[13px] text-[#4A4A4A]">Your private reveal link arrives via email and SMS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl text-left">
        <h3 className="font-heading font-extrabold text-[20px] text-[#2B2B2B] mb-6">Instant downloads</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Vision Moodboard', label: 'See Below' },
            { title: '2026 Renovation Budget Guide', label: '(PDF)' },
            { title: `Style Direction Guide`, label: '(PDF)' },
            { title: 'Renovation Readiness Checklist', label: '(PDF)' },
            { title: '20 Questions to Ask Your Builder', label: '(PDF)' },
          ].map((item, i) => (
            <a 
              key={i}
              href="#"
              className="flex items-center justify-between border-[1.5px] border-[#E0D8CC] text-[#2B2B2B] bg-white rounded p-4 font-medium hover:border-[#C8A951] transition-colors"
            >
              <span className="truncate pr-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                {item.title}
              </span>
              <span className="text-[#C8A951] text-[12px]">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <MoodboardCanvas data={data} />
    </div>
  );
};

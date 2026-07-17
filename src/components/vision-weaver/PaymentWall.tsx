import React, { useState } from 'react';
import { motion } from 'motion/react';
import { VisionWeaverData } from '../../types/visionWeaver';

interface PaymentWallProps {
  data: VisionWeaverData;
  onBack: () => void;
}

export default function PaymentWall({ data, onBack }: PaymentWallProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (e) {
      console.error('Checkout error:', e);
      setIsLoading(false);
      alert('There was an issue initiating the checkout. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E0D8CC] p-8"
      >
        <h2 className="text-2xl font-extrabold text-[#2B2B2B] mb-2 font-heading">
          One last step — unlock your vision
        </h2>
        
        <div className="mt-6 mb-8 flex items-baseline justify-center">
          <s className="text-[#9CA3AF] text-lg">$97 AUD</s>
          <span className="text-[#C8A951] font-extrabold text-4xl ml-2">$37 AUD</span>
        </div>

        <div className="text-left space-y-3 mb-8">
          {[
            'Personalised AI bathroom design video — within 48 hours',
            'Vision Moodboard PDF',
            '2026 Renovation Budget Guide',
            'Style Direction PDF',
            'Renovation Readiness Checklist',
            '20 Questions to Ask Your Builder'
          ].map((item, i) => (
            <div key={i} className="flex items-start text-sm text-[#2B2B2B]">
              <svg className="w-5 h-5 text-[#C8A951] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-[#C8A951] text-[#2B2B2B] font-bold py-4 px-6 rounded text-lg transition-colors hover:bg-[#9E7A28] disabled:opacity-70 flex justify-center items-center"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-[#2B2B2B] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Get My Vision — $37 AUD'
          )}
        </button>

        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-xs text-[#6B6B6B]">
            30-day money-back guarantee · Secure Stripe payment · No subscription
          </p>
        </div>
      </motion.div>
      <button onClick={onBack} className="mt-8 text-[#4A4A4A] hover:underline font-medium text-sm">
        &larr; Back to Photo Upload
      </button>
    </div>
  );
}

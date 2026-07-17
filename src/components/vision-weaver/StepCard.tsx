import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProgressBar } from './ProgressBar';

interface StepCardProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  direction: number;
  onBack?: () => void;
  onContinue: () => void;
  isValid: boolean;
  children: React.ReactNode;
  banner?: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  totalSteps,
  title,
  subtitle,
  direction,
  onBack,
  onContinue,
  isValid,
  children,
  banner
}) => {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F9F6F1] overflow-hidden">
      <ProgressBar step={step} totalSteps={totalSteps} />
      
      <AnimatePresence mode="wait" custom={direction}>
        <motion.main
          key={step}
          custom={direction}
          initial={{ x: direction * 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -40, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex-1 flex flex-col px-4 pt-6 pb-2 overflow-hidden max-w-4xl w-full mx-auto"
        >
          {banner}
          
          <h2 className="text-2xl font-extrabold text-[#2B2B2B] mb-1 font-heading">{title}</h2>
          {subtitle && <p className="text-sm text-[#6B6B6B] mb-4">{subtitle}</p>}
          
          <div className="flex-1 overflow-y-auto pb-2 hide-scrollbar">
            {children}
          </div>
        </motion.main>
      </AnimatePresence>

      <footer className="sticky bottom-0 bg-[#F9F6F1] border-t border-[#E0D8CC] px-6 py-4 flex items-center justify-between z-50">
        <div>
          {onBack && step > 1 && (
            <button
              onClick={onBack}
              className="text-[#4A4A4A] text-sm font-semibold py-2 px-4 hover:text-[#2B2B2B] transition-colors"
            >
              Back
            </button>
          )}
        </div>
        <button
          onClick={onContinue}
          disabled={!isValid}
          className={`py-3 px-8 rounded font-bold text-sm transition-colors ${
            isValid 
              ? 'bg-[#C8A951] text-[#2B2B2B] hover:bg-[#9E7A28]' 
              : 'bg-[#D4C89A] text-[#8B8B8B] cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

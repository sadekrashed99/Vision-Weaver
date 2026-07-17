import React from 'react';
import { motion } from 'motion/react';

interface ContinueBannerProps {
  onContinue: () => void;
  onRestart: () => void;
}

export const ContinueBanner: React.FC<ContinueBannerProps> = ({ onContinue, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2B2B2B] text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg sticky top-0 z-[60]"
    >
      <div className="text-sm font-medium">
        Welcome back. Continue where you left off?
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <button
          onClick={onRestart}
          className="flex-1 sm:flex-none px-4 py-2 text-sm text-[#E0D8CC] hover:text-white transition-colors"
        >
          Start fresh
        </button>
        <button
          onClick={onContinue}
          className="flex-1 sm:flex-none px-4 py-2 text-sm bg-[#C8A951] text-[#2B2B2B] font-bold rounded hover:bg-[#9E7A28] transition-colors"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

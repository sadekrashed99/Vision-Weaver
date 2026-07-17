import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const percent = Math.min(100, Math.max(0, (step / totalSteps) * 100));

  return (
    <div className="sticky top-0 z-50 bg-[#F9F6F1] border-b border-[#E0D8CC] px-6 py-4 flex flex-row items-center">
      <div className="text-sm">
        <span className="text-[#C8A951] font-bold">Vision AI</span>
        <span className="text-[#4A4A4A]"> Crafting Your Blueprint — Step {step} of {totalSteps}</span>
      </div>
      <div className="h-1 rounded-full bg-[#E0D8CC] flex-1 mx-4 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#C8A951]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        />
      </div>
      <div className="text-[#C8A951] font-bold text-sm">
        {Math.round(percent)}%
      </div>
    </div>
  );
};

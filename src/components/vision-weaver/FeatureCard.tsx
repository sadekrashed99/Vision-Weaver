import React from 'react';
import { motion } from 'motion/react';

interface FeatureCardProps {
  id: string;
  label: string;
  svgIcon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const FeatureCard = React.memo<FeatureCardProps>(({ id, label, svgIcon, isSelected, onClick }) => {
  return (
    <motion.div
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center p-4 border-[1.5px] rounded-xl cursor-pointer transition-colors text-center h-full
        ${isSelected 
          ? 'border-[#C8A951] bg-[#FDFAF3] text-[#C8A951] shadow-[0_0_0_3px_rgba(200,169,81,0.15)]' 
          : 'border-[#E0D8CC] bg-white text-[#4A4A4A] hover:border-[#C8A951]/50'
        }`}
    >
      <div className={`mb-3 ${isSelected ? 'text-[#C8A951]' : 'text-[#4A4A4A]'}`}>
        {svgIcon}
      </div>
      <span className={`text-xs font-medium leading-tight ${isSelected ? 'text-[#2B2B2B]' : 'text-[#4A4A4A]'}`}>
        {label}
      </span>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

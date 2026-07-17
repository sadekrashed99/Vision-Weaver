import React from 'react';
import { motion } from 'motion/react';

interface OptionCardProps {
  id: string;
  label: string;
  sublabel?: string;
  image?: string;
  gradient?: string;
  swatches?: string[];
  svgIcon?: React.ReactNode;
  isSelected: boolean;
  isRecommended?: boolean;
  isSkip?: boolean;
  onClick: () => void;
}

export const OptionCard = React.memo<OptionCardProps>(({
  id,
  label,
  sublabel,
  image,
  gradient,
  swatches,
  svgIcon,
  isSelected,
  isRecommended,
  isSkip,
  onClick
}) => {
  const borderClass = isSelected 
    ? 'border-[#C8A951] bg-[#FDFAF3] shadow-[0_0_0_3px_rgba(200,169,81,0.15)]'
    : isRecommended
      ? 'border-[#C8A951] bg-white'
      : 'border-[#E0D8CC] bg-white';

  return (
    <motion.div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      whileTap={{ scale: 0.97 }}
      className={`relative rounded-xl border-[1.5px] cursor-pointer transition-colors overflow-hidden flex flex-col ${borderClass} ${isSelected ? 'border-[2px]' : ''}`}
    >
      {isRecommended && (
        <div className="absolute top-2 right-2 z-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8A951" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      )}

      {image && (
        <img src={image} className="w-full h-40 object-cover rounded-t-xl" loading="lazy" alt={label} />
      )}
      
      {gradient && (
        <div className="w-20 h-20 rounded-full mx-auto my-4 shrink-0" style={{ background: gradient }} />
      )}

      {swatches && (
        <div className="flex h-8 rounded-lg overflow-hidden mx-4 my-4 shrink-0">
          {swatches.map((hex, i) => (
            <div key={i} style={{ background: hex, flex: 1 }} />
          ))}
        </div>
      )}

      {svgIcon && (
        <div className="flex justify-center items-center h-24 py-4 shrink-0 text-[#2B2B2B]">
          {svgIcon}
        </div>
      )}

      {isSkip && (
        <div className="flex justify-center items-center h-20 shrink-0 text-[#4A4A4A]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      <div className="flex flex-col flex-1 justify-end">
        <div className="text-sm font-medium text-[#2B2B2B] text-center px-3 pb-3 pt-1">
          {label}
        </div>
        {sublabel && (
          <div className="text-xs text-[#6B6B6B] text-center px-3 pb-3 -mt-1">
            {sublabel}
          </div>
        )}
      </div>
    </motion.div>
  );
});

OptionCard.displayName = 'OptionCard';

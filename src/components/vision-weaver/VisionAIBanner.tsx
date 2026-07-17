import React from 'react';
import { motion } from 'motion/react';

interface VisionAIBannerProps {
  message: string;
  subtext: string;
}

export const VisionAIBanner: React.FC<VisionAIBannerProps> = ({ message, subtext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-[#F0EBE0] border border-[#C8A951] px-4 py-3 mb-4 flex items-start gap-3"
    >
      <div className="mt-0.5 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#C8A951" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </div>
      <div>
        <div className="text-sm">
          <span className="font-bold text-[#C8A951]">Vision AI:</span>
          <span className="text-[#2B2B2B] ml-1">{message}</span>
        </div>
        <div className="text-[#6B6B6B] text-xs italic mt-1">
          {subtext}
        </div>
      </div>
    </motion.div>
  );
};

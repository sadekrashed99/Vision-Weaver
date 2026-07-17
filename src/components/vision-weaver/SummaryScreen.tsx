import React from 'react';
import { motion } from 'motion/react';
import { VisionWeaverData } from '../../types/visionWeaver';

interface SummaryScreenProps {
  data: VisionWeaverData;
  onContinue: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ data, onContinue }) => {
  return (
    <div className="min-h-[100dvh] bg-[#F9F6F1] flex flex-col items-center justify-center py-12 px-6">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border border-[#C8A951] text-[#C8A951] font-bold text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-6 inline-flex items-center gap-1 shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#C8A951" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          Almost there
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-[#2B2B2B] mb-4 font-heading"
        >
          Your Vision Is Taking Shape
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#4A4A4A] mb-10 max-w-lg"
        >
          Vision AI has everything it needs to craft your personalised design video.
        </motion.p>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {/* Thumbnails grid */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex flex-col items-center justify-center shadow-sm">
             <div className="text-xs text-[#6B6B6B] mt-2 text-center uppercase tracking-wider font-semibold">Style</div>
             <div className="text-sm font-medium text-[#2B2B2B] capitalize text-center mt-1">{data.styleDirection?.replace('-', ' ')}</div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.38 }} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex flex-col items-center justify-center shadow-sm">
             <div className="text-xs text-[#6B6B6B] mt-2 text-center uppercase tracking-wider font-semibold">Colour</div>
             <div className="text-sm font-medium text-[#2B2B2B] capitalize text-center mt-1">{data.colourDirection?.replace('-', ' ')}</div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.46 }} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex flex-col items-center justify-center shadow-sm">
             <div className="text-xs text-[#6B6B6B] mt-2 text-center uppercase tracking-wider font-semibold">Tapware</div>
             <div className="text-sm font-medium text-[#2B2B2B] capitalize text-center mt-1">{data.tapwareFinish?.replace('-', ' ')}</div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.54 }} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex flex-col items-center justify-center shadow-sm">
             <div className="text-xs text-[#6B6B6B] mt-2 text-center uppercase tracking-wider font-semibold">Mirror</div>
             <div className="text-sm font-medium text-[#2B2B2B] capitalize text-center mt-1">{data.mirrorStyle?.replace('-', ' ')}</div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.62 }} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex flex-col items-center justify-center shadow-sm">
             <div className="text-xs text-[#6B6B6B] mt-2 text-center uppercase tracking-wider font-semibold">Vanity</div>
             <div className="text-sm font-medium text-[#2B2B2B] capitalize text-center mt-1">{data.vanityFront?.replace('-', ' ')}</div>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.70 }} className="bg-white p-3 rounded-xl border border-[#E0D8CC] flex flex-col items-center justify-center shadow-sm">
             <div className="text-xs text-[#6B6B6B] mt-2 text-center uppercase tracking-wider font-semibold">Tile</div>
             <div className="text-sm font-medium text-[#2B2B2B] capitalize text-center mt-1">{data.tileStyle?.replace('-', ' ')}</div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-left w-full max-w-md space-y-3 mb-10"
        >
          <div className="font-bold text-[#2B2B2B] mb-4">What happens next:</div>
          {[
            'Confirmation email + SMS sent immediately',
            'Vision AI generates your personalised bathroom video within 48 hours',
            'Your private reveal link arrives via email and SMS'
          ].map((item, i) => (
            <div key={i} className="flex items-start text-sm text-[#4A4A4A]">
              <svg className="w-5 h-5 text-[#C8A951] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-md"
        >
          <button
            onClick={onContinue}
            className="w-full bg-[#C8A951] text-[#2B2B2B] font-bold py-4 px-6 rounded text-lg transition-colors hover:bg-[#9E7A28] mb-4"
          >
            Continue to Payment
          </button>
        </motion.div>
      </div>
    </div>
  );
};

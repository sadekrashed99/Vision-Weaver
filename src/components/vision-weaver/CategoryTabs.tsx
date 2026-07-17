import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TabDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface CategoryTabsProps {
  tabs: TabDefinition[];
  activeTab: string;
  onTabChange: (id: string) => void;
  selectedCount: Record<string, number>;
  children: React.ReactNode;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ tabs, activeTab, onTabChange, selectedCount, children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#E0D8CC] mb-4 shrink-0 px-1">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          const count = selectedCount[tab.id] || 0;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 border-b-2 transition-colors
                ${isActive 
                  ? 'border-[#C8A951] text-[#C8A951] font-semibold' 
                  : 'border-transparent text-[#4A4A4A] hover:text-[#2B2B2B]'
                }`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
              {count > 0 && (
                <span className="absolute top-1.5 right-1 w-4 h-4 rounded-full bg-[#C8A951] text-white text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto pb-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

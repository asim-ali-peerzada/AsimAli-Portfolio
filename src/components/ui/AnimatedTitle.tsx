import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface AnimatedTitleProps {
  title: string;
  popupText?: string;
  className?: string;
  textClassName?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
  popupText = 'and why it matters',
  className = '',
  textClassName = 'text-[#0a0a0a]',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2
        className={`text-3xl md:text-5xl font-medium tracking-tighter font-['Urbanist',sans-serif] ${textClassName}`}
      >
        {title}
      </h2>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 15, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -8 }}
            exit={{ opacity: 0, scale: 0.5, y: 15, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute -top-14 left-[65%] z-10"
          >
            <div className="relative bg-[#10b981] text-white px-5 py-2 rounded-[20px] text-[16px] font-medium font-['Urbanist',sans-serif] whitespace-nowrap shadow-sm">
              {popupText}
              {/* Speech bubble tail pointing down */}
              <div className="absolute -bottom-1.5 left-6 w-3.5 h-3.5 bg-[#10b981] rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTitle;

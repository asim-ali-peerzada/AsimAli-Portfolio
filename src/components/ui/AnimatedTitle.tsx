import { useState } from 'react';

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

      <div
        className={`absolute -top-14 left-[65%] z-10 transition-all duration-200 ${
          isHovered ? 'opacity-100 scale-100 translate-y-0 rotate-[-8deg]' : 'opacity-0 scale-50 translate-y-4 rotate-[5deg] pointer-events-none'
        }`}
      >
        <div className="relative bg-[#10b981] text-white px-5 py-2 rounded-[20px] text-[16px] font-medium font-['Urbanist',sans-serif] whitespace-nowrap shadow-sm">
          {popupText}
          <div className="absolute -bottom-1.5 left-6 w-3.5 h-3.5 bg-[#10b981] rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedTitle;

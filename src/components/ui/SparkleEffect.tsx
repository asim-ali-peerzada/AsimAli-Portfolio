import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const SparkleEffect: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setSparkles((prev) => [...prev, newSparkle]);

      // Remove sparkle after animation finishes
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleParticle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const SparkleParticle: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  // Exactly 4 lines as shown in your reference images
  const numParticles = 4;
  const rays = Array.from({ length: numParticles });

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {rays.map((_, i) => {
        // Calculate angle for a precise upward arc
        // -140 degrees (left-up) to -40 degrees (right-up)
        const startAngle = -140;
        const endAngle = -40;
        const angle = startAngle + (i * (endAngle - startAngle)) / (numParticles - 1);

        // Fixed distance for a uniform, clean burst
        const distance = 40;

        return (
          <motion.div
            key={i}
            initial={{
              scaleY: 1, // Start at full length
              scaleX: 1, // Start at full width
              opacity: 1,
              x: 0,
              y: 0,
              // Orient the line to face the direction it is traveling
              rotate: angle + 90,
            }}
            animate={{
              // Move outwards to the calculated edge
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              // Keyframes:
              // 1. Full line (1)
              // 2. Shorter line (0.5)
              // 3. Tiny dot (0.2)
              // 4. Disappear (0)
              scaleY: [1, 0.5, 0.2, 0],
              scaleX: [1, 1, 0.8, 0],
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              // times maps exactly to the 4 stages shown in your 4 screenshots
              times: [0, 0.3, 0.7, 1],
            }}
            // Width 3px, Height 14px makes a clean dash.
            className="absolute w-[3px] h-[14px] bg-[#0A2714] rounded-[1px] origin-center -ml-[1.5px] -mt-[7px]"
          />
        );
      })}
    </div>
  );
};

export default SparkleEffect;

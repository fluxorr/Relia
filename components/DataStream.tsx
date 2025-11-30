
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';

// Icons defined as paths to allow for masking effects
const icons = [
    { name: "Slack", path: "M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" },
    { name: "Mail", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
    { name: "Database", path: "M12 2C6.48 2 2 3.34 2 5v14c0 1.66 4.48 3 10 3s10-1.34 10-3V5c0-1.66-4.48-3-10-3zm0 3c4.27 0 8 1.12 8 2.5S16.27 10 12 10s-8-1.12-8-2.5S7.73 5 12 5z M2 10v-.5c0 1.38 4.03 2.5 9 2.5s9-1.12 9-2.5V10c0 1.38-4.03 2.5-9 2.5S2 11.38 2 10zm0 5v-.5c0 1.38 4.03 2.5 9 2.5s9-1.12 9-2.5V15c0 1.38-4.03 2.5-9 2.5S2 16.38 2 15z" },
    { name: "Git", path: "M12 2a10 10 0 0 0-3.16 19.49v-2.73c-3.25.7-3.94-1.57-3.94-1.57-.59-1.5-1.44-1.9-1.44-1.9-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.39.97.1-.75.41-1.27.74-1.57-2.59-.29-5.32-1.3-5.32-5.77 0-1.28.46-2.32 1.2-3.14-.12-.29-.52-1.48.11-3.09 0 0 .98-.31 3.21 1.2a11.16 11.16 0 0 1 5.84 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.61.24 2.8.12 3.09.74.82 1.2 1.86 1.2 3.14 0 4.48-2.74 5.47-5.33 5.76.42.36.8 1.08.8 2.18v3.24c0 .41.28.85.8 1.2A10 10 0 0 0 12 2z" },
    { name: "Server", path: "M2 2h20v8H2V2zm0 12h20v8H2v-8z m2-10v4h16V4H4z m0 12v4h16v-4H4z M6 6h2v2H6V6z m0 12h2v2H6v-2z" },
    { name: "Cloud", path: "M17.5 19c2.48 0 4.5-2.02 4.5-4.5c0-2.26-1.65-4.13-3.81-4.45c-.41-3.6-3.48-6.3-7.19-6.3c-3.14 0-5.83 1.94-6.83 4.71c-2.92.35-5.17 2.83-5.17 5.79c0 3.2 2.6 5.8 5.8 5.8h12.7z" },
];

const LiquidIcon = ({ path, count }: { path: string, count: number }) => {
    return (
        <div className="relative w-16 h-16 group/icon cursor-pointer">
            {/* Background Wireframe (Dark Grey) */}
            <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#333] stroke-[1px] transition-colors duration-300 group-hover/icon:stroke-[#555]">
                <path d={path} />
            </svg>

            {/* Foreground Liquid Fill (White) */}
            {/* We mask the filled white rectangle with the icon path */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-50 group-hover/icon:opacity-100">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                    <defs>
                        <clipPath id={`clip-${path.substring(0, 10)}`}>
                            <path d={path} />
                        </clipPath>
                    </defs>
                    <g clipPath={`url(#clip-${path.substring(0, 10)})`}>
                        {/* The filling liquid */}
                        <motion.rect 
                            x="0" 
                            y="24" 
                            width="24" 
                            height="24" 
                            className="fill-white"
                            initial={{ y: 24 }}
                            whileHover={{ y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </g>
                </svg>
            </div>

            {/* Tooltip */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-mono px-2 py-1 whitespace-nowrap z-20 pointer-events-none"
            >
                {count} THREADS ANALYZED
            </motion.div>
        </div>
    )
}

export const DataStream = () => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
  
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * 2 * (delta / 1000); // Base speed
      
      // Speed up on scroll
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });
  
    return (
      <section className="w-full py-32 bg-[#050505] border-t border-[#1A1A1A] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10" />
          
          <div className="flex items-center mb-16 px-8 relative z-20">
              <span className="text-xs font-mono text-[#737373] uppercase tracking-widest mr-4">Ingestion Stream</span>
              <div className="h-px w-24 bg-[#1A1A1A]"></div>
          </div>
  
          <div className="relative flex overflow-hidden">
              <motion.div 
                  className="flex space-x-32 items-center"
                  style={{ x }}
              >
                  {/* Quadruple the list for smooth wrapping */}
                  {[...icons, ...icons, ...icons, ...icons].map((icon, i) => (
                      <LiquidIcon key={i} path={icon.path} count={Math.floor(Math.random() * 40) + 12} />
                  ))}
              </motion.div>
          </div>
      </section>
    );
  };

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Synthesis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Start positions (Chaos)
  const startPositions = [
    { x: '15%', y: '15%' },
    { x: '85%', y: '20%' },
    { x: '10%', y: '85%' },
    { x: '90%', y: '80%' },
    { x: '25%', y: '90%' },
    { x: '75%', y: '10%' },
  ];

  // End positions (Order - Hexagon)
  const endPositions = [
    { x: '50%', y: '35%' }, // Top
    { x: '63%', y: '42.5%' }, // Top Right
    { x: '63%', y: '57.5%' }, // Bottom Right
    { x: '50%', y: '65%' }, // Bottom
    { x: '37%', y: '57.5%' }, // Bottom Left
    { x: '37%', y: '42.5%' }, // Top Left
  ];

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Controls for the lines connecting to center
  const lineOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  // Transform Hook Generator
  const useNodeTransform = (index: number) => {
    // We map scroll progress to the transition between start and end coordinates
    const x = useTransform(scrollYProgress, [0.2, 0.8], [startPositions[index].x, endPositions[index].x]);
    const y = useTransform(scrollYProgress, [0.2, 0.8], [startPositions[index].y, endPositions[index].y]);
    return { x, y };
  };

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] md:h-[300vh] bg-[#050505] text-white">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">

        {/* 
           VISUALIZER LAYER 
           Hidden on Mobile (< md), Visible on Tablet+
        */}
        <div className="hidden md:flex md:w-2/3 md:h-full items-center justify-center bg-[#050505] z-0 md:order-2 relative">

          {/* Grid Background */}
          <div className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Central Hub - The "Bundle" */}
          <motion.div
            style={{ opacity: lineOpacity }}
            className="absolute z-10 w-32 h-32 flex items-center justify-center"
          >
            <motion.div
              className="w-full h-full border border-white/30 bg-[#111]/50 backdrop-blur-md flex items-center justify-center cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.2 }}
            >
              <div className="text-[10px] font-mono tracking-widest text-white group-hover:hidden">RELIA CORE</div>
              <div className="hidden group-hover:block text-[10px] font-mono text-white text-center">
                <div>Q3 REPORT</div>
                <div className="text-[#555]">READY</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Dynamic Nodes */}
          {startPositions.map((_, i) => {
            const { x, y } = useNodeTransform(i);
            return (
              <React.Fragment key={i}>
                {/* Connection Line to Center (Visible only at end) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <motion.line
                    x1={x}
                    y1={y}
                    x2="50%"
                    y2="50%"
                    stroke="#333"
                    strokeWidth="1"
                    style={{ opacity: lineOpacity }}
                  />
                </svg>

                {/* The Node */}
                <motion.div
                  className="absolute w-3 h-3 bg-[#F5F5F5] rounded-full z-20 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{ left: x, top: y }}
                  whileHover={{ scale: 2 }}
                >
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* 
            TEXT LAYER 
            On mobile: Full width, centered text, relative positioning.
            On desktop: 1/3 width sidebar.
        */}
        <div className="w-full h-full md:w-1/3 flex flex-col justify-center px-6 pt-24 md:pt-0 md:px-12 md:border-r border-[#1A1A1A] z-20 md:order-1 relative bg-[#050505]">
          <motion.div style={{ opacity }} className="max-w-sm pointer-events-auto">
            <div className="p-0">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6 text-white">
                Synthesis
              </h2>
              <p className="text-[#737373] text-sm md:text-lg leading-relaxed">
                Disparate signals are noise. Connected signals are intelligence.
                <span className="md:hidden mt-2 block text-[#555] text-xs">
                  (Visualization optimized for desktop)
                </span>
              </p>
              <div className="mt-8 space-y-3 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#333] rounded-full" />
                  <span className="text-sm font-mono text-[#555]">CROSS-REFERENCE</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#333] rounded-full" />
                  <span className="text-sm font-mono text-[#555]">PATTERN MATCHING</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-sm font-mono text-white">INSIGHT GENERATION</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
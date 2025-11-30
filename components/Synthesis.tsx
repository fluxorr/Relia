import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
{ }
export const Synthesis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate random positions for nodes
  const nodes = [
    { x: '20%', y: '20%' },
    { x: '80%', y: '15%' },
    { x: '15%', y: '80%' },
    { x: '75%', y: '85%' },
    { x: '45%', y: '10%' },
    { x: '50%', y: '90%' },
  ];

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const lineDraw = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-[#050505] text-white">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">

        {/* Left: Text Info */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-12 border-r border-[#1A1A1A] bg-[#050505]/90 backdrop-blur-sm z-10">
          <motion.h2
            style={{ opacity }}
            className="text-4xl font-bold tracking-tight mb-6"
          >
            Synthesis
          </motion.h2>
          <motion.p
            style={{ opacity }}
            className="text-[#737373] text-lg max-w-sm"
          >
            Relia analyzes disparate data points across your ecosystem, drawing connections where none were visible before.
            <br /><br />
            Chaos becomes structure.
          </motion.p>
        </div>

        {/* Right: Visualizer */}
        <div className="w-full md:w-2/3 relative flex items-center justify-center overflow-hidden">

          {/* Central Hub */}
          <motion.div
            style={{ scale }}
            className="relative z-20 w-32 h-32 border border-white/20 bg-[#111] flex items-center justify-center backdrop-blur-sm"
          >
            <div className="text-xs font-mono tracking-widest">NUCLEUS</div>
          </motion.div>

          {/* Connected Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#333] rounded-full z-10"
              style={{
                left: node.x,
                top: node.y,
                x: useTransform(scrollYProgress, [0, 1], ["0%", `${(50 - parseInt(node.x)) * 0.8}%`]),
                y: useTransform(scrollYProgress, [0, 1], ["0%", `${(50 - parseInt(node.y)) * 0.8}%`]),
              }}
            />
          ))}

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, i) => (
              <motion.line
                key={i}
                x1={node.x}
                y1={node.y}
                x2="50%"
                y2="50%"
                stroke="#333"
                strokeWidth="1"
                pathLength={lineDraw}
                strokeDasharray="1 1"
              />
            ))}
          </svg>

        </div>
      </div>
    </section>
  );
};
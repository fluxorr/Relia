import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footnote = ({ word, content, setHoveredWord }: { word: string, content: string, setHoveredWord: (w: string | null) => void }) => (
    <span
        className="relative inline-block border-b border-[#737373] hover:border-white hover:text-white cursor-help transition-colors duration-200 z-20"
        onMouseEnter={() => setHoveredWord(content)}
        onMouseLeave={() => setHoveredWord(null)}
    >
        {word}
    </span>
);

export const OutputBrief = () => {
    const [activeContext, setActiveContext] = useState<string | null>(null);

    return (
        <section className="w-full py-32 flex flex-col items-center bg-[#050505]">
            <div className="mb-12 text-center">
                <h2 className="text-xs font-mono text-[#737373] uppercase tracking-widest mb-4">Output Generation</h2>
                <h3 className="text-4xl font-bold text-white">The 3-Minute Brief</h3>
            </div>

            {/* The Document Container */}
            <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-[#1A1A1A] p-12 md:p-16 shadow-2xl overflow-hidden group/doc">

                {/* Context Tooltip - Receipt Style */}
                <AnimatePresence>
                    {activeContext && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute -right-20 top-20 w-64 bg-[#F5F5F5] text-black p-6 text-xs font-mono z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-4 border-black"
                        >
                            <div className="flex justify-between items-center mb-4 border-b border-black/10 pb-2">
                                <span className="uppercase font-bold tracking-widest">SOURCE</span>
                                <span className="text-black/40">#0042</span>
                            </div>
                            <p className="leading-relaxed font-medium">{activeContext}</p>
                            <div className="mt-4 pt-2 border-t border-dashed border-black/20 flex justify-between text-[10px] text-black/50">
                                <span>SLACK: #ENGINEERING</span>
                                <span>14:02 PM</span>
                            </div>
                            {/* Receipt zigzag bottom */}
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-[linear-gradient(45deg,transparent_33.333%,#f5f5f5_33.333%,#f5f5f5_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#f5f5f5_33.333%,#f5f5f5_66.667%,transparent_66.667%)] bg-[length:10px_20px] bg-[position:0_10px] rotate-180 translate-y-full"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reading Bar Effect - Masking over text */}
                <motion.div
                    className="absolute inset-0 bg-[#0A0A0A]/60 z-10 pointer-events-none"
                    initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    whileInView={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 6, ease: "linear" }}
                />

                {/* Hover Dimming Overlay */}
                <div className={`absolute inset-0 bg-black/80 z-10 transition-opacity duration-300 pointer-events-none ${activeContext ? 'opacity-100' : 'opacity-0'}`} />

                {/* Document Content */}
                <div className="font-serif text-[#F5F5F5] text-lg md:text-xl leading-relaxed space-y-8 relative z-0">

                    <div className="relative">
                        <p className={`transition-opacity duration-300 ${activeContext ? 'opacity-30' : 'opacity-100'}`}>
                            <span className="text-[#737373] text-sm font-sans block mb-2 uppercase tracking-wide">Executive Summary</span>
                            Q3 trajectory indicates a <Footnote word="14% uplift" content="Revenue increased from $1.2M to $1.36M driven by Enterprise tier adoption." setHoveredWord={setActiveContext} /> in recurring revenue.
                            However, operational overhead in the <Footnote word="deployment pipeline" content="CI/CD failure rate increased by 4% due to new integration tests." setHoveredWord={setActiveContext} /> threatens to erode margins by end of quarter.
                        </p>
                    </div>

                    <div className="relative">
                        <p className={`transition-opacity duration-300 ${activeContext ? 'opacity-30' : 'opacity-100'}`}>
                            Strategic recommendation involves immediate reallocation of <Footnote word="engineering resources" content="Shift 2 senior devs from Feature A to Stability Squad." setHoveredWord={setActiveContext} /> to stabilize core infrastructure before the holiday surge.
                        </p>
                    </div>

                    <div className={`mt-12 pt-8 border-t border-[#1A1A1A] flex justify-between items-end transition-opacity duration-300 ${activeContext ? 'opacity-30' : 'opacity-100'}`}>
                        <div className="text-[#333] text-xs font-mono">
                            GENERATED BY RELIA v2.4
                        </div>
                        <div className="w-12 h-12 border border-[#1A1A1A] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
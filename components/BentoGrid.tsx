import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
    <motion.div
        className={`bg-[#0A0A0A] border border-[#1A1A1A] p-6 relative overflow-hidden group hover:border-[#444] transition-colors duration-500 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <div className="absolute top-4 left-4 text-[10px] font-mono text-[#555] uppercase tracking-wider z-20 group-hover:text-white transition-colors">{title}</div>
        <div className="mt-8 h-full relative z-10 w-full">{children}</div>
    </motion.div>
);

const SentimentWave = () => (
    <div className="w-full h-full flex items-center justify-center relative">
        <svg className="w-full h-32" viewBox="0 0 100 40" preserveAspectRatio="none">
            {/* Background Static Line */}
            <motion.path
                d="M0 20 Q 25 20 50 20 T 100 20"
                stroke="#1A1A1A"
                strokeWidth="1"
                fill="none"
            />
            {/* Active Wave */}
            <motion.path
                d="M0 20 Q 25 20 50 20 T 100 20"
                stroke="#F5F5F5"
                strokeWidth="1.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
                animate={{
                    d: [
                        "M0 20 Q 25 20 50 20 T 100 20",
                        "M0 20 Q 25 5 50 20 T 100 20", // Spike up
                        "M0 20 Q 25 35 50 20 T 100 20", // Spike down
                        "M0 20 Q 25 20 50 20 T 100 20",
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    times: [0, 0.2, 0.4, 1], // Quick spike then flat
                    ease: "easeInOut"
                }}
            />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono bg-white text-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            TONE: URGENT
        </div>
    </div>
);

const CalendarTetris = () => (
    <div className="w-full h-full p-4">
        <div className="grid grid-cols-4 gap-2 h-full">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="bg-[#1A1A1A] w-full h-8 rounded-sm"
                    initial={{ y: 0 }}
                    whileHover={{
                        y: [0, -10, 0],
                        x: [0, i % 2 === 0 ? 5 : -5, 0],
                        backgroundColor: "#333"
                    }}
                    transition={{ duration: 0.4 }}
                />
            ))}
            <motion.div
                className="col-span-2 bg-[#F5F5F5] h-8 rounded-sm flex items-center justify-center text-[10px] text-black font-mono"
                whileHover={{ scale: 0.95 }}
            >
                OPTIMIZING...
            </motion.div>
        </div>
    </div>
);

const SecurityLock = () => (
    <div className="w-full h-full flex flex-col items-center justify-center perspective-1000">
        <motion.div
            className="w-24 h-24 relative transform-style-3d"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.8 }}
        >
            {/* Front */}
            <div className="absolute inset-0 border-2 border-[#333] rounded-full flex items-center justify-center backface-hidden bg-[#0A0A0A]">
                <div className="w-4 h-8 border-2 border-[#333] rounded-t-full -mt-12" />
                <div className="absolute w-2 h-2 bg-white rounded-full" />
            </div>

            {/* Back (The Code) */}
            <div className="absolute inset-0 border-2 border-white rounded-full flex items-center justify-center backface-hidden rotate-y-180 bg-white">
                <span className="text-black font-mono font-bold text-xl">OK</span>
            </div>
        </motion.div>
        <div className="mt-8 text-[10px] font-mono text-[#555] group-hover:text-white transition-colors">AES-256 ENCRYPTED</div>
    </div>
);

export const BentoGrid = () => {
    return (
        <section className="w-full py-32 px-4 bg-[#050505] flex justify-center items-center">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px]">
                <Card title="Sentiment Analysis" className="col-span-1 md:col-span-2 row-span-1">
                    <SentimentWave />
                </Card>
                <Card title="Schedule Opt" className="col-span-1 row-span-1">
                    <CalendarTetris />
                </Card>
                <Card title="The Vault" className="col-span-1 row-span-1">
                    <SecurityLock />
                </Card>
                <Card title="Knowledge Graph" className="col-span-1 md:col-span-2 row-span-1 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="text-6xl md:text-8xl font-bold tracking-tighter text-[#1A1A1A] group-hover:text-white transition-colors duration-700">
                            +14.2%
                        </div>
                        <div className="text-[#555] font-mono mt-4">INSIGHT VELOCITY</div>
                    </div>
                </Card>
            </div>
        </section>
    );
};
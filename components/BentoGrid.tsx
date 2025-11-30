import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
    <motion.div 
        className={`bg-[#0A0A0A] border border-[#1A1A1A] p-6 relative overflow-hidden group hover:border-[#333] transition-colors ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <div className="absolute top-4 left-4 text-xs font-mono text-[#737373] uppercase tracking-wider z-20">{title}</div>
        <div className="mt-8 h-full relative z-10">{children}</div>
        
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
);

const SentimentWave = () => (
    <div className="w-full h-full flex items-center justify-center">
        <svg className="w-full h-32" viewBox="0 0 100 40">
            <motion.path
                d="M0 20 Q 25 20 50 20 T 100 20"
                stroke="#333"
                strokeWidth="1"
                fill="none"
                animate={{
                    d: [
                        "M0 20 Q 25 10 50 20 T 100 20",
                        "M0 20 Q 25 30 50 10 T 100 20",
                        "M0 20 Q 25 20 50 30 T 100 20"
                    ]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <motion.path
                d="M0 20 Q 25 20 50 20 T 100 20"
                stroke="#F5F5F5"
                strokeWidth="2"
                fill="none"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                    d: [
                        "M0 20 Q 25 5 50 20 T 100 20",
                        "M0 20 Q 25 35 50 5 T 100 20",
                        "M0 20 Q 25 20 50 35 T 100 20"
                    ]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
        </svg>
        <div className="absolute bottom-4 right-4 text-xs font-mono text-white opacity-0 group-hover:opacity-100">Tone: URGENT</div>
    </div>
);

const CalendarTetris = () => (
    <div className="w-full h-full grid grid-cols-4 gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                className={`bg-[#1A1A1A] rounded-sm ${i % 3 === 0 ? 'bg-[#333]' : ''}`}
                whileHover={{ scale: 0.9 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ delay: i * 0.1, duration: 3, repeat: Infinity }}
            />
        ))}
    </div>
);

const SecurityLock = () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <motion.div 
            className="w-16 h-16 border-4 border-[#333] rounded-full flex items-center justify-center group-hover:border-white transition-colors"
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 90 }}
        >
            <div className="w-2 h-6 bg-[#333] group-hover:bg-white transition-colors rounded-full" />
        </motion.div>
        <div className="mt-4 text-xs font-mono text-[#737373] group-hover:text-white">ENCRYPTED</div>
    </div>
);

export const BentoGrid = () => {
  return (
    <section className="w-full py-24 px-4 bg-[#050505] flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px]">
            <Card title="Sentiment Analysis" className="col-span-1 md:col-span-2 row-span-1">
                <SentimentWave />
            </Card>
            <Card title="Calendar Opt" className="col-span-1 row-span-1">
                <CalendarTetris />
            </Card>
            <Card title="Security Vault" className="col-span-1 row-span-1">
                <SecurityLock />
            </Card>
            <Card title="Knowledge Graph" className="col-span-1 md:col-span-2 row-span-1 flex items-center justify-center">
                 <div className="text-[#333] font-mono text-4xl group-hover:text-white transition-colors duration-500">
                    +14.2% Insight
                 </div>
            </Card>
        </div>
    </section>
  );
};
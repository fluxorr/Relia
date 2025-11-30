import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calculate blur based on text length to simulate "Clarity"
    const blurAmount = Math.max(0, 10 - email.length);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <footer className="w-full h-screen relative flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
            {/* Background Gradient Floor */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />

            {/* Success Ripple Effect Container */}
            {isSubmitted && (
                <motion.div
                    className="absolute inset-0 z-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 0.5 }}
                />
            )}

            <div className="relative z-10 w-full max-w-4xl px-8">
                <h2 className="text-sm font-mono text-[#737373] mb-8 uppercase tracking-widest text-center">Get Early Access</h2>
                <p className='text-xs pb-2 font-mono text-[#737373] text-center tracking-tigher uppercase ' >Type in your email below.</p>
                <div className='border border-1 border-neutral-300/20 border-dashed' >
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER PROTOCOL"
                            className="w-full bg-transparent text-center text-4xl md:text-4xl font-bold text-white placeholder-[#1A1A1A] outline-none border-b border-[#1A1A1A] focus:border-white transition-colors py-8 uppercase tracking-tighter"
                            style={{ filter: `blur(${isSubmitted ? 0 : blurAmount}px)`, transition: 'filter 0.3s ease' }}
                            disabled={isSubmitted}
                        />

                        {email.length > 0 && !isSubmitted && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                type="submit"
                                className="absolute right-0 bottom-8 text-sm font-mono bg-white text-black px-4 py-2 hover:bg-[#ccc]"
                                data-interactive
                            >
                                INITIALIZE
                            </motion.button>
                        )}
                    </form>
                </div>

                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 text-center"
                    >
                        <div className="inline-block px-6 py-2 border border-white text-white font-mono text-sm">
                            ACCESS GRANTED // SEQUENCE STARTED
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="absolute bottom-8 w-full px-8 flex justify-between text-[10px] text-[#333] font-mono uppercase">
                <div>© 2025 Relia Systems</div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-white">Twitter</a>
                    <a href="#" className="hover:text-white">LinkedIn</a>
                    <a href="#" className="hover:text-white">Legal</a>
                </div>
            </div>
        </footer>
    );
};
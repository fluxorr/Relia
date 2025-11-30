import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Noise Canvas Component for the "Clarity" effect
const NoiseCanvas = ({ opacity }: { opacity: number }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            canvas.width = canvas.parentElement?.offsetWidth || 300;
            canvas.height = canvas.parentElement?.offsetHeight || 100;

            const w = canvas.width;
            const h = canvas.height;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) {
                    buffer32[i] = 0xffffffff; // White
                } else {
                    buffer32[i] = 0xff000000; // Black
                }
            }

            ctx.putImageData(idata, 0, 0);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none w-full h-full mix-blend-overlay"
            style={{ opacity }}
        />
    );
};

export const Footer = () => {
    const [email, setEmail] = useState('');
    const blurAmount = Math.max(0, 8 - email.length);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Map email length to noise opacity (1 -> 0)
    // Max length expected ~ 20 chars for full clarity
    const noiseOpacity = Math.max(0, 1 - (email.length / 15));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <footer className="w-full h-screen relative flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
            {/* Background Gradient Floor */}
            <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#111] via-[#0a0a0a] to-transparent pointer-events-none" />

            {/* Success Ripple Effect */}
            {isSubmitted && (
                <>
                    <motion.div
                        className="absolute z-50 w-[150vw] h-[150vw] rounded-full bg-white"
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute z-0 inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* Flash grid lines on success */}
                        {[...Array(200)].map((_, i) => (
                            <div key={i} className="border border-white/20" />
                        ))}
                    </motion.div>
                </>
            )}

            <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center">
                <h2 className="text-sm font-mono text-[#737373] mb-12 uppercase tracking-[0.2em] text-center">
                    Initialize Protocol
                </h2>

                <form onSubmit={handleSubmit} className="relative w-full">
                    {/* The Input Container */}
                    <div className="relative group">
                        {/* Dynamic Noise Background inside input area */}
                        <div className="absolute inset-0 bg-[#111] overflow-hidden rounded-sm transition-colors duration-500">
                            {!isSubmitted && <NoiseCanvas opacity={noiseOpacity} />}
                        </div>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER EMAIL"
                            className="relative z-10 w-full bg-transparent text-center text-5xl md:text-8xl font-bold text-[#F5F5F5] placeholder-[#333] outline-none border-b-2 border-[#333] focus:border-white transition-all py-12 uppercase tracking-tighter"
                            style={{ filter: `blur(${isSubmitted ? 0 : blurAmount}px)`, transition: 'filter 0.3s ease' }}
                            disabled={isSubmitted}
                            autoFocus
                        />
                    </div>

                    <div className="h-12 mt-8 flex justify-center">
                        {email.length > 0 && !isSubmitted && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="text-sm font-mono bg-[#F5F5F5] text-black px-8 py-3 tracking-widest hover:bg-white"
                                data-interactive
                            >
                                ACCESS
                            </motion.button>
                        )}

                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center space-x-2 text-[#F5F5F5]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="font-mono text-sm tracking-widest">SEQUENCE INITIATED</span>
                            </motion.div>
                        )}
                    </div>
                </form>
            </div>

            <div className="absolute bottom-8 w-full px-12 flex justify-between items-end text-[10px] text-[#333] font-mono uppercase">
                <div>
                    © 2025 Relia Systems<br />
                    Pune, IN
                </div>
                <div className="flex space-x-8">
                    <a href="#" className="hover:text-white transition-colors" data-interactive>Twitter</a>
                    <a href="#" className="hover:text-white transition-colors" data-interactive>LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors" data-interactive>Legal</a>
                </div>
            </div>
        </footer>
    );
};
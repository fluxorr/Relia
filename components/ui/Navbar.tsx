import React from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#050505]/60 border-b border-[#1A1A1A]"
    >
      <div className="text-xl font-bold tracking-tighter" data-interactive>RELIA.</div>
      <div className="hidden md:flex space-x-8 text-sm text-[#737373] font-mono">
        {['Features', 'Methodology', 'Pricing'].map((item) => (
          <button key={item} className="hover:text-white transition-colors duration-300" data-interactive>
            {item}
          </button>
        ))}
      </div>
      <button className="px-4 py-2 border border-[#333] text-xs font-mono rounded hover:bg-[#F5F5F5] hover:text-black transition-all duration-300" data-interactive>
        LOGIN
      </button>
    </motion.nav>
  );
};
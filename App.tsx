import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { DataStream } from './components/DataStream';
import { Synthesis } from './components/Synthesis';
import { OutputBrief } from './components/OutputBrief';
import { BentoGrid } from './components/BentoGrid';
import { Footer } from './components/Footer';
import { Navbar } from './components/ui/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';

export default function App() {
  useEffect(() => {
    // Prevent browser restoring scroll position to the bottom input
    window.scrollTo(0, 0);

  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#050505]">

      <div className="grain-overlay" />


      <CustomCursor />

      <Navbar />


      <Hero />
      <DataStream />
      <Synthesis />
      <OutputBrief />
      <BentoGrid />
      <Footer />
    </main>
  );
}